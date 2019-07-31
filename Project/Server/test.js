"use strict";
const loader = require("./library/loader");
const logger = autoload('core/logger').getLogger('test');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const data_manager = autoload('manager/data_manager').instance();
const fs_manager = autoload('manager/fs_manager').instance();
const config = require("./config/server.json");

// 连接数据服务器
let _connect_data = thunkify(function(callback) {
    let params = {};
    params.logger = logger;
    params.protocols = "./server/snakeladder_data/protocols";
    params.server_conf = config.server;
    data_manager.connect(params, callback);
});

// 连接文件服务器
let _connect_fs = thunkify(function(callback) {
    let params = {};
    params.logger = logger;
    params.protocols = "./server/fs_data/protocols";
    params.server_conf = config.server;
    fs_manager.connect(params, callback);
});

// 依次启动数据服务器组件
hprose.co(function*() {
    yield _connect_data();
    logger.info("Succeed to connect data-server.");
    //yield _connect_fs();
    //logger.info("Succeed to connect file-server.");

    // 运行测试例
    //yield require("./server/test/test_user").run();
    //yield require('./server/test/test_player').run();
    //yield require('./server/test/test_client').run();
    yield require('./server/test/test_ws').run();

}).catch(function(err) {
    logger.error(err);
});