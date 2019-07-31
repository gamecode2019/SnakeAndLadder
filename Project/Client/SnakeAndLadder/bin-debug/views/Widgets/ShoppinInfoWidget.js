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
var ShoppinInfoWidget = (function (_super) {
    __extends(ShoppinInfoWidget, _super);
    function ShoppinInfoWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化主界面
     */
    ShoppinInfoWidget.prototype.onInit = function () {
        this.skinName = "resource/eui_skins/widgetSkins/ShoppinInfo.exml";
        this.initWindow();
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeWindow, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeWindow, this);
        this.btn_confirm.setImgScore('Common_json.button_green_l');
        this.btn_confirm.getLabel().text = 'Confirm';
        this.btn_close.setImgScore('Common_json.icon_x');
    };
    /**
     * 组件第一次添加到舞台时回调
     */
    ShoppinInfoWidget.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 初始化显示窗口
     */
    ShoppinInfoWidget.prototype.initWindow = function () {
        var shoppingItemInfo = ShopManager.instance().shoppingItemInfo;
        switch (shoppingItemInfo.type) {
            case ShoppingType.emojiSuccess:
                this.lab_content.text = shoppingItemInfo.name + " emoji was purchased successfully!";
                this.lab_content.textAlign = egret.HorizontalAlign.CENTER;
                this.lab_content.lineSpacing = 15;
                this.img_title.source = "Common_json.font_succ";
                this.im_image.source = "";
                break;
            case ShoppingType.emojiFailed:
                this.lab_content.text = "Your balance is not enough, please recharge and purchase!";
                this.lab_content.textAlign = egret.HorizontalAlign.CENTER;
                this.lab_content.lineSpacing = 15;
                this.img_title.source = "Common_json.font_fail";
                this.im_image.source = "";
                break;
            case ShoppingType.goldSuccess:
                this.lab_content.text = "Successful purchase " + shoppingItemInfo.price + "apples";
                this.lab_content.textAlign = egret.HorizontalAlign.CENTER;
                this.lab_content.lineSpacing = 15;
                this.img_title.source = "Common_json.font_succ";
                this.im_image.source = "";
                break;
            case ShoppingType.goldFailed:
                this.lab_content.text = "Your payment was unsuccessful, please try it later!";
                this.lab_content.textAlign = egret.HorizontalAlign.CENTER;
                this.lab_content.lineSpacing = 15;
                this.img_title.source = "Common_json.font_fail";
                this.im_image.source = "";
                break;
        }
        shoppingItemInfo.type = ShoppingType.NONE;
    };
    /**
     * 关闭窗口
     */
    ShoppinInfoWidget.prototype.closeWindow = function () {
        UIManager.instance().closeWindow("ShoppinInfoWidget");
    };
    return ShoppinInfoWidget;
}(UIWindow));
__reflect(ShoppinInfoWidget.prototype, "ShoppinInfoWidget");
//# sourceMappingURL=ShoppinInfoWidget.js.map