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
//
// 骰子
//
var Dice = (function (_super) {
    __extends(Dice, _super);
    function Dice() {
        var _this = _super.call(this) || this;
        _this.seatid = -1;
        //roll_1动画监听事件
        _this.roll_call = null;
        _this.skinName = "resource/eui_skins/widgetSkins/DiceSkin.exml";
        _this.Init();
        return _this;
    }
    Dice.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    Dice.prototype.Init = function () {
        this.hide();
    };
    /**
     * setPosition
     */
    Dice.prototype.setPosition = function (seatid) {
        this.x = 57 + 140 * seatid - 20;
        this.y = 72 - 219;
        this.seatid = seatid;
    };
    /**
     * show
     */
    Dice.prototype.show = function (istouch) {
        this.visible = true;
        if (istouch) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDice, this);
        }
        this.light.play(0);
    };
    /**
     * hide
     */
    Dice.prototype.hide = function () {
        this.visible = false;
        this.removeTouch();
    };
    Dice.prototype.removeTouch = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDice, this);
    };
    /**
     * 点击塞子
     */
    Dice.prototype.touchDice = function () {
        this.removeTouch();
        GameManager.instance().rollStep(this.seatid);
    };
    /**
     * 播放摇色子playRoll
     */
    Dice.prototype.playRoll = function (roll, callback) {
        var that = this;
        this.removeTouch();
        this.roll_1.removeEventListener('complete', this.roll_call, this);
        this.roll_call = function () {
            callback();
            that.hide();
        };
        if (this.seatid >= 0) {
            this.roll_1.addEventListener('complete', this.roll_call, this);
            this.roll_1.play(0);
        }
    };
    return Dice;
}(eui.Component));
__reflect(Dice.prototype, "Dice");
//# sourceMappingURL=Dice.js.map