"use strict";
const INodeParent = require('../bt_pnode');
const bt_status = require('../bt_status');

/**
 * ParallelNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
let ParallelNode = extend(INodeParent, function ParallelNode() {
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
ParallelNode.prototype.init = function(agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = nodeInfo.id;
    this.FailurePolicy = bt_status['FailurePolicy_' + nodeInfo.FailurePolicy];
    this.SuccessPolicy = bt_status['SuccessPolicy_' + nodeInfo.SuccessPolicy];
    this.ChildFinishPolicy = bt_status['ChildFinishPolicy_' + nodeInfo.ChildFinishPolicy];
    this.ExitPolicy = bt_status['ExitPolicy_' + nodeInfo.ExitPolicy];
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
ParallelNode.prototype.execute = function() {
    if (this.isSkipNode()) {
        return this.status;
    }

    // 统计失败阀值
    if (this._failedNum < 1) {
        if (this.FailurePolicy == bt_status.FailurePolicy_FAIL_ON_ONE) {
            this._failedNum = 1;
        } else {
            this._failedNum = this.childlist.length;
        }
    }

    // 统计成功阀值
    if (this._succeedNum < 1) {
        if (this.SuccessPolicy == bt_status.BT_SUCCESSPolicy_SUCCEED_ON_ONE) {
            this._succeedNum = 1;
        } else {
            this._succeedNum = this.childlist.length;
        }
    }

    // 统计成功和失败次数
    let failedNum = 0;
    let succeedNum = 0;
    for (let child of this.childlist) {
        let result = child.execute();
        if (result == bt_status.BT_FAILURE) {
            failedNum += 1;
            continue;
        }
        if (result == bt_status.BT_SUCCESS) {
            succeedNum += 1;
            continue;
        }
    }

    // 计算节点状态
    if (succeedNum > 0 && succeedNum >= this._succeedNum) {
        return this.setStatus(bt_status.BT_SUCCESS);
    }
    if (failedNum > 0 && failedNum >= this._failedNum) {
        return this.setStatus(bt_status.BT_FAILURE);
    }

    // 子节点结束继续条件
    if (this.ChildFinishPolicy == bt_status.ChildFinishPolicy_CHILDFINISH_ONCE) {
        return this.setStatus(bt_status.BT_FAILURE);
    }
    return this.setStatus(bt_status.BT_RUNNING);
};

module.exports = ParallelNode;