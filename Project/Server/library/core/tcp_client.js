"use strict";
const IoBuffer = require('./io_buffer');
const PACKAGE_OFFSET = 4;

/**
 * TcpClientImpl 构造函数.
 * @param {object} logger 日志器
 * @param {string} login 登录协议
 * @param {string} logout 登出协议
 * @return void
 */
const TcpClientImpl = function(logger, login, logout, token) {
    this._ip = ''; // 监听地址
    this._port = 0; // 监听端口
    this._socket = null; // 套接字
    this._socketCloseNotifyCallback = null; // 通知Server类，为关闭状态
    this._logger = logger; // 日志
    this._ioBuffer = new IoBuffer(); // 接收buffer缓存类
    this._recvpacketQueue = []; // 接收队列
    this._isPacketProcessing = false; // 包体处理
    this._maxRecvPacketNumber = 8; // 缓存队列最大的数量，防止假客户端拼命发包影响其他客户端的正常的逻辑
    this._maxRecvPacketSize = 8 * 1024; // 最大报文长度
    this._timeout = 10 * 60 * 1000; // 超时时间10分钟
    this._protocolDispatcher = null; // 协议分发器
    this._isFirstPacket = true; // 是否有校验Token
    this._login = login; // 登陆
    this._logout = logout; // 登出
    this._token = token; // 令牌
    this._obj = null; // 挂载一个任意对象，比如player，用于存放业务逻辑信息，保证TcpClientImpl为网络层
    this._isJson = true; // 数据协议
};

/**
 * 加入套接字
 * @param {object} socket 客户端套接字
 * @param {object} onClientSocketClosed 套接字关闭回调
 * @return void
 */
TcpClientImpl.prototype.attachSocket = function(socket, onClientSocketClosed) {
    let self = this;
    this._socket = socket;
    this._socketCloseNotifyCallback = onClientSocketClosed;
    this._ip = socket.remoteAddress;
    this._port = socket.remotePort;
    this._socket.setNoDelay(true); /** 去掉Nagle算法，使write能够立即发送到客户端 */
    this._socket.setKeepAlive(true);
    this._socket.on('connect', function() {
        //self._logger.info('on client connected');
    });

    // 数据接收
    this._socket.on('data', function(data) {
        self.parsePacket(data);
    });

    // 当连接中的任意一端发送FIN数据的时候会调用这个函数
    this._socket.on('end', function() {
        // self._logger.debug('socket client end');
    });

    // 当任意一端调用write发送数据时，会触发这个事件
    this._socket.on('drain', function() {
        // self._logger.debug('socket write');
    });

    // 异常发生
    this._socket.on('error', function(exception) {
        self._logger.info(exception);
    });

    // 当套接字完全关闭的时候，触发该事件,had_error为true表示因为错误而关闭
    this._socket.on('close', function(had_error) {
        self._logger.info("[TCP DISCONECT] " + had_error + " " + self._ip + ":" + self._port);
        self._protocolDispatcher[self._logout].handleProtocol(self);
        if (self._socketCloseNotifyCallback) {
            self._socketCloseNotifyCallback(self);
        }
    });

    // 设置等待响应时间
    this._socket.setTimeout(this._timeout);
    this._socket.on('timeout', function(data) {
        self._logger.warn('[TCP TIMEOUT] ' + self._ip + ":" + self._port);
    });
};

/**
 * 加入协议分发器
 */
TcpClientImpl.prototype.attachProtocolDispatcher = function(dispatcher) {
    this._protocolDispatcher = dispatcher;
};

/** 
 * 关闭客户端
 */
TcpClientImpl.prototype.close = function() {
    this._socket.end();
};

/**
 * 解析报文
 * @param {object} data 报文数据
 */
