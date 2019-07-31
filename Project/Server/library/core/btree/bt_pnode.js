"use strict";
const INodeBase = require('./bt_inode');

/**
 * PNode 构造函数.
 * @param logger [object] log对象
 * @return [] 无返回值
 */
var PNode = extend(INodeBase, function PNode() {
    INodeBase.apply(this, arguments);
    this.customlist = [];
    this.childlist = [];
});

module.exports = PNode;