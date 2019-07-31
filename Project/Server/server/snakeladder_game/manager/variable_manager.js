"use strict";
const manager = autoload('core/manager');
const data_manager = autoload('manager/data_manager').instance();
const logger = autoload('core/logger').getLogger('checks_game');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const error_type = autoload('define/error_type');
let _singleton = null;

/**
 * 构造函数
 * @param void
 * @return void
 */
const variable_manager = extend(manager, function() {});

/**
 * 单例
 * @param void
 * @return void
 */
variable_manager.instance = function() {
    if (_singleton === null) { _singleton = new variable_manager(); }
    return _singleton;
};

/**
 * 初始化管理器
 * @param void
 * @return void
 */
variable_manager.prototype.init = function() {};

/**
 * 获取通知数据
 * @param {object} reqData 请求数据
 * @param {object} callback
 * @return void
 */
variable_manager.prototype.getVariable = thunkify(function(reqData, callback) {
    // 检查参数
    if (!reqData.id) {
        return callback(Error(error_type.VAR_IDX_ERR), null);
    }

    // 远程获取变量
    hprose.co(function*() {
        let variableData = yield data_manager.cocall('db_variable.getVariable', reqData);
        callback(null, variableData);
    }).catch(function(err) {
        logger.error('[getNoticeData] error: ' + err.message);
        callback(err, null);
    });
});

module.exports = variable_manager;