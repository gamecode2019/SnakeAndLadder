"use strict";
const manager = autoload('core/manager');
const data_manager = autoload('manager/data_manager').instance();
const logger = autoload('core/logger').getLogger('checks_game');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const error_type = autoload('define/error_type');
const player_type = require('../define/player_type');
const config = require("../../../config/server.json");
const player_manager = require('../manager/player_manager').instance();
const time_util = autoload("core/time_util");
let _singleton = null;

/**
 * 构造函数
 * @param void
 * @return void
 */
const user_manager = extend(manager, function() {});

/**
 * 单例
 * @param void
 * @return void
 */
user_manager.instance = function() {
    if (_singleton === null) { _singleton = new user_manager(); }
    return _singleton;
};

/**
 * 初始化管理器
 * @param void
 * @return void
 */
user_manager.prototype.init = function() {};

/**
 * 登录处理
 * @param {object} reqData 用户请求对象
 * @return {int} 操作结果
 */
user_manager.prototype.login = thunkify(function(reqData, ip, callback) {
    let nowTime = (new Date()).toLocaleString();
    hprose.co(function*() {
        let authData = {};
        if (_DEBUG()) {
            logger.info("login_code:" + ip);
            authData.openid = ip;
            authData.session_key = ip;
            authData.gender = reqData.gender;
            authData.nickName = reqData.nickName;
            authData.avatarUrl = reqData.avatarUrl;
        } else {
            authData = reqData;
        }

        // 新玩家首次初始化并存档
        let userData = yield data_manager.cocall('db_user.login', authData);
        let player = null;
        if (userData.isNewPlayer) {
            player = player_manager.createPlayer(userData.uid, reqData.nickName, reqData.avatarUrl, reqData.gender);
            player.setNewplayerStatus(player_type.STATUS_NEW_PLAYER);
            player.firstInit();
            player.saveAll(); // 直接大存档
            return callback(null, { userData, player });
        }

        // 旧玩家拿内存数据，如果内存数据不存在，则装载档案
        player = player_manager.findPlayer(userData.uid);
        if (isempty(player)) {
            player = player_manager.createPlayer(userData.uid, reqData.nickName, reqData.avatarUrl, reqData.gender);
            yield player.coLoadAll();
            player.setNewplayerStatus(player_type.STATUS_OLD_PLAYER);
        }
        player.setLoginTime(nowTime);
        return callback(null, { userData, player });
    }).catch(function(err) {
        logger.error('[user_manager.login] error: ' + err.message);
        return callback(err, null);
    });
});

/**
 * 登录处理
 * @param {object} reqData 用户请求对象
 * @return {int} 操作结果
 */
user_manager.prototype.loginByAccount = thunkify(function(reqData, acc,pwd, callback) {
    let nowTime = (new Date()).toLocaleString();
    hprose.co(function*() {
        let authData = {};
        if (_DEBUG()) {
            logger.info("login_code:" ,acc);
            authData.openid = acc+pwd;
            authData.session_key = acc+pwd;
            authData.gender = reqData.gender;
            authData.nickName = reqData.nickName;
            authData.avatarUrl = reqData.avatarUrl;
        } else {
            authData = reqData;
        }

        // 新玩家首次初始化并存档
        let userData = yield data_manager.cocall('db_user.login', authData);
        let player = null;
        if (userData.isNewPlayer) {
            player = player_manager.createPlayer(userData.uid, reqData.nickName, reqData.avatarUrl, reqData.gender);
            player.setNewplayerStatus(player_type.STATUS_NEW_PLAYER);
            player.firstInit();
            player.saveAll(); // 直接大存档
            return callback(null, { userData, player });
        }

        // 旧玩家拿内存数据，如果内存数据不存在，则装载档案
        player = player_manager.findPlayer(userData.uid);
        if (isempty(player)) {
            player = player_manager.createPlayer(userData.uid, reqData.nickName, reqData.avatarUrl, reqData.gender);
            yield player.coLoadAll();
            player.setNewplayerStatus(player_type.STATUS_OLD_PLAYER);
        }
        player.setLoginTime(nowTime);
        return callback(null, { userData, player });
    }).catch(function(err) {
        logger.error('[user_manager.login] error: ' + err.message);
        return callback(err, null);
    });
});

/**
 * 检查用户会话，返回用户对象
 * @param {object} reqData 用户请求对象
 * @param {Function} callback 回调函数
 */
user_manager.prototype.checkSession = thunkify(function(reqData, callback) {
    let nowTime = time_util.getNowSec();
    hprose.co(function*() {
        // 判定是否存在令牌
        let uid = yield data_manager.cocall('db_user.quick_login', reqData.tk);
        if (isempty(uid)) {
            callback(Error(error_type.COMMON_LOGIN_EXPIRED), null);
            return;
        }

        // 检查玩家数据
        let playerobj = player_manager.findPlayer(uid);
        if (isempty(playerobj)) {
            callback(Error(error_type.COMMON_LOGIN_RELOAD_DATA), null);
            return;
        }
        callback(null, playerobj);
    }).catch(function(err) {
        callback(err, null);
    });
});

module.exports = user_manager;