TcpClientImpl.prototype.parsePacket = function(data) {
    let self = this;
    this._ioBuffer.write(data, function(buffer, length) {
        let readLength = 0;
        while (true) {
            // 读取报文长度
            if (readLength + PACKAGE_OFFSET >= length) {
                return readLength;
            }

            // 异常长度的报文
            let packetLength = buffer.readUInt32BE(readLength);
            if (packetLength > self._maxRecvPacketSize) {
                self.close();
                return 0;
            }

            // 报文没有读完
            readLength += PACKAGE_OFFSET;
            if (packetLength > length - readLength) {
                readLength -= PACKAGE_OFFSET;
                return readLength;
            }

            // 转换json
            let jsonStr = buffer.toString('utf-8', readLength, readLength + packetLength);
            readLength += packetLength;
            if (!self.dispatchPacket(jsonStr)) {
                self.close();
            }
        }
    });
};

/**
 * 放入接收队列中，并且按照顺序处理
 * @param {string} jsonStr json数据字符串
 */
TcpClientImpl.prototype.dispatchPacket = function(jsonStr) {
    if (this._recvpacketQueue.length > this._maxRecvPacketNumber) {
        return false;
    }
    this._recvpacketQueue.push(jsonStr);
    this.processPacket();
    return true;
};

/**
 * 处理报文逻辑
 */
TcpClientImpl.prototype.processPacket = function() {
    // 如果接收队列没有报文需要处理，直接返回
    let self = this;
    if (this._recvpacketQueue.length <= 0) {
        return;
    }

    // 保证接收的报文顺序执行
    if (this._isPacketProcessing) {
        return;
    }
    this._isPacketProcessing = true;

    // 解析JSON
    let currentProtocol = null;
    let packetStream = this._recvpacketQueue.shift(); // dequeue
    let jsonObject = null;
    try {
        jsonObject = JSON.parse(packetStream);
        currentProtocol = this._protocolDispatcher[jsonObject.pt];
    } catch (e) {
        this._logger.error(e.stack);
        this._logger.error('[TCP ERROR] invalid socket stream. this socket will be closed ' + self._ip + ":" + self._port);
        return this.close();
    }

    // 如果没有这个协议
    if (!currentProtocol) {
        return this.close();
    }

    // 如果没有验证token，第一个协议应该是验证token的协议
    do {
        if (self._token) {
            if (jsonObject.tk === self._token) {
                break;
            }
        }
        if (self._isFirstPacket) {
            if (jsonObject.pt === self.login) {
                self._isFirstPacket = false;
                break;
            } else {
                return self.close();
            }
        }
    } while (false);

    // 处理客户端请求
    currentProtocol.handleProtocol(self, jsonObject, function(data) {
        if (data === false) {
            return self.close();
        }
        self._isPacketProcessing = false;
        return self.processPacket();
    });

};

/**
 * 发送报文
 * @param {object} writeObject 消息对象
 * @param {object} completedCallback 完成回调
 */
TcpClientImpl.prototype.sendResponse = function(writeObject, completedCallback) {
    let jsonStr = JSON.stringify(writeObject);
    let jsonStrSize = Buffer.byteLength(jsonStr, 'utf8');
    let buffer = new Buffer(jsonStrSize + PACKAGE_OFFSET);
    buffer.writeUInt32BE(jsonStrSize, 0);
    buffer.write(jsonStr, PACKAGE_OFFSET);

    // 套接字错误
    if (!this._socket.writable) {
        this._logger.error("[TCP ERROR] Socket is not allow writable " + this._ip + ":" + this._port);
        if (null !== completedCallback) {
            completedCallback(false);
        }
        return;
    }

    // 发送数据
    this._socket.write(buffer);
    if (null !== completedCallback) {
        completedCallback(true);
    }
};

/**
 * 发送报文，带错误代码
 * @param {object} writeObject
 * @param {number} errCode
 * @param {object} completedCallback
 */
TcpClientImpl.prototype.sendResponseWithErrorCode = function(writeObject, errCode, completedCallback) {
    writeObject.ret = errCode;
    this.sendResponse(writeObject, completedCallback);
};

module.exports = TcpClientImpl;