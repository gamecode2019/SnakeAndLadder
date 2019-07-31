class ActorRender extends eui.Component {
    // 角色名称
    private _name: string = '';

    // 角色显示
    private _visable: boolean = false;

    // 销毁标记
    private _destory: boolean = false;

    /**
     * 构造函数
     * @param {string} name 窗口名称
     */
    public constructor(name: string) {
        super();
        this._name = name;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRelease, this);
        this.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.onInit();
    }

    /**
     * 获取名称
     * @return {string} 窗口名称
     */
    public getName(name: string): void {
        this._name = name;
    }

    /**
     * 释放资源
     */
    public release(): void {
        this.onRelease(); // 释放资源
    }

    /**
     * 初始化
     */
    protected onInit(): void {
        console.log('onInit');
    }

    /**
     * 释放
     */
    protected onRelease(): void {
        console.log('onRelease');
    }

    /**
     * 屏幕缩放
     */
    protected onResize(): void {
        Logger.log("onResize")
    }

    /**
     * 隐藏角色
     */
    public hide() {
        this._visable = false;
    }

    /**
     * 显示角色
     */
    public show() {
        this._visable = true;
    }

    /**
     * 释放角色
     */
    public destroy() {
        this._destory = true;
    }

    /**
     * 是否已经销毁
     * @return {boolean} 是否销毁
     */
    public isDestroy() {
        return this._destory;
    }
}