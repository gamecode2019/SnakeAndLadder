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
var SelectServiceToggleBtn = (function (_super) {
    __extends(SelectServiceToggleBtn, _super);
    /**
     * 构造函数
     */
    function SelectServiceToggleBtn() {
        var _this = _super.call(this) || this;
        _this.onInit();
        return _this;
    }
    /**
     * 初始化
     */
    SelectServiceToggleBtn.prototype.onInit = function () {
        this.skinName = "resource/eui_skins/widgetSkins/SelectServiceToggleBtn.exml";
    };
    /**
     * 设置大区名称
     */
    SelectServiceToggleBtn.prototype.setLabel = function (text) {
        this.ser_area.text = text;
    };
    return SelectServiceToggleBtn;
}(eui.ToggleButton));
__reflect(SelectServiceToggleBtn.prototype, "SelectServiceToggleBtn", ["UIWidget"]);
//# sourceMappingURL=SelectServiceToggleBtn.js.map