"use strict";
const logger = autoload('core/logger').getLogger('test');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const driver = autoload('core/dbi_mysql');
const config = require("../../config/server.json");
const player_manager = require('../snakeladder_game/manager/player_manager').instance();
const common_manager = require('../snakeladder_game/manager/common_manager').instance();
const data_object = autoload("define/data_object");
const common_type = autoload("define/common_type");
const data_manager = autoload('manager/data_manager').instance();

/**
 * 构造函数
 * @param void
 * @return void
 */
let test_skill = function() {
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
test_skill.prototype.run = thunkify(function(callback) {
    hprose.co(function*() {
        const heroTempId = 1;
        let lootItem = {
            startTime: new Date(),
            endTime: new Date().add({ hours: 2 }),
            lootTypeArr: []
        };
        yield data_manager.cocall("db_system.saveConfig", common_type.SYSTEM_LOOT, lootItem);
        common_manager.calHighCopyId(1);
        yield _save(common_manager);
        yield _load(common_manager);
        let player = player_manager.createNewPlayer(1, 1, "Big Cock", heroTempId, 1, "web");
        player.getUserData().lvl += 10;
        //player.getUserData().gold += 9999;
        //player.addDiamond(9999, 501);
        yield _save(player);
        let playerData = yield _load(player);
        let heroHelper = player.getHeroHelper();
        heroHelper.upSkill(heroTempId, 0);
        player.getUserData().skillCd += 999;
        player.getUserData().lastSkillTime = new Date();
        heroHelper.clearSkillCd();
        yield _save(heroHelper);
        let temMap = yield _load(heroHelper);
        logger.info("test_skill 测试通过");
        callback(null, null);
    }).catch(function(err) {
        logger.error(err);
        callback(err, null);
    });
});

module.exports = new test_skill();