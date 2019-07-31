var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Help = (function () {
    function Help() {
    }
    Help.ArrayRemove = function (a, c) {
        var index = a.indexOf(c);
        if (index > -1) {
            a.splice(index, 1);
            return true;
        }
        return false;
    };
    ;
    Help.Lerp = function (a, b, t) {
        return a * (1 - t) + b * t;
    };
    /**范围内获取整数随机数*/
    Help.GetRandomInt = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    /**范围内获取整数随机数*/
    Help.GetRandom = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Rand * Range);
    };
    return Help;
}());
__reflect(Help.prototype, "Help");
var StringHelp = (function () {
    function StringHelp() {
    }
    StringHelp.IsEmpty = function (msg) {
        if (msg == undefined)
            return true;
        if (msg == null)
            return true;
        if (msg == "")
            return true;
        return false;
    };
    ;
    StringHelp.Format = function (msg) {
        var ps = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ps[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < 10; i++) {
            var si = '{' + i + '}';
            if (msg.indexOf(si) == -1) {
                break;
            }
            var rp = String(ps[i]);
            msg = msg.replace(si, rp);
        }
        return msg;
    };
    ;
    return StringHelp;
}());
__reflect(StringHelp.prototype, "StringHelp");
var DebugShapeRect = (function () {
    function DebugShapeRect(d) {
        this.Obj = null;
        this.ShapeRect = null;
        this.Obj = d;
        this.ShapeRect = new egret.Shape();
        d.stage.addChild(this.ShapeRect);
    }
    DebugShapeRect.prototype.Synchronization = function () {
        this.ShapeRect.anchorOffsetX = this.Obj.anchorOffsetX;
        this.ShapeRect.anchorOffsetY = this.Obj.anchorOffsetY;
        this.ShapeRect.x = this.Obj.x;
        this.ShapeRect.y = this.Obj.y;
        this.ShapeRect.width = this.Obj.width;
        this.ShapeRect.height = this.Obj.height;
        this.ShapeRect.skewX = this.Obj.skewX;
        this.ShapeRect.skewY = this.Obj.skewY;
        this.ShapeRect.scaleX = this.Obj.scaleX;
        this.ShapeRect.scaleY = this.Obj.scaleY;
    };
    DebugShapeRect.prototype.drawCircle = function (r) {
        this.Synchronization();
        var shape = this.ShapeRect;
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawCircle(shape.anchorOffsetX, shape.anchorOffsetY, r);
        shape.graphics.endFill();
    };
    DebugShapeRect.prototype.drawRect = function (w, h) {
        this.Synchronization();
        var shape = this.ShapeRect;
        if (!w) {
            w = shape.width;
        }
        if (!h) {
            h = shape.height;
        }
        shape.graphics.beginFill(0x000066, 1);
        shape.graphics.drawRect(shape.anchorOffsetX, shape.anchorOffsetY, w, h);
        shape.graphics.endFill();
    };
    return DebugShapeRect;
}());
__reflect(DebugShapeRect.prototype, "DebugShapeRect");
var DebugDisplay = (function () {
    function DebugDisplay(d) {
        this.ShapeRect = null;
        this.ShapeAnchor = null;
        this.ShapeRect = new DebugShapeRect(d);
        this.ShapeAnchor = new DebugShapeRect(d);
        this.DrawDebug();
    }
    DebugDisplay.prototype.DrawDebug = function () {
        this.ShapeRect.drawRect();
        this.ShapeAnchor.drawCircle(10);
    };
    return DebugDisplay;
}());
__reflect(DebugDisplay.prototype, "DebugDisplay");
var MyDebug = (function () {
    function MyDebug() {
    }
    MyDebug.AddDisplayArray = function (d) {
        MyDebug.DisplayArray.push(new DebugDisplay(d));
        MyDebug._sUpdate.Start(MyDebug.Update);
    };
    ;
    MyDebug.Update = function () {
        for (var _i = 0, _a = MyDebug.DisplayArray; _i < _a.length; _i++) {
            var dis = _a[_i];
            dis.DrawDebug();
        }
    };
    ;
    MyDebug._sUpdate = new UpdateObj(1);
    MyDebug.DisplayArray = new Array();
    return MyDebug;
}());
__reflect(MyDebug.prototype, "MyDebug");
//# sourceMappingURL=Help.js.map