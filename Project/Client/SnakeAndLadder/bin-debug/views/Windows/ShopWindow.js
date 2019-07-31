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
var ShopWindow = (function (_super) {
    __extends(ShopWindow, _super);
    function ShopWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //商店默认显示表情包
        _this.curShopBagType = null;
        return _this;
    }
    /**
     * 初始化主界面
     */
    ShopWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        UIManager.instance().openWindow("RoleTopInfoWidget");
        this.skinName = "resource/eui_skins/windowSkins/ShopSkin.exml";
        this.registerBtnEvent();
        this.curShopBagType = ShopBagType.emojis;
        ShopManager.instance().curShopBagType = this.curShopBagType;
        this.initWindow();
    };
    /**
     * 组件第一次添加到舞台时回调
     */
    ShopWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 初始化窗口
     */
    ShopWindow.prototype.initWindow = function () {
        console.info(UserManager.instance().getUserInfo());
        //this.nick_name.text = UserManager.instance().getUserInfo().nickName;
        //初始化表情包和金币包按钮
        //this.emojis_btn.skinName="myButtonSkin"
        this.emojis_btn.getLabel().text = 'Emojis';
        this.emojis_btn.setImgScore('Common_json.button_green_l');
        this.gameGold_btn.getLabel().text = 'Apples';
        this.gameGold_btn.setImgScore('Common_json.button_blue_l');
        this.close_btn.setImgScore('Common_json.icon_x');
        //初始化窗口显示物品列表
        this.initShopItemList();
    };
    /**
     * 注册按钮事件
     */
    ShopWindow.prototype.registerBtnEvent = function () {
        //this.add_shop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickEnterShop,this)
        //this.setting_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickEnterSetting,this)
        this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeShopUI, this);
        //this.head.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickToRoleInfo,this)
        this.emojis_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickToEmojis, this);
        this.gameGold_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickToGameGold, this);
    };
    /**
     * 切换到表情包
     */
    ShopWindow.prototype.OnClickToEmojis = function () {
        this.curShopBagType = ShopBagType.emojis;
        ShopManager.instance().curShopBagType = this.curShopBagType;
        this.shop_Scroller.stopAnimation();
        this.showShopItemByType();
    };
    /**
     * 切换到金币包
     */
    ShopWindow.prototype.OnClickToGameGold = function () {
        this.curShopBagType = ShopBagType.gold;
        ShopManager.instance().curShopBagType = this.curShopBagType;
        this.shop_Scroller.stopAnimation();
        this.showShopItemByType();
    };
    /**
     * 打开游戏设置界面
     */
    ShopWindow.prototype.clickEnterSetting = function (event) {
        console.log("打开游戏设置界面");
        UIManager.instance().openWindow("SettingWindow");
    };
    /**
     * 打开商店
     */
    ShopWindow.prototype.clickEnterShop = function (event) {
        console.log("打开商店");
    };
    /**
     * 关闭商店界面
     */
    ShopWindow.prototype.closeShopUI = function () {
        // if (this.parent != null) {
        //     this.parent.removeChild(this);
        // }ShopWindow
        UIManager.instance().closeWindow("ShoppinInfoWidget");
        UIManager.instance().closeWindow("ShopWindow");
        // UIManager.instance().closeWindow("RoleTopInfoWidget")
        UIManager.instance().openWindow("MainWindow");
    };
    /**
     * 初始化窗口显示物品列表
     */
    ShopWindow.prototype.initShopItemList = function () {
        this.showShopItemByType();
        //let a=this.shopItmeList.dataProvider.getItemAt(0);
    };
    ShopWindow.prototype.valueChange = function () {
        console.log("valueChange");
    };
    /**
     * 根据商店背包类型显示物品
     */
    ShopWindow.prototype.showShopItemByType = function () {
        var dataArr = [];
        dataArr = ShopManager.instance().getShopBagByType(this.curShopBagType).values();
        ShopManager.instance().shoppingItemInfo.shopdataArr = dataArr;
        switch (this.curShopBagType) {
            case ShopBagType.emojis:
            case ShopBagType.piece:
                var euiArr = new eui.ArrayCollection(dataArr);
                this.shopItmeList.dataProvider = euiArr;
                this.shopItmeList.itemRenderer = ShopItemList;
                //用了validateNow()你会看到不断刷新的画面效果
                this.shopItmeList.validateNow();
                break;
            case ShopBagType.gold:
                var euiArr1 = new eui.ArrayCollection(dataArr);
                this.shopItmeList.dataProvider = euiArr1;
                this.shopItmeList.itemRenderer = ShopItemGold;
                //用了validateNow()你会看到不断刷新的画面效果
                this.shopItmeList.validateNow();
                break;
        }
    };
    /**
     * 释放窗口
     */
    ShopWindow.prototype.release = function () {
        // this.union.onRelease();
        // this.task.onRelease();
    };
    return ShopWindow;
}(UIWindow));
__reflect(ShopWindow.prototype, "ShopWindow");
//# sourceMappingURL=ShopWindow.js.map