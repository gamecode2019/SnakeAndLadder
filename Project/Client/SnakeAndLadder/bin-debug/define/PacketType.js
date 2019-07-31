var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// 所有协议的基类
var IPacket = (function () {
    function IPacket() {
        this.pt = ''; // 协议名称
    }
    return IPacket;
}());
__reflect(IPacket.prototype, "IPacket");
var CS_Packet = (function (_super) {
    __extends(CS_Packet, _super);
    function CS_Packet() {
        var _this = _super.call(this) || this;
        _this.tk = ''; // 登录令牌
        _this.uid = 0;
        _this.zid = 0;
        _this.tk = UserManager.instance().getUserInfo().token;
        _this.uid = UserManager.instance().getUserInfo().uid;
        _this.zid = 0;
        return _this;
    }
    return CS_Packet;
}(IPacket));
__reflect(CS_Packet.prototype, "CS_Packet");
var SC_Packet = (function (_super) {
    __extends(SC_Packet, _super);
    function SC_Packet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ret = 1; // 操作结果
        return _this;
    }
    return SC_Packet;
}(IPacket));
__reflect(SC_Packet.prototype, "SC_Packet");
// 用户登陆
var CS_Ping = (function (_super) {
    __extends(CS_Ping, _super);
    function CS_Ping() {
        var _this = _super.call(this) || this;
        _this.pt = "Ping";
        return _this;
    }
    return CS_Ping;
}(CS_Packet));
__reflect(CS_Ping.prototype, "CS_Ping");
////////////////////////////////////////////////////
// 用户登陆
var CS_UserLogin = (function (_super) {
    __extends(CS_UserLogin, _super);
    function CS_UserLogin() {
        var _this = _super.call(this) || this;
        _this.type = 0; //登陆类型 
        _this.acc = "zhangte"; //账号
        _this.pw = 1; //密码
        _this.code = ''; // 微信登陆生成的code
        _this.inviteId = 0; // 邀请人的id
        _this.avatarUrl = ''; // 头像
        _this.gender = 1; // 性别
        _this.nickName = '游客'; // 昵称
        _this.pt = "UserLogin";
        return _this;
    }
    return CS_UserLogin;
}(CS_Packet));
__reflect(CS_UserLogin.prototype, "CS_UserLogin");
var SC_UserLogin = (function (_super) {
    __extends(SC_UserLogin, _super);
    function SC_UserLogin() {
        var _this = _super.call(this) || this;
        _this.ret = -1;
        _this.userData = null; //账户
        _this.playerData = null; //玩家信息
        _this.pt = "UserLogin";
        return _this;
    }
    return SC_UserLogin;
}(SC_Packet));
__reflect(SC_UserLogin.prototype, "SC_UserLogin");
////////////////////////////////////////////////////
// 角色数据
var CS_UpdatePlayerData = (function (_super) {
    __extends(CS_UpdatePlayerData, _super);
    function CS_UpdatePlayerData() {
        var _this = _super.call(this) || this;
        _this.playerData = null; //玩家信息
        _this.pt = "UpdatePlayerData";
        return _this;
    }
    return CS_UpdatePlayerData;
}(CS_Packet));
__reflect(CS_UpdatePlayerData.prototype, "CS_UpdatePlayerData");
var SC_UpdatePlayerData = (function (_super) {
    __extends(SC_UpdatePlayerData, _super);
    function SC_UpdatePlayerData() {
        var _this = _super.call(this) || this;
        _this.playerData = null; //玩家信息
        _this.pt = "UpdatePlayerData";
        return _this;
    }
    return SC_UpdatePlayerData;
}(SC_Packet));
__reflect(SC_UpdatePlayerData.prototype, "SC_UpdatePlayerData");
//////////////////////商城//////////////////////////////
//登录初始化商店
var CS_InitShop = (function (_super) {
    __extends(CS_InitShop, _super);
    function CS_InitShop() {
        var _this = _super.call(this) || this;
        _this.pt = "InitShop";
        return _this;
    }
    return CS_InitShop;
}(CS_Packet));
__reflect(CS_InitShop.prototype, "CS_InitShop");
var SC_InitShop = (function (_super) {
    __extends(SC_InitShop, _super);
    function SC_InitShop() {
        var _this = _super.call(this) || this;
        // public name:string='';              //物品名字
        // public price:number=0;              //价格
        // public id:number=0;                 //物品id
        // public itemType:ShopBagType=null;   //商品类型
        _this.itemlist = [];
        _this.pt = "InitShop";
        return _this;
    }
    return SC_InitShop;
}(SC_Packet));
__reflect(SC_InitShop.prototype, "SC_InitShop");
//更新玩家物品信息和金币数量
var CS_UpdatePlayerItem = (function (_super) {
    __extends(CS_UpdatePlayerItem, _super);
    function CS_UpdatePlayerItem() {
        var _this = _super.call(this) || this;
        _this.gold = 0; //货币
        _this.myScans = []; //我的皮肤
        _this.myEmoticons = []; //我拥有的表情包
        _this.itemId = 0; //购买的物品id
        _this.price = 0; //购买的物品价格
        _this.pt = "UpdatePlayerItem";
        return _this;
    }
    return CS_UpdatePlayerItem;
}(CS_Packet));
__reflect(CS_UpdatePlayerItem.prototype, "CS_UpdatePlayerItem");
var SC_UpdatePlayerItem = (function (_super) {
    __extends(SC_UpdatePlayerItem, _super);
    function SC_UpdatePlayerItem() {
        var _this = _super.call(this) || this;
        _this.gold = 0; //货币
        _this.myScans = []; //我的皮肤
        _this.myEmoticons = []; //我拥有的表情包
        _this.pt = "UpdatePlayerItem";
        return _this;
    }
    return SC_UpdatePlayerItem;
}(SC_Packet));
__reflect(SC_UpdatePlayerItem.prototype, "SC_UpdatePlayerItem");
//////////////////////游戏//////////////////////////////
// 房间登录
var CS_RomeLogin = (function (_super) {
    __extends(CS_RomeLogin, _super);
    function CS_RomeLogin() {
        var _this = _super.call(this) || this;
        _this.type = 0; //登陆类型 
        _this.roomid = 0; //房间编号(0创建匹配到房间、其他加入roomid房间)
        _this.playerData = null; //玩家信息
        _this.pt = "RomeLogin";
        return _this;
    }
    return CS_RomeLogin;
}(CS_Packet));
__reflect(CS_RomeLogin.prototype, "CS_RomeLogin");
var SC_RomeLogin = (function (_super) {
    __extends(SC_RomeLogin, _super);
    function SC_RomeLogin() {
        var _this = _super.call(this) || this;
        _this.type = 0; //登陆类型
        _this.roomid = 0; //房间编号
        _this.seatid = -1;
        _this.playerData = null; //玩家信息
        _this.status = 0; //1.继续匹配 2.可以开始 3.自动开始 -1失败
        _this.pt = "RomeLogin";
        return _this;
    }
    return SC_RomeLogin;
}(SC_Packet));
__reflect(SC_RomeLogin.prototype, "SC_RomeLogin");
// 房间退出
var CS_RomeLoguot = (function (_super) {
    __extends(CS_RomeLoguot, _super);
    function CS_RomeLoguot() {
        var _this = _super.call(this) || this;
        _this.seatid = 0; //玩家编号
        _this.roomid = 0; //房间编号
        _this.pt = "RomeLoguot";
        return _this;
    }
    return CS_RomeLoguot;
}(CS_Packet));
__reflect(CS_RomeLoguot.prototype, "CS_RomeLoguot");
var SC_RomeLoguot = (function (_super) {
    __extends(SC_RomeLoguot, _super);
    function SC_RomeLoguot() {
        var _this = _super.call(this) || this;
        _this.seatid = 0; //玩家编号
        _this.pt = "RomeLoguot";
        return _this;
    }
    return SC_RomeLoguot;
}(SC_Packet));
__reflect(SC_RomeLoguot.prototype, "SC_RomeLoguot");
// 房间信息
var CS_RoomInfo = (function (_super) {
    __extends(CS_RoomInfo, _super);
    function CS_RoomInfo() {
        var _this = _super.call(this) || this;
        _this.roomid = 0; //房间编号
        _this.pt = "RomeInfo";
        return _this;
    }
    return CS_RoomInfo;
}(CS_Packet));
__reflect(CS_RoomInfo.prototype, "CS_RoomInfo");
var SC_RoomInfo = (function (_super) {
    __extends(SC_RoomInfo, _super);
    function SC_RoomInfo() {
        var _this = _super.call(this) || this;
        _this.roominfo = null; //
        _this.pt = "RomeInfo";
        return _this;
    }
    return SC_RoomInfo;
}(SC_Packet));
__reflect(SC_RoomInfo.prototype, "SC_RoomInfo");
// 开始游戏
var CS_StartGame = (function (_super) {
    __extends(CS_StartGame, _super);
    function CS_StartGame() {
        var _this = _super.call(this) || this;
        _this.roomid = 0; //房间编号
        _this.seatid = 0; //玩家编号
        _this.handStart = false; //《好友房》手动开始
        _this.pt = "StartGame";
        return _this;
    }
    return CS_StartGame;
}(CS_Packet));
__reflect(CS_StartGame.prototype, "CS_StartGame");
var SC_StartGame = (function (_super) {
    __extends(SC_StartGame, _super);
    function SC_StartGame() {
        var _this = _super.call(this) || this;
        _this.seatid = 0; //玩家编号
        _this.pt = "StartGame";
        return _this;
    }
    return SC_StartGame;
}(SC_Packet));
__reflect(SC_StartGame.prototype, "SC_StartGame");
//操作
var CS_Operation = (function (_super) {
    __extends(CS_Operation, _super);
    function CS_Operation() {
        var _this = _super.call(this) || this;
        _this.roomid = 0; //房间编号
        _this.seatid = 0; //玩家编号
        _this.rollNum = 0; //随机点数
        _this.optType = 0; //操作类型
        _this.pt = "Operation";
        return _this;
    }
    return CS_Operation;
}(CS_Packet));
__reflect(CS_Operation.prototype, "CS_Operation");
var SC_Operation = (function (_super) {
    __extends(SC_Operation, _super);
    function SC_Operation() {
        var _this = _super.call(this) || this;
        _this.seatid = 0; //玩家编号
        _this.rollNum = 0; //随机点数
        _this.optType = 0; //操作类型
        _this.firstHandSeatId = -1; //先手座位号
        _this.moveArr = []; //操作事件列表
        _this.pt = "Operation";
        return _this;
    }
    return SC_Operation;
}(SC_Packet));
__reflect(SC_Operation.prototype, "SC_Operation");
//结算
var CS_EndGame = (function (_super) {
    __extends(CS_EndGame, _super);
    function CS_EndGame() {
        var _this = _super.call(this) || this;
        _this.roomid = 0; //房间编号
        _this.pt = "EndGame";
        return _this;
    }
    return CS_EndGame;
}(CS_Packet));
__reflect(CS_EndGame.prototype, "CS_EndGame");
var SC_EndGame = (function (_super) {
    __extends(SC_EndGame, _super);
    function SC_EndGame() {
        var _this = _super.call(this) || this;
        _this.pt = "EndGame";
        return _this;
    }
    return SC_EndGame;
}(SC_Packet));
__reflect(SC_EndGame.prototype, "SC_EndGame");
//聊天
var CS_Chat = (function (_super) {
    __extends(CS_Chat, _super);
    function CS_Chat() {
        var _this = _super.call(this) || this;
        _this.roomid = 0; //房间编号
        _this.seatid = 0; //玩家编号
        _this.msg = ''; //聊天信息， 表情：'[f:0]'、快捷语：'[k:1]' 命令：[cmd:exit]
        _this.pt = "Chat";
        return _this;
    }
    return CS_Chat;
}(CS_Packet));
__reflect(CS_Chat.prototype, "CS_Chat");
var SC_Chat = (function (_super) {
    __extends(SC_Chat, _super);
    function SC_Chat() {
        var _this = _super.call(this) || this;
        _this.seatid = 0; //玩家编号
        _this.msg = ''; //聊天信息
        _this.pt = "Chat";
        return _this;
    }
    return SC_Chat;
}(SC_Packet));
__reflect(SC_Chat.prototype, "SC_Chat");
//# sourceMappingURL=PacketType.js.map