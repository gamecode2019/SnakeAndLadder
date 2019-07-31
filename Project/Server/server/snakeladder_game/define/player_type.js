"use strict";
const type = {};

// 常量定义
type.ROBOT_ID_START = 9000000; // 机器人ID起步
type.ROBOT_POOL_SIZE = 100; // 机器人池最大数量

// 创建角色状态定义
type.STATUS_OLD_PLAYER = 0; // 旧角色
type.STATUS_NEW_PLAYER = 1; // 新角色

// 对战状态
type.FIGHT_STATUS_FREE = 1; // 空闲状态
type.FIGHT_STATUS_SEARCH = 2; // 查找对战
type.FIGHT_STATUS_ING = 3; // 对战中

//玩家货币定义
type.CURRENCY_TYPE_COIN = 1; //金币
type.CURRENCY_TYPE_DIAMOND = 2; //钻石
type.CURRENCY_TYPE_RMB = 3; //人民币

// 存储的玩家信息
type.PlayerInfo = function PlayerInfo() {
    this.id = 0;
    this.nickName = ""; // 昵称
    this.avatarUrl = ""; // 头像url
    this.loginTime = ""; // 登录时间
    this.gender = 0; //性别
    this.gold = 0; //金币
    this.diamond = 0; //钻石
    this.newPlayer = 0; // 新用户
    this.myScans = []; //我的皮肤
    this.selectScan = 0; //当前选择皮肤
    this.myEmoticons = []; //我拥有的表情包
    this.gameTotalCount = 0; //参加游戏总场次
    this.getFirstCount = 0; //获取第一名场次
    this.myScansHasMap = 0;
};

module.exports = type;