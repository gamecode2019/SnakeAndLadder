var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
        // 地图加载进度
        this._percent = 0;
        // 地图切换界面
        this._loadingWindow = null;
        // 场景原始数据
        this._rawdataMap = new HashMap();
        // 是否已清除地图
        this._isClear = false;
        // 当前场景对象
        this._curScene = null;
    }
    /**
     * 获取单例
     * @return {object} SceneManager
     */
    SceneManager.instance = function () {
        if (!SceneManager._instance) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    };
    /**
     * 加载场景数据
     * @param {number} mapid 场景ID
     */
    SceneManager.prototype.loadData = function (mapid) {
        if (this._rawdataMap.containsKey(mapid)) {
            return;
        }
        var rawdata = new SceneRawData();
        this._rawdataMap.put(mapid, rawdata);
    };
    /**
     * 进入场景
     * @param {number} type 场景类型
     * @param {number} mapid 场景ID
     */
    SceneManager.prototype.enterScene = function (sceneType, sceneID) {
        if (this._curScene && this._curScene.getSceneID() === sceneID) {
            Logger.warn('[enterScene]重复进入场景' + this._curScene.getMapID());
            return;
        }
        // 离开旧场景
        this.exitScene(true);
        if (this._curScene) {
            this._curScene.leave();
        }
        // 进入新场景
        this._curScene = new SceneRender(sceneType, sceneID);
        this._curScene.enter();
    };
    /**
     * 离开场景
     * @param {boolean} clear 清理场景
     */
    SceneManager.prototype.exitScene = function (clear) {
        if (!this._curScene) {
            return;
        }
        this._curScene.leave();
        this._curScene = null;
    };
    /**
     * 根据场景ID获取地图ID
     * @param {number} sceneID 场景ID
     * @return {number} 地图ID
     */
    SceneManager.prototype.calcScenePID = function (sceneID) {
        return (sceneID & 0xffff);
    };
    /**
     * 根据场景ID获取分配ID
     * @param {number} sceneID 场景ID
     * @return {number} 地图ID
     */
    SceneManager.prototype.calcSceneGID = function (sceneID) {
        return (sceneID & 0xffff0000) >> 16;
    };
    /**
     * 根据地图ID及分配ID获取场景ID
     * @param {number} sceneID 场景ID
     * @return {number} 地图ID
     */
    SceneManager.prototype.calcSceneID = function (scenePID, sceneGID) {
        return (scenePID | (sceneGID << 16));
    };
    // 单例
    SceneManager._instance = null;
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map