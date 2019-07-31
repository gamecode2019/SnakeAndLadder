"use strict";
const util = require('util');
const crypt = autoload('core/crypt');
const error_type = autoload('define/error_type');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const data_object = autoload('define/data_object');
const format = require("string-format");

/**
 * 构造函数
 * @param void
 * @return void 
 */
const db_variable = function(server) {
    this._server = server;
};

/**
 * 获取通知列表数据
 * @param {object} reqData 请求数据
 * @param {object} callback 回调
 * @returns void
 */
db_variable.prototype.getVariable = function(reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 构建select
        let mysql = self._server.mysql(0);
        let select = {};
        select.table = data_object.t_variable_name;
        select.from = reqData.from || '*';
        select.where = format('{0}={1}', 'sys_id', reqData.id);

        // 获取单条数据
        let retData = yield mysql.coFetchRow(select);
        callback({ err: null, result: retData });
    }).catch(function(err) {
        callback({ err: err, result: null });
    });
};

/**
 * 设置通知状态
 * @param {object} reqData 请求数据
 * @param {object} callback 回调
 * @returns void
 */
db_variable.prototype.setVariable = function(reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 构建select
        let mysql = self._server.mysql(0);
        let select = {};
        select.table = data_object.t_variable_name;
        select.data = { 'var_value': reqData.value };
        select.where = format('{0}={1}', 'var_id', reqData.id);

        // 更新单条数据
        let retData = yield mysql.coUpdate(select);
        if (retData.changedRows > 0) {
            callback({ err: null, result: retData });
        } else {
            callback({ err: null, result: null });
        }
    }).catch(function(err) {
        callback({ err: err, result: null });
    });
};

/**
 * 删除通知
 * @param {object} reqData 请求数据
 * @param {object} callback 回调
 * @returns void
 */
db_variable.prototype.delVariable = function(reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 构建select
        let mysql = self._server.mysql(0);
        let select = {};
        select.table = data_object.t_variable_name;
        select.where = format('{0} IN ({1})', 'var_id', reqData.select);

        // 删除单条数据
        let retData = yield mysql.coDelete(select);
        callback({ err: null, result: retData.affectedRows });
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
    callback(new db_variable(server));
};
exports.importProtocol = importProtocol;