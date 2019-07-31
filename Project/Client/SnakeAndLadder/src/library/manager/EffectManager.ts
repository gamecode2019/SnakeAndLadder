class EffectManager {
    // 单例
    private static _instance = null;

    // 最大缓存数量
    private readonly MAX_POOL_SIZE: number = 10;

    // 特效资源列表
    private _assetMap: { [key: string]: any } = {};

    // 特效列表
    private _effectMap: { [key: string]: Array<UIEffect> } = {};

	/**
	 * 获取单例
	 * @return {object} EffectManager
	 */
    public static instance(): EffectManager {
        if (!EffectManager._instance) {
            EffectManager._instance = new EffectManager();
        }
        return EffectManager._instance;
    }

    /**
     * 获取当前舞台
     * @return {object} 舞台
     */
    public curStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    /**
     * 创建特效工厂
     * @param {string} name 特效名称
     * @return {object} 特效数据工厂
     */
    private createFactory(name: string): egret.MovieClipDataFactory {
        let factory: egret.MovieClipDataFactory = this._assetMap[name];
        if (factory) {
            return factory;
        }

        // 读取资源
        let data = RES.getRes(name + '_json');
        let texture = RES.getRes(name + '_png');
        if (!data || !texture) {
            Logger.warn('not find effect resource of ' + name);
            return null;
        }

        // 缓存特效
        factory = new egret.MovieClipDataFactory(data, texture);
        this._assetMap[name] = factory;
        return factory;
    }

    /**
     * 创建特效
     * @param {string} name 资源名称
     * @param {string} action 特效名称
     * @param {number} count 播放次数,可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数
     * @param {object} parent 父结点
     */
    public createEffect(name: string, action: string, count: number): UIEffect {
        let effectName = name + '::' + action;
        let effectList: Array<UIEffect> = this._effectMap[effectName];
        if (effectList && effectList.length > 0) {
            return effectList.pop();
        }

        // 创建特效
        let factory = this.createFactory(name);
        if (!factory) {
            return null;
        }
        return new UIEffect(name, action, factory);
    }

    /**
     * 销毁特效
     * @param {string} name 特效名称
     */
    public destoryEffect(effect: UIEffect): void {
        if (!effect) {
            return;
        }

        // 检查回收池
        let effectName = effect.getName() + '::' + effect.getAction();
        let effectList: Array<UIEffect> = this._effectMap[effectName];
        if (!effectList) {
            effectList = new Array<UIEffect>();
            this._effectMap[effectName] = effectList;
        }

        // 回收特效
        effect.stop();
        if (effectList.length < this.MAX_POOL_SIZE) {
            effectList.push(effect);
        }
    }
}