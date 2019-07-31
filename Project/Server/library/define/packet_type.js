"use strict";
let packet_type = {};
module.exports = packet_type;

////////////////////////////////////////////////////
// 协议基类
packet_type.IPacket = function IPacket() {
    this.pt = this.constructor.name.substr(3);
};
packet_type.CS_Packet = extend(packet_type.IPacket, function CS_Packet() {
    packet_type.IPacket.apply(this, arguments);
    this.tk = '';
});
packet_type.SC_Packet = extend(packet_type.IPacket, function SC_Packet() {
    packet_type.IPacket.apply(this, arguments);
    this.ret = 1; // 操作结果
});

////////////////////////////////////////////////////////////////
////////////////////////////用户////////////////////////////////
// 用户登录
packet_type.CS_UserLogin = extend(packet_type.CS_Packet, function CS_UserLogin() {
    packet_type.CS_Packet.apply(this, arguments);
    this.code = '';
});
packet_type.SC_UserLogin = extend(packet_type.SC_Packet, function SC_UserLogin() {
    packet_type.SC_Packet.apply(this, arguments);
    this.userData = {};
    this.playerData = {};
});

// 用户登出
packet_type.CS_UserLogout = extend(packet_type.CS_Packet, function CS_UserLogout() {
    packet_type.CS_Packet.apply(this, arguments);
});
packet_type.SC_UserLogout = extend(packet_type.SC_Packet, function SC_UserLogout() {
    packet_type.SC_Packet.apply(this, arguments);
});

// 更新角色数据
packet_type.CS_UpdatePlayerData = extend(packet_type.CS_Packet, function CS_UpdatePlayerData() {
    packet_type.CS_Packet.apply(this, arguments);
    this.playerData = {}; // PlayerInfo
});
packet_type.SC_UpdatePlayerData = extend(packet_type.SC_Packet, function SC_UpdatePlayerData() {
    packet_type.SC_Packet.apply(this, arguments);
    this.playerData = {}; // PlayerInfo
});

////////////////////////////////////////////////////////////////
////////////////////////////商城////////////////////////////////
//玩家购买商城物品
packet_type.CS_ShopBuyInfo = extend(packet_type.CS_Packet, function CS_ShopBuyInfo() {
    packet_type.CS_Packet.apply(this, arguments);
    this.shopType = 0; //商店类型
    this.Id = 0; //物品索引
});

packet_type.SC_ShopBuyInfo = extend(packet_type.SC_Packet, function SC_ShopBuyInfo() {
    packet_type.SC_Packet.apply(this, arguments);
    this.shopType = 0; //商店类型
    this.Id = 0; //物品索引
});

////////////////////////////////////////////////////////////////
////////////////////////////排行榜//////////////////////////////


////////////////////////////////////////////////////////////////
//////////////////////////房间//////////////////////////////////
//玩家登入房间
packet_type.CS_RomeLogin = extend(packet_type.CS_Packet, function CS_RomeLogin() {
    packet_type.CS_Packet.apply(this, arguments);
    this.type = 0; //模式类型 （2训练3比赛4好友）
    this.roomid = 0; //房间编号(0创建匹配到房间、其他加入roomid房间)
    this.playerData = 0; //玩家信息
});
packet_type.SC_RomeLogin = extend(packet_type.SC_Packet, function SC_RomeLogin() {
    packet_type.SC_Packet.apply(this, arguments);
    this.type = 0; //模式类型
    this.roomid = 0; //房间编号(0创建匹配到房间、其他加入roomid房间)
    this.playerData = 0; //玩家信息
    this.status = 0; //0，1.继续匹配 2.可以开始 3.人满开始
    this.seatid = -1;
});

// 房间退出
packet_type.CS_RomeLoguot = extend(packet_type.CS_Packet, function CS_RomeLoguot() {
    packet_type.CS_Packet.apply(this, arguments);
    this.seatid = 0; //玩家编号
    this.roomid = 0; //房间编号
});
packet_type.SC_RomeLoguot = extend(packet_type.SC_Packet, function SC_RomeLoguot() {
    packet_type.SC_Packet.apply(this, arguments);
    this.seatid = 0; //玩家编号
});

// 房间信息
packet_type.CS_RoomInfo = extend(packet_type.CS_Packet, function CS_RoomInfo() {
    packet_type.CS_Packet.apply(this, arguments);
    this.seatid = 0; //玩家编号
});
packet_type.SC_RoomInfo = extend(packet_type.SC_Packet, function SC_RoomInfo() {
    packet_type.SC_Packet.apply(this, arguments);
    this.roominfo = {};
});

// 开始游戏
packet_type.CS_StartGame = extend(packet_type.CS_Packet, function CS_StartGame() {
    packet_type.CS_Packet.apply(this, arguments);
    this.roomid = 0; //房间编号
    this.seatid = 0;    //玩家编号
    this.handStart = false; //好友房 手动开始

});
packet_type.SC_StartGame = extend(packet_type.SC_Packet, function SC_StartGame() {
    packet_type.SC_Packet.apply(this, arguments);
    this.seatid = 0;    //玩家编号

});

//游戏 操作
packet_type.CS_Operation = extend(packet_type.CS_Packet, function CS_Operation() {
    packet_type.CS_Packet.apply(this, arguments);
    this.roomid = 0; //房间编号
    this.seatid = 0;    //玩家编号
    this.rollNum = 0;  //随机点数
    this.optType = 0; //操作类型

});
packet_type.SC_Operation = extend(packet_type.SC_Packet, function SC_Operation() {
    packet_type.SC_Packet.apply(this, arguments);
    this.seatid = 0;    //玩家编号
    this.rollNum = 0;  //随机点数
    this.optType = 0; //操作类型
    this.firstHandSeatId = -1;  //先手座位号
    this.moveArr = {}; //操作事件列表

});

//游戏 结算
packet_type.CS_EndGame = extend(packet_type.CS_Packet, function CS_EndGame() {
    packet_type.CS_Packet.apply(this, arguments);
    this.roomid = 0; //房间编号
});
packet_type.SC_EndGame = extend(packet_type.SC_Packet, function SC_EndGame() {
    packet_type.SC_Packet.apply(this, arguments);

});

//聊天
packet_type.CS_Chat = extend(packet_type.CS_Packet, function CS_Chat() {
    packet_type.CS_Packet.apply(this, arguments);
    this.roomid = 0; //房间编号
    this.seatid = 0;    //玩家编号
    this.msg = '';  //聊天信息， 表情：'[f:0]'、快捷语：'[k:1]' 命令：[cmd:exit]
});
packet_type.SC_Chat = extend(packet_type.SC_Packet, function SC_Chat() {
    packet_type.SC_Packet.apply(this, arguments);
    this.seatid = 0;    //玩家编号
    this.msg = '';  //聊天信息
});
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

