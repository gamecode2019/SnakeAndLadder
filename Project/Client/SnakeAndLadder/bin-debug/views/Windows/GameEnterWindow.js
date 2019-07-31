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
var GameEnterWindow = (function (_super) {
    __extends(GameEnterWindow, _super);
    function GameEnterWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameEnterWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/GameEnterSkin.exml";
        this.registerBtnEvent();
        this.initWindow();
    };
    /**
     * 组件第一次添加到舞台时回调
     */
    GameEnterWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 初始化窗口
     */
    GameEnterWindow.prototype.initWindow = function () {
        this.start_1.getLabel().text = 'Play now';
        this.start_2.getLabel().text = 'with Friends';
        this.start_3.getLabel().text = 'Training';
    };
    /**
     * 注册按钮事件
     */
    GameEnterWindow.prototype.registerBtnEvent = function () {
        this.start_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterGame1, this);
        this.start_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterGame2, this);
        this.start_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterGame3, this);
    };
    /**
     * start_1点击开始游戏(匹配模式)
     */
    GameEnterWindow.prototype.clickEnterGame1 = function (event) {
        //开始游戏
        GameManager.instance().enterGame(GameType.matchingMode);
    };
    /**
 * start_2点击开始游戏(好友模式)
 */
    GameEnterWindow.prototype.clickEnterGame2 = function (event) {
        //开始游戏
        GameManager.instance().enterGame(GameType.firendMode);
    };
    /**
 * start_3点击开始游戏(练习模式)
 */
    GameEnterWindow.prototype.clickEnterGame3 = function (event) {
        //开始游戏
        GameManager.instance().enterGame(GameType.normalMode);
    };
    /**
     * 释放窗口
     */
    GameEnterWindow.prototype.release = function () {
        // this.union.onRelease();
        // this.task.onRelease();
    };
    return GameEnterWindow;
}(UIWindow));
__reflect(GameEnterWindow.prototype, "GameEnterWindow");
//# sourceMappingURL=GameEnterWindow.js.map