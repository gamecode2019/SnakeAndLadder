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
var SelectServiceBtn = (function (_super) {
    __extends(SelectServiceBtn, _super);
    function SelectServiceBtn() {
        var _this = _super.call(this) || this;
        _this.onInit();
        return _this;
    }
    SelectServiceBtn.prototype.onInit = function () {
        this.skinName = "resource/eui_skins/widgetSkins/SelectServiceBtn.exml";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
    };
    /**
    * 数据改变时候，更新视图
    */
    SelectServiceBtn.prototype.dataChanged = function () {
        this.ser_name.text = this.data.ser_name;
        this.isNew.visible = (this.data.ser_isNew === 1);
        //todo 服务器状态显示
    };
    /**
     * 点击事件
     */
    SelectServiceBtn.prototype.click = function () {
        if (UIManager.instance().findWindow("LoginWindow")) {
        }
        UIManager.instance().closeWindow("SelecteServiceWindow");
    };
    return SelectServiceBtn;
}(eui.ItemRenderer));
__reflect(SelectServiceBtn.prototype, "SelectServiceBtn", ["UIWidget"]);
//# sourceMappingURL=SelectServiceBtn.js.map