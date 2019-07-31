"use strict";
const INodeParent = require('../bt_pnode');
const bt_status = require('../bt_status');

/**
 * IfelseNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
let IfelseNode = extend(INodeParent, function IfelseNode() {
    INodeParent.apply(this, arguments);
    this._failedNum = 0; // 失败所需子节点失败数量
    this._succeedNum = 0; // 成功所需子节点成功数量
    this.FailurePolicy = 0; // 失败所需子节点失败数量
    this.SuccessPolicy = 0; // 成功所需子节点成功数量
    this.ChildFinishPolicy = 0; // 子节点结束继续条件
    this.ExitPolicy = 0; // 退出行为
});

/**
 * Init node.
 * @param agent [object] agent
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
IfelseNode.prototype.init = function(agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = nodeInfo.id;
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
IfelseNode.prototype.execute = function() {
    if (this.isSkipNode()) {
        return this.status;
    }

    if (this.childlist.length != 3) {
        this.logger.error('[IfelseNode]error:must be 3 child nodes.');
        return this.setStatus(bt_status.BT_FAILURE);
    }

    // 先保障条件有结果
    let condChild = this.childlist[0];
    let condRet = condChild.execute();
    if (condRet != bt_status.BT_SUCCESS && condRet != bt_status.BT_FAILURE) {
        return this.setStatus(condRet);
    }

    // 走分支条件
    let branchIndex = (condRet == bt_status.BT_SUCCESS) ? 1 : 2;
    let branchChild = this.childlist[branchIndex];
    return this.setStatus(branchChild.execute());
};

module.exports = IfelseNode;