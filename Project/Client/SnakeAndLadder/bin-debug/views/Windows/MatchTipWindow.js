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
var MatchTipWindow = (function (_super) {
    __extends(MatchTipWindow, _super);
    function MatchTipWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchTipWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/MatchTipSkin.exml";
        this.registerBtnEvent();
    };
    MatchTipWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchTipWindow.prototype.registerBtnEvent = function () {
        Utils.getInstance().buttonEffect(this.determine, this.onDetermine, this);
        Utils.getInstance().buttonEffect(this.back, this.onBack, this);
        Utils.getInstance().buttonEffect(this.quit, this.onBack, this);
    };
    MatchTipWindow.prototype.onDetermine = function (e) {
        //从游戏界面到大厅用这一句
        GameManager.instance().endGame();
    };
    MatchTipWindow.prototype.onBack = function (e) {
        this.closeMainUI();
    };
    MatchTipWindow.prototype.closeMainUI = function () {
        UIManager.instance().closeWindow("MatchTipWindow");
    };
    return MatchTipWindow;
}(UIWindow));
__reflect(MatchTipWindow.prototype, "MatchTipWindow");
//# sourceMappingURL=MatchTipWindow.js.map