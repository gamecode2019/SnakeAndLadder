class SceneRender extends eui.Component {
    // 视口宽
    private _viewWidth: number = 600;

    // 视口高  
    private _viewHeight: number = 400;

    // 碎片地图
    private _pieceMap: PieceMap = null;

    // 层
    private _layer = LayerType.LAYER_SCENE;

    // 当前场景ID
    private _sceneID: number = 0;

    // 当前场景类型
    private _sceneType: number = 0;

    // 当前场景PID
    private _scenePID: number = 0;

    // 当前场景GID
    private _sceneGID: number = 0;

    /**
     * 构造函数
     * @param {number} sceneType 场景类型
     * @param {number} sceneID 场景ID
     */
    public constructor(sceneType: number, sceneID: number) {
        super();
        this._sceneType = sceneType;
        this._sceneID = sceneID;
        this._scenePID = SceneManager.instance().calcScenePID(sceneID);
        this._sceneGID = SceneManager.instance().calcSceneGID(sceneID);
    }

    /**
     * 获取场景ID
     * @return {number} 场景ID
     */
    public getSceneID(): number {
        return this._sceneID;
    }

    /**
     * 获取地图ID
     * @return {number} 场景ID
     */
    public getMapID(): number {
        return this._scenePID;
    }

    /**
     * 进入场景
     */
    public enter(): void {
    }

    /**
     * 离开场景
     */
    public leave(): void {
    }
}