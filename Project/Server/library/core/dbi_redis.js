"use strict";
const dbi_redis_client = require('./dbi_redis_client');

/**
 * 构造函数.
 * 用于操作dbi_redis的对象类，支持分布式集群配置。
 * @param {object} server
 * @return void
 */
const dbi_redis = function(server) {
    this._dbArr = [];
    this._server = server;
};

/**
 * 创建一个dbi_redis连接对象
 * @param {int} port dbi_redis数据库的端口
 * @param {string} host dbi_redis数据库的IP
 * @param {string} pwd dbi_redis数据库的密码
 * @returns {object} dbi_redis连接对象
 */
dbi_redis.prototype.createDB = function(params, callback) {
    let client = dbi_redis_client(this._server, params);
    this._dbArr[this._dbArr.length] = client;
    client.connect(params, callback);
};

/**
 * 根据分布式ID获取对应的dbi_redis连接对象
 * @param {int} id 分布式ID
 * @returns {object} dbi_redis连接对象
 */
dbi_redis.prototype.getDB = function(id) {
    id = parseInt(id, 10) || 0;
    let dbArrIndex = id % this._dbArr.length;
    return this._dbArr[dbArrIndex];
};

/**
 * 拼接dbi_redis使用的 KEY 值
 * @param {string} arguments 变长参数，拼接需要的字符串KEY
 * @returns {string} 拼接完成的KEY
 */
dbi_redis.prototype.joinKey = function() {
    return Array.prototype.slice.call(arguments).join(':');
};

/**
 * 拼接dbi_redis使用的 Lock KEY 值
 * @param {string} key 拼接需要的字符串KEY，一般为需要加锁的KEY值
 * @returns {string} 拼接完成的KEY
 */
dbi_redis.prototype.joinLockKey = function(key) {
    return this.joinKey(key, 'lock');
};

module.exports = dbi_redis;