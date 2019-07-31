"use strict";
const express = require('express');
const http = require('http');
const proto_handler = autoload('core/proto_handler');
const bodyParser = require("body-parser");

/**
 * 构造函数.
 * express的二次封装类，包含了错误处理和协议绑定.
 * @param {object} logger log对象
 * @return void
 */
const http_server = function(logger) {
    this._logger = logger; // 日志记录器
    this._app = express(); // express实例
    this._server = http.createServer(this._app); // HTTP服务器
    this._port = 8080; // 端口
    this._protoList = []; // 协议列表
    this._managerList = []; // 管理器列表
    this._router = express.Router();

    // 设置本地化
    this._app.locals.format = require('string-format');
    this._app.locals.moment = require('moment');
    this._app.locals.moment.locale('zh-cn');
    this._app.locals.pretty = true; // remove code compress.
};

/**
 * 绑定http协议.
 * @param {string} path 路径
 * @return void
 */
http_server.prototype.bindHttpProtocols = function(path) {
    // 设置跨域
    let self = this;
    self._app.all('/*', function(request, response, next) {
        if (request.headers.origin) {
            response.header("Access-Control-Allow-Origin", request.headers.origin);
            response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
            response.header('Access-Control-Allow-Credentials', 'true');
        }
        if (request.method === "OPTIONS") {
            response.send(200);
        } else {
            next();
        }
    });

    // 绑定http协议
    self.use('/api', self._router);
    proto_handler.readHttpProtocols(path, function(proto) {
        if (proto) {
            self._logger.info('[HTTP Protocol Register] : ' + proto.reqName);
            self.bindProtocol(proto);
        }
    });
    this._router.all('/*', function(request, response, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    self.use(function(err, request, response, next) {
        response.locals.message = err.message;
        response.locals.error = err;
        response.status(err.status || 500);
        response.render('error');
    });
};

/**
 * 绑定协议.
 * @param {object} proto 协议处理函数
 * @return void
 */
http_server.prototype.bindProtocol = function(proto) {
    this._protoList['/' + proto.reqName] = proto;
    this._router.all('/' + proto.reqName, bodyParser.json(), function(request, response, next) {
        proto.handleProtocol(request, response,next);
    });
};

/**
 * 启动服务器.
 * @param {object} proto 协议处理函数
 * @return void
 */
http_server.prototype.start = function(port, root) {
    let self = this;
    self._port = parseInt(port, 10) || port;
    self._app.set('port', self._port);
    self._server.listen(self._port);
    self._server.on('listening', function() {
        self._logger.info('Listening on ' + self._port);
    });
    self._server.on('error', function(error) {
        if (error.syscall !== 'listen') {
            self._logger.error(error);
            return;
        }
        if (error.code === 'EACCES') {
            self._logger.error('Requires elevated privileges');
            return;
        }
        if (error.code === 'EADDRINUSE') {
            self._logger.error('Port is already in use');
            return;
        }
        throw error;
    });
    self._logger.info("Http server start OK");
};

/**
 * 帧更新
 * @param {int} time 时间
 * @return void
 */
http_server.prototype.update = function(time) {
    this._managerList.forEach(function(manager) {
        manager.update(time);
    });
};

/**
 * 注册管理器
 * @param {object} manager
 * @return void
 */
http_server.prototype.registerManager = function(manager) {
    manager.init(); // 初始化
    manager.load(); // 加载数据
    this._managerList.push(manager);
};

/**
 * 设置变量
 * @param void
 * @return void
 */
http_server.prototype.set = function() {
    this._app.set.apply(this._app, arguments);
};

/**
 * 加入中间件
 * @param void
 * @return void
 */
http_server.prototype.use = function() {
    this._app.use.apply(this._app, arguments);
};

module.exports = http_server;