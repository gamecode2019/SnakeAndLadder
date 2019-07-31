"use strict";
const logger = autoload('core/logger').getLogger('test');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const driver = autoload('core/dbi_mysql');
const config = require("../../config/server.json");
const csvReader = autoload('core/csvreader');
const common_type = require("../node_game/define/common_type");
const player_manager = require('../node_game/manager/player_manager');
const tcp_autoclient = autoload('core/tcp_autoclient');

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

/**
 * 读表
 * @param void
 * @return void
 */
const _read_csv = thunkify(function(callback) {
    if (readTable) {
        callback(null);
    }
    readTable = true;
    csvReader.csvReader(console, './resources/config', callback);
});


/**
 * 执行测试
 * @param void
 * @return void
 */
test_player.prototype.run = thunkify(function(callback) {
    hprose.co(function*() {
        logger.info("test_player 开始");
        yield _read_csv();
        let player = player_manager.instance().createPlayer(1, 1, '');
        player.firstInit();
        logger.info("test_player 完毕");
        callback(null, null);
    }).catch(function(err) {
        logger.info("test_player 失败");
        logger.error(err);
        callback(err, null);
    });
});

module.exports = new test_player();