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
var LoginWindow = (function (_super) {
    __extends(LoginWindow, _super);
    function LoginWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 界面初始化
     */
    LoginWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/LoginUISkin.exml";
        this.registerBtnEvent();
        console.log("into ");
        // this.initWindow();
    };
    /**
     * 创建子结点
     */
    LoginWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.log("createChildren");
    };
    /**
     * 注册按钮事件
     */
    LoginWindow.prototype.registerBtnEvent = function () {
        this.enter_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterGame, this);
    };
    /**
     * 初始化窗口
     */
    LoginWindow.prototype.initWindow = function () {
        this.tip.lineSpacing = 5;
    };
    /**
     * 点击游戏按钮事件
     */
    LoginWindow.prototype.clickEnterGame = function (event) {
        //GameNetwork.Instance.connect();
        //UserProto.instance().requestGetPlayerData();
        UIManager.instance().closeWindow("LoginWindow");
        UIManager.instance().openWindow("MainWindow");
    };
    return LoginWindow;
}(UIWindow));
__reflect(LoginWindow.prototype, "LoginWindow");
//# sourceMappingURL=LoginWindow.js.map