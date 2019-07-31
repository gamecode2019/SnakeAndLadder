"use strict";
const util = require('util');
const packet_type = autoload('define/packet_type');
const sceneobj = autoload('core/sceneobj');
const player_type = require('../define/player_type');
const logger = autoload('core/logger').getLogger('checks_game');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const data_object = autoload("define/data_object");
const data_manager = autoload("manager/data_manager").instance();
const shop_helper = require('../helpers/shop_helper');


// 静态定义
let _initTable = false;

/**
 * 构造函数
 * @param {int} roleid 角色ID
 * @param {int} name   角色名
 * @return void
 */
const player = extend(sceneobj, function(roleid, name, avatarUrl, gender) {
    sceneobj.apply(this, arguments);
    this._playerData = new player_type.PlayerInfo();
    this._playerData.newPlayer = 0; // 新用户
    this._playerData.nickName = name; // 昵称
    this._playerData.gender = gender; // 性别
    this._playerData.avatarUrl = avatarUrl; //头像
    this._playerData.gold = 10000; // 金币
    this._playerData.diamond = 10000; //钻石
    this._playerData.myScans = [];  //我的皮肤
    this._playerData.selectScan = 0;    //当前选择皮肤
    this._playerData.myEmoticons = [];  //我拥有的表情包
    this._playerData.gameTotalCount = 0;    //参加游戏总场次
    this._playerData.getFirstCount = 0; //获取第一名场次
    this._playerData.myScansHasMap = 0;

    this._playerData.id = roleid;
    this._socketClient = null; // 套接字
    this._playerDirty = false; // 存档脏标记
    this._fightStatue = player_type.FIGHT_STATUS_FREE; // 战斗状态
    this._isRobot = false; // 是否机器人
    this._roomId = 0;
    this.registerHelper('shop_helper', new shop_helper(this));
});

/**
 * 初始化表数据
 * @param void
 * @return void
 */
player.initTable = function() {};

/**
 * 创建新角色时初始化数据
 * @param void
 * @return void
 */
player.prototype.firstInit = function() {
    sceneobj.prototype.firstInit.apply(this, arguments);
    this._playerDirty = true;
};

/**
 * 初始化角色
 * @param void
 * @return void
 */
player.prototype.init = function() {
    sceneobj.prototype.init.apply(this, arguments);

    // 初始化表
    if (!_initTable) {
        _initTable = true;
        player.initTable();
    }

    // 初始化状态
    this._playerDirty = false;
    this._fightStatue = player_type.FIGHT_STATUS_FREE;
};

/**
 * 获取所有数据完毕
 * @param void
 * @return void
 */
player.prototype.onCompleted = function(isFirstInit) {};

/**
 * 更新角色
 * @param time [int] 时间
 * @return void
 */
player.prototype.update = function(time) {
    sceneobj.prototype.update.apply(this, arguments);
    if (time % 3 === 0 && this._playerDirty) {
        this.save();
    }
};

/**
 * 角色基础存档
 * @param {object} callback 回调
 * @return void
 */
player.prototype.save = function(callback) {
    callback = callback || function() {};
    if (!this._playerDirty) {
        return callback(null);
    }

    // 执行存档
    this._playerDirty = false;
    let t_player = safeCopy(new data_object.t_player(), this._playerData, 'pla_');
    data_manager.call('db_player.savePlayerData', t_player.pla_id, t_player, callback);
};
player.prototype.coSave = thunkify(player.prototype.save);

/**
 * 角色大存档
 * @param {object} callback 回调
 * @return void
 */
player.prototype.saveAll = function(callback) {
    let self = this;
    callback = callback || function() {};
    hprose.co(function*() {
        yield self.coSave();
        yield self.coSaveHelper();
        callback(null, null);
    }).catch(function(err) {
        logger.error(err);
        callback(err, null);
    });
};

/**
 * 角色基础读档
 * @param {object} callback 回调
 * @return void
 */
player.prototype.load = function(callback) {
    let self = this;
    callback = callback || function() {};
    hprose.co(function*() {
        let playerData = yield data_manager.cocall('db_player.getPlayerData', self.id());
        if (playerData) {
            safeCopy(self._playerData, playerData, '', 'pla_');
        }
        callback(null, playerData);
    }).catch(function(err) {
        logger.error(err.message);
        callback(err, null);
    });
};
player.prototype.coLoad = thunkify(player.prototype.load);

/**
 * 角色大读档
 * @param {object} callback 回调
 * @return void
 */
player.prototype.loadAll = function(callback) {
    let self = this;
    callback = callback || function() {};
    hprose.co(function*() {
        yield self.coLoad();
        yield self.coLoadHelper();
        self.onCompleted();
        callback(null, self._playerData);
    }).catch(function(err) {
        logger.error(err.message);
        callback(err, null);
    });
};
player.prototype.coLoadAll = thunkify(player.prototype.loadAll);

/**
 * 获取基础数据
 * @param void
 * @return void
 */
player.prototype.getBaseData = function() {
    return this._playerData;
};

/**
 * 设置玩家登录时间
 * @param {long} time 当前时间戳
 */
