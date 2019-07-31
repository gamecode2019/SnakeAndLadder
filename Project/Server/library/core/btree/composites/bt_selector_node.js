"use strict";
const INodeParent = require('../bt_pnode');
const bt_status = require('../bt_status');

/**
 * SelectorNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
var SelectorNode = extend(INodeParent, function SelectorNode() {
    INodeParent.apply(this, arguments);
});

/**
 * Init node.
 * @param agent [object] agent
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
SelectorNode.prototype.init = function(agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = nodeInfo.id;
};

/**
 * Check if interrupted.
 * @param agent [object] agent
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
SelectorNode.prototype.checkIfInterrupted = function() {
    for (let child of this.customlist) {
        let result = child.execute();
        if (result == bt_status.BT_SUCCESS) {
            return true;
        }
    }
    return false;
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
SelectorNode.prototype.execute = function() {
    if (this.isSkipNode()) {
        return this.status;
    }

    for (let child of this.childlist) {
        // 检查打断条件
        if (this.checkIfInterrupted()) {
            return bt_status.BT_FAILURE;
        }

        // 执行节点
        let result = child.execute();
        if (result != bt_status.BT_FAILURE) {
            return this.setStatus(result);
        }
    }
    return this.setStatus(bt_status.BT_FAILURE);
};

module.exports = SelectorNode;