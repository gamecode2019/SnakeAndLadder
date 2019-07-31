"use strict";
const type = {};
module.exports = type;

// 帐号信息
type.UserInfo = function UserInfo() {
    this.id = 0; // 玩家UID
    this.userName = ""; //用户名
};