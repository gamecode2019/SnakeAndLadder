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
var TimeButtonSkin = (function (_super) {
    __extends(TimeButtonSkin, _super);
    function TimeButtonSkin() {
        var _this = _super.call(this) || this;
        _this.MaxTime = 0.1; //进度总时间
        _this.Pass = 0; //经过时间
        _this.IsOK = false;
        _this.CallBack = null;
        _this.skinName = "resource/eui_skins/widgetSkins/TimeButtonSkin.exml";
        return _this;
    }
    TimeButtonSkin.prototype.createChildren = function () {
        this.InitProcess();
        this.TimeGet();
        this.startTime(this.MaxTime);
    };
    TimeButtonSkin.prototype.setCD = function (val) {
        this.MaxTime = val;
    };
    TimeButtonSkin.prototype.setImage = function (res) {
        var image1 = this.Btn.getChildAt(0);
        image1.source = RES.getRes(res);
    };
    TimeButtonSkin.prototype.setCallBack = function (call, take) {
        this.CallBack = call;
    };
    TimeButtonSkin.prototype.addTouchEvent = function () {
        this.Btn.touchEnabled = true;
        this.Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    TimeButtonSkin.prototype.startTime = function (cd) {
        this.MaxTime = cd;
        this.Prog.visible = true;
        this.TimeText.visible = true;
        this.Pass = 0;
        this.IsOK = false;
        this.Timer = egret.setInterval(this.TimeGo, this, 16.6666, 16.6666);
    };
    TimeButtonSkin.prototype.TimeGo = function (val) {
        this.TimeText.text = (this.MaxTime - this.Pass / 1000).toFixed(0).toString() + 's';
        this.Pass += val;
        var angle = (this.Pass / 1000) / this.MaxTime * 360;
        if (angle > 360 && !this.IsOK) {
            this.TimeGet();
        }
        this.setProcess(angle);
    };
    TimeButtonSkin.prototype.TimeGet = function () {
        this.IsOK = true;
        this.Prog.visible = false;
        this.TimeText.visible = false;
        this.TimeText.text = (this.MaxTime - this.Pass / 1000).toFixed(0).toString() + 's';
        egret.clearInterval(this.Timer);
    };
    TimeButtonSkin.prototype.onTouch = function (event) {
        console.info("onTouch");
        if (this.IsOK) {
            if (this.CallBack) {
                this.CallBack();
            }
            this.startTime(this.MaxTime);
        }
    };
    TimeButtonSkin.prototype.InitProcess = function () {
        var shape = this.Shape = new egret.Shape();
        this.Shape.touchEnabled = true;
        shape.x = this.width / 2;
        shape.y = this.width / 2;
        this.addChild(shape);
        this.Prog.mask = shape;
    };
    TimeButtonSkin.prototype.changeGraphics = function (angle) {
        var self = this;
        if (angle >= 360 && !this.IsOK) {
            return;
        }
        var shape = this.Shape;
        shape.x = this.Prog.width / 2;
        shape.y = this.Prog.width / 2;
        function changeGraphicsEx(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(100, 0);
            shape.graphics.drawArc(0, 0, 100, 0, angle * Math.PI / 180, true);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
        changeGraphicsEx(angle);
    };
    TimeButtonSkin.prototype.setProcess = function (angle) {
        this.changeGraphics(angle);
    };
    return TimeButtonSkin;
}(eui.Component));
__reflect(TimeButtonSkin.prototype, "TimeButtonSkin");
//# sourceMappingURL=TimeButtonSkin.js.map