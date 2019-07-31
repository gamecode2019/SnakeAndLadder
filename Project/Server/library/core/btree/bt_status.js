"use strict";
var status = {};
module.exports = status;

////////////////////////////////////////////////////
// 匹配类型
status.REGEXP = [];
status.REGEXP.push('static ');
status.REGEXP.push('readonly ');
status.REGEXP.push('&quot');

////////////////////////////////////////////////////
// 函数返回类型
status.VAR_INVALID = -1;
status.VAR_BOOL = 0;
status.VAR_INT = 1;
status.VAR_UINT = 2;
status.VAR_FLOAT = 3;
status.VAR_DOUBLE = 4;
status.VAR_STRING = 5;
status.VAR_SHORT = 6;
status.VAR_USHORT = 7;
status.VAR_SBYTE = 8;
status.VAR_UBYTE = 9;
status.VAR_LONG = 10;
status.VAR_LLONG = 11;
status.VAR_ULLONG = 12;
status.VAR_CHAR = 13;
status.VAR_EBTSTATUS = 14;
status.VAR_BEHAVIAC_EBTSTATUS = 15;
status.VAR_BEHAVIAC_AGENT = 16;
status.VAR_AGENT = 17;
status.VAR_MAX = 18;

////////////////////////////////////////////////////
// 节点类型
status.NT_INVALID = -1;
status.NT_CONDITION_NODE = 0; // 条件节点
status.NT_ACTION_NODE = 1; // 动作节点
status.NT_INVERT_PNODE = 2; // 翻转节点
status.NT_PARALLEL_PNODE = 3; // 并行节点
status.NT_SELECTOR_PNODE = 4; // 选择节点
status.NT_SEQUENCE_PNODE = 5; // 顺序节点
status.NT_IFELSE_PNODE = 6; // 条件节点
status.NT_LOOPUNTIL_PNODE = 7; // 循环直到
status.NT_REFERENCE_NODE = 8; // 引用节点
status.NT_MAX = 9; // 请手动修改最大值

// 节点类型名称
status.NT_CONDITION_NAME = "Condition"; // 条件节点
status.NT_ACTION_NAME = "Action"; // 动作节点
status.NT_INVERT_PNAME = "Invert"; // 翻转节点
status.NT_PARALLEL_PNAME = "Parallel"; // 并行节点
status.NT_SELECTOR_PNAME = "Selector"; // 选择节点
status.NT_SEQUENCE_PNAME = "Sequence"; // 顺序节点
status.NT_IFELSE_PNAME = "IfElse"; // 条件节点
status.NT_LOOPUNTIL_PNAME = "DecoratorLoopUntil"; // 循环直到
status.NT_REFERENCE_NAME = "ReferencedBehavior"; // 引用节点
status.NT_LOOP_PNAME = "DecoratorLoop"; // 循环

// 任务状态
status.BT_INVALID = -1;
status.BT_FAILURE = 0; // 失败
status.BT_SUCCESS = 1; // 成功
status.BT_RUNNING = 2; // 进行中
status.BT_MAX = 3;

// 操作符
status.OP_INVALID = -1;
status.OP_Assignment = 0; // =
status.OP_And = 1; // &&
status.OP_Or = 2; // ||
status.OP_Equal = 3; // ==
status.OP_NotEqual = 4; // !=
status.OP_Greater = 5; // >
status.OP_Less = 6; // <
status.OP_GreaterEqual = 7; // >=
status.OP_LessEqual = 8; // <=
status.OP_MAX = 9;

// 变量来源
status.VS_INVALID = -1;
status.VS_Const = 0; // 常量
status.VS_Property = 1; // 成员变量
status.VS_Method = 2; // 类方法
status.VS_MAX = 3;

// 节点信息结构
status.TreeInfo = function TreeInfo() {
    this.name = null;
    this.nodes = null;
};

// 节点数据结构
status.NodeInfo = function NodeInfo() {
    this.class = null;
    this.id = 0;
};

