"use strict";
const logger = autoload('core/logger').getLogger('test');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const driver = autoload('core/dbi_mysql');
const config = require("../../config/server.json");
const WebSocket = require('ws');
const packet_type = autoload('define/packet_type');

let readTable = false;

/**
 * 构造函数
 * @param void
 * @return void
 */
let test_ws = function() {
    this._mysql = new driver();
    this._mysql.connect(config.mysql);
};

// 连接到游戏服
let _connect_game = thunkify(function(callback) {
    let protocols = "./server/test/protocols";
    let port = config.server.port;
    let ip = "127.0.0.1";
    let path = `ws://${ip}:${port}`;
    const ws = new WebSocket(path);
    ws.on('open', function(err) {
        if (err) {
            logger.error("connect failed!");
            return;
        }
        logger.info("connected!");
        callback(null, ws);
    });
});


/**
 * 执行测试
 * @param void
 * @return void
 */
test_ws.prototype.run = thunkify(function(callback) {
    let self = this;
    hprose.co(function*() {
        logger.info("test_client 开始");
        let ws = yield _connect_game();
        ws.on('message', function(data) {
            console.log(data);
        });
        let msgLogin = new packet_type.CS_UserLogin();
        msgLogin.code = "123";
        self.send(ws, msgLogin);
        logger.info("test_client 完毕");
    }).catch(function(err) {
        logger.info("test_client 失败");
        logger.error(err);
        callback(err, null);
    });
});

test_ws.prototype.send = function(ws, packet) {
    let jsonstr = JSON.stringify(packet);
    let jsonsize = Buffer.byteLength(jsonstr, 'utf8');
    let buffer = new Buffer(jsonsize + 2);
    buffer.writeUInt16BE(jsonsize, 0);
    buffer.write(jsonstr, 2);
    ws.send(buffer);
};

module.exports = new test_ws();