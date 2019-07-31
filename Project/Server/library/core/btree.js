"use strict";
const util = require('util');
const fs = require('fs');
const xmldom = require('xmldom');
const format = require("string-format");
const bt_status = require('./btree/bt_status');
const ActionNode = require('./btree/actions/bt_action_node');
const ConditionNode = require('./btree/conditions/bt_condition_node');
const ParallelNode = require('./btree/composites/bt_parallel_node');
const SelectorNode = require('./btree/composites/bt_selector_node');
const SequenceNode = require('./btree/composites/bt_sequence_node');
const IfelseNode = require('./btree/composites/bt_ifelse_node');
const ReferencedNode = require('./btree/composites/bt_referenced_node');
const InverterNode = require('./btree/decorators/bt_inverter_node');
const LoopuntilNode = require('./btree/decorators/bt_loop_until_node');
const LoopNode = require('./btree/decorators/bt_loop_node');

/**
 * BehaviourTree构造函数.
 * @param {object} logger log对象
 * @return void
 */
let BehaviourTree = function(agent, btreeInfo, logger) {
    this.name = '';
    this._logger = logger;
    this._btree = null; // 行为树
    this._status = bt_status.BT_RUNNING; // 行为树状态
    this._running = false; // 运行状态
    this._current = null; // 当前挂起节点

    // 构建行为树
    if (util.isNullOrUndefined(agent)) {
        this._logger.error("[fillBtreeInfo]error: invalid btree agent.");
        return;
    }
    if (util.isNullOrUndefined(btreeInfo)) {
        this._logger.error("[fillBtreeInfo]error: invalid btree info.");
        return;
    }
    this._btree = this.buildBtree(agent, btreeInfo.nodes);
    this.name = btreeInfo.name;
};

/**
 * 分配节点信息
 * @param {number} type 节点类型
 * @return {object} 节点信息
 */
BehaviourTree.allocNodeInfo = function(type) {
    switch (type) {
        case bt_status.NT_CONDITION_NAME:
            return new bt_status.ConditionInfo();
        case bt_status.NT_ACTION_NAME:
            return new bt_status.ActionInfo();
        case bt_status.NT_INVERT_PNAME:
            return new bt_status.SequenceInfo();
        case bt_status.NT_PARALLEL_PNAME:
            return new bt_status.ParallelInfo();
        case bt_status.NT_SELECTOR_PNAME:
            return new bt_status.SequenceInfo();
        case bt_status.NT_SEQUENCE_PNAME:
            return new bt_status.SequenceInfo();
        case bt_status.NT_IFELSE_PNAME:
            return new bt_status.IfelseInfo();
        case bt_status.NT_LOOPUNTIL_PNAME:
            return new bt_status.LoopuntilInfo();
        case bt_status.NT_REFERENCE_NAME:
            return new bt_status.ReferenceInfo();
        case bt_status.NT_LOOP_PNAME:
            return new bt_status.LoopInfo();
        default:
            return new bt_status.NodeInfo();
    }
};

/**
 * 过滤节点属性值
 * @param {string} property 属性值
 * @return {string} 过滤的属性值
 */
BehaviourTree.filterNodeValue = function(agentType, property) {
    let propFilter = bt_status.REGEXP.join('|');
    let propReg = new RegExp(propFilter, "gm");
    property = property.replace(propReg, '');

    // 函数处理 TODO:暂时不支持参数
    let classFilter = format('Self.{0}::', agentType);
    let regexp = new RegExp(classFilter, "gm");
    property = property.replace(regexp, '');
    property = property.replace('()', '');
    property = property.replace(/\(.+\)/, '');
    return property;
};

/**
 * 加载战斗行为树
 * @param {string} btname 行为树名称
 * @param {object} logger 日志器
 * @return void
 */
