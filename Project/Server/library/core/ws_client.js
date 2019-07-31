"use strict";
const IoBuffer = require('./io_buffer');
const PACKAGE_OFFSET = 2;

/**
 * WsClientImpl 构造函数.
 * @param {object} logger 日志器
 * @param {string} login 登录协议
 * @param {string} logout 登出协议
 * @return void
 */
const WsClientImpl = function(logger, login, logout, token) {
    this._ip = ''; // 监听地址
    this._port = 0; // 监听端口
    this._ws = null; // 套接字
    this._onClose = null; // 通知Server类，为关闭状态
    this._logger = logger; // 日志
    this._ioBuffer = new IoBuffer(); // 接收buffer缓存类
    this._recvpacketQueue = []; // 接收队列
    this._isPacketProcessing = false; // 包体处理
    this._maxRecvPacketNumber = 8; // 缓存队列最大的数量，防止假客户端拼命发包影响其他客户端的正常的逻辑
    this._maxRecvPacketSize = 8 * 1024; // 最大报文长度
    this._timeout = 3600000; // 超时时间
    this._protocolDispatcher = null; // 协议分发器
    this._isFirstPacket = true; // 是否有校验Token
    this._login = login; // 登陆
    this._logout = logout; // 登出
    this._token = token; // 令牌
    this._obj = null; // 挂载一个任意对象，比如player，用于存放业务逻辑信息，保证 WsClientImpl 为网络层
    this._isJson = true; // 数据协议
    this._isAlive = false; // 是否keepalive
};

/**
 * 心跳
 * @return void
 */
WsClientImpl.prototype.heartbeat = function() {
    this._isAlive = true;
};

/**
 * 加入套接字
 * @param {object} ws 客户端套接字
 * @param {object} req 请求信息
 * @param {object} onClose 套接字关闭回调
 * @return void
 */
WsClientImpl.prototype.attachSocket = function(ws, req, onClose) {
    let self = this;
    self._ws = ws;
    self._onClose = onClose;
    self._ip = req.connection.remoteAddress;
    self._port = req.connection.remotePort;
    self._isAlive = true;
    self._ws.on('pong', self.heartbeat);
    setInterval(function ping() {
        if (!self._isAlive) {
            self.terminate();
            return;
        }
        self._isAlive = false;
        self._ws.ping(function() {});
    }, self._timeout);

    // 数据接收
    self._ws.on('message', function(data) {
        self.parsePacket(data);
    });

    // 异常发生
    self._ws.on('error', function(error) {
        self._logger.info(error);
    });

    // 关闭
    self._ws.on('close', function(code, reason) {
        self._logger.info("[WS DISCONECT] " + code + " " + self._ip + ":" + self._port);
        self._protocolDispatcher[self._logout].handleProtocol(self);
        if (self._onClose) {
            self._onClose(self);
        }
    });
};

/**
 * 加入协议分发器
 */
WsClientImpl.prototype.attachProtocolDispatcher = function(dispatcher) {
    this._protocolDispatcher = dispatcher;
};

/** 
 * 关闭客户端
 */
WsClientImpl.prototype.close = function() {
    this._ws.close();
};

/** 
 * 终结客户端
 */
WsClientImpl.prototype.terminate = function() {
    this._ws.terminate();
};

/**
 * 解析报文
 * @param {object} data 报文数据
 */
WsClientImpl.prototype.parsePacket = function(data) {
    let self = this;
    this._ioBuffer.write(data, function(buffer, length) {
        // 有可能会一次性收到多个报文
        let readLength = 0;
        while (true) {
            // 读取报文长度
            if (readLength + PACKAGE_OFFSET >= length) {
                return readLength;
            }

            // 异常长度的报文
            let packetLength = buffer.readUInt16BE(readLength);
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
WsClientImpl.prototype.dispatchPacket = function(jsonStr) {
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
WsClientImpl.prototype.processPacket = function() {
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
        this._logger.error('[WS ERROR] invalid ws stream. this ws will be closed ' + self._ip + ":" + self._port);
        return this.close();
    }

    // 如果没有这个协议
    if (!currentProtocol) {
        this._logger.error('[WS ERROR] invalid protocol ' + currentProtocol);
        this.close();
        return;
    }

    // 如果没有验证token，第一个协议应该是验证token的协议
    do {
        if (self._token) {
            if (jsonObject.tk === self._token) {
                break;
            }
        }
        if (self._isFirstPacket) {
            if (jsonObject.pt === self._login) {
                self._isFirstPacket = false;
                break;
            } else {
                return self.close();
            }
        }
    } while (false);

    console.log(currentProtocol);

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
WsClientImpl.prototype.sendResponse = function(writeObject, completedCallback) {
    let self = this;
    let jsonStr = JSON.stringify(writeObject);
    let jsonStrSize = Buffer.byteLength(jsonStr, 'utf8');
    let buffer = new Buffer(jsonStrSize + PACKAGE_OFFSET);
    buffer.writeUInt16BE(jsonStrSize, 0);
    buffer.write(jsonStr, PACKAGE_OFFSET);

    // 套接字错误
    if (!self._ws || self._ws.readyState !== 1) {
        self._logger.error("[WS ERROR] ws is not open " + self._ip + ":" + self._port);
        if (null !== completedCallback) { completedCallback(false); }
        return;
    }

    // 发送数据
    self._ws.send(buffer, function(err) {
        if (err) {
            self._logger.error(err);
            self.close();
        }
        if (completedCallback) {
            completedCallback(!err);
        }
    });
};

/**
 * 发送报文，带错误代码
 * @param {object} writeObject
 * @param {number} errCode
 * @param {object} completedCallback
 */
WsClientImpl.prototype.sendResponseWithErrorCode = function(writeObject, errCode, completedCallback) {
    writeObject.ret = errCode;
    this.sendResponse(writeObject, completedCallback);
};

module.exports = WsClientImpl;