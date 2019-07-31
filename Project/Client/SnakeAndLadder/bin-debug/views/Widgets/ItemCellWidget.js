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
var ItemCellWidget = (function (_super) {
    __extends(ItemCellWidget, _super);
    function ItemCellWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemCellWidget.prototype.onInit = function () {
        this.skinName = "resource/eui_skins/widgetSkins/ItemCellWidget.exml";
        this.dataChanged();
    };
    /**
     * 数据改变时候调用
     */
    ItemCellWidget.prototype.dataChanged = function () {
    };
    return ItemCellWidget;
}(eui.ItemRenderer));
__reflect(ItemCellWidget.prototype, "ItemCellWidget", ["UIWidget"]);
//# sourceMappingURL=ItemCellWidget.js.map