BehaviourTree.loadBtreeXml = function(btname, logger) {
    if (util.isNullOrUndefined(btname)) {
        logger.error("[loadBtreeXml]error: wrong btree name.");
        return;
    }

    // 加载xml文件
    let xmlName = format('./resources/btree/exported/{0}', btname);
    let xmlData = fs.readFileSync(xmlName, 'utf-8');
    if (util.isNullOrUndefined(xmlData)) {
        logger.error("[loadBtreeXml]error: empty btree xml file." + xmlName);
        return;
    }

    // 构建行为树
    let domParser = new xmldom.DOMParser();
    let domData = domParser.parseFromString(xmlData).lastChild;
    let treeInfo = new bt_status.TreeInfo();
    treeInfo.name = btname;

    // 获取agent类型
    let attrlist = findObject(domData.attributes, function(elem) {
        return (elem.nodeName === 'agenttype');
    });
    if (util.isNullOrUndefined(attrlist)) {
        logger.error("[loadBtreeXml]error: empty btree root attrib." + xmlName);
        return;
    }
    let agentType = attrlist[0].nodeValue;

    // 扫描树结构
    let nodelist = findObject(domData.childNodes, function(elem) {
        return (elem.nodeName === 'node');
    });
    if (util.isNullOrUndefined(nodelist)) {
        logger.error("[loadBtreeXml]error: empty btree root node." + xmlName);
        return;
    }
    treeInfo.nodes = BehaviourTree.scaneNodeInfo(agentType, nodelist[0]);

    // 后期分析处理节点数据
    BehaviourTree.analyseNodeInfo(treeInfo.nodes);
    return treeInfo;
};

/**
 * 扫描节点
 * @param {string} agentType 节点类型
 * @param {object} xmlNode 节点对象
 */
BehaviourTree.scaneNodeInfo = function(agentType, xmlNode) {
    // 扫描节点
    let node = BehaviourTree.allocNodeInfo();
    for (let i = 0; i < xmlNode.attributes.length; ++i) {
        let attr = xmlNode.attributes[i];
        if (util.isNullOrUndefined(attr.nodeName)) {
            continue;
        }
        node[attr.nodeName] = BehaviourTree.filterNodeValue(agentType, attr.nodeValue);
    }

    // 扫描节点属性
    let propertyList = findObject(xmlNode.childNodes, function(elem) {
        return (elem.nodeName === 'property');
    });
    for (let id in propertyList) {
        let property = propertyList[id];
        for (let i = 0; i < property.attributes.length; ++i) {
            let attr = property.attributes[i];
            if (util.isNullOrUndefined(attr.nodeName)) {
                continue;
            }
            node[attr.nodeName] = BehaviourTree.filterNodeValue(agentType, attr.nodeValue);
        }
    }

    // 构建节点
    let curNode = BehaviourTree.allocNodeInfo(node.class);
    for (let attr in node) {
        if (!curNode.hasOwnProperty(attr)) {
            continue;
        }
        curNode[attr] = node[attr];
    }

    // 扫描自有节点（一般为条件节点）
    let customlist = findObject(xmlNode.childNodes, function(elem) {
        return (elem.nodeName === 'custom');
    });
    customlist = customlist ? customlist[0].childNodes : [];
    customlist = findObject(customlist, function(elem) {
        return (elem.nodeName === 'node');
    });
    for (let id in customlist) {
        let childNode = this.scaneNodeInfo(agentType, customlist[id]);
        if (!util.isArray(curNode.customlist)) {
            continue;
        }
        curNode.customlist.push(childNode);
    }

    // 扫描子节点
    let nodelist = findObject(xmlNode.childNodes, function(elem) {
        return (elem.nodeName === 'node');
    });
    for (let id in nodelist) {
        let childNode = this.scaneNodeInfo(agentType, nodelist[id]);
        if (!util.isArray(curNode.childlist)) {
            continue;
        }
        curNode.childlist.push(childNode);
    }
    return curNode;
};

/**
 * Anaylyse behaviour tree info.
 * @param nodeInfo {object} node info
 * @return void
 */
BehaviourTree.analyseNodeInfo = function(nodeInfo) {
    // 处理节点数据
    switch (nodeInfo.class) {
        case bt_status.NT_CONDITION_NAME:
            ConditionNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_ACTION_NAME:
            ActionNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_INVERT_PNAME:
            InverterNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_PARALLEL_PNAME:
            ParallelNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_SELECTOR_PNAME:
            SelectorNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_SEQUENCE_PNAME:
            SequenceNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_IFELSE_PNAME:
            IfelseNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_LOOPUNTIL_PNAME:
            LoopuntilNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_REFERENCE_NAME:
            ReferencedNode.analyseNodeInfo(nodeInfo);
            break;
        case bt_status.NT_LOOP_PNAME:
            LoopNode.analyseNodeInfo(nodeInfo);
            break;
        default:
            throw Error('Invalid node class ' + nodeInfo.class);
    }

    // 扫描自有子节点
    for (let id in nodeInfo.customlist) {
        BehaviourTree.analyseNodeInfo(nodeInfo.customlist[id]);
    }

    // 扫描子节点
    for (let id in nodeInfo.childlist) {
        BehaviourTree.analyseNodeInfo(nodeInfo.childlist[id]);
    }
};

