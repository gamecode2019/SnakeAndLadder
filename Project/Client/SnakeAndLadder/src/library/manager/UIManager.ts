class UIManager {
    // 单例
    private static _instance = null;

    // 界面列表
    private _windowMap: { [key: string]: any } = {};

	/**
	 * 获取单例
	 * @return {object} UIManager
	 */
    public static instance(): UIManager {
        if (!UIManager._instance) {
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    }

    /**
     * 获取当前舞台
     * @return {object} 舞台
     */
    public curStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    /**
     * 获取当前游戏宽度
     * @return {number} 游戏宽度
     */
    public stageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    /**
     * 当前游戏高度
     * @return {number} 游戏高度
     */
    public stageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    /**
     * 当前设备分辨率(宽)
     * @return {number} 宽度
     */
    public serviceWidth(): number {
        return egret.Capabilities.boundingClientWidth;
    }

    /**
     * 当前设备分辨率(高)
     * @return {number} 高度
     */
    public serviceHeight(): number {
        return egret.Capabilities.boundingClientHeight;
    }

    /**
     * 查找界面
     * @return {string} 界面
     */
    public findWindow(name: string): UIWindow {
        return this._windowMap[name];
    }

    /**
     * 打开界面
     * @param {string} name 界面名称
     */
    public openWindow(name: string): UIWindow {
        // 创建窗口
        let windowObj = this._windowMap[name];
        if (!windowObj) {
            let clazz = egret.getDefinitionByName(name); 
            if (!clazz) {
                return null;
            }

            windowObj = new clazz(name);
            this.curStage().addChild(windowObj);
            this._windowMap[name] = windowObj;

            windowObj.width = this.stageWidth();
            windowObj.height = this.stageHeight();

            return windowObj;
        }
        
        return windowObj;
    }

    /**
     * 打开界面
     * @param {string} name 界面名称
     */
    public closeWindow(name: string): void {
        let windowObj: UIWindow = this._windowMap[name];
        if (windowObj) {
            console.info("closeWindow:",name);
            windowObj.release();
            this.curStage().removeChild(windowObj);
            delete this._windowMap[name];
        }
    }

    /**
     * 关闭所有界面
     */
    public removeAllWindow(){
        console.info("removeAllWindow:");
        for(let key in this._windowMap){
            if(this._windowMap[key]){
                this._windowMap[key].release();
                this.curStage().removeChild(this._windowMap[key]);
                delete this._windowMap[key];
            }
        }
    }

    /**
     * 获得图集Icon资源名
     * @param {string} atlas 图集名
     * @param {string} iconName 图片名
     * @return {string} 图集资源路径
     */
    public getSourceNameByAtlasAndName(atlas: string, iconName: string): string {
        return atlas + "Atlas" + "_json." + iconName
    }

    /**
    * 由于屏幕模式设置的是fixWidth,所以Ui宽不变，只会高度有偏移。
    * 可使用此值保持背景图中心对齐舞台，不会受适配影响。
    * @return {number} 相对当前舞台y偏移量
    */
    public heightOffset(): number {
        return - (1136 - UIManager.instance().stageHeight()) / 2;
    }
}
