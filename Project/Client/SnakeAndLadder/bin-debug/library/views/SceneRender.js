var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneRender = (function (_super) {
    __extends(SceneRender, _super);
    /**
     * 构造函数
     * @param {number} sceneType 场景类型
     * @param {number} sceneID 场景ID
     */
    function SceneRender(sceneType, sceneID) {
        var _this = _super.call(this) || this;
        // 视口宽
        _this._viewWidth = 600;
        // 视口高  
        _this._viewHeight = 400;
        // 碎片地图
        _this._pieceMap = null;
        // 层
        _this._layer = LayerType.LAYER_SCENE;
        // 当前场景ID
        _this._sceneID = 0;
        // 当前场景类型
        _this._sceneType = 0;
        // 当前场景PID
        _this._scenePID = 0;
        // 当前场景GID
        _this._sceneGID = 0;
        _this._sceneType = sceneType;
        _this._sceneID = sceneID;
        _this._scenePID = SceneManager.instance().calcScenePID(sceneID);
        _this._sceneGID = SceneManager.instance().calcSceneGID(sceneID);
        return _this;
    }
    /**
     * 获取场景ID
     * @return {number} 场景ID
     */
    SceneRender.prototype.getSceneID = function () {
        return this._sceneID;
    };
    /**
     * 获取地图ID
     * @return {number} 场景ID
     */
    SceneRender.prototype.getMapID = function () {
        return this._scenePID;
    };
    /**
     * 进入场景
     */
    SceneRender.prototype.enter = function () {
    };
    /**
     * 离开场景
     */
    SceneRender.prototype.leave = function () {
    };
    return SceneRender;
}(eui.Component));
__reflect(SceneRender.prototype, "SceneRender");
//# sourceMappingURL=SceneRender.js.map