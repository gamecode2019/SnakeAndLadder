"use strict"
const helper = autoload('core/helper');
const shop_type = require('../define/shop_type');
const player_type = require('../define/player_type');
const csvManager = autoload('manager/csv_manager').Instance();
const util = require('util');
const logger = autoload('core/logger').getLogger('checks_game');
const error_type = autoload('define/error_type');

let _initTable = false;
let _shopInfo = {};

let shop_helper = extend(helper, function(host) {
    helper.apply(this, arguments);
    this.buyInfo = {};
    this._dirty = false;
});

/**
 * 第一次初始化
 */
shop_helper.prototype.firstInit = function() {
    let self = this;
    self._dirty = true;

};

/**
 * 初始化助手
 */
shop_helper.prototype.init = function() {
    if (!_initTable) {
        _initTable = true;
        shop_helper.initTable();
    }
};

/**
 * 初始化商店表
 */
shop_helper.initTable = function() {
    for (let index = shop_type.SHOP_TYPE_GOLD; index <= shop_type.SHOP_TYPE_HERO; ++index) {
        _shopInfo[index] = {};
        if (index == shop_type.SHOP_TYPE_GOLD) {
            _shopInfo[index] = csvManager.goldshop();
        } else if (index == shop_type.SHOP_TYPE_DIAMOND) {
            _shopInfo[index] = csvManager.recharge();
        } else {
            _shopInfo[index] = csvManager.heroshop();
        }
    }
};

/**
 * 助手更新
 * @param {long} time 当前时间戳 
 */
shop_helper.prototype.update = function(time) {
    if (time % 4 != 0) {
        return;
    }

    if (this._dirty) {
        this.save();
    }
};

/**
 * 助手存档
 * @param {function} callback 回调函数
 */
shop_helper.prototype.save = function(callback) {
    let self = this;
    callback = callback || function(err, result) {};
    if (!self._dirty) {
        callback(null, null);
        return;
    }

    //执行存档
    self._dirty = false;
    // hprose.co(function*() {
    //     let dbequip = new data.t_equip();
    //     dbequip.equ_id = self.host().getID();
    //     dbequip.equ_info = self._equipUnlockLevel;
    //     dbequip.equ_buyInfo = self._equipBuyInfo;
    //     yield data_manager.cocall('db_equip.saveEquipData', dbequip.equ_id, dbequip);
    callback(null, null);
    // }).catch(function(err) {
    //     logger.error('[equip_helper.save] error: ' + err);
    //     callback(err, null);
    // });
};

/**
 * 助手读档
 * @param {function} callback 回调函数
 */
shop_helper.prototype.load = function(callback) {
    let self = this;
    callback = callback || function() {};
    // hprose.co(function*() {
    //     let equipData = yield data_manager.cocall('db_equip.getEquipData', self.host().getID());
    //     self._equipUnlockLevel = equipData.equ_info;
    //     self._equipBuyInfo = equipData.equ_buyInfo;
    callback(null, null);
    // }).catch(function(err) {
    //     logger.error('[equip_helper.load] error: ' + err);
    //     callback(err, null);
    // });
};

/**
 * 玩家购买商品
 * @param {int} shopType 商店类型
 * @param {int} index 商品序列
 */
shop_helper.prototype.buyItem = function(shopType, index) {
    let self = this;
    if (util.isNullOrUndefined(_shopInfo[shopType])) {
        logger.error('[shop_helper.buyItem]err!!! not exist shopType!! shopType is: ' + shopType);
        return mutiret(error_type.SHOP_TYPE_ERR, null);
    }

    if (util.isNullOrUndefined(_shopInfo[shopType][index])) {
        logger.error('[shop_helper.buyItem]err!!! not exist index!! index is: ' + index);
        return mutiret(error_type.SHOP_INDEX_ERR, null);;
    }

    if (shopType == shop_type.SHOP_TYPE_GOLD ||
        shopType == shop_type.SHOP_TYPE_HERO) {
        let cost = _shopInfo[shopType][index].COST;
        //先扣除玩家的钻石
        let res = self.host().costCurrencyItem(player_type.CURRENCY_TYPE_DIAMOND, cost);
        if (res.hasError()) {
            return mutiret(res.getError(), null);
        }

        //给玩家对应物品
        if (shopType == shop_type.SHOP_TYPE_GOLD) {
            let gold = _shopInfo[shopType][index].GOLD;
            let res = self.host().addCurrencyItem(player_type.CURRENCY_TYPE_COIN, gold);
            if (res.hasError()) {
                return mutiret(res.getError(), null);
            }
        } else {
            //给玩家增加英雄
            let heroID = _shopInfo[shopType][index].ID;
            let res = self.host().getHeroHelper().addHero(heroID);
            if (res.hasError()) {
                return mutiret(res.getError(), null);
            }
        }

    } else {
        //扣RMB，增加钻石
    }

    return mutiret(null, error_type.COMMON_SUCCESS);
};

module.exports = shop_helper;