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
var MainWindow = (function (_super) {
    __extends(MainWindow, _super);
    function MainWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化主界面
     */
    MainWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/MainSkin.exml";
        this.registerBtnEvent();
        this.initWindow();
    };
    /**
     * 组件第一次添加到舞台时回调
     */
    MainWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        UIManager.instance().openWindow("RankWindow");
        UIManager.instance().openWindow("RoleTopInfoWidget");
        UIManager.instance().openWindow("GameEnterWindow");
    };
    /**
     * 初始化窗口
     */
    MainWindow.prototype.initWindow = function () {
        //ShopManager.instance().setShopData();
        console.info(UserManager.instance().getUserInfo());
        //this.nick_name.text = UserManager.instance().getUserInfo().nickName;
    };
    /**
     * 更新大厅信息
     */
    MainWindow.prototype.updateInfo = function () {
    };
    /**
     * 注册按钮事件
     */
    MainWindow.prototype.registerBtnEvent = function () {
    };
    /**
     * 打开游戏设置界面
     */
    MainWindow.prototype.clickEnterSetting = function (event) {
        console.log("打开游戏设置界面");
        UIManager.instance().openWindow("SettingWindow");
    };
    // /**
    //  * 打开商店
    //  */
    // private clickEnterShop(event:egret.TouchEvent):void
    // {
    //     console.log("打开商店")
    //     UIManager.instance().closeWindow("MainWindow");
    //     UIManager.instance().closeWindow("RankWindow")
    //     UIManager.instance().closeWindow("FriendRankWindow")
    //     UIManager.instance().closeWindow("GobalRankWindow")
    //     UIManager.instance().openWindow("ShopWindow");
    // }
    /**
     * 关闭主界面
     */
    MainWindow.prototype.closeMainUI = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 释放窗口
     */
    MainWindow.prototype.release = function () {
        // this.union.onRelease();
        // this.task.onRelease();
    };
    return MainWindow;
}(UIWindow));
__reflect(MainWindow.prototype, "MainWindow");
//# sourceMappingURL=MainWindow.js.map