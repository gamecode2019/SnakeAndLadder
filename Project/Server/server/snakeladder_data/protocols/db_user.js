"use strict";
const crypt = autoload('core/crypt');
const error_type = autoload('define/error_type');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const data_object = autoload('define/data_object');
const time_util = autoload('core/time_util');

/**
 * 检查帐号token
 * @param {object} redis  
 * @param {string} token  
 * @param {Function} callback 
 */
const _isexist_token = thunkify(function(redis, token, callback) {
    let key = redis.joinKey(data_object.t_user_name, token);
    redis.GET(key, function(err, uid) {
        callback(err, uid ? parseInt(uid) : 0);
    });
});

/**
 * 绑定注册ID
 * @param {object} redis 
 * @param {object} account 
 * @param {Function} callback 
 */
const _bind_regopenid = thunkify(function(redis, user, callback) {
    redis.uindex(data_object, data_object.t_user_name, user, callback);
});

/**
 * 是否已存在UID
 */
const _isexist_uid = thunkify(function(redis, openid, callback) {
    openid = crypt.md5.get_md5_hash(openid);
    let key = redis.joinKey(data_object.t_user_name, openid);
    redis.GET(key, function(err, uid) {
        callback(err, uid ? parseInt(uid) : 0);
    });
});

/**
 * 获取注册人数Index
 * @param {object} redis  
 * @param {Function} callback 
 */
const _get_registernum = thunkify(function(redis, callback) {
    let key = redis.joinKey(data_object.t_variable_name, data_object.var_uservar[0]);
    redis.OINCR(key, callback);
});

/**
 * 绑定token
 * @param {object} redis  
 * @param {string} token  
 * @param {int} uid  
 * @param {int} expire  
 * @param {Function} callback 
 */
const _bind_token = thunkify(function(redis, token, uid, expire, callback) {
    let key = redis.joinKey(data_object.t_user_name, token);
    redis.SET(key, uid, function(err, res) {
        if (isempty(err)) {
            redis.EXPIRE(key, expire, callback);
        } else {
            callback(err, null);
        }

    });
});

/**
 * 加入user
 * @param {object} redis  
 * @param {string} token  
 * @param {int} uid  
 * @param {int} expire  
 * @param {Function} callback 
 */
const _save_user = thunkify(function(redis, user, callback) {
    let key = redis.joinKey(data_object.t_user_name, user.use_id);
    redis.OSET(key, user, function(err, id) {
        if (err) {
            callback({ err: error_type.COMMON_ERR, result: null });
            return;
        }
        callback({ err: null, result: null });
    });
});

/**
 * 构造函数
 * @param void
 * @return void 
 */
const db_user = function(server) {
    this._server = server;
};

/**
 * 用户登录处理
 * @param {object} reqData 数据请求结构 
 * @param {function} callback 回调函数
 */
db_user.prototype.login = function(reqData, callback) {
    let client = this._server.redis(0);
    if (isempty(reqData) || isempty(reqData.openid)) {
        callback({ err: error_type.COMMON_LOGIN_ERR });
    }

    hprose.co(function*() {
        // 查找有没有绑定UID，如果没有，生成UID,标记新玩家
        let uid = yield _isexist_uid(client, reqData.openid);
        let isNewPlayer = 0;
        if (isempty(uid)) {
            isNewPlayer = 1;
            uid = data_object.var_uservar[1] + (yield _get_registernum(client));
            let user = new data_object.t_user();
            user.use_id = uid;
            user.use_openid = reqData.openid;
            user.use_userName = 'ali' + uid;
            yield _bind_regopenid(client, user);
            yield _save_user(client, user); // 写入用户数据
        }

        // 解析出token,写入
        let token = crypt.md5.get_md5_hash(reqData.session_key);
        let time = reqData.expires_in || 7200;
        yield _bind_token(client, token, uid, time);
        callback({ err: null, result: { uid, token, isNewPlayer } });
    }).catch(function(err) {
        callback({ err: err, result: null });
    });
};

/**
 * 验证快速登录
 * @param {string} token 登录令牌
 * @param {Function} callback 回调函数
 */
db_user.prototype.quick_login = function(token, callback) {
    let client = this._server.redis(0);
    if (!token) {
        callback({ err: error_type.COMMON_LOGIN_ERR, result: null });
        return;
    }

    hprose.co(function*() {
        // 判定是否存在令牌
        let uid = (yield _isexist_token(client, token));
        if (isempty(uid)) {
            callback({ err: error_type.COMMON_LOGIN_EXPIRED, result: null });
            return;
        }

        // 返回用户数据
        callback({ err: null, result: uid });
    }).catch(function(err) {
        callback({ err: err, result: null });
    });
};

/**
 * 统一导入协议
 * @param {object} server 数据代理服务器
 * @param {object} callback 回调
 * @return void
 */
let importProtocol = function(server, callback) {
    callback(new db_user(server));
};
exports.importProtocol = importProtocol;