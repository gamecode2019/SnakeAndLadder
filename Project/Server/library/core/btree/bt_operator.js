"use strict";
const util = require('util');
const bt_status = require('./bt_status');

/**
 * BtOperator 构造函数.
 * @param [] void
 * @return [] 无返回值
 */
var BtOperator = function(src, type, value) {
    this.OptSrc = src; // 操作来源
    this.OptType = type; // 操作类型
    this.OptValue = value; // 操作值
};

/**
 * 转换类型.
 * @param agent [object] 代理对象
 * @param optSrc [int] 操作类型
 * @param OptValue [mix] 操作对象
 * @return [bool] 对比结果
 */
BtOperator.prototype.convert = function(agent, optSrc, OptValue) {
    let result = null;
    switch (optSrc) {
        case bt_status.VS_Const:
            result = OptValue;
            break;
        case bt_status.VS_Property:
            result = agent[OptValue];
            break;
        case bt_status.VS_Method:
            {
                let func = agent[OptValue];
                if (!util.isNullOrUndefined(func)) {
                    result = func.apply(agent, []);
                }
            }
            break;
        default:
            throw Error('Invalid left opterator source');
    }
    return result;
};

/**
 * 对比右值.
 * @param [agent] 代理对象
 * @param [opt] 比较类型
 * @param [object] comp 比较对象
 * @return [bool] 对比结果
 */
BtOperator.prototype.compare = function(agent, opt, comp) {
    let oplValue = this.convert(agent, this.OptSrc, this.OptValue);
    let oprValue = this.convert(agent, comp.OptSrc, comp.OptValue);
    switch (opt) {
        case bt_status.OP_Equal:
            return (oplValue == oprValue);
        case bt_status.OP_NotEqual:
            return (oplValue != oprValue);
        case bt_status.OP_Greater:
            return (oplValue > oprValue);
        case bt_status.OP_Less:
            return (oplValue < oprValue);
        case bt_status.OP_GreaterEqual:
            return (oplValue >= oprValue);
        case bt_status.OP_LessEqual:
            return (oplValue <= oprValue);
        default:
            return false;
    }
};

module.exports = BtOperator;