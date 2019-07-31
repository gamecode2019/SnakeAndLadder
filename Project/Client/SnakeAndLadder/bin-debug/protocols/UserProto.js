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
var UserProto = (function (_super) {
    __extends(UserProto, _super);
    function UserProto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取单例
     * @return {object} UserProto
     */
    UserProto.instance = function () {
        if (!UserProto._instance) {
            UserProto._instance = new UserProto();
        }
        return UserProto._instance;
    };
    ///////////////////////////////////////////////////////////
    //登陆
    /**
     * 处理用户登录.
     * @param {object} message
     * @return void
     */
    UserProto.prototype.requestUserLogin = function (message) {
        message.type = GameLoginType;
        HttpHandler.instance().sendLoginMessage(message);
    };
    /**
     * WEB账号密码登录
     */
    UserProto.prototype.requestLoginByWeb = function (message) {
        message.type = LoginType.USERNAME;
        message.acc = '张辉';
        message.pw = '1233456';
        message.inviteId = 0;
        if (GameDebug == DebugType.OffLine) {
            //测试用户信息
            UserManager.instance().getPlayerInfo().nickName = '123';
            UserManager.instance().getPlayerInfo().avatarUrl = 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUbNicL4RicqD50sFfian0CRH9AkMbicN5q8YhaTeC4df8aG8MPkiaNwK8vM36f7OTppH2SdZOlpkTUvA/132';
            MySceneManager.OnCreate().LoadMainScene();
            UIManager.instance().openWindow("MainWindow");
            return;
        }
        HttpHandler.instance().sendLoginMessage(message);
    };
    /**
     * 微信登录
     */
    UserProto.prototype.requestLoginByWeChat = function (message, code) {
        message.type = GameLoginType;
        message.code = code;
        message.inviteId = 0;
        HttpHandler.instance().sendLoginMessage(message);
    };
    /**
     * feceBook登录
     */
    UserProto.prototype.requestLoginByFaceBook = function (message, player) {
        // console.info(player.getSignedPlayerInfoAsync());
        message.type = LoginType.FACEBOOK;
        message.uid = parseInt(player.getID());
        message.nickName = player.getName();
        message.avatarUrl = player.getPhoto();
        message.inviteId = 0;
        if (GameDebug == DebugType.OffLine) {
            //测试用户信息
            UserManager.instance().getPlayerInfo().nickName = player.getName();
            UserManager.instance().getPlayerInfo().avatarUrl = player.getPhoto();
            UserManager.instance().getPlayerInfo().id = parseInt(player.getID());
            MySceneManager.OnCreate().LoadMainScene();
            UIManager.instance().openWindow("MainWindow");
            return;
        }
        HttpHandler.instance().sendLoginMessage(message);
    };
    /**
     * 处理用户登录.
     * @param {SC_UserLogin} message
     * @return void
     */
    UserProto.prototype.handleUserLogin = function (message) {
        UserManager.instance().setUserInfo(message);
        this.requestUpdatePlayerData();
    };
    /**
     * 用户登录失败
     * @param {SC_UserLogin}
     * @return void
     */
    UserProto.prototype.failUserLogin = function (message) {
    };
    //////////////////////////////////////////////////
    //玩家数据
    /**
     * 处理请求玩家数据
     */
    UserProto.prototype.requestUpdatePlayerData = function () {
        var message = new CS_UpdatePlayerData();
        //测试
        message.playerData = UserManager.instance().getPlayerInfo();
        message.playerData.gold = 998;
        message.playerData.gameTotalCount = 999;
        HttpHandler.instance().sendLoginMessage(message);
    };
    /**
     * 处理成功获得玩家数据
     */
    UserProto.prototype.handleUpdatePlayerData = function (message) {
        console.info('handleUpdatePlayerData:', message);
        UserManager.instance().updatePlayerInfo(message);
        if (!UserManager.instance().isLogin) {
            UserManager.instance().isLogin = true;
            MySceneManager.OnCreate().LoadMainScene();
            UIManager.instance().openWindow("MainWindow");
        }
    };
    /**
     * 处理获取玩家数据失败
     */
    UserProto.prototype.failUpdatePlayerData = function (message) {
    };
    /**
     * 注册全部协议
     */
    UserProto.prototype.registerProtocol = function () {
        // HttpHandler.instance().registerProtocol('UserLogin', this);
        // HttpHandler.instance().registerProtocol('UpdatePlayerData', this);
    };
    // 单例
    UserProto._instance = null;
    return UserProto;
}(ProtoBase));
__reflect(UserProto.prototype, "UserProto");
//# sourceMappingURL=UserProto.js.map