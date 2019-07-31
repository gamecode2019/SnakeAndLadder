"use strict";
const util = require("util");
const INodeParent = require('../bt_pnode');
const bt_status = require('../bt_status');

/**
 * InverterNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
var InverterNode = extend(INodeParent, function InverterNode() {
    INodeParent.apply(this, arguments);
});

/**
 * Init node.
 * @param agent [object] agent
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
InverterNode.prototype.init = function(agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = nodeInfo.id;
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
InverterNode.prototype.execute = function() {
    if (this.isSkipNode()) {
        return this.status;
    }

    if (this.child.length < 1) {
        return this.setStatus(bt_status.BT_FAILURE);
    }
    var result = this.child[0].execute();
    switch (result) {
        case bt_status.BT_FAILURE:
            return this.setStatus(bt_status.BT_SUCCESS);
        case bt_status.BT_SUCCESS:
            return this.setStatus(bt_status.BT_FAILURE);
        default:
            return this.setStatus(result);
    }
};

module.exports = InverterNode;