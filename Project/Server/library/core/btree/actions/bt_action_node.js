"use strict";
const util = require('util');
const INodeBase = require('../bt_inode');
const bt_status = require('../bt_status');

/**
 * ActionNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
var ActionNode = extend(INodeBase, function ActionNode() {
    INodeBase.apply(this, arguments);
    this.Method = null;
    this.ResultOption = bt_status.BT_SUCCESS;
    this.ResultFunctor = null;
});

/**
 * Init node.
 * @param agent [object] agent
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
ActionNode.prototype.init = function(agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = parseInt(nodeInfo.id);
    this.Method = nodeInfo.Method;
    this.ResultOption = bt_status[nodeInfo.ResultOption];
    this.ResultFunctor = nodeInfo.ResultFunctor;
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
ActionNode.prototype.execute = function() {
    if (this.isSkipNode()) {
        return this.status;
    }

    // 执行动作
    let func = this.agent[this.Method];
    if (!util.isNullOrUndefined(func)) {
        func.apply(this.agent, []);
    } else {
        this.logger.error("[ActionNode::run] not find Method of node " + this.id);
    }

    // 返回结果
    if (this.ResultOption == bt_status.BT_INVALID) {
        let retfunc = this.agent[this.ResultFunctor];
        if (!util.isNullOrUndefined(retfunc)) {
            return this.setStatus(retfunc.apply(this.agent, []));
        } else {
            this.logger.error("[ActionNode::run] not find ResultFunctor of node " + this.id);
        }
    }
    return this.setStatus(this.ResultOption);
};

module.exports = ActionNode;