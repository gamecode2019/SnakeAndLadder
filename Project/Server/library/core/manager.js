"use strict";
const delegate = autoload('core/delegate');

/**
 * 构造函数
 * @param void
 * @return void
 */
const manager = function() {
    this._delegate = new delegate(this);
};

/**
 * 初始化管理器
 * @param void
 * @return void
 */
manager.prototype.init = function() {};

/**
 * 加载存档
 * @param void
 * @return void
 */
manager.prototype.load = function() {};

/**
 * 更新管理器
 * @param {int} time 时间
 * @return void
 */
manager.prototype.update = function(time) {};

/**
 * 触发事件
 * @param {object} event 事件
 * @return void
 */
manager.prototype.trigger = function(event) {};

module.exports = manager;