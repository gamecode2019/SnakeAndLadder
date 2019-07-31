"use strict";
const hprose = require("hprose");
const thunkify = hprose.thunkify;
const dbi_client = autoload('core/dbi_client');
let _instance = null;

/**
 * 构造函数.
 * @param void
 * @return void
 */
let data_manager = function() {
    this._client = null;
    this._logger = null;
    this._protocols = null;
};

/**
 * 实例化操作。
 * @param void
 * @return void
 */
data_manager.instance = function() {
    if (_instance === null) {
        _instance = new data_manager();
    }
    return _instance;
};

/**
 * 连接remote数据中心
 * @param {object} params 连接参数
 * @return void
 */
data_manager.prototype.connect = function(params, callback) {
    this._logger = params.logger || console;
    this._protocols = params.protocols;
    this._client = new dbi_client(params);
    this._client.connect(function(err) { callback(err); });
};

/**
 * 调用RPC接口
 * @param void
 * @returns void
 */
data_manager.prototype.call = function() {
    this._client.call.apply(this._client, arguments);
};

/**
 * 调用RPC接口(协程版)
 * @param void
 * @returns void
 */
data_manager.prototype.cocall = thunkify(function() {
    this._client.call.apply(this._client, arguments);
});

/**
 * 获取数据中心客户端端
 * @param void
 * @returns {object} 数据中心客户端端
 */
data_manager.prototype.client = function() {
    return this._client;
};

/**
 * 订阅数据
 * @param {string} name 数据名称
 * @param {object} inst 对象
 * @param {object} func 函数
 * @returns void
 */
data_manager.prototype.subscribe = function(name, inst, func) {
    this._client.subscribe(name, inst, func);
};

/**
 * 取消订阅数据
 * @param {string} name 数据名称
 * @returns void
 */
data_manager.prototype.unsubscribe = function(name) {
    this._client.unsubscribe(name);
};

module.exports = data_manager;