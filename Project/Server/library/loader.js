"use strict";
const util = require('util');
let component = {};
module.exports = component;

/**
 * 自动加载组件
 * @param {string} path 组件相对路径
 * @return {object} 组件
 */
global.autoload = function (path) {
    return require('./' + path);
};

/**
 * 对象继承实现
 * 例如：let classA = extend('classBase',function(){});
 * 匿名函数为构造函数，如需要在构造中主动调用父级构造，
 * 请手动调用classBase.apply(this, arguments);
 * @param parent {object} 基类
 * @param __init {object} 构造函数
 * @return {object} 子类对象
 */
global.extend = function (parent, __init) {
    for (let prop in parent) { __init[prop] = parent[prop]; }
    let __ = function () {
        this.constructor = __init;
    };
    __.prototype = parent.prototype;
    __init.prototype = new __();
    return __init;
};

/**
 * 是否为空
 * @param elem {object} 对象
 * @return [boolean] 是否为空
 */
global.isempty = function (elem) {
    if (0 === elem || null === elem || ("undefined" === typeof elem) || '' === elem) {
        return true;
    }
    return false;
};

/**
 * 对象中查找
 * @param filter {object} 过滤函数
 * @return {object} 返回对象元素
 */
global.findObject = function (obj, filter) {
    if (!filter || !util.isFunction(filter)) {
        return null;
    }
    let list = [];
    for (let index in obj) {
        let item = obj[index];
        if (filter.apply(obj, [item])) {
            list.push(item);
        }
    }
    return list.length > 0 ? list : null;
};

/**
 * 字符串中查找索引
 * @param content {string} 查找字符串
 * @param idx {int} 索引
 * @return {bool} 是否存在
 */
global.existIndex = function (content, idx) {
    if (!content) {
        return false;
    }
    if (content === idx) {
        return true;
    }

    // 检查字符串
    const compare = content.toString().split(',');
    if (compare.indexOf(idx.toString()) !== -1) {
        return true;
    }
    return false;
};

/**
 * 标准返回对象
 * @param {object} err 抛出错误
 * @param {object} data 执行结果
 */
global.retobj = function (err, data) {
    this.err = err;
    this.data = data;
};
global.retobj.prototype.hasError = function () {
    return !util.isNullOrUndefined(this.err);
};
global.retobj.prototype.getError = function () {
    return this.err;
};
global.retobj.prototype.getData = function () {
    return this.data;
};

/**
 * 多参数返回
 * @param {object} err 抛出错误
 * @param {object} data 执行结果
 * @return {object} 标准返回对象
 */
global.mutiret = function (err, data) {
    return new global.retobj(err, data);
};

/**
 * 设置标志位
 * @param {int} num 待设置的数值
 * @param {int} flag 标志位
 */
global.setFlag = function (num, flag) {
    return (num | flag);
};

/**
 * 检测标志位
 * @param {int} num 待设置的数值
 * @param {int} flag 标志位
 */
global.hasFlag = function (num, flag) {
    return (num !== 0) ? ((num & flag) === flag) : false;
};

/**
 * 清理标志位
 * @param {int} num 待设置的数值
 * @param {int} flag 标志位
 */
global.clearFlag = function (num, flag) {
    return (num & (~flag));
};

/**
 * 创建一个pair
 * @param {string} key
 * @param {mix} value
 * @return {object} values
 */
global.newpair = function (key, value) {
    let ret = {};
    ret[key] = value;
    return ret;
};

/**
 * 安全拷贝对象
 * @param {object} dst 目标
 * @param {object} src 拷贝源
 * @param {object} dstPrefix 目标前缀
 * @param {object} srcPrefix 来源前缀
 * @return {object} values
 */
global.safeCopy = function (dst, src, dstPrefix, srcPrefix) {
    dstPrefix = dstPrefix || '';
    srcPrefix = srcPrefix || '';
    for (let srcName in src) {
        let dstName = dstPrefix + srcName.replace(srcPrefix, '');
        let type = typeof dst[dstName];
        if (type === 'undefined') {
            continue;
        }
        if (type === 'number') {
            dst[dstName] = parseFloat(src[srcName]);
            continue;
        }
        dst[dstName] = src[srcName];
    }
    return dst;
};

/**
 * 安全扩展对象
 * @param {object} dst 目标
 * @param {object} src 拷贝源
 * @return {object} values
 */
global.safeExtend = function (dst, src) {
    for (let name in src) {
        dst[name] = src[name];
    }
    return dst;
};

/**
 * 分割字符串为实数数组
 * @param {string} str 待设置的数值
 * @param {string} sep 分隔符
 * @return {array} 实数数组
 */
global.splitStrToNumArray = function (str, sep) {
    sep = sep || "|";
    if (!str || typeof str !== "string" ||
        (typeof sep !== "string" && !(sep instanceof RegExp))) {
        return [];
    }
    return str.split(sep).map((item) => parseInt(item, 10) || 0);
};

/**
 * 对象是否为空
 * @param obj [object] 对象
 * @return [boolean] 是否为空
 */
global.isObjEmpty = function (obj) {
    if (!obj) {
        return true;
    }
    let names = Object.getOwnPropertyNames(obj);
    if (!names || names.length == 0) {
        return true;
    }
    return false;
};

/**
 * 设置调试模式
 * @param [] void
 * @return [bool]
 */
global._DEBUG = function () {
    return process.env.DEBUG === "true";
};