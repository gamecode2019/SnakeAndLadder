class UIEffect {
    // 父结点
    private _parent: egret.DisplayObjectContainer = null;

    // 特效资源名称
    private _name: string = '';

    // 特效动画名称
    private _action: string = '';

    // 特效实例
    private _effect: egret.MovieClip = null;

    /**
     * 构造函数
     * @param {string} name 资源名称
     * @param {string} action 动画名称
     * @param {object} factory 动画工厂
     */
    public constructor(name: string, action: string, factory: egret.MovieClipDataFactory) {
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
    public getName(): string {
        return this._name;
    }

    /**
     * 获取动画名称
     * @return {string} 动画名称
     */
    public getAction(): string {
        return this._action;
    }

    /**
     * 播放特效
     * @param {string} name 资源名称
     * @param {string} action 特效名称
     * @param {number} count 播放次数,可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数
     * @param {object} parent 父结点
     */
    public play(count: number, parent?: egret.DisplayObjectContainer): void {
        this._effect.x = 0;
        this._effect.y = 0;
        this._effect.gotoAndPlay(1, count);
        this._parent = parent || egret.MainContext.instance.stage;
        this._parent.addChild(this._effect);
    }

    /**
     * 停止特效
     */
    public stop(): void {
        if (this._effect) {
            this._effect.stop();
            this.onRelease();
        }
    }

    /**
     * 设置父结点
     */
    public setParent(parent?: egret.DisplayObjectContainer): void {
        if (!this._effect) {
            Logger.warn('empty effect');
            return;
        }
        if (this._parent) {
            this._parent.removeChild(this._effect);
        }
        this._parent = parent || egret.MainContext.instance.stage;
        this._parent.addChild(this._effect);
    }

    /**
     * 特效初始化
     */
    protected onInit(): void {
        console.log('onInit');
    }

    /**
     * 特效释放
     */
    protected onRelease(): void {
        if (this._parent && this!=null) {
            this._parent.removeChild(this._effect);
            this._parent = null;
        }
        console.log('onRelease');
    }
}