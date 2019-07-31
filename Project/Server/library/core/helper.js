"use strict";
const delegate = autoload('core/delegate');

/**
 * 构造函数
 * @param {object} host
 * @return void
 */
const helper = function(host) {
    this._host = host;
    this._delegate = new delegate(this);
};

/**
 * 获取宿主
 */
helper.prototype.host = function() {
    return this._host;
};

/**
 * 初始化助手
 * @param void
 * @return void
 */
helper.prototype.init = function() {};


/**
 * 获取所有数据完毕
 * @return void
 */
helper.prototype.onCompleted = function(isFirstInit) {};

/**
 * 初始化助手
 * @param void
 * @return void
 */
helper.prototype.firstInit = function() {
    this._dirty = true;
};

/**
 * 更新助手
 * @param {int} time 时间
 * @return void
 */
helper.prototype.update = function(time) {};

/**
 * 触发事件
 * @param {object} event 事件
 * @return void
 */
helper.prototype.trigger = function(event) {};

module.exports = helper;