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
var UIWindow = (function (_super) {
    __extends(UIWindow, _super);
    /**
     * 构造函数
     * @param {string} name 窗口名称
     */
    function UIWindow(name) {
        var _this = _super.call(this) || this;
        // 界面名称
        _this._name = '';
        _this._name = name;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRelease, _this);
        _this.onInit();
        return _this;
    }
    /**
     * 获取界面名称
     * @return {string} 窗口名称
     */
    UIWindow.prototype.getName = function () {
        return this._name;
    };
    /**
     * 释放资源
     */
    UIWindow.prototype.release = function () {
        this.onRelease(); // 释放资源
    };
    /**
     * 界面初始化
     */
    UIWindow.prototype.onInit = function () {
        console.log('onInit:', this._name);
    };
    /**
     * 界面释放
     */
    UIWindow.prototype.onRelease = function () {
        console.log('onRelease');
    };
    /**
     * 关闭界面
     */
    UIWindow.prototype.close = function () {
        if (this._name != "") {
            UIManager.instance().closeWindow(this._name);
        }
    };
    return UIWindow;
}(eui.Component));
__reflect(UIWindow.prototype, "UIWindow");
//# sourceMappingURL=UIWindow.js.map