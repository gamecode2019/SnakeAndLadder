"use strict";
const bt_status = require('./bt_status');

/**
 * INode构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
var INode = function(logger) {
    this.agent = null;
    this.class = null;
    this.id = 0;
    this.logger = logger;
    this.status = bt_status.BT_INVALID;
    this.tree = null;
};

/**
 * Parse variable.
 * @param varType [int] variable type
 * @param varType [int] variable type
 * @return [mix] variable
 */
INode.parseVar = function(varType, varValue) {
    switch (varType) {
        case bt_status.VAR_BOOL:
            return (varValue == 'true');
        case bt_status.VAR_INT:
        case bt_status.VAR_UINT:
        case bt_status.VAR_SHORT:
        case bt_status.VAR_USHORT:
        case bt_status.VAR_SBYTE:
        case bt_status.VAR_UBYTE:
        case bt_status.VAR_LONG:
        case bt_status.VAR_LLONG:
        case bt_status.VAR_ULLONG:
        case bt_status.VAR_CHAR:
            return parseInt(varValue);
        case bt_status.VAR_FLOAT:
        case bt_status.VAR_DOUBLE:
            return parseFloat(varValue);
        case bt_status.VAR_EBTSTATUS:
        case bt_status.VAR_BEHAVIAC_EBTSTATUS:
            return bt_status[varValue];
        case bt_status.VAR_BEHAVIAC_AGENT:
        case bt_status.VAR_AGENT:
            return varValue;
        default:
            return varValue;
    }
};

/**
 * Anaylyse behaviour tree info.
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
INode.analyseNodeInfo = function() {};

/**
 * Init node.
 * @param [] void
 * @return [] 无返回值
 */
INode.prototype.init = function() {};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
INode.prototype.execute = function() {};

/**
 * Get node bt_status.
 * @param [] void
 * @return [int] bt_status
 */
INode.prototype.getStatus = function() {
    return this.status;
};

/**
 * Get node bt_status.
 * @param [] void
 * @return [int] bt_status
 */
INode.prototype.setStatus = function(status) {
    if (status == bt_status.BT_RUNNING) {
        this.tree.setHangupNode(this);
    }
    return (this.status = status);
};

/**
 * Set tree.
 * @param tree [object] tree
 * @return []
 */
INode.prototype.setTree = function(tree) {
    this.tree = tree;
};

/**
 * Get tree.
 * @param [] void
 * @return [object] tree
 */
INode.prototype.getTree = function() {
    return this.tree;
};

/**
 * 是否跳过当前节点.
 * @param [] void
 * @return [] 无返回值
 */
INode.prototype.isSkipNode = function() {
    if (!this.tree.isHangup()) {
        return false;
    }
    let node = this.tree.getHangupNode();
    if (node.id != this.id) {
        return (this.status != bt_status.BT_RUNNING);
    } else {
        this.tree.setHangupNode(null);
        return false;
    }
};

module.exports = INode;