var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManager = (function () {
    function UIManager() {
        // 界面列表
        this._windowMap = {};
    }
    /**
     * 获取单例
     * @return {object} UIManager
     */
    UIManager.instance = function () {
        if (!UIManager._instance) {
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    };
    /**
     * 获取当前舞台
     * @return {object} 舞台
     */
    UIManager.prototype.curStage = function () {
        return egret.MainContext.instance.stage;
    };
    /**
     * 获取当前游戏宽度
     * @return {number} 游戏宽度
     */
    UIManager.prototype.stageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    /**
     * 当前游戏高度
     * @return {number} 游戏高度
     */
    UIManager.prototype.stageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    /**
     * 当前设备分辨率(宽)
     * @return {number} 宽度
     */
    UIManager.prototype.serviceWidth = function () {
        return egret.Capabilities.boundingClientWidth;
    };
    /**
     * 当前设备分辨率(高)
     * @return {number} 高度
     */
    UIManager.prototype.serviceHeight = function () {
        return egret.Capabilities.boundingClientHeight;
    };
    /**
     * 查找界面
     * @return {string} 界面
     */
    UIManager.prototype.findWindow = function (name) {
        return this._windowMap[name];
    };
    /**
     * 打开界面
     * @param {string} name 界面名称
     */
    UIManager.prototype.openWindow = function (name) {
        // 创建窗口
        var windowObj = this._windowMap[name];
        if (!windowObj) {
            var clazz = egret.getDefinitionByName(name);
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
    };
    /**
     * 打开界面
     * @param {string} name 界面名称
     */
    UIManager.prototype.closeWindow = function (name) {
        var windowObj = this._windowMap[name];
        if (windowObj) {
            console.info("closeWindow:", name);
            windowObj.release();
            this.curStage().removeChild(windowObj);
            delete this._windowMap[name];
        }
    };
    /**
     * 关闭所有界面
     */
    UIManager.prototype.removeAllWindow = function () {
        console.info("removeAllWindow:");
        for (var key in this._windowMap) {
            if (this._windowMap[key]) {
                this._windowMap[key].release();
                this.curStage().removeChild(this._windowMap[key]);
                delete this._windowMap[key];
            }
        }
    };
    /**
     * 获得图集Icon资源名
     * @param {string} atlas 图集名
     * @param {string} iconName 图片名
     * @return {string} 图集资源路径
     */
    UIManager.prototype.getSourceNameByAtlasAndName = function (atlas, iconName) {
        return atlas + "Atlas" + "_json." + iconName;
    };
    /**
    * 由于屏幕模式设置的是fixWidth,所以Ui宽不变，只会高度有偏移。
    * 可使用此值保持背景图中心对齐舞台，不会受适配影响。
    * @return {number} 相对当前舞台y偏移量
    */
    UIManager.prototype.heightOffset = function () {
        return -(1136 - UIManager.instance().stageHeight()) / 2;
    };
    // 单例
    UIManager._instance = null;
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map