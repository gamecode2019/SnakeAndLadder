class SceneManager {
    // 单例
    private static _instance = null;

    // 地图加载进度
    private _percent: number = 0;

    // 地图切换界面
    private _loadingWindow: UIWindow = null;

    // 场景原始数据
    private _rawdataMap: HashMap = new HashMap();

    // 是否已清除地图
    private _isClear: boolean = false;

    // 当前场景对象
    public _curScene: SceneRender = null;

	/**
	 * 获取单例
	 * @return {object} SceneManager
	 */
    public static instance(): SceneManager {
        if (!SceneManager._instance) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    }

    /**
     * 加载场景数据 
     * @param {number} mapid 场景ID
     */
    public loadData(mapid: number): void {
        if (this._rawdataMap.containsKey(mapid)) {
            return;
        }

        let rawdata = new SceneRawData();
        this._rawdataMap.put(mapid, rawdata);
    }

    /**
     * 进入场景 
     * @param {number} type 场景类型
     * @param {number} mapid 场景ID
     */
    public enterScene(sceneType: number, sceneID: number): void {
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
    }

    /**
     * 离开场景 
     * @param {boolean} clear 清理场景
     */
    public exitScene(clear: boolean): void {
        if (!this._curScene) {
            return;
        }

        this._curScene.leave();
        this._curScene = null;
    }

    /**
     * 根据场景ID获取地图ID 
     * @param {number} sceneID 场景ID
     * @return {number} 地图ID
     */
    public calcScenePID(sceneID: number): number {
        return (sceneID & 0xffff);
    }

    /**
     * 根据场景ID获取分配ID 
     * @param {number} sceneID 场景ID
     * @return {number} 地图ID
     */
    public calcSceneGID(sceneID: number): number {
        return (sceneID & 0xffff0000) >> 16;
    }

    /**
     * 根据地图ID及分配ID获取场景ID
     * @param {number} sceneID 场景ID
     * @return {number} 地图ID
     */
    public calcSceneID(scenePID: number, sceneGID): number {
        return (scenePID | (sceneGID << 16));
    }
}