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
var Gameobject = (function (_super) {
    __extends(Gameobject, _super);
    function Gameobject() {
        var _this = _super.call(this) || this;
        _this.cx = 0;
        _this.cy = 0;
        _this._camear = null;
        _this._camear = GameCameraSingle.Interest.SceneCamera.get();
        if (!_this._camear) {
            GameCameraSingle.Interest.SceneCamera.onUpdata.AddListen(function (c) {
                _this._camear = c;
                _this.SetParent(_this._camear);
            }, _this);
        }
        else {
            _this.SetParent(_this._camear);
        }
        return _this;
    }
    Gameobject.prototype.SetPos = function (x, y) {
        this._x = x;
        this._y = y;
        this.cx = x - this._camear._x + this._camear.EgretX;
        this.cy = y - this._camear._y + this._camear.EgretY;
        for (var _i = 0, _a = this.DisplayobjChilds; _i < _a.length; _i++) {
            var dis = _a[_i];
            dis.SetPos(this.cx, this.cy);
        }
    };
    Gameobject.prototype.SetScale = function (x, y) {
        this._scalex = x;
        this._scaley = y;
        for (var _i = 0, _a = this.DisplayobjChilds; _i < _a.length; _i++) {
            var dis = _a[_i];
            dis.SetScale(x, y);
        }
    };
    return Gameobject;
}(Transform));
__reflect(Gameobject.prototype, "Gameobject");
//# sourceMappingURL=Gameobject.js.map