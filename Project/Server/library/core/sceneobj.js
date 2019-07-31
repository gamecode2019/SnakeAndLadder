"use strict";
const logger = autoload('core/logger').getLogger('checks_game');
const hprose = require('hprose');
const thunkify = hprose.thunkify;

/**
 * sceneobj 构造函数
 * @param void
 * @return void
 */
const sceneobj = function(id) {
    this._id = id;
    this._name = this.constructor.name;
    this._helperMap = {};
};

/**
 * 注册助手
 * @param {string} name 助手名字
 * @param {object} helper 助手实例
 * @return void
 */
sceneobj.prototype.registerHelper = function(name, helper) {
    let find = this._helperMap[name];
    if (find) {
        logger.error('[registerHelper]error: Duplicate helper name:' + name);
        return;
    }

    // 注册助手
    helper._name = name;
    this._helperMap[name] = helper;
};

/**
 * 第一次初始化
 */
sceneobj.prototype.firstInit = function() {
    for (let name in this._helperMap) {
        this._helperMap[name].firstInit();
    }
    this.onCompleted();
};

/**
 * 获取助手
 * @param {string} name 助手名字
 * @return {object}助手实例
 */
sceneobj.prototype.findHelper = function(name) {
    return this._helperMap[name];
};

/**
 * 初始化场景对象
 * @param void
 * @return void
 */
sceneobj.prototype.init = function() {
    for (let name in this._helperMap) {
        this._helperMap[name].init();
    }
};

/**
 * 更新场景对象
 * @param {number} time 时间
 * @return void
 */
sceneobj.prototype.update = function(time) {
    for (let name in this._helperMap) {
        this._helperMap[name].update(time);
    }
};

/**
 * 场景对象读档
 * @param {object} callback 回调
 * @return void
 */
sceneobj.prototype.load = function(callback) {
    callback = callback || function() {};
    callback(null);
};

/**
 * 场景对象存档
 * @param {object} callback 回调
 * @return void
 */
sceneobj.prototype.save = function(callback) {
    callback = callback || function() {};
    callback(null);
};

/**
 * 助手读档
 * @param {object} callback 回调
 * @return void
 */
sceneobj.prototype.loadHelper = function(callback) {
    let self = this;
    callback = callback || function() {};
    hprose.co(function*() {
        let _load = thunkify(function(helper, cb) {
            helper.load(cb);
        });
        for (let name in self._helperMap) {
            yield _load(self._helperMap[name]);
        }
        callback(null, null);
    }).catch(function(err) {
        callback(err, null);
    });
};
sceneobj.prototype.coLoadHelper = thunkify(sceneobj.prototype.loadHelper);

/**
 * 助手存档
 * @param {object} callback 回调
 * @return void
 */
sceneobj.prototype.saveHelper = function(callback) {
    let self = this;
    callback = callback || function() {};
    hprose.co(function*() {
        let _save = thunkify(function(helper, cb) {
            helper.save(cb);
        });
        for (let name in self._helperMap) {
            yield _save(self._helperMap[name]);
        }
        callback(null, null);
    }).catch(function(err) {
        callback(err, null);
    });
};
sceneobj.prototype.coSaveHelper = thunkify(sceneobj.prototype.saveHelper);

/**
 * 读档完毕
 * @return void
 */
sceneobj.prototype.onLoad = function() {
    for (let name in this._helperMap) {
        this._helperMap[name].onCompleted(false);
    }
};

/**
 * 释放资源
 * @return void
 */
sceneobj.prototype.release = function() {
    for (let name in this._helperMap) {
        this._helperMap[name].onRelease();
    }
};

/**
 * 首次初始化完毕
 * @return void
 */
sceneobj.prototype.onCompleted = function() {
    for (let name in this._helperMap) {
        this._helperMap[name].onCompleted(true);
    }
};

/**
 * 玩家断线处理
 */
sceneobj.prototype.onLogout = function() {
    for (let name in this._helperMap) {
        this._helperMap[name].onLogout();
    }
};

/**
 * 返回id
 * @param void
 * @return {number} ID
 */
sceneobj.prototype.id = function() {
    return this._id;
};

/**
 * 触发事件
 * @param event {object}事件
 * @return void
 */
sceneobj.prototype.trigger = function(event) {};

module.exports = sceneobj;