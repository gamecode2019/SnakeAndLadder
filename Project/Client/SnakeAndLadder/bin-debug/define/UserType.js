var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserInfo = (function () {
    function UserInfo() {
        this.uid = 0; // 用户ID
        this.token = ''; // 用户登陆令牌
        this.isNewPlayer = ''; // 新用户
    }
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
var PlayerInfo = (function () {
    function PlayerInfo() {
        //base
        this.id = 0; // 用户ID
        this.nickName = '游客'; // 用户昵称
        this.gender = 1; //性别
        this.newPlayer = 0; // 新用户
        this.avatarUrl = 'https://lg-3q7kbp58-1257126548.cos.ap-shanghai.myqcloud.com/images/test/ball.png'; //图像
        this.diamond = 0;
        this.gold = 10000; //货币
        this.loginTime = ''; //登录时间
        //other
        this.myScans = []; //我的皮肤
        this.selectScan = 0; //当前选择皮肤
        this.myEmoticons = []; //我拥有的表情包
        this.gameTotalCount = 0; //参加游戏总场次
        this.getFirstCount = 0; //获取第一名场次
        //public myScansHasMap:HashMap=null;
    }
    return PlayerInfo;
}());
__reflect(PlayerInfo.prototype, "PlayerInfo");
var GameInfo = (function () {
    function GameInfo() {
        /**
         * 游戏状态(0未开始,1操作中,2操作完,3等待中,9完成,10 offLine离线托管)
         */
        this.state = 0;
        this.seatid = -1; //座位号
        this.firstHandRoll = 0; //先手摇到的点数
        this.nowStep = 0; //步数
        this.nowRoll = 0; // 摇到的点数
        this.preStep = 0; //上一次的步数
        this.maxStep = 47; //目标步数
    }
    return GameInfo;
}());
__reflect(GameInfo.prototype, "GameInfo");
var RoomInfo = (function () {
    function RoomInfo() {
        this.roomID = 0; // 房间id
        this.playerNum = 4; // 游戏人数
        this.gameState = 0; //游戏状态
        this.firstHandIdx = -1; //先手标识
        this.players = []; //玩家列表
        this.gameInfos = []; //玩家操作
        this.optIndex = 0; //当前操作玩家
        this.optCD = 5; //操作时间
    }
    return RoomInfo;
}());
__reflect(RoomInfo.prototype, "RoomInfo");
/**
 * 物品
 */
var ShopItemInfo = (function () {
    function ShopItemInfo() {
        this.name = ''; //物品名字
        this.price = 0; //价格
        this.id = 0; //物品id
        this.itemType = null; //商品类型
    }
    return ShopItemInfo;
}());
__reflect(ShopItemInfo.prototype, "ShopItemInfo");
/**
 * 商店物品信息
 */
var ShoppingItemInfo = (function () {
    function ShoppingItemInfo() {
        this.name = ''; //物品名字
        this.price = 0; //价格
        this.id = 0; //物品id
        this.shopdataArr = []; //商店物品数据
        this.itemType = null; //商品类型
        this.sourceName = ''; //物品图片名字
    }
    return ShoppingItemInfo;
}());
__reflect(ShoppingItemInfo.prototype, "ShoppingItemInfo");
//# sourceMappingURL=UserType.js.map