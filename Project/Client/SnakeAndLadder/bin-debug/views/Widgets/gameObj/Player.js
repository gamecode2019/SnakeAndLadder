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
// 玩家
//
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        //tween动画
        // private action:egret.Tween;
        _this.pre_prop = { x: 0, y: 0 };
        _this.to_prop = { x: 0, y: 0 };
        _this.skinName = "resource/eui_skins/widgetSkins/PlayerSkin.exml";
        _this.Init();
        return _this;
    }
    Player.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 设置皮肤
     */
    Player.prototype.setImg = function (res) {
        this.img_me.source = RES.getRes(res);
        this.img_me.smoothing = true;
    };
    Player.prototype.Init = function () {
        this.setPreProp();
    };
    /**
     * 记录前一刻属性
     */
    Player.prototype.setPreProp = function () {
        this.pre_prop.x = this.x;
        this.pre_prop.y = this.y;
    };
    /**
     * 记录目标属性
     */
    Player.prototype.setToProp = function (x, y) {
        this.to_prop.x = x;
        this.to_prop.y = y;
    };
    /**
     * 按数组移动
     */
    Player.prototype.moveWithArr = function (arr, call) {
        var that = this;
        var time = 1200 / arr.length;
        time = time > 200 ? 200 : time;
        var count = 0;
        clearInterval(that.move_timer);
        this.move_timer = setInterval(function () {
            if (count < arr.length) {
                that.move(arr[count].x, arr[count].y, time);
            }
            else {
                call();
                clearInterval(that.move_timer);
            }
            count++;
        }, time);
    };
    /**
     * 移动
     */
    Player.prototype.move = function (x, y, time) {
        this.setPreProp();
        this.setToProp(x, y);
        // egret.Tween.get(this).to({x:x,y:y},1000);
        //在1秒内，this的factor属性将会缓慢趋近1这个值，这里的factor就是曲线中的t属性，它是从0到1的闭区间。
        var that = this;
        // this.action = ;
        egret.Tween.removeTweens(that);
        egret.Tween.get(this).to({ factor: 1 }, time);
    };
    /**
     * 移动
     */
    Player.prototype.moveTo = function (x, y, call) {
        this.setPreProp();
        this.setToProp(x, y);
        // egret.Tween.get(this).to({x:x,y:y},1000);
        //在1秒内，this的factor属性将会缓慢趋近1这个值，这里的factor就是曲线中的t属性，它是从0到1的闭区间。
        var that = this;
        // this.action = ;
        egret.Tween.removeTweens(that);
        egret.Tween.get(this).to({ factor: 1 }, 1000).call(call, this);
    };
    Object.defineProperty(Player.prototype, "factor", {
        //添加factor的set,get方法,注意用public
        get: function () {
            return 0;
        },
        //利用egret的缓动动画Tween来实现动画
        //二次方贝塞尔公式B(t) = (1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2 ,t->[0-1]
        //起点P0  控制点P1  终点P2
        set: function (value) {
            var dis = Math.sqrt(Math.pow(this.to_prop.x - this.pre_prop.x, 2) + Math.pow(this.to_prop.y - this.pre_prop.y, 2));
            var H = dis / 2;
            var centerx = (this.to_prop.x + this.pre_prop.x) / 2;
            var centery = (this.to_prop.y + this.pre_prop.y) / 2 - dis * 0.3;
            this.x = (1 - value) * (1 - value) * this.pre_prop.x + 2 * value * (1 - value) * centerx + value * value * this.to_prop.x;
            this.y = (1 - value) * (1 - value) * this.pre_prop.y + 2 * value * (1 - value) * centery + value * value * this.to_prop.y;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}(eui.Component));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map