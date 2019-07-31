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
var TipTextBtnWidget = (function (_super) {
    __extends(TipTextBtnWidget, _super);
    /**
     * 皮肤初始化
     */
    function TipTextBtnWidget() {
        var _this = _super.call(this) || this;
        //特效
        _this.effect = null;
        _this.skinName = "resource/eui_skins/widgetSkins/TipTextBtnWidget.exml";
        return _this;
    }
    /**
     * 初始化
     */
    TipTextBtnWidget.prototype.onInit = function () {
    };
    TipTextBtnWidget.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.effect = EffectManager.instance().createEffect("btn_flash", "test1", -1);
        this.effectParent.x += 10;
        if (this.effect != null) {
            this.effect.play(-1, this.effectParent);
        }
    };
    /**
     * 设置图片
     * @param {string} imgName 图片名称
     * @return {void}
     */
    TipTextBtnWidget.prototype.setIcon = function (imgName) {
        this.icon.source = imgName;
    };
    /**
     * 设置top部分文字
     * @param {string} 文字内容
     * @return {void}
     */
    TipTextBtnWidget.prototype.setTop = function (top) {
        this.topText.text = top;
    };
    /**
     * 设置底部文字
     * @param {string} 文字内容
     * @return {void}
     */
    TipTextBtnWidget.prototype.setBottom = function (bo) {
        this.bottomText.text = bo;
    };
    /**
     * 释放特效
     */
    TipTextBtnWidget.prototype.onRelease = function () {
        this.effect = null;
    };
    return TipTextBtnWidget;
}(eui.Component));
__reflect(TipTextBtnWidget.prototype, "TipTextBtnWidget", ["UIWidget"]);
//# sourceMappingURL=TipTextBtnWidget.js.map