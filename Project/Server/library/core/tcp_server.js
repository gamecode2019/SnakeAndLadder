"use strict";
const net = require('net');
const tcp_client = require('./tcp_client');
const proto_handler = autoload('core/proto_handler');

/**
 * TcpServerImpl.
 * tcp server的二次封装类， 包含了错误处理和协议绑定.
 * @param {object} logger  log对象
 * @param {object} login 登录函数
 * @param {object} logout 登出函数
 * @param {string} token 验证码
 * @return void
 */
const TcpServerImpl = function(logger, login, logout, token) {
    this._maxConnections = 5000;
    this._netServer = null;
    this._clientCount = 0;
    this._port = 0;
    this._logger = logger;
    this._requestHandler = {};
    this._login = login;
    this._logout = logout;
    this._token = token || "";
    this._managerList = [];
};

/**
 * 绑定tcp协议.
 * @param {string} path 路径
 * @return void
 */
TcpServerImpl.prototype.bindTcpProtocols = function(path) {
    let self = this;
    proto_handler.readHttpProtocols(path, function(exported_protocol) {
        self._logger.info('[TCP Protocol Register] :' + exported_protocol.reqName);
        self.bindProtocol(exported_protocol);
    });
};

/**
 * 绑定协议.
 * @param {object} protocolHandler 协议处理函数
 * @return void
 */
TcpServerImpl.prototype.bindProtocol = function(protocolHandler) {
    this._requestHandler[protocolHandler.reqName] = protocolHandler;
};

/**
 * 启动TCP服务器
 * @param {number} port 端口
 * @return void
 */
TcpServerImpl.prototype.start = function(port) {
    // allowHalfOpen: false 当socket接收到客户端的FIN的时候完成待写入会自动调用End，destroy文件描述符
    this._netServer = net.createServer({ allowHalfOpen: false });
    this._netServer._maxConnections = this._maxConnections;

    // 绑定事件
    this.onListening();
    this.onConnection();
    this.onClose();
    this.onError();
    this._port = port;
    this._netServer.listen(this.port);
};

/**
 * 处理监听
 * @param void
 * @return void
 */
TcpServerImpl.prototype.onListening = function() {
    let self = this;
    this._netServer.on('listening', function() {
        self._logger.info("[TCP LISTENING] " + self.port);
    });
};

/**
 * Handle connect event.
 * @param void
 * @return void
 */
TcpServerImpl.prototype.onConnection = function() {
    let self = this;
    this._netServer.on('connection', function(socket) {
        self._logger.debug("[TCP CONNECT] " + socket.remoteAddress + ":" + socket.remotePort);
        let client = new tcp_client(self._logger, self._login, self._logout, self._token);
        client.attachProtocolDispatcher(self._requestHandler);
        client.attachSocket(socket, function(client) { /** 客户端关闭的回调*/
            self._clientCount--;
        });
        self._clientCount++;
    });
};

/**
 * Handle close event.
 * @param void
 * @return void
 */
TcpServerImpl.prototype.onClose = function() {
    let _self = this;
    this._netServer.on('close', function() {
        _self._netServer.close();
        _self._logger.info("[TCP Server Closed]");
    });
};

/**
 * Handle error event.
 * @param {object} error 错误信息
 * @return void
 */
TcpServerImpl.prototype.onError = function(error) {
    let self = this;
    this._netServer.on('error', function(error) {
        self._logger.error(error);
        if (error.code === 'EADDRINUSE') {
            self._logger.error('[TCP] address in use, retry start listen after 1000ms');
            setTimeout(function() {
                self._netServer.close();
                self._netServer(self.port); // restart
            }, 1000);
        }
    });
};

/**
 * Handle stop event.
 * @param void
 * @return void
 */
TcpServerImpl.prototype.stop = function() {
    let self = this;
    if (null !== this._netServer) {
        try {
            this._netServer.close();
        } catch (err) {
            self._logger.error(err.stack);
        }
    }
};

/**
 * 注册管理器
 * @param {number} time 时间
 * @return void
 */
TcpServerImpl.prototype.registerManager = function(manager) {
    this._managerList.push(manager);
};

/**
 * 帧更新
 * @param {number} time 时间
 * @return void
 */
TcpServerImpl.prototype.update = function(time) {
    let length = this._managerList.length;
    for (let i = 0; i < length; i++) {
        this._managerList[i].update(time);
    }
};

module.exports = TcpServerImpl;