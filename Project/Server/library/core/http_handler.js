"use strict";
const util = require('util');
const error_type = autoload('define/error_type');
const http_handler = {};
let _cachelist = [];

/**
 * 加入消息缓冲
 * @param {object} message 消息
 * @param {int} errcode 返回码
 * @returns void
 */
http_handler.addResponseCache = function(message, errcode) {
    message.ret = parseInt(errcode, 10) || error_type.COMMON_SUCCESS;
    _cachelist.push(message);
};

/**
 * 发送消息缓冲
 * @param {object} response 响应对象
 * @returns void
 */
http_handler.sendResponseCache = function(response) {
    // 无效处理
    if (!response || response.finished) {
        return;
    }

    // 发送消息队列
    response.json(_cachelist);
    _cachelist = [];
};

/**
 * 发送错误给客户端
 * @param {object} response 响应对象
 * @param {object} message 消息
 * @param {int} errcode 返回码
 * @return void
 */
http_handler.sendResponseError = function(response, message, errcode) {
    // 无效处理
    if (!response || response.finished) {
        return;
    }

    // 发送错误消息
    message.ret = parseInt(errcode, 10) || error_type.COMMON_ERR;
    _cachelist.push(message);
    response.json(_cachelist);
    _cachelist = [];
};

/**
 * 获取get请求数据
 * @param {object} request 客户端请求
 * @param {string} key 键
 * @param {mix} value 默认数据
 * @returns {mix} 客户端请求数据
 */
http_handler.getQuery = function(request, key, value) {
    if (!request.query) {
        return value;
    }
    if (util.isNumber(value)) {
        return parseInt(request.query[key], 10) || value;
    }
    return request.query[key] || value;
};

/**
 * 获取post请求数据
 * @param {object} request 客户端请求
 * @param {string} key 键
 * @param {mix} value 默认数据
 * @returns {mix} 客户端请求数据
 */
http_handler.getPost = function(request, key, value) {
    if (!request.body) {
        return value;
    }
    if (util.isNumber(value)) {
        return parseInt(request.body[key], 10) || value;
    }
    return request.body[key] || value;
};

/**
 * 获取所有请求数据
 * @param {object} request 客户端请求
 * @param {string} key 键
 * @param {mix} value 默认数据
 * @returns {mix} 客户端请求数据
 */
http_handler.getAll = function(request, key, value) {
    if (request.query) {
        return this.getQuery(request, key, value);
    }
    if (request.body) {
        return this.getPost(request, key, value);
    }
    return value;
};

/**
 * 获取array数据
 * @param {object} array 数组
 * @param {string} elem 获取键
 * @param {mix} value 默认键
 * @returns {mix} 数组数据
 */
http_handler.getArray = function(array, elem, value) {
    return array[elem] || array[value];
};

/**
 * 是否为电话号码
 * @param {string} elem 控件值
 * @returns {bool} 操作结果
 */
http_handler.isphone = function(elem) {
    return (/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/.test(elem));
};

/**
 * 是否为电子邮件地址
 * @param {string} elem 控件值
 * @returns {bool} 操作结果
 */
http_handler.isemail = function(elem) {
    return (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(elem));
};

/**
 * 是否为身份证号码
 * @param {string} elem 控件值
 * @returns {bool} 操作结果
 */
http_handler.isidcard = function(elem) {
    return (/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(elem));
};

/**
 * 是否为日期
 * @param {string} elem 控件值
 * @returns {bool} 操作结果
 */
http_handler.isdate = function(elem) {
    return (/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/.test(elem));
};

/**
 * 是否为金钱
 * @param {string} elem 控件值
 * @returns {bool} 操作结果
 */
http_handler.ismoney = function(elem) {
    return (/^([1-9])(\d{0,9})$/.test(elem));
};

/**
 * 是否为数字
 * @param {string} elem 控件值
 * @returns {bool} 操作结果
 */
http_handler.isnumber = function(elem) {
    return (/^([1-9])(\d{0,9})$/.test(elem));
};

/**
 * 比较日期大小
 * @param {string} elem 控件值
 * @returns {bool} 操作结果
 */
http_handler.dateless = function(lelem, relem) {
    let ltime = new Date(lelem).valueOf();
    let rtime = new Date(relem).valueOf();
    return (ltime < rtime);
};

/**
 * 检查数据请求
 * @param {object} reqData 请求数据
 */
http_handler.checkRequest = function(reqData) {
    if (!reqData || !reqData.tk) {
        return false;
    }
    return true;
};

module.exports = http_handler;