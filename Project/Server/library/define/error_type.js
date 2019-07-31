"use strict";
let error_type = {};
module.exports = error_type;

// 统一错误码定义
error_type.COMMON_ERR = 0; // 未知错误
error_type.COMMON_SUCCESS = 1; // 操作成功
error_type.COMMON_NOLOGIN = 2; // 未登录
error_type.COMMON_LOGIN_ERR = 3; // 登录错误
error_type.COMMON_LOGIN_EXPIRED = 4; //登录过期
error_type.COMMON_LOGIN_RELOAD_DATA = 5; //失去连接，重登

error_type.COMMON_FUNC_CLOSE = 101; // 功能关闭
error_type.COMMON_SAVE_ERR = 102; // 保存失败
error_type.COMMON_LOAD_ERR = 103; // 加载失败
error_type.COMMON_JSON_ERR = 104; // 无效JSON数据
error_type.COMMON_CAPTCHA_ERR = 105; // 无效验证码
error_type.COMMON_WXLOGIN_ERR = 106; // 微信登录失败

// 全局变量(201-220)
error_type.VAR_IDX_ERR = 201; // 无效变量ID

// 房间模块(221-240)
error_type.ROOM_SUCC = 221; // 房间匹配成功
error_type.ROOM_TASK_ERR = 222; // 匹配任务执行失败
error_type.ROOM_CREATE_ERR = 223; // 客户端非法创建房间
error_type.ROOM_LESS = 224; // 未找到房间
error_type.ROOM_LESS_PLAYER = 225; // 房间未找到该玩家
error_type.ROOM_IN_PEACE = 226; // 房间等待求和结果
error_type.ROOM_PEACE_ERR = 227; // 无求和请求.
error_type.ROOM_PLAYER_COUNT_ERR = 228; // 房间玩家人数不对
error_type.ROOM_PLAYER_STATE_ERR = 229; // 玩家游戏状态错误

// 玩家模块(241-260)
error_type.PLAYER_FIND_ERR = 241; // 玩家搜索失败
error_type.CURRENCY_TYPE_ERR = 242; // 货币类型错误
error_type.CURRENCY_NOT_ENOUGH = 243; //货币不足
error_type.CURRENCY_COUNT_ERR = 244; //货币数量错误

//商城模块(261-280)
error_type.SHOP_TYPE_ERR = 261; //商店类型错误
error_type.SHOP_INDEX_ERR = 262; //商店索引错误

//武将模块(281-300)
error_type.HERO_ID_ERR = 281; //武将ID错误
error_type.HERO_HAS_OWN = 282; //武将已经拥有