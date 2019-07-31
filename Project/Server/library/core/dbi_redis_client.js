"use strict";
const crypt = autoload('core/crypt');
const driver = require('redis');
const data_object = autoload('define/data_object');
const util = require('util');

/**
 * redis客户端构造函数.
 * 封装了redisclient裸操作，加入关系数据库类似表操作。
 * 注意：需要mysql同步的数据请务必使用OSET设置
 * 加入完整数据请使用data中定义表
 * 否则请直接使用{key1:value1}方式
 * @param {object} server dbi_server
 * @return void
 */
const dbi_redis_client = function(server) {
    this._errorCount = 0;
    this._server = server;
};

/**
 * 创建一个Redis连接对象
 * @param {object} params 连接参数
 * @param {object} callback 回调
 * @return void
 */
dbi_redis_client.prototype.connect = function(params, callback) {
    let self = this;
    self.auth(params.password);
    self.on('ready', function() {
        self._errorCount = 1;
        self.removeAllListeners('ready');
        self.select(params.dbindex);
        callback(null);
    });

    // 拦截redis错误，防止错误抛出到上层。
    self.on('error', function(err) {
        if (++self._errorCount === 1) {
            self.removeAllListeners('ready');
            callback(err);
        }
    });
};

/**
 * 根据表建立redis逆向索引
 * @param {object} dobj 数据中心对象
 * @param {string} tname 表名
 * @param {string} row 数据项
 * @return void
 */
dbi_redis_client.prototype.uindex = function(dobj, tname, row, callback) {
    // 检查参数
    if (isempty(dobj) || isempty(dobj.REDIS_UINDEX)) {
        callback(null);
        return;
    }

    // 检查表反向索引
    let uindex = dobj.REDIS_UINDEX[tname];
    if (isempty(row) || isempty(uindex) || !Array.isArray(uindex)) {
        callback(null);
        return;
    }

    // 检查数据
    for (let id in uindex) {
        if (!row.hasOwnProperty(uindex[id])) {
            callback(Error('Not exist uindex row data' + tname));
            return;
        }
    }

    // 检查主键
    let primary = tname.substr(2, 3) + '_id';
    if (!row.hasOwnProperty(primary)) {
        callback(Error('Not exist primary key in ' + tname));
        return;
    }

    // 产生反向索引
    let token = crypt.uindex.rowkey(row, uindex, primary);
    let key = this.joinKey(tname, token);
    this.SET(key, row[primary], callback);
};
dbi_redis_client.prototype.UINDEX = dbi_redis_client.prototype.uindex;

/**
 * 根据表建立redis逆向索引有序集合
 * @param {object} dobj 数据中心对象
 * @param {string} tname 表名
 * @param {string} row 数据项
 * @param {int} scope 范围
 * @return void
 */
dbi_redis_client.prototype.uzset = function(dobj, tname, row, scope, callback) {
    // 检查参数
    if (isempty(dobj) || isempty(dobj.REDIS_USETS)) {
        callback(null);
        return;
    }

    // 检查表反向索引
    let uindex = dobj.REDIS_USETS[tname];
    if (isempty(uindex)) {
        callback(null);
        return;
    }

    // 检查数据
    if (isempty(row) || isempty(row[uindex])) {
        callback(Error('Not exist uindex row data' + tname));
        return;
    }

    // 产生反向索引
    let score = parseInt(row[uindex], 10) || 0;
    let key = this.joinKey(tname, scope || 'all');
    this.ZADD(key, score, JSON.stringify(row), callback);
};
dbi_redis_client.prototype.UZSET = dbi_redis_client.prototype.uzset;

/**
 * 根据表建立redis逆向索引有序集合
 * @param {object} dobj 数据中心对象
 * @param {string} tname 表名
 * @param {int} scope 范围
 * @return void
 */
dbi_redis_client.prototype.udel = function(dobj, tname, scope, callback) {
    // 检查参数
    if (isempty(dobj) || isempty(dobj.REDIS_USETS) || isempty(dobj.REDIS_USETS[tname])) {
        callback(null);
        return;
    }

    // 产生反向索引
    let key = this.joinKey(tname, scope || 'all');
    this.DEL(key, callback);
};
dbi_redis_client.prototype.UDEL = dbi_redis_client.prototype.udel;

/**
 * 拼接Redis使用的 KEY 值
 * @param {string} arguments 变长参数，拼接需要的字符串KEY
 * @returns {string} 拼接完成的KEY
 */
dbi_redis_client.prototype.joinKey = function() {
    return Array.prototype.slice.call(arguments).join(':');
};

