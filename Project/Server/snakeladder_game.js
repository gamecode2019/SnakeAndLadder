"use strict";
const loader = require("./library/loader");
const cluster = require('cluster');
const hprose = require('hprose');
const schedule = require('node-schedule');
const logger = autoload('core/logger').getLogger("game");
const ws_server = autoload('core/ws_server');
const csvReader = autoload('core/csvreader');
const data_manager = autoload('manager/data_manager').instance();
const config = require("./config/server.json");
const thunkify = hprose.thunkify;
const http_server = autoload('core/http_server');
const https_server = autoload('core/https_server');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');

// 错误处理
let sendDisconnect = true;
process.on('uncaughtException', function(err) {
    logger.error("[uncaughtException] " + err.stack);
});

// 连接数据服
const _connect_data = thunkify(function(callback) {
    let params = {};
    params.logger = logger;
    params.protocols = "./server/snakeladder_data/protocols";
    params.server_conf = config.server;
    data_manager.connect(params, callback);
});

// 加入管理器
const _init_manager = function(server) {
    let tpath = './server/snakeladder_game/manager';
    server.registerManager(require(tpath + '/variable_manager').instance());
    server.registerManager(require(tpath + '/user_manager').instance());
    server.registerManager(require(tpath + '/player_manager').instance());
    server.registerManager(require(tpath + '/room_manager').instance());
};

// 读取配置表
const _read_csv = thunkify(function(callback) {
    csvReader.csvReader(logger, './resources/config', callback);
});

// 依次启动数据服务器组件
hprose.co(function*() {
    process.env.DEBUG = config.server.debug;
    yield _connect_data();
    logger.info("Succeed to connect data-server.");
    yield _read_csv();

    // 读取证书
    let server = null;
    if (config.server.ssl) {
        let options = {};
        options.key = fs.readFileSync('cert/214982209770727.key');
        options.cert = fs.readFileSync('cert/214982209770727.pem');
        server = new https_server(logger, options);
    } else {
        server = new http_server(logger);
    }

    // 设置静态资源跨域
    let options = {
        setHeaders: function(response, path, stat) {
            response.set('Access-Control-Allow-Origin', '*');
        }
    };

    // 设置引擎
    server.set('views', path.join(__dirname, 'server/snakeladder_game/views'));
    server.use(express.static(path.join(__dirname, 'public'), options));
    server.set('view engine', 'pug');
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser('w9k2p1n3'));
    server.set('trust proxy', 1);
    server.use(session({ secret: 'w9k2p1n3', resave: true, saveUninitialized: true }));

    // 设置路由
    // server.bindHttpProtocols("./server/snakeladder_game/protocols");
    server.use('/', require('./server/snakeladder_game/routes/index'));
    server.start(config.server.port);

    // 启动server
    let wsServer = new ws_server(logger, "UserLogin", "UserLogout");
    wsServer.bindTcpProtocols('./server/snakeladder_game/protocols');
    wsServer.start(config.server.wsport);
    logger.info("Game Start OK");
    _init_manager(server);

    // 循环事件
    setInterval(function() { server.update(Date.now()); }, 500);
}).catch(function(err) {
    logger.error(err);
});