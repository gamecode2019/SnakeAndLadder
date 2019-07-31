"use strict";
const util = require('util');
const INodeParent = require('../bt_pnode');
const bt_status = require('../bt_status');
const btree = autoload('core/btree');

/**
 * ReferencedNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
let ReferencedNode = extend(INodeParent, function ReferencedNode() {
    INodeParent.apply(this, arguments);
    this.ReferenceBehavior = null;
    this._btree = null;
});
/**
 * Anaylyse behaviour tree info.
 * @param nodeInfo [object] node info
 * @return [] 无返回值
 */
ReferencedNode.analyseNodeInfo = function (nodeInfo) {
    //引用值
    let refParams = nodeInfo.ReferenceBehavior.split(' ');
    if (nodeInfo.ReferenceBehavior.indexOf('const') != -1) { //常量
        nodeInfo.RefSrc = bt_status.VS_Const; // 操作来源
        nodeInfo.RefValue = refParams[2].replace(/"/g, '');
    } else if (refParams.length == 2) {
        nodeInfo.RefSrc = bt_status.VS_Property; // 操作来源
        nodeInfo.RefValue = refParams[1];
    } else {
        nodeInfo.RefSrc = bt_status.VS_Method; // 操作来源
        nodeInfo.RefValue = refParams[0];
    }
};
/**
 * On update.
 * @param time [int] current time
 * @return [] 无返回值
 */
ReferencedNode.prototype.init = function (agent, nodeInfo) {
    this.agent = agent;
    this.class = nodeInfo.class;
    this.id = nodeInfo.id;
    this.ReferenceBehavior = nodeInfo.ReferenceBehavior;

    let btreeName = this.getSubTreeName(nodeInfo.RefSrc, nodeInfo.RefValue);
    if (util.isNullOrUndefined(btreeName)) {
        this.logger.error("[ReferencedNode::run] not find ReferenceBehavior[" + this.RefValue + "] of node " + this.id);
        return;
    }
    btreeName = btreeName + '.xml';
    const btree = autoload('core/btree');
    this._btree = new btree(this.agent, btree.loadBtreeXml(btreeName, this.logger), this.logger);
    this._btree.start(true);
};

ReferencedNode.prototype.getSubTreeName = function (refSrc, refValue) {
    let btreeName = null;
    if (refSrc == bt_status.VS_Const) { //常量
        btreeName = refValue;
    } else if (refSrc == bt_status.VS_Method) { //方法
        let retfunc = this.agent[refValue];
        if (!util.isNullOrUndefined(retfunc)) {
            btreeName = retfunc.apply(this.agent, []);
        } else {
            this.logger.error("[ReferencedNode::run] not find ReferenceBehavior[" + this.ReferenceBehavior + "] of node " + this.id);
            return this.setStatus(bt_status.BT_FAILURE);
        }
    } else { //属性
        btreeName = this.agent[refValue];
    }
    return btreeName;
};

/**
 * Execute node.
 * @param [] void
 * @return [] 无返回值
 */
ReferencedNode.prototype.execute = function () {
    if (this.isSkipNode()) {
        return this.status;
    }

    if (!util.isNullOrUndefined(this._btree)) {
        return this.setStatus(this._btree.execute());
    } else {
        return this.setStatus(bt_status.BT_FAILURE);
    }
};

module.exports = ReferencedNode;