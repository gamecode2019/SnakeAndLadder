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
var ClassifyCellWidget = (function (_super) {
    __extends(ClassifyCellWidget, _super);
    /**
     * 构造
     */
    function ClassifyCellWidget() {
        var _this = _super.call(this) || this;
        _this.onInit();
        return _this;
    }
    /**
     * 初始化
     */
    ClassifyCellWidget.prototype.onInit = function () {
        this.skinName = "resource/eui_skins/widgetSkins/ClassifyCellWidget.exml";
    };
    /**
     * 设置数据
     */
    ClassifyCellWidget.prototype.setData = function (data) {
        this.data = data;
        this.cell_name.source = UIManager.instance().getSourceNameByAtlasAndName("FontIcon", data.nameSource);
        this.type_icon.source = UIManager.instance().getSourceNameByAtlasAndName("Item", data.iconSource);
    };
    /**
     * 获得按钮数据
     */
    ClassifyCellWidget.prototype.getData = function () {
        return this.data;
    };
    return ClassifyCellWidget;
}(eui.RadioButton));
__reflect(ClassifyCellWidget.prototype, "ClassifyCellWidget", ["UIWidget"]);
//# sourceMappingURL=ClassifyCellWidget.js.map