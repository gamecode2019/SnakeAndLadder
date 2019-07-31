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
let fs_manager = function() {
    this._client = null;
    this._logger = null;
    this._protocols = null;
};

/**
 * 实例化操作。
 * @param void 
 * @return void
 */
fs_manager.instance = function() {
    if (_instance === null) {
        _instance = new fs_manager();
    }
    return _instance;
};

/**
 * 连接remote文件中心
 * @param {object} params 连接参数
 * @return void
 */
fs_manager.prototype.connect = function(params, callback) {
    this._logger = params.logger || console;
    this._protocols = params.protocols;
    callback(null);
};

/**
 * 调用RPC接口
 * @param void
 * @returns void
 */
fs_manager.prototype.call = function() {
    this._client.call.apply(this._client, arguments);
};

/**
 * 调用RPC接口(协程版)
 * @param void
 * @returns void
 */
fs_manager.prototype.cocall = thunkify(function() {
    this._client.call.apply(this._client, arguments);
});

/**
 * 获取文件中心客户端
 * @param void
 * @returns {object} 文件中心客户端
 */
fs_manager.prototype.client = function() {
    return this._client;
};

module.exports = fs_manager;