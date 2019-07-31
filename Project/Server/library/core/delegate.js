"use strict";

/**
 * 构造函数
 * @param {object} sender 事件发送者
 * @return void
 */
const delegate = function(sender) {
    this._sender = sender;
    this._invokers = {};
};

/**
 * 增加监听器
 * @param {int} event 事件枚举
 * @param {object} inst 通知实例
 * @param {object} func 通知实例函数
 * @return void
 */
delegate.prototype.addListener = function(event, inst, func) {
    if (!this._invokers[event]) {
        this._invokers[event] = [];
    }

    // 加入队列
    let invoker = this._invokers[event];
    let compare = function(elem, idx, arr) {
        return (elem.event === event && elem.inst === inst && elem.func === func);
    };
    if (!invoker.some(compare)) {
        invoker.push({ "event": event, "inst": inst, "func": func });
    }
};

/**
 * 移除监听器
 * @param {int} event 事件枚举
 * @param {object} inst 通知实例
 * @param {object} func 通知实例函数
 * @return void
 */
delegate.prototype.removeListener = function(event, inst, func) {
    if (!this._invokers[event]) {
        return;
    }

    // 移除队列
    let invoker = this._invokers[event];
    let index = invoker.findIndex(function(elem, idx, arr) {
        return (elem.event === event && elem.inst === inst && elem.func === func);
    });
    if (index !== -1) {
        delete invoker[index];
    }
};

/**
 * 清除监听器
 * @param {int} event 事件枚举
 * @return void
 */
delegate.prototype.reset = function(event) {
    if (event && this._invokers[event]) {
        this._invokers[event] = [];
    }
};

/**
 * 清除监听器
 * @param {int} event 事件枚举
 * @return void
 */
delegate.prototype.notify = function(event, args) {
    let self = this;
    if (!self._invokers[event]) {
        return;
    }

    // 通知监听者
    self._invokers[event].forEach(function(elem) {
        elem.func.apply(elem.inst, [self._sender, event, args]);
    });
};

module.exports = delegate;