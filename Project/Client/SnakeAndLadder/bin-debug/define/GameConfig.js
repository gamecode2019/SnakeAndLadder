var GameConfig = {};
GameConfig.loginUrl = 'http://192.168.1.107:8201/'; //
GameConfig.gameUrl = 'http://127.0.0.1:8202/';
GameConfig.assetUrl = 'http://127.0.0.1:7000/';
GameConfig.wsServer = '127.0.0.1';
GameConfig.port = 8200;
//登陆方式（与服务器保持一致）
var LoginType;
(function (LoginType) {
    LoginType[LoginType["DEFAULT"] = 0] = "DEFAULT";
    LoginType[LoginType["USERNAME"] = 1] = "USERNAME";
    LoginType[LoginType["WECHAT"] = 2] = "WECHAT";
    LoginType[LoginType["FACEBOOK"] = 3] = "FACEBOOK";
})(LoginType || (LoginType = {}));
var GameLoginType = LoginType.FACEBOOK;
//游戏模式
var DebugType;
(function (DebugType) {
    DebugType[DebugType["OnLine"] = 1] = "OnLine";
    DebugType[DebugType["OffLine"] = 2] = "OffLine";
})(DebugType || (DebugType = {}));
var GameDebug = DebugType.OnLine;
//# sourceMappingURL=GameConfig.js.map