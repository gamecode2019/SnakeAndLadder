"use strict";
const net = require('net');
const IoBuffer = require('./io_buffer');
const proto_handler = autoload('core/proto_handler');

const _socketState = {};
_socketState.SPARE = 0; //空闲
_socketState.DISCONNECTED = 1; //断开连接
_socketState.CONNECTED = 2; //已连接
_socketState.RETRYING = 3; //重试
_socketState.FAILED = 4; //连接失败
_socketState.CLOSED = 5; //已关闭

/**
 * 自动连接socket客户端封装
 * @param void [object] 
 * @return [] 无返回值
 */
var TcpAutoclient = function(logger, protocols) {
    this._ip = '';
    this._port = 0;
    this._socket = null;
    this.state = _socketState.SPARE;
    this._reconnTimeout = 5000; //重连超时值(秒)
    this._reconnMaxCount = 5; //最大重连次数
    this._reconnCount = 0; //当前重连次数
    this._logger = logger || console;
    this._ioBuffer = new IoBuffer(); /**接收buffer缓存类 */
    this.requestHandler = {};
    this.bindTcpProtocols(protocols);
};

/**
 * 绑定tcp协议.
 * @param path [string] 路径
 * @return [] 无返回值
 */
TcpAutoclient.prototype.bindTcpProtocols = function(path) {
    var self = this;
    proto_handler.readHttpProtocols(path, function(exported_protocol) {
        self._logger.info('[TCP Protocol Register] : ' + exported_protocol.resName + ' -- [Object] : ' + exported_protocol.constructor.name);
        self.bindProtocol(exported_protocol);
    });
};

/**
 * 绑定协议.
 * @param protocolHandler [object] 协议处理函数
 * @return [] 无返回值
 */
TcpAutoclient.prototype.bindProtocol = function(protocolHandler) {
    this.requestHandler[protocolHandler.resName] = protocolHandler;
};

/**
 * 连接到远程服务器
 * @param port [int] 待连接服务器端口
 * @param host [string] 待连接服务器IP
 * @returns [] 无返回值
 */
TcpAutoclient.prototype.connect = function(port, host, callback) {
    var self = this;
    if (self.state == _socketState.CLOSED ||
        self.state == _socketState.CONNECTED) {
        callback(null);
        return;
    }
    self._port = port;
    self._ip = host;
    var connCallBack = function() {
        if (self.state != _socketState.CONNECTED) {
            self._logger.info("已连接>" + self._ip + ":" + self._port + "服务器");
            self.state = _socketState.CONNECTED;
            callback(null);
        }
    };
    if (!self._socket) {
        self._socket = net.createConnection(port, host, connCallBack);
        self._socket.setNoDelay(true);
        self._socket.setKeepAlive(true);
        // 拦截连接错误并尝试重连，防止错误抛出到上层。
        self._socket.on('error', function(err) {
            if (self.state == _socketState.RETRYING) {
                return;
            }
            if (self._reconnCount >= self._reconnMaxCount) {
                self._logger.warn("重连到达最大次数:" + self._reconnMaxCount + ",连接失败...");
                this.state = _socketState.FAILED;
                callback(err);
                return;
            }
            self.state = _socketState.RETRYING;
            self._socket.setTimeout(self._reconnTimeout, function() {
                if (self.state == _socketState.CONNECTED) {
                    return;
                }
                self._reconnCount += 1;
                self.state = _socketState.DISCONNECTED;
                self.connect(self._port, self._ip, callback);
            });
            self._logger.warn("尝试连接>" + self._ip + ":" + self._port + "服务器失败,等待第" + self._reconnCount + "次重试...");
            //callback(null);
        });
        //数据来时
        self._socket.on('data', (data) => {
            self.parsePacket(data);
        });
    } else {
        self._socket.connect(self._port, self._ip, connCallBack);
    }
};

/**
 * 重新连接到远程服务器
 * @returns [] 无返回值
 */
TcpAutoclient.prototype.reconnect = function(callback) {
    if (this.isFailed()) {
        this.state = _socketState.DISCONNECTED;
        this._reconnCount = 0;
        this.connect(this._port, this._ip, callback);
    } else {
        callback(Error("连接失败"), null);
    }
};

/** 解析报文 */
TcpAutoclient.prototype.parsePacket = function(data) {
    var self = this;
    this._ioBuffer.write(data, function(buffer, length) {
        var readLength = 0;
        /** 有可能会一次性收到多个报文 */
        while (true) {
            /** 读取报文长度 */
            if (readLength + 4 >= length) {
                return readLength;
            }
            var packetLength = buffer.readUInt32BE(readLength);

            /** 异常长度的报文 */
            if (packetLength > self._maxRecvPacketSize) {
                self.close();
                return 0;
            }
            readLength += 4;
            if (packetLength > length - readLength) { /** 说明还有报文没有读完 */
                readLength -= 4;
                return readLength;
            }
            var jsonStr = buffer.toString('utf-8', readLength, readLength + packetLength);
            readLength += packetLength;
            self.processPacket(jsonStr);
        }
    });
};

/** 处理报文逻辑 */
TcpAutoclient.prototype.processPacket = function(jsonStr) {
    var self = this;
    /** 解析JSON */
    var currentProtocol = null;
    var jsonObject = null;
    try {
        jsonObject = JSON.parse(jsonStr);
        currentProtocol = self.requestHandler[jsonObject.pt];
    } catch (e) {
        self.logger.error(e.stack);
        return self.close();
    }

    /** 如果没有这个协议 */
    if (!currentProtocol) {
        return self.close();
    }

    /** 处理请求 */
    currentProtocol.handleProtocol(self, jsonObject, function(err) {
        if (err) {
            this.logger.error("[TcpAutoclient.processPacket]处理协议出错 protocol:" + currentProtocol.resProtocolName + "|err:" + err.message || "未知");
            return self.close();
        }
    });

};


/** 关闭客户端 */
TcpAutoclient.prototype.close = function() {
    if (this._socket) {
        this.state = _socketState.CLOSED;
        this._logger.warn("连接已关闭");
        this._socket.end();
    }
};

/**
 * 发送数据
 * @param packet [object] 协议包
 * @returns [] 无返回值
 */
TcpAutoclient.prototype.send = function(packet) {
    if (this.state != _socketState.CONNECTED) {
        return false;
    }
    var jsonstr = JSON.stringify(packet);
    var jsonsize = Buffer.byteLength(jsonstr, 'utf8');
    var buffer = new Buffer(jsonsize + 4);
    buffer.writeUInt32BE(jsonsize, 0);
    buffer.write(jsonstr, 4);
    this._socket.write(buffer);
    return true;
};

/**
 * 是否是连接失败
 * @param packet [object] 协议包
 * @returns [] 无返回值
 */
TcpAutoclient.prototype.isFailed = function(packet) {
    return this.state == _socketState.FAILED;
};

module.exports = TcpAutoclient;