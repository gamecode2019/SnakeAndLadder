"use strict";
const logger = autoload('core/logger').getLogger('test');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const driver = autoload('core/dbi_mysql');
const config = require("../../config/server.json");
const tcp_autoclient = autoload('core/tcp_autoclient');
const packet_type = autoload('define/packet_type');

let readTable = false;

/**
 * 构造函数
 * @param void
 * @return void
 */
let test_player = function() {
    this._mysql = new driver();
    this._mysql.connect(config.mysql);
};

// 连接到游戏服
let _connect_game = thunkify(function(callback) {
    let protocols = "./server/test/protocols";
    let port = config.server.port;
    let ip = "127.0.0.1";
    let client = new tcp_autoclient(logger, protocols);
    client.connect(port, ip, function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, client);
    });
});


/**
 * 执行测试
 * @param void
 * @return void
 */
test_player.prototype.run = thunkify(function(callback) {
    hprose.co(function*() {
        logger.info("test_client 开始");
        let client = yield _connect_game();
        let msgLogin = new packet_type.CS_UserLogin();
        msgLogin.code = "snakeladder";
        client.send(msgLogin);
        logger.info("test_client 完毕");
        //callback(null, null);
    }).catch(function(err) {
        logger.info("test_client 失败");
        logger.error(err);
        callback(err, null);
    });
});

module.exports = new test_player();