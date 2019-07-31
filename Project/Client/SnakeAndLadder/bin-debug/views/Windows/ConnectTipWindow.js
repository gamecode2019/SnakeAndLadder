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
// TypeScript file
var ConnectTipWindow = (function (_super) {
    __extends(ConnectTipWindow, _super);
    function ConnectTipWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化主界面
     */
    ConnectTipWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/NetConnectTip.exml";
        this.registerBtnEvent();
        this.initWindow();
    };
    /**
     * 组件第一次添加到舞台时回调
     */
    ConnectTipWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 初始化窗口
     */
    ConnectTipWindow.prototype.initWindow = function () {
        UserManager.instance().isLogin = false;
        this.reconnectBn.setImgScore('Common_json.button_blue_l');
        this.reconnectBn.getLabel().text = 'Reconnect';
        this.reconnectBn.getLabel().size = 32;
        this.closeBn.setImgScore('Common_json.button_green_l');
        this.closeBn.getLabel().text = 'Close';
        this.closeBn.getLabel().size = 32;
    };
    /**
     * 注册按钮事件
     */
    ConnectTipWindow.prototype.registerBtnEvent = function () {
        this.reconnectBn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchReconnect, this);
        this.closeBn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchcloseBn, this);
    };
    /**
     * 设置提示语
     */
    ConnectTipWindow.prototype.setTipMsg = function (msg) {
        this.tip.text = msg;
    };
    /**
     * 点击重连
     */
    ConnectTipWindow.prototype.touchReconnect = function () {
        platform.getUserInfo()
            .then(function (userInfo) {
            console.info('platform userInfo:', userInfo);
            //连接服务器
            GameNetwork.Instance.connect(function () {
                //facebook 平台
                if (!(typeof FBInstant === 'undefined')) {
                    GameNetwork.Instance.requestLoginByFaceBook(new CS_UserLogin(), userInfo);
                }
                else if (window['wx']) {
                }
                else {
                    GameNetwork.Instance.requestLoginByWeb(new CS_UserLogin());
                }
            });
        });
    };
    /**
     * 点击关闭
     */
    ConnectTipWindow.prototype.touchcloseBn = function () {
    };
    /**
     * 关闭主界面
     */
    ConnectTipWindow.prototype.closeMe = function () {
        this.close();
    };
    /**
     * 释放窗口
     */
    ConnectTipWindow.prototype.release = function () {
        // this.union.onRelease();
        // this.task.onRelease();
    };
    return ConnectTipWindow;
}(UIWindow));
__reflect(ConnectTipWindow.prototype, "ConnectTipWindow");
//# sourceMappingURL=ConnectTipWindow.js.map