class UIWindow extends eui.Component {
    // 界面名称
    private _name: string = '';

    /**
     * 构造函数
     * @param {string} name 窗口名称
     */
    public constructor(name: string) {
        super();
        this._name = name;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRelease, this);
        this.onInit();
    }

    /**
     * 获取界面名称
     * @return {string} 窗口名称
     */
    public getName(): string {
        return this._name;
    }

    /**
     * 释放资源
     */
    public release(): void {
        this.onRelease(); // 释放资源
    }

    /**
     * 界面初始化
     */
    protected onInit(): void {
        console.log('onInit:',this._name);
    }

    /**
     * 界面释放
     */
    protected onRelease(): void {
        console.log('onRelease');
    }

    /**
     * 关闭界面
     */
    protected close(): void {
        if (this._name != "") {
            UIManager.instance().closeWindow(this._name);
        }
    }
}