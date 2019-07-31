"use strict";
const INodeBase = require('../bt_inode');
const bt_status = require('../bt_status');
const BtOperator = require('../bt_operator');

/**
 * ConditionNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
var ConditionNode = extend(INodeBase, function ConditionNode() {
    INodeBase.apply(this, arguments);
    this.Operator = null;
    this.Opl = null;
    this.Opr = null;
});

/**
 * Anaylyse behaviour tree info.
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
ConditionNode.analyseNodeInfo = function(nodeInfo) {
    // 左常量
    let oplParams = nodeInfo.Opl.split(' ');
    if (nodeInfo.Opl.indexOf('const') != -1) {
        nodeInfo.OplSrc = bt_status.VS_Const; // 操作来源
        let OplType = oplParams[1].toUpperCase().replace('::', '_');
        nodeInfo.OplType = bt_status['VAR_' + OplType];
        nodeInfo.OplValue = ConditionNode.parseVar(nodeInfo.OplType, oplParams[2]);
    } else if (oplParams.length == 2) {
        nodeInfo.OplSrc = bt_status.VS_Property; // 操作来源
        let OplType = oplParams[0].toUpperCase().replace('::', '_');
        nodeInfo.OplType = bt_status['VAR_' + OplType];
        nodeInfo.OplValue = oplParams[1];
    } else {
        nodeInfo.OplSrc = bt_status.VS_Method; // 操作来源
        nodeInfo.OplValue = oplParams[0];
    }

    // 右常量
    let oprParams = nodeInfo.Opr.split(' ');
    if (nodeInfo.Opr.indexOf('const') != -1) {
        nodeInfo.OprSrc = bt_status.VS_Const; // 操作来源
        let oprParams = nodeInfo.Opr.split(' ');
        let OprType = oprParams[1].toUpperCase().replace('::', '_');
        nodeInfo.OprType = bt_status['VAR_' + OprType];
        nodeInfo.OprValue = ConditionNode.parseVar(nodeInfo.OprType, oprParams[2]);
    } else if (oprParams.length == 2) {
        nodeInfo.OprSrc = bt_status.VS_Property; // 操作来源
        let OprType = oprParams[0].toUpperCase().replace('::', '_');
        nodeInfo.OprType = bt_status['VAR_' + OprType];
        nodeInfo.OprValue = oprParams[1];
    } else {
        nodeInfo.OprSrc = bt_status.VS_Method; // 操作来源
        nodeInfo.OprValue = oprParams[0];
    }
};

/**
 * Init node.
 * @param agent [object] agent
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
ConditionNode.prototype.init = function(agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = nodeInfo.id;
    this.Operator = bt_status['OP_' + nodeInfo.Operator];
    this.Opl = new BtOperator(nodeInfo.OplSrc, nodeInfo.OplType, nodeInfo.OplValue);
    this.Opr = new BtOperator(nodeInfo.OprSrc, nodeInfo.OprType, nodeInfo.OprValue);
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
ConditionNode.prototype.execute = function() {
    if (this.isSkipNode()) {
        return this.status;
    }
    let result = this.Opl.compare(this.agent, this.Operator, this.Opr);
    return this.setStatus(result ? bt_status.BT_SUCCESS : bt_status.BT_FAILURE);
};

module.exports = ConditionNode;