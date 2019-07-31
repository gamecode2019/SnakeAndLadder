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
var RankWindow = (function (_super) {
    __extends(RankWindow, _super);
    function RankWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/RankSkin.exml";
        Utils.getInstance().buttonEffect(this.friendBtn, this.friendRankHandler, this, this.friendText);
        Utils.getInstance().buttonEffect(this.gobalBtn, this.gobalRankHandler, this, this.globalText);
    };
    RankWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        UIManager.instance().openWindow("GobalRankWindow");
    };
    RankWindow.prototype.gobalRankHandler = function (e) {
        UIManager.instance().openWindow("GobalRankWindow");
        UIManager.instance().closeWindow("FriendRankWindow");
    };
    RankWindow.prototype.friendRankHandler = function (e) {
        UIManager.instance().openWindow("FriendRankWindow");
        UIManager.instance().closeWindow("GobalRankWindow");
    };
    return RankWindow;
}(UIWindow));
__reflect(RankWindow.prototype, "RankWindow");
//# sourceMappingURL=RankWindow.js.map