"use strict";
const logger = autoload('core/logger').getLogger('test');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const driver = autoload('core/dbi_mysql');
const config = require("../../config/server.json");
const csvReader = autoload('core/csvreader');
const common_type = require("../node_game/define/common_type");
const player_manager = require('../node_game/manager/player_manager');

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
 * 读表
 * @param void
 * @return void
 */
const _upgrade_lord = function(player, type) {
    let upgradeData = player.upgradeLord(type);
    if (upgradeData.hasError()) {
        logger.error("_upgrade_lord 测试失败");
    } else {
        logger.info("_upgrade_lord 测试成功");
    }
};

/**
 * 执行测试
 * @param void
 * @return void
 */
test_player.prototype.run = thunkify(function(callback) {
    hprose.co(function*() {
        logger.info("test_player 测试通过");
        yield _read_csv();
        let player = player_manager.instance().createOldPlayer(1, 1, '');
        player.firstInit();
        _upgrade_lord(player, common_type.LAR_DIMENSION_UP);
        callback(null, null);
    }).catch(function(err) {
        logger.error(err);
        callback(err, null);
    });
});

module.exports = new test_player();