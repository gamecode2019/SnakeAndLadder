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
var GuildToggleBtn = (function (_super) {
    __extends(GuildToggleBtn, _super);
    /**
     * 构造函数
     */
    function GuildToggleBtn() {
        var _this = _super.call(this) || this;
        //图集名称
        _this.atlasName = "Login";
        _this.skinName = "resource/eui_skins/widgetSkins/GuildBtnWidget.exml";
        return _this;
    }
    GuildToggleBtn.prototype.onInit = function () {
    };
    /**
     *设置皮肤显示图片
     *@param {string} cImg:彩色图
     *@param {string} gImg:灰色图
     */
    GuildToggleBtn.prototype.setImg = function (cImg, gImg) {
        this.color.source = UIManager.instance().getSourceNameByAtlasAndName(this.atlasName, cImg);
        this.gray.source = UIManager.instance().getSourceNameByAtlasAndName(this.atlasName, gImg);
    };
    return GuildToggleBtn;
}(eui.ToggleButton));
__reflect(GuildToggleBtn.prototype, "GuildToggleBtn", ["UIWidget"]);
//# sourceMappingURL=GuildToggleBtn.js.map