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
// TypeScript file
var ClassifyWindowItem = (function (_super) {
    __extends(ClassifyWindowItem, _super);
    /**
     * 构造函数
     */
    function ClassifyWindowItem() {
        var _this = _super.call(this) || this;
        _this.onInit();
        return _this;
    }
    /**
     * 初始化
     */
    ClassifyWindowItem.prototype.onInit = function () {
        this.skinName = "resource/eui_skins/widgetSkins/ClassifyWindowItem.exml";
        this.selectedIcon.visible = false;
    };
    /**
     * 数据改变时候，更新视图
     */
    ClassifyWindowItem.prototype.dataChanged = function () {
    };
    ClassifyWindowItem.prototype.setSelected = function () {
        this.selectedIcon.visible = true;
    };
    return ClassifyWindowItem;
}(eui.ItemRenderer));
__reflect(ClassifyWindowItem.prototype, "ClassifyWindowItem", ["UIWidget"]);
//# sourceMappingURL=ClassifyWindowItem.js.map