/**
 * 拼接Redis使用的 Lock KEY 值
 * @param {string} key 拼接需要的字符串KEY，一般为需要加锁的KEY值
 * @returns {string} 拼接完成的KEY
 */
dbi_redis_client.prototype.joinLockKey = function(key) {
    return this.joinKey(key, 'lock');
};

/**
 * 获取rawclient
 * @param void
 * @returns {object} redisclient
 */
dbi_redis_client.prototype.rawclient = function() {
    return this._client;
};

/**
 * Raw call interface
 * @param void
 * @return void
 */
dbi_redis_client.prototype.rawcall = function() {
    let args = [].slice.call(arguments, 1);
    this._client[arguments[0]].apply(this._client, args);
};

/**
 * 自增(只针对全局变量)
 * @param {string} key  角色
 * @param {object} callback 回调
 * @returns void
 */
dbi_redis_client.prototype.oincr = function(key, callback) {
    let self = this;
    self.HINCRBY(key, 'var_value', 1, function(err, result) {
        if (err !== null) {
            callback(err, result);
            return;
        }

        if (util.isNullOrUndefined(self._server)) {
            callback(err, result);
            return;
        }

        // 数据服同步队列
        let params = key.split(':');
        if (data_object.hasOwnProperty(params[0])) {
            let row = { 'var_id': params[1], 'var_value': result };
            self._server.addSync(key, 'replace', row);
        }
        callback(err, result);
    });
};
dbi_redis_client.prototype.OINCR = dbi_redis_client.prototype.oincr;

/**
 * 设置对象
 * @param {string} key  角色
 * @param {object} obj 数据对象
 * @returns void
 */
dbi_redis_client.prototype.oset = function(key, obj, callback) {
    let self = this;
    self.hmset(key, obj, function(err, result) {
        if (err !== null) {
            callback(err, result);
            return;
        }
        if (util.isNullOrUndefined(self._server)) {
            callback(err, result);
            return;
        }

        // 中心数据服同步队列
        let tname = key.split(':')[0];
        if (data_object.hasOwnProperty(tname)) {
            let type = (obj instanceof data_object[tname]) ? 'replace' : 'update';
            self._server.addSync(key, type, obj);
        }
        callback(err, result);
    });
};
dbi_redis_client.prototype.OSET = dbi_redis_client.prototype.oset;

/**
 * 获取对象指定属性值
 * @param {string} key  角色
 * @param {array} fields  属性数组
 * @param {object} callback 回调
 * @return void
 */
dbi_redis_client.prototype.oget = function(key, fields, callback) {
    this.hmget(key, fields, callback || function(err) {});
};
dbi_redis_client.prototype.OGET = dbi_redis_client.prototype.oget;

/**
 * 获取对象所有属性值
 * @param {string} key  角色
 * @param {object} callback 回调
 * @return void
 */
dbi_redis_client.prototype.ogetall = function(key, callback) {
    this.hgetall(key, callback);
};
dbi_redis_client.prototype.OGETALL = dbi_redis_client.prototype.ogetall;

/**
 * 删除对象指定属性值
 * @param {string} key  主键
 * @param {array} fields  属性数组
 * @param {object} callback 回调
 * @return void
 */
dbi_redis_client.prototype.odel = function(key, fields, callback) {
    let args = [].concat(key, fields, callback);
    this.hdel.apply(this._client, args);
};
dbi_redis_client.prototype.ODEL = dbi_redis_client.prototype.odel;

/**
 * 删除整个对象
 * @param {string} key  主键
 * @param {object} callback 回调
 * @return void
 */
dbi_redis_client.prototype.odelall = function(key, callback) {
    let self = this;
    self.del(key, function(err, result) {
        if (err !== null) {
            callback(err, result);
            return;
        }
        if (util.isNullOrUndefined(self._server)) {
            callback(err, result);
            return;
        }

        // 判定大区服务器
        let tname = key.split(':')[0];
        if (data_object.hasOwnProperty(tname)) {
            self._server.addSync(key, 'delete', null);
        }
        callback(err, result);
    });
};
dbi_redis_client.prototype.ODELALL = dbi_redis_client.prototype.odelall;

/**
 * redis代理
 * @param {object} params 
 * @return {object}
 */
module.exports = function create(server, params) {
    let clientObj = new dbi_redis_client(server);
    let driverObj = driver.createClient(params.port, params.host);
    for (let prop in dbi_redis_client.prototype) {
        if (!driverObj.__proto__[prop]) {
            driverObj.__proto__[prop] = dbi_redis_client.prototype[prop];
        }
    }
    for (let prop in clientObj) {
        if (!driverObj[prop] && clientObj.hasOwnProperty(prop)) {
            driverObj[prop] = clientObj[prop];
        }
    }
    return driverObj;
};