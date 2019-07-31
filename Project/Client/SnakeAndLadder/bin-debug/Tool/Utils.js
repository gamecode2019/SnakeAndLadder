var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.getInstance = function () {
        if (this._instance == null) {
            this._instance = new Utils;
        }
        return this._instance;
    };
    Utils.prototype.buttonEffect = function (button, callback, listener, child) {
        button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            var tw = egret.Tween.get(button);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 100);
            if (child) {
                var tw1 = egret.Tween.get(child);
                tw1.to({ scaleX: 1.1, scaleY: 1.1 }, 100);
            }
        }, listener);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var tw = egret.Tween.get(button);
            tw.to({ scaleX: 1, scaleY: 1 }, 100);
            if (child) {
                var tw1 = egret.Tween.get(child);
                tw1.to({ scaleX: 1, scaleY: 1 }, 100);
            }
            callback.apply(listener);
        }, listener);
        button.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            var tw = egret.Tween.get(button);
            tw.to({ scaleX: 1, scaleY: 1 }, 100);
            if (child) {
                var tw1 = egret.Tween.get(child);
                tw1.to({ scaleX: 1, scaleY: 1 }, 100);
            }
        }, this);
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map