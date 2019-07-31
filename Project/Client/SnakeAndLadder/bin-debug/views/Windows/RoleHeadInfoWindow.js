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
/**
 * 角色个人信息
 */
var RoleHeadInfoWindow = (function (_super) {
    __extends(RoleHeadInfoWindow, _super);
    function RoleHeadInfoWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 界面初始化
     */
    RoleHeadInfoWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/RoleHeadInfoSkin.exml";
        this.registerBtnEvent();
        //初始化个人信息界面
        this.initWindow();
    };
    /**
     * 初始化个人信息界面
     */
    RoleHeadInfoWindow.prototype.initWindow = function () {
        this.playerInfo = UserManager.instance().getCurPlayerInfo(); //获取当前点击小头像的用户信息
        this.lab_total.text = this.playerInfo.gameTotalCount.toString(); //参加游戏总场次
        this.lab_one.text = this.playerInfo.getFirstCount.toString(); //获取第一名场次
        /**
         * 图像使用范例
         */
        var that = this;
        this.head_icon.setNameVisiable(true);
        this.head_icon.data = { playerInfo: this.playerInfo };
    };
    /**
     * 注册事件
     */
    RoleHeadInfoWindow.prototype.registerBtnEvent = function () {
        //this.bgImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeRoleHeadInfo,this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRoleHeadInfo, this);
        this.btn_close.setImgScore("Common_json.icon_x");
    };
    /**
     * 关闭界面
     */
    RoleHeadInfoWindow.prototype.closeRoleHeadInfo = function () {
        console.log("关闭界面");
        UIManager.instance().closeWindow("RoleHeadInfoWindow");
    };
    return RoleHeadInfoWindow;
}(UIWindow));
__reflect(RoleHeadInfoWindow.prototype, "RoleHeadInfoWindow");
//# sourceMappingURL=RoleHeadInfoWindow.js.map