player.prototype.setLoginTime = function(time) {
    this._playerData.loginTime = time;
    this._playerDirty = true;
};

/**
 * 获取玩家金币数量
 */
player.prototype.getPlayerCoin = function() {
    return this._playerData.gold;
}

/**
 * 获取玩家钻石数量
 */
player.prototype.getPlayerDiamond = function() {
    return this._playerData.diamond;
};

/**
 * 消耗货币
 * @param type [int] 货币类型
 * @param num [int] 消耗数量
 * @param send [boolean] 是否发送消息到客户端
 */
player.prototype.costCurrencyItem = function(type, num) {
    let self = this;
    if (type != player_type.CURRENCY_TYPE_COIN &&
        type != player_type.CURRENCY_TYPE_DIAMOND) {
        logger.error('[player.costCurrentItem] invalid item type' + type);
        return mutiret(error_type.CURRENCY_TYPE_ERR, null);
    }

    if (num <= 0) {
        logger.error('[player.costCurrentItem] invalid item num' + num);
        return mutiret(error_type.CURRENCY_COUNT_ERR, null);
    }

    let currency = 0;
    if (type == player_type.CURRENCY_TYPE_COIN) {
        currency = self._playerData.gold;
    } else {
        currency = self._playerData.diamond;
    }

    if (currency < num) {
        return mutiret(error_type.CURRENCY_COUNT_ERR, null);
    }

    if (type == player_type.CURRENCY_TYPE_COIN) {
        self._playerData.gold -= num;
    } else {
        self._playerData.diamond -= num;
    }
    self._playerDirty = true;
    return mutiret(null, error_type.COMMON_SUCCESS);
}

/**
 * 增加货币
 * @param type [int] 货币类型
 * @param num [int] 消耗数量
 * @param send [boolean] 是否发送消息到客户端
 */
player.prototype.addCurrencyItem = function(type, num) {
    let self = this;
    if (type != player_type.CURRENCY_TYPE_COIN &&
        type != player_type.CURRENCY_TYPE_DIAMOND) {
        logger.error('[player.costCurrentItem] invalid item type' + type);
        return mutiret(error_type.CURRENCY_TYPE_ERR, null);
    }

    if (num <= 0) {
        logger.error('[player.costCurrentItem] invalid item num' + num);
        return mutiret(error_type.CURRENCY_COUNT_ERR, null);
    }

    if (type == player_type.CURRENCY_TYPE_COIN) {
        self._playerData.gold += num;
    } else {
        self._playerData.diamond += num;
    }
    self._playerDirty = true;
    return mutiret(null, error_type.COMMON_SUCCESS);
}

/**
 * 设置个人信息
 * @param individualInfo [object] 个人信息
 * @param pic [string] 头像
 */
player.prototype.setIndividualInfo = function(individualInfo) {
    if (individualInfo.nickName && individualInfo.nickName !== this._playerData.userName) {
        this._playerData.nickName = individualInfo.nickName;
        this._playerDirty = true;
    }
    if (individualInfo.avatarUrl && individualInfo.avatarUrl !== this._playerData.avatarUrl) {
        this._playerData.avatarUrl = individualInfo.avatarUrl;
        this._playerDirty = true;
    }

};

/**
 * 设置个人信息
 * @param individualInfo [object] 个人信息
 * @param pic [string] 头像
 */
player.prototype.setInfo = function(playerInfo) {
    safeCopy(this._playerData, playerInfo,'','');
    this._playerDirty = true;
};

/**
 * 设置新玩家的状态
 */
player.prototype.setNewplayerStatus = function(status) {
    if (status < player_type.STATUS_OLD_PLAYER || status > player_type.STATUS_NEW_PLAYER) {
        return;
    }
    this._playerData.newPlayer = status;
    this._playerDirty = true;
};

/**
 * 发消息
 */
player.prototype.sendMsg = function(jsonObj, completedCallback = null) {
    if (this._socketClient) {
        this._socketClient.sendResponse(jsonObj, completedCallback);
    }
};

/**
 * 匹配失败事件
 */
player.prototype.onMatchFail = function() {
    logger.warn('[player.onMatchFail]match fail');
    let message = new packet_type.SC_RomeLogin();
    message.roomid = 0; // 房间ID
    message.status = -1;
    this.sendMsg(message);
};

/**
 * 设置新玩家的对战状态
 * @param {number} status 对战状态
 */
player.prototype.setFightStatus = function(status) {
    this._fightStatue = status;
};

/**
 * 获取基础数据
 * @param void
 * @return void
 */
player.prototype.getFightStatus = function() {
    return this._fightStatue;
};

/**
 * 是否为机器人
 * @return {boolean}
 */
player.prototype.isRobot = function() {
    return this._isRobot;
};

/**
 * 设置房间
 */
 player.prototype.setRoomID = function(roomid) {
     if(roomid<=0){
         return;
     }
    this._roomId = roomid;
};

/**
 * 获取房间
 */
player.prototype.getRoomID = function() {
   return this._roomId;
};

/**
 * 获取商店助手
 */
player.prototype.getShopHelper = function() {
    return this.findHelper('shop_helper');
};

module.exports = player;