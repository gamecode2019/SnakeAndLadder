var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Transform = (function () {
    function Transform() {
        this._scalex = 1;
        this._scaley = 1;
        this.Childs = [];
        this.DisplayobjChilds = [];
    }
    Transform.prototype.SetParent = function (p) {
        if (this.Parent) {
            this.Parent.RemoveChild(this);
        }
        this.Parent = p;
        this.Parent.AddChild(this);
    };
    Transform.prototype.AddChild = function (c) {
        this.RemoveChild(c);
        this.Childs.push(c);
    };
    Transform.prototype.RemoveChild = function (c) {
        Help.ArrayRemove(this.Childs, c);
    };
    Transform.prototype.SetPos = function (x, y) {
        this._x = x;
        this._y = y;
    };
    Transform.prototype.ReSetPos = function () {
        this.SetPos(this._x, this._y);
    };
    return Transform;
}());
__reflect(Transform.prototype, "Transform");
//# sourceMappingURL=Transform.js.map