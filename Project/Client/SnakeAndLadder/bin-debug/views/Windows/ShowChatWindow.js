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
var ShowChatWindow = (function (_super) {
    __extends(ShowChatWindow, _super);
    function ShowChatWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowChatWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/ShowChatSkin.exml";
        this.registerEvent();
    };
    ShowChatWindow.prototype.registerEvent = function () {
    };
    ShowChatWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.time = new egret.Timer(3000, 1);
        this.arr = [[this.emojis_group0, this.emojis0, this.emojis_group4, this.chat0], [this.emojis_group1, this.emojis1, this.emojis_group5, this.chat1],
            [this.emojis_group2, this.emojis2, this.emojis_group6, this.chat2], [this.emojis_group3, this.emojis3, this.emojis_group7, this.chat3]];
    };
    ShowChatWindow.prototype.closeMainUI = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    ShowChatWindow.prototype.showEmojis = function (seadID, source) {
        var _this = this;
        if (this.current != null) {
            this.current.visible = false;
        }
        this.arr[seadID][0].visible = true;
        this.arr[seadID][1].source = source;
        this.current = this.arr[seadID][0];
        this.time.start();
        this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            _this.arr[seadID][0].visible = false;
            _this.time.stop();
            _this.current = null;
        }, this);
    };
    ShowChatWindow.prototype.showChat = function (seadID, tex) {
        var _this = this;
        if (this.current != null) {
            this.current.visible = false;
        }
        this.arr[seadID][2].visible = true;
        this.arr[seadID][3].text = tex;
        this.current = this.arr[seadID][2];
        this.time.start();
        this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            _this.arr[seadID][2].visible = false;
            _this.current = null;
            _this.time.stop();
        }, this);
    };
    return ShowChatWindow;
}(UIWindow));
__reflect(ShowChatWindow.prototype, "ShowChatWindow");
//# sourceMappingURL=ShowChatWindow.js.map