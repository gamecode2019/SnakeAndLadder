"use strict";
const util = require("util");
const INodeParent = require('../bt_pnode');
const bt_status = require('../bt_status');
const BtOperator = require('../bt_operator');

/**
 * LoopuntilNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
var LoopuntilNode = extend(INodeParent, function LoopuntilNode() {
    INodeParent.apply(this, arguments);
    this.CountOpt = null;
    this.DecorateWhenChildEnds = true;
    this.Until = false;
    this.DoneWithinFrame = true;
});

/**
 * Anaylyse behaviour tree info.
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
LoopuntilNode.analyseNodeInfo = function (nodeInfo) {
    let optParams = nodeInfo.Count.split(' ');
    if (nodeInfo.Count.indexOf('const') != -1) {
        nodeInfo.CountSrc = bt_status.VS_Const; // 操作来源
        let optType = optParams[1].toUpperCase().replace('::', '_');
        nodeInfo.CountType = bt_status['VAR_' + optType];
        nodeInfo.CountValue = LoopuntilNode.parseVar(nodeInfo.CountType, optParams[2]);
    } else if (optParams.length == 2) {
        nodeInfo.CountSrc = bt_status.VS_Property; // 操作来源
        let CountType = optParams[0].toUpperCase().replace('::', '_');
        nodeInfo.CountType = bt_status['VAR_' + CountType];
        nodeInfo.CountValue = optParams[1];
    } else {
        throw Error("Invalid loopuntil params");
    }
    nodeInfo.DecorateWhenChildEnds = LoopuntilNode.parseVar(bt_status.VAR_BOOL, nodeInfo.DecorateWhenChildEnds);
    nodeInfo.Until = LoopuntilNode.parseVar(bt_status.VAR_BOOL, nodeInfo.Until);
};

/**
 * Init node.
 * @param agent [object] agent
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
LoopuntilNode.prototype.init = function (agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = nodeInfo.id;
    this.DecorateWhenChildEnds = nodeInfo.DecorateWhenChildEnds;
    this.Until = nodeInfo.Until;
    this.CountOpt = new BtOperator(nodeInfo.CountSrc, nodeInfo.CountType, nodeInfo.CountValue);
    this.resetCount();
};

/**
 * 设置循环次数.
 * @param [] void
 * @return [] 无返回值
 */
LoopuntilNode.prototype.resetCount = function () {
    if (this.CountOpt.OptSrc == bt_status.VS_Const) {
        this._count = this.CountOpt.OptValue;
    } else {
        this._count = this.agent[this.CountOpt.OptValue];
    }
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
LoopuntilNode.prototype.execute = function () {
    if (this.isSkipNode()) {
        return this.status;
    }

    if (this.childlist.length < 1) {
        return this.setStatus(bt_status.BT_FAILURE);
    }

    // 倒计次数
    do {
        this._count -= 1;
        if (this._count == -1) {
            this.resetCount();
            return this.setStatus(bt_status.BT_SUCCESS);
        }

        // 子节点结束时作用
        let result = this.childlist[0].execute();
        if (this.DecorateWhenChildEnds) {
            while (result == bt_status.BT_RUNNING) {
                result = this.childlist[0].execute();
            }
        }

        // 直到子树
        if (this.Until) {
            if (result == bt_status.BT_SUCCESS) {
                this.resetCount();
                return this.setStatus(bt_status.BT_SUCCESS);
            }
        } else {
            if (result == bt_status.BT_FAILURE) {
                this.resetCount();
                return this.setStatus(bt_status.BT_FAILURE);
            }
        }
        if (this._count == 0) {
            this.resetCount();
            return this.setStatus(bt_status.BT_SUCCESS);
        }
    } while (this.DoneWithinFrame);
    return this.setStatus(bt_status.BT_RUNNING);
};

module.exports = LoopuntilNode;