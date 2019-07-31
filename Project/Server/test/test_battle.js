"use strict";
const logger = autoload('core/logger').getLogger('test');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const driver = autoload('core/dbi_mysql');
const config = require("../../config/server.json");
const player_manager = require('../snakeladder_game/manager/player_manager').instance();
const battle_type = require("../snakeladder_game/define/battle_type");

/**
 * 构造函数
 * @param void
 * @return void
 */
let test_battle = function() {
    this._mysql = new driver();
    this._mysql.connect(config.mysql);
};


let _save = thunkify(function(obj, cb) {
    obj.save(cb);
});

let _load = thunkify(function(obj, cb) {
    obj.load(cb);
});

/**
 * 执行测试
 * @param void
 * @return void
 */
test_battle.prototype.run = thunkify(function(callback) {
    hprose.co(function*() {
        const heroTempId = 1;
        let player = player_manager.createNewPlayer(1, 1, "Big Cock", heroTempId, 1, "web");
        player.getUserData().lvl += 99;
        //player.getUserData().gold += 9999;
        //player.addDiamond(9999, 501);
        yield _save(player);
        let playerData = yield _load(player);
        const battleType = battle_type.BattleTypeHell;
        const copyId = 2001;
        let battleHelper = player.getBattleHelper();
        battleHelper.buyCopyCount(battleType, copyId);
        battleHelper.start(copyId, 0);
        battleHelper.end(copyId, true);
        battleHelper.updateWinningStreak(copyId);
        battleHelper.setRead(copyId);
        logger.info("test_battle 测试通过");
        callback(null, null);
    }).catch(function(err) {
        logger.error(err);
        callback(err, null);
    });
});

module.exports = new test_battle();