"use strict";
const INodeParent = require('../bt_pnode');
const bt_status = require('../bt_status');

/**
 * SequenceNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
let SequenceNode = extend(INodeParent, function SequenceNode() {
    INodeParent.apply(this, arguments);
});

/**
 * On update.
 * @param time [int] current time
 * @return [] 无返回值
 */
SequenceNode.prototype.init = function(agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = nodeInfo.id;
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
SequenceNode.prototype.execute = function() {
    if (this.isSkipNode()) {
        return this.status;
    }

    for (let child of this.childlist) {
        let result = child.execute();
        if (result != bt_status.BT_SUCCESS) {
            return this.setStatus(result);
        }
    }
    return this.setStatus(bt_status.BT_SUCCESS);
};

module.exports = SequenceNode;