/**
 * 分配节点
 * @param {number} type 节点类型名称
 * @param {object} logger 日志器
 * @return {object} 节点信息
 */
BehaviourTree.allocNode = function(type, logger) {
    switch (type) {
        case bt_status.NT_CONDITION_NAME:
            return new ConditionNode(logger);
        case bt_status.NT_ACTION_NAME:
            return new ActionNode(logger);
        case bt_status.NT_INVERT_PNAME:
            return new InverterNode(logger);
        case bt_status.NT_PARALLEL_PNAME:
            return new ParallelNode(logger);
        case bt_status.NT_SELECTOR_PNAME:
            return new SelectorNode(logger);
        case bt_status.NT_SEQUENCE_PNAME:
            return new SequenceNode(logger);
        case bt_status.NT_IFELSE_PNAME:
            return new IfelseNode(logger);
        case bt_status.NT_LOOPUNTIL_PNAME:
            return new LoopuntilNode(logger);
        case bt_status.NT_REFERENCE_NAME:
            return new ReferencedNode(logger);
        case bt_status.NT_LOOP_PNAME:
            return new LoopNode(logger);
        default:
            return null;
    }
};

/**
 * Build behaviour tree.
 * @param {object} agent
 * @param {object} nodeInfo
 * @return void
 */
BehaviourTree.prototype.buildBtree = function(agent, nodeInfo) {
    // 构建节点
    let curNode = BehaviourTree.allocNode(nodeInfo.class, this._logger);
    curNode.setTree(this);
    curNode.init(agent, nodeInfo);

    // 扫描自有子节点
    for (let id in nodeInfo.customlist) {
        let childNode = this.buildBtree(agent, nodeInfo.customlist[id]);
        if (!util.isArray(curNode.customlist)) {
            continue;
        }
        curNode.customlist.push(childNode);
    }

    // 扫描子节点
    for (let id in nodeInfo.childlist) {
        let childNode = this.buildBtree(agent, nodeInfo.childlist[id]);
        if (!util.isArray(curNode.childlist)) {
            continue;
        }
        curNode.childlist.push(childNode);
    }
    return curNode;
};

/**
 * Start behaviour tree.
 * @param {bool} isChild 是否子树
 * @return void
 */
BehaviourTree.prototype.start = function(isChild) {
    this._running = true;
    if (!isChild) {
        this._status = this._btree.execute();
    }
};

/**
 * Execute node.
 * @param void
 * @return void
 */
BehaviourTree.prototype.execute = function() {
    if (!this._running) {
        return this._status;
    }
    if (this._status !== bt_status.BT_FAILURE) {
        this._status = this._btree.execute();
    } else {
        this._running = false;
    }
    return this._status;
};

/**
 * End behaviour tree.
 * @param void
 * @return void
 */
BehaviourTree.prototype.end = function() {
    this._running = false;
};

/**
 * 是否处于挂起状态.
 * @param void
 * @return void
 */
BehaviourTree.prototype.isHangup = function() {
    return !util.isNullOrUndefined(this._current);
};

/**
 * 获取挂起节点.
 * @param void
 * @return void
 */
BehaviourTree.prototype.getHangupNode = function() {
    return this._current;
};

/**
 * 挂起行为树，挂起状态下自动忽略非运行状态节点.
 * @param {object} node 挂起节点
 * @return void
 */
BehaviourTree.prototype.setHangupNode = function(node) {
    if (util.isNullOrUndefined(node)) {
        this._current = null;
        return;
    }
    if (util.isNullOrUndefined(this._current)) {
        this._current = node;
    }
};

/**
 * Is btree running.
 * @param void
 * @return {boolean} 运行状态
 */
BehaviourTree.prototype.isRunning = function() {
    return this._running;
};

module.exports = BehaviourTree;