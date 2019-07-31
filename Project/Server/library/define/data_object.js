"use strict";
let data_object = {};
module.exports = data_object;

////////////////////////////////////////////////////

// 全局枚举定义
data_object.REDIS_UINDEX = {}; // 预生成的反向索引定义


// 全局变量表
data_object.var_uservar = ["useridx", 1]; // 用户起步ID
data_object.t_variable_name = "t_variable";
data_object.t_variable = function t_variable() {
    this.var_id = 0;
    this.var_value = '';
};

// 账号数据表
data_object.t_user_name = "t_user";
data_object.REDIS_UINDEX[data_object.t_user_name] = ["use_openid"];
data_object.t_user = function t_user() {
    this.use_id = 0; // 用户ID
    this.use_openid = ""; //openid
    this.use_userName = ''; // 用户名
    this.use_inviteid = ''; // 邀请id
};

// 玩家数据表
data_object.t_player_name = "t_player";
data_object.t_player = function t_player() {
    this.pla_id = 0; // 玩家ID == 用户ID
    this.pla_nickName = ''; // 昵称
    this.pla_avatarUrl = ''; // 头像
    this.pla_loginTime = ""; //登录时间
    this.pla_gender = 0; //性别
    this.pla_gold = 0; //金币
    this.pla_diamond = 0; //钻石
    this.pla_newPlayer = 0; //新用户
    this.pla_myScans = ''; //用户皮肤
    this.pla_selectScan = 0; //当前选择皮肤
    this.pla_myEmoticons = ''; //拥有的表情
    this.pla_gameTotalCount = 0; //对局数
    this.pla_getFirstCount = 0; //第一名次数
    this.pla_myScansHasMap = 0;
};