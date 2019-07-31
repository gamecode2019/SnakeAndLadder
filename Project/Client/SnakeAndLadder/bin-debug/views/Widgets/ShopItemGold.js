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
 * 商店物品列表金币类
 */
var ShopItemGold = (function (_super) {
    __extends(ShopItemGold, _super);
    function ShopItemGold() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/widgetSkins/ShopItemGoldWidget.exml";
        return _this;
    }
    ShopItemGold.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ShopingGoods, this);
        this.buy_btn.setImgScore('Common_json.button_blue_l');
        this.gro_buy.touchChildren = true; //禁用可触摸子类属性
        this.gro_buy.touchThrough = true;
        //this.gro_buy.touchEnabled = false;
        this.gro_buy.getChildAt(1).touchEnabled = false;
        this.gro_buy.getChildAt(2).touchEnabled = false;
        this.buy_btn.touchEnabled = true;
    };
    ShopItemGold.prototype.dataChanged = function () {
        //获取物品图片
        var data = ShopManager.instance().getShopItemData(this.buy_btn.label);
        if (data) {
            this.itemIco.source = data.sourceName;
        }
        else {
            console.log("ShopItemGold获取商品图片失败！");
        }
    };
    /**
 * 购买物品
 */
    ShopItemGold.prototype.ShopingGoods = function () {
        //点击后跳转支付页面；
        console.log("跳转到支付页面购买物品!");
    };
    return ShopItemGold;
}(eui.ItemRenderer));
__reflect(ShopItemGold.prototype, "ShopItemGold");
//# sourceMappingURL=ShopItemGold.js.map