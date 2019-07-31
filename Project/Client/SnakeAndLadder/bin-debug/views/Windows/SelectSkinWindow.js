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
var SelectSkinWindow = (function (_super) {
    __extends(SelectSkinWindow, _super);
    function SelectSkinWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectSkinWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/SelectSkin.exml";
        this.playerInfo = UserManager.instance().getPlayerInfo();
        //注册按钮事件
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickExit, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickShare, this);
        var key = "data_name";
        var value = "data_value";
        egret.localStorage.setItem(key, value);
        var getData = egret.localStorage.getItem(key);
        //console.log(getData)
        // this.listPlayers.dataProvider=new eui.ArrayCollection(listDate)
        // this.listPlayers.itemRenderer=HeadIconWidget;
        var collection = new eui.ArrayCollection();
        var length = this.playerInfo.myScans.length;
        for (var i = 0; i < length; i++) {
            var index = this.playerInfo.myScans[i];
            //let texture=this.playerInfo.myScansHasMap.getValue(index);
            collection.addItem({ playerInfo: this.playerInfo, headType: HeadIconType.gameIconOne, headIconIndex: index });
        }
        this.listPlayers.dataProvider = collection;
        this.listPlayers.itemRenderer = HeadIconWidget;
        /**
         * 当前选择的个人形象
         */
        // var that=this;
        // this.head_icon.setNameVisiable(true);
        // this.head_icon.headType=HeadIconType.gameIcon;
        // this.head_icon.data={playerInfo:this.playerInfo}     
    };
    SelectSkinWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 关闭界面
     */
    SelectSkinWindow.prototype.onClickClose = function () {
        UIManager.instance().closeWindow("SelectSkinWindow");
    };
    /**
     * 退出按钮
     */
    SelectSkinWindow.prototype.onClickExit = function () {
        console.log("退出游戏！");
    };
    /**
     * 分享
     */
    SelectSkinWindow.prototype.onClickShare = function () {
        console.log("分享游戏！");
    };
    SelectSkinWindow.prototype.closeMainUI = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return SelectSkinWindow;
}(UIWindow));
__reflect(SelectSkinWindow.prototype, "SelectSkinWindow");
//# sourceMappingURL=SelectSkinWindow.js.map