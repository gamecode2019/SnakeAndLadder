"use strict";
const WebSocket = require('ws');
const ws_client = require('./ws_client');
const proto_handler = autoload('core/proto_handler');

/**
 * WsServerImpl.
 * tcp server的二次封装类，包含了错误处理和协议绑定.
 * @param {object} logger log对象
 * @param {object} login 登录函数
 * @param {object} logout 登出函数
 * @param {string} token 验证码
 * @return void
 */
const WsServerImpl = function(logger, login, logout, token) {
    this._maxConnections = 5000;
    this._maxRecvPacketSize = 8 * 1024; // 最大报文长度
    this._wss = null;
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
WsServerImpl.prototype.bindTcpProtocols = function(path) {
    let self = this;
    proto_handler.readHttpProtocols(path, function(exported_protocol) {
        self._logger.info('[Websocket Protocol Register] : ' + exported_protocol.reqName);
        self.bindProtocol(exported_protocol);
    });
};

/**
 * 绑定协议.
 * @param {object} protocolHandler 协议处理函数
 * @return void
 */
WsServerImpl.prototype.bindProtocol = function(protocolHandler) {
    this._requestHandler[protocolHandler.reqName] = protocolHandler;
};

/**
 * 启动websocket服务器
 * @param {number} port 端口
 * @return void
 */
WsServerImpl.prototype.start = function(port) {
    this._port = port;
    this._wss = new WebSocket.Server({
        port: this._port,
        maxPayload: this._maxRecvPacketSize
    });

    // 绑定事件
    this.onListening();
    this.onConnection();
    this.onClose();
    this.onError();
};

/**
 * 处理监听
 * @param void
 * @return void
 */
WsServerImpl.prototype.onListening = function() {
    let self = this;
    this._wss.on('listening', function() {
        self._logger.info("[WS LISTENING] " + self._port);
    });
};

/**
 * Handle connect event.
 * @param void
 * @return void
 */
WsServerImpl.prototype.onConnection = function() {
    let self = this;
    this._wss.on('connection', function(ws, req) {
        self._logger.debug("[WS CONNECT] " + req.connection.remoteAddress + ":" + req.connection.remotePort);
        let wsClient = new ws_client(self._logger, self._login, self._logout, self._token);
        wsClient.attachProtocolDispatcher(self._requestHandler);
        wsClient.attachSocket(ws, req, function(ws) { /** 客户端关闭的回调*/
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
WsServerImpl.prototype.onClose = function() {
    let self = this;
    this._wss.on('close', function(code, reason) {
        self._logger.info("[TCP Server Closed] code:" + code);
        self._wss.close();
    });
};

/**
 * Handle error event.
 * @param error {string} 错误信息
 * @return void
 */
WsServerImpl.prototype.onError = function(error) {
    let self = this;
    this._wss.on('error', function(error) {
        self._logger.error(error);
        self._wss.close();
    });
};

/**
 * Handle stop event.
 * @param void
 * @return void
 */
WsServerImpl.prototype.stop = function() {
    let self = this;
    if (null !== this._wss) {
        try {
            this._wss.close();
        } catch (err) {
            self._logger.error(err.stack);
        }
    }
};

/**
 * 注册管理器
 * @param time {number} 时间
 * @return void
 */
WsServerImpl.prototype.registerManager = function(manager) {
    this._managerList.push(manager);
};

/**
 * 帧更新
 * @param time {number} 时间
 * @return void
 */
WsServerImpl.prototype.update = function(time) {
    let length = this._managerList.length;
    for (let i = 0; i < length; i++) {
        this._managerList[i].update(time);
    }
};

module.exports = WsServerImpl;