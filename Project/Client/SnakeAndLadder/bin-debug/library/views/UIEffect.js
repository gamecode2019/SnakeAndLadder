var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIEffect = (function () {
    /**
     * 构造函数
     * @param {string} name 资源名称
     * @param {string} action 动画名称
     * @param {object} factory 动画工厂
     */
    function UIEffect(name, action, factory) {
        // 父结点
        this._parent = null;
        // 特效资源名称
        this._name = '';
        // 特效动画名称
        this._action = '';
        // 特效实例
        this._effect = null;
        this._name = name;
        this._action = action;
        this._effect = new egret.MovieClip(factory.generateMovieClipData(action));
        this._effect.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRelease, this);
        this.onInit();
    }
    /**
     * 获取资源名称
     * @return {string} 资源名称
     */
    UIEffect.prototype.getName = function () {
        return this._name;
    };
    /**
     * 获取动画名称
     * @return {string} 动画名称
     */
    UIEffect.prototype.getAction = function () {
        return this._action;
    };
    /**
     * 播放特效
     * @param {string} name 资源名称
     * @param {string} action 特效名称
     * @param {number} count 播放次数,可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数
     * @param {object} parent 父结点
     */
    UIEffect.prototype.play = function (count, parent) {
        this._effect.x = 0;
        this._effect.y = 0;
        this._effect.gotoAndPlay(1, count);
        this._parent = parent || egret.MainContext.instance.stage;
        this._parent.addChild(this._effect);
    };
    /**
     * 停止特效
     */
    UIEffect.prototype.stop = function () {
        if (this._effect) {
            this._effect.stop();
            this.onRelease();
        }
    };
    /**
     * 设置父结点
     */
    UIEffect.prototype.setParent = function (parent) {
        if (!this._effect) {
            Logger.warn('empty effect');
            return;
        }
        if (this._parent) {
            this._parent.removeChild(this._effect);
        }
        this._parent = parent || egret.MainContext.instance.stage;
        this._parent.addChild(this._effect);
    };
    /**
     * 特效初始化
     */
    UIEffect.prototype.onInit = function () {
        console.log('onInit');
    };
    /**
     * 特效释放
     */
    UIEffect.prototype.onRelease = function () {
        if (this._parent && this != null) {
            this._parent.removeChild(this._effect);
            this._parent = null;
        }
        console.log('onRelease');
    };
    return UIEffect;
}());
__reflect(UIEffect.prototype, "UIEffect");
//# sourceMappingURL=UIEffect.js.map