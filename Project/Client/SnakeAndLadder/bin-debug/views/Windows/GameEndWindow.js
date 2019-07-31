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
var GameEndWindow = (function (_super) {
    __extends(GameEndWindow, _super);
    function GameEndWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化主界面
     */
    GameEndWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/GameEndSkin.exml";
        this.registerBtnEvent();
        this.initWindow();
    };
    /**
     * 组件第一次添加到舞台时回调
     */
    GameEndWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 初始化窗口
     */
    GameEndWindow.prototype.initWindow = function () {
        this.back.setImgScore('Common_json.button_blue_l');
        this.back.getLabel().text = 'Start';
        this.back.getLabel().size = 30;
        this.next.setImgScore('Common_json.button_green_l');
        this.next.getLabel().text = 'Invite more';
        this.next.getLabel().size = 30;
    };
    /**
     * 注册按钮事件
     */
    GameEndWindow.prototype.registerBtnEvent = function () {
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBackBtn, this);
        this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchNextBtn, this);
    };
    /**
     * 点击back
     */
    GameEndWindow.prototype.touchBackBtn = function () {
        this.closeMe();
    };
    /**
     * 点击next
     */
    GameEndWindow.prototype.touchNextBtn = function () {
    };
    /**
     * 关闭主界面
     */
    GameEndWindow.prototype.closeMe = function () {
        GameManager.instance().endGame();
        this.close();
    };
    /**
     * 释放窗口
     */
    GameEndWindow.prototype.release = function () {
        // this.union.onRelease();
        // this.task.onRelease();
    };
    return GameEndWindow;
}(UIWindow));
__reflect(GameEndWindow.prototype, "GameEndWindow");
//# sourceMappingURL=GameEndWindow.js.map