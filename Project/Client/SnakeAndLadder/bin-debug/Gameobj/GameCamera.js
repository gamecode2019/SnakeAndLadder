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
// TypeScript file
var GameCameraSingle = (function () {
    function GameCameraSingle() {
        /**
         * 场景中的相机，所有可视化对象的根节点
         */
        this.SceneCamera = new MyUpateObj(null);
    }
    GameCameraSingle.prototype.Clear = function () {
        this.SceneCamera.Clear();
    };
    GameCameraSingle.Interest = SignaManger.Instance.One(GameCameraSingle);
    return GameCameraSingle;
}());
__reflect(GameCameraSingle.prototype, "GameCameraSingle", ["SignaClear"]);
var GameCamera = (function (_super) {
    __extends(GameCamera, _super);
    function GameCamera() {
        var _this = _super.call(this) || this;
        GameCameraSingle.Interest.SceneCamera.set(_this);
        _this.Sprite = new egret.Sprite();
        Util.setAnchorMiddle(_this.Sprite);
        // let stage = egret.MainContext.instance.stage;
        // stage.addChildAt(this.Sprite,9999);
        LayerManager.Instance.AddForward(_this.Sprite, MyLayerEnum.UI);
        // stage.setChildIndex(this.Sprite,999);
        var v2 = Util.getScreenCenterPos();
        _this.EgretX = v2[0];
        _this.EgretY = v2[1];
        _this.SetPos(v2[0], v2[1]);
        return _this;
        // MyDebug.AddDisplayArray(this.Sprite);
    }
    GameCamera.prototype.SetPos = function (x, y) {
        _super.prototype.SetPos.call(this, x, y);
        // this.debugPos();
        for (var _i = 0, _a = this.Childs; _i < _a.length; _i++) {
            var c = _a[_i];
            c.ReSetPos();
        }
    };
    /**
     * 屏幕坐标坐标转世界坐标
     */
    GameCamera.prototype.ScreenToWold = function (x, y) {
        var wx = x - this.EgretX + this._x;
        var wy = y - this.EgretY + this._y;
        return [wx, wy];
    };
    /**
     * 世界坐标转为屏幕坐标
     */
    GameCamera.prototype.WoldScreenTo = function (wx, wy) {
        var x = wx + this.EgretX - this._x;
        var y = wy + this.EgretY - this._y;
        return [x, y];
    };
    GameCamera.prototype.debugPos = function () {
        var sprite = this.Sprite;
        sprite.x = this.EgretX;
        sprite.y = this.EgretY;
        sprite.graphics.beginFill(0xff0000);
        sprite.graphics.drawRect(1, 1, 2, 2);
        sprite.graphics.endFill();
    };
    return GameCamera;
}(Transform));
__reflect(GameCamera.prototype, "GameCamera");
//# sourceMappingURL=GameCamera.js.map