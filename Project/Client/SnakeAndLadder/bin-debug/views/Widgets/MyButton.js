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
 * MyButton
 * 自定义按钮 自带点击效果（缩放 可扩展）
 *
 * ```
 * //使用范例
 * private btn:MyButton;
 * btn.setImgScore('Common_json.button_green_l');
 * btn.getLabel().text = 'MyButton';
 * btn.getLabel().size = 30;
 * btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){}, this);
 * ```
 */
var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton() {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/eui_skins/widgetSkins/MyButton.exml';
        _this.registerBtnEvent();
        _this.init();
        return _this;
    }
    MyButton.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 设置皮肤
     */
    MyButton.prototype.setImgScore = function (img) {
        var image1 = this.btn.getChildAt(0);
        image1.source = RES.getRes(img);
        image1.smoothing = true;
        // this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //     console.info("?????????");
        // }, this);
    };
    /**
     * 获取文本
     */
    MyButton.prototype.getLabel = function () {
        return (this.btn.labelDisplay);
    };
    /**
     * init
     */
    MyButton.prototype.init = function () {
        this.group.width = 0;
        this.group.height = 0;
        this.getLabel().text = '';
        this.getLabel().fontFamily = 'hydsf';
        this.getLabel().size = 40;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        // this.group.touchEnabled = true;        //禁用可触摸属性
        // this.group.touchThrough = true;         //启用点击穿透属性
        // this.group.touchChildren = true;       //禁用可触摸子类属性
        // this.touchChildren = true;
        // this.btn.touchEnabled = true;
    };
    /**
    * 注册按钮事件
    */
    MyButton.prototype.registerBtnEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBeginZoom, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.scaleEndZoom, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.scaleEndZoom, this);
    };
    /**
     * 体积变化效果
     */
    MyButton.prototype.scaleBeginZoom = function (event) {
        this.scaleTo.play(0);
    };
    MyButton.prototype.scaleEndZoom = function (event) {
        this.scaleBack.play(0);
    };
    return MyButton;
}(eui.Button));
__reflect(MyButton.prototype, "MyButton");
//# sourceMappingURL=MyButton.js.map