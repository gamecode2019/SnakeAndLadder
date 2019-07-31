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
var ActorRender = (function (_super) {
    __extends(ActorRender, _super);
    /**
     * 构造函数
     * @param {string} name 窗口名称
     */
    function ActorRender(name) {
        var _this = _super.call(this) || this;
        // 角色名称
        _this._name = '';
        // 角色显示
        _this._visable = false;
        // 销毁标记
        _this._destory = false;
        _this._name = name;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRelease, _this);
        _this.addEventListener(egret.Event.RESIZE, _this.onResize, _this);
        _this.onInit();
        return _this;
    }
    /**
     * 获取名称
     * @return {string} 窗口名称
     */
    ActorRender.prototype.getName = function (name) {
        this._name = name;
    };
    /**
     * 释放资源
     */
    ActorRender.prototype.release = function () {
        this.onRelease(); // 释放资源
    };
    /**
     * 初始化
     */
    ActorRender.prototype.onInit = function () {
        console.log('onInit');
    };
    /**
     * 释放
     */
    ActorRender.prototype.onRelease = function () {
        console.log('onRelease');
    };
    /**
     * 屏幕缩放
     */
    ActorRender.prototype.onResize = function () {
        Logger.log("onResize");
    };
    /**
     * 隐藏角色
     */
    ActorRender.prototype.hide = function () {
        this._visable = false;
    };
    /**
     * 显示角色
     */
    ActorRender.prototype.show = function () {
        this._visable = true;
    };
    /**
     * 释放角色
     */
    ActorRender.prototype.destroy = function () {
        this._destory = true;
    };
    /**
     * 是否已经销毁
     * @return {boolean} 是否销毁
     */
    ActorRender.prototype.isDestroy = function () {
        return this._destory;
    };
    return ActorRender;
}(eui.Component));
__reflect(ActorRender.prototype, "ActorRender");
//# sourceMappingURL=ActorRender.js.map