// 节点数据结构
status.PNodeInfo = extend(status.NodeInfo, function() {
    status.NodeInfo.apply(this, arguments);
    this.customlist = [];
    this.childlist = [];
});

////////////////////////////////////////////////////
// 条件节点数据结构
status.ConditionInfo = extend(status.NodeInfo, function() {
    status.NodeInfo.apply(this, arguments);
    this.Operator = '';
    this.Opl = '';
    this.OplSrc = status.VS_INVALID; // 操作来源
    this.OplType = status.VAR_INVALID; // 操作类型
    this.OplValue = null; // 操作值
    this.Opr = '';
    this.OprSrc = status.VS_INVALID; // 操作来源
    this.OprType = status.VAR_INVALID; // 操作类型
    this.OprValue = null; // 操作值
});

// 动作节点数据结构
status.ActionInfo = extend(status.NodeInfo, function() {
    status.NodeInfo.apply(this, arguments);
    this.Method = '';
    this.ResultOption = status.BT_SUCCESS;
    this.ResultFunctor = '';
});

// 顺序节点数据结构
status.SequenceInfo = extend(status.PNodeInfo, function() {
    status.PNodeInfo.apply(this, arguments);
});

// 条件选择节点
status.IfelseInfo = extend(status.PNodeInfo, function() {
    status.PNodeInfo.apply(this, arguments);
});

// 循环直到节点
status.LoopuntilInfo = extend(status.PNodeInfo, function() {
    status.PNodeInfo.apply(this, arguments);
    this.Count = '';
    this.CountSrc = status.VS_INVALID; // 操作来源
    this.CountType = status.VAR_INVALID; // 操作类型
    this.CountValue = null; // 操作值
    this.DecorateWhenChildEnds = true;
    this.Until = false;
});

// 平行节点
status.ParallelInfo = extend(status.PNodeInfo, function() {
    status.PNodeInfo.apply(this, arguments);
    this.FailurePolicy = ''; // 失败所需子节点失败数量
    this.SuccessPolicy = ''; // 成功所需子节点成功数量
    this.ChildFinishPolicy = ''; // 子节点结束继续条件
    this.ExitPolicy = ''; // 退出行为
});

//引用节点
status.ReferenceInfo = extend(status.NodeInfo, function() {
    status.NodeInfo.apply(this, arguments);
    this.ReferenceBehavior = ''; 
    this.RefSrc = status.VAR_INVALID; // 操作类型
    this.RefValue = null; // 操作值，只接受字符串类型。
});

// 循环节点
status.LoopInfo = extend(status.PNodeInfo, function() {
    status.PNodeInfo.apply(this, arguments);
    this.Count = '';
    this.CountSrc = status.VS_INVALID; // 操作来源
    this.CountType = status.VAR_INVALID; // 操作类型
    this.CountValue = null; // 操作值
    this.DecorateWhenChildEnds = true; // 子节点结束时作用
    this.DoneWithinFrame = false; // 一帧内结束
});

////////////////////////////////////////////////////
// 并行失败条件
status.FailurePolicy_INVALID = -1;
status.FailurePolicy_FAIL_ON_ONE = 0;
status.FailurePolicy_FAIL_ON_ALL = 1;
status.FailurePolicy_MAX = 2;

// 并行成功条件
status.SuccessPolicy_INVALID = -1;
status.SuccessPolicy_SUCCEED_ON_ONE = 0;
status.SuccessPolicy_SUCCEED_ON_ALL = 1;
status.SuccessPolicy_MAX = 2;

// 并行子节点结束继续条件
status.ChildFinishPolicy_INVALID = -1;
status.ChildFinishPolicy_CHILDFINISH_LOOP = 0;
status.ChildFinishPolicy_CHILDFINISH_ONCE = 1;
status.ChildFinishPolicy_MAX = 2;

// 并行退出行为
status.ExitPolicy_INVALID = -1;
status.ExitPolicy_EXIT_ABORT_RUNNINGSIBLINGS = 0;
status.ExitPolicy_EXIT_NONE = 1;
status.ExitPolicy_MAX = 2;