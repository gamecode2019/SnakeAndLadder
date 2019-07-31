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
var ProgressBarWidget = (function (_super) {
    __extends(ProgressBarWidget, _super);
    /**
     * 构造
     */
    function ProgressBarWidget() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/widgetSkins/ProgressBarWidget.exml";
        _this.forward.mask = _this.forwardMask;
        return _this;
    }
    /**
     * 初始化
     */
    ProgressBarWidget.prototype.onInit = function () {
    };
    /**
     * 设置图片
     * @param {string} background 底图资源名称
     * @param {string} forward 前面进度图名称
     * @return {void}
     */
    ProgressBarWidget.prototype.setBarImg = function (background, forward) {
        this.background.source = background;
        this.forward.source = forward;
    };
    /**
     * 设置进度条值
     * @param {number} percent 进度百分比值
     * @return {void}
     */
    ProgressBarWidget.prototype.setProgress = function (percent) {
        if (percent > 1) {
            percent = 1;
        }
        else if (percent < 0) {
            percent = 0;
        }
        this.forwardMask = new egret.Rectangle(0, 0, this.width * percent, this.height);
        this.forward.mask = this.forwardMask;
    };
    return ProgressBarWidget;
}(eui.Component));
__reflect(ProgressBarWidget.prototype, "ProgressBarWidget", ["UIWidget"]);
//# sourceMappingURL=ProgressBarWidget.js.map