var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EffectManager = (function () {
    function EffectManager() {
        // 最大缓存数量
        this.MAX_POOL_SIZE = 10;
        // 特效资源列表
        this._assetMap = {};
        // 特效列表
        this._effectMap = {};
    }
    /**
     * 获取单例
     * @return {object} EffectManager
     */
    EffectManager.instance = function () {
        if (!EffectManager._instance) {
            EffectManager._instance = new EffectManager();
        }
        return EffectManager._instance;
    };
    /**
     * 获取当前舞台
     * @return {object} 舞台
     */
    EffectManager.prototype.curStage = function () {
        return egret.MainContext.instance.stage;
    };
    /**
     * 创建特效工厂
     * @param {string} name 特效名称
     * @return {object} 特效数据工厂
     */
    EffectManager.prototype.createFactory = function (name) {
        var factory = this._assetMap[name];
        if (factory) {
            return factory;
        }
        // 读取资源
        var data = RES.getRes(name + '_json');
        var texture = RES.getRes(name + '_png');
        if (!data || !texture) {
            Logger.warn('not find effect resource of ' + name);
            return null;
        }
        // 缓存特效
        factory = new egret.MovieClipDataFactory(data, texture);
        this._assetMap[name] = factory;
        return factory;
    };
    /**
     * 创建特效
     * @param {string} name 资源名称
     * @param {string} action 特效名称
     * @param {number} count 播放次数,可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数
     * @param {object} parent 父结点
     */
    EffectManager.prototype.createEffect = function (name, action, count) {
        var effectName = name + '::' + action;
        var effectList = this._effectMap[effectName];
        if (effectList && effectList.length > 0) {
            return effectList.pop();
        }
        // 创建特效
        var factory = this.createFactory(name);
        if (!factory) {
            return null;
        }
        return new UIEffect(name, action, factory);
    };
    /**
     * 销毁特效
     * @param {string} name 特效名称
     */
    EffectManager.prototype.destoryEffect = function (effect) {
        if (!effect) {
            return;
        }
        // 检查回收池
        var effectName = effect.getName() + '::' + effect.getAction();
        var effectList = this._effectMap[effectName];
        if (!effectList) {
            effectList = new Array();
            this._effectMap[effectName] = effectList;
        }
        // 回收特效
        effect.stop();
        if (effectList.length < this.MAX_POOL_SIZE) {
            effectList.push(effect);
        }
    };
    // 单例
    EffectManager._instance = null;
    return EffectManager;
}());
__reflect(EffectManager.prototype, "EffectManager");
//# sourceMappingURL=EffectManager.js.map