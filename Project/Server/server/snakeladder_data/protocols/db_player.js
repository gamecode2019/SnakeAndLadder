"use strict";
const crypt = autoload('core/crypt');
const error_type = autoload('define/error_type');
const hprose = require('hprose');
const data_object = autoload('define/data_object');

/**
 * 构造函数
 * @param void
 * @return void 
 */
const db_player = function(server) {
    this._server = server;
};

/**
 * 保存玩家数据
 * @param {int} roleid 玩家id
 * @param {object} callback 回调
 * @returns void
 */
db_player.prototype.savePlayerData = function(roleid, data, callback) {
    let redis = this._server.redis(0);
    if (isempty(roleid) || isempty(data)) {
        callback({ err: error_type.COMMON_ERR, result: null });
        return;
    }

    // 保存玩家数据
    var key = redis.joinKey(data_object.t_player_name, roleid);
    data.__proto__ = data_object.t_player.prototype; // 新增数据
    redis.OSET(key, data, function(err, id) {
        if (err) {
            callback({ err: error_type.COMMON_ERR, result: null });
            return;
        }
        callback({ err: null, result: null });
    });
};

/**
 * 获取玩家数据
 * @param {int} roleid 玩家id
 * @param {object} callback 回调
 * @returns void
 */
db_player.prototype.getPlayerData = function(roleid, callback) {
    var redis = this._server.redis(0);
    if (isempty(roleid)) {
        callback({ err: error_type.COMMON_ERR, result: null });
        return;
    }

    // 获取玩家数据
    var key = redis.joinKey(data_object.t_player_name, roleid);
    redis.OGETALL(key, function(err, data) {
        if (err) {
            callback({ err: error_type.COMMON_ERR, result: null });
            return;
        }
        if (!data) {
            callback({ err: error_type.ROLE_NOT_EXIST, result: null });
            return;
        }
        try {
            callback({ err: null, result: data });
        } catch (e) {
            callback({ err: error_type.ROLE_LOAD_ERR, result: null });
        }
    });
};

/**
 * 统一导入协议
 * @param {object} server 数据代理服务器
 * @param {object} callback 回调
 * @return void
 */
let importProtocol = function(server, callback) {
    callback(new db_player(server));
};
exports.importProtocol = importProtocol;