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
var UnMatchTipWindow = (function (_super) {
    __extends(UnMatchTipWindow, _super);
    function UnMatchTipWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnMatchTipWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/UnMatchTipSkin.exml";
        this.registerBtnEvent();
    };
    UnMatchTipWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    UnMatchTipWindow.prototype.registerBtnEvent = function () {
        Utils.getInstance().buttonEffect(this.determine, this.onDetermine, this);
        Utils.getInstance().buttonEffect(this.back, this.onBack, this);
        Utils.getInstance().buttonEffect(this.quit, this.onBack, this);
    };
    UnMatchTipWindow.prototype.onDetermine = function (e) {
        // UIManager.instance().closeWindow("SettingWindow")
        // this.closeMainUI()
        platform.quit();
    };
    UnMatchTipWindow.prototype.onBack = function (e) {
        this.closeMainUI();
    };
    UnMatchTipWindow.prototype.closeMainUI = function () {
        UIManager.instance().closeWindow("UnMatchTipWindow");
    };
    return UnMatchTipWindow;
}(UIWindow));
__reflect(UnMatchTipWindow.prototype, "UnMatchTipWindow");
//# sourceMappingURL=UnMatchTipWindow.js.map