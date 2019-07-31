"use strict";
const loader = require("./library/loader");
const cluster = require('cluster');
const logger = autoload('core/logger').getLogger("data");
const dbi_server = autoload('core/dbi_server');
const data_object = autoload('define/data_object');
const config = require("./config/server.json");
const hprose = require('hprose');

// 错误处理
var sendDisconnect = true;
process.on('uncaughtException', function(err) {
    logger.error("[uncaughtException] " + err.stack);
});

// 启动server
(function start_server() {
    var params = {};
    params.name = 'snakeladder_data';
    params.logger = logger;
    params.protocols = "./server/snakeladder_data/protocols";
    params.mysql_conf = config.mysql;
    params.redis_conf = config.redis;
    params.server_conf = config.server;
    var server = new dbi_server(params);
    server.start(data_object);
    // 循环事件
    setInterval(function() { server.update(Date.now()); }, 1000);
})();