var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClockItem = (function () {
    function ClockItem() {
        this.id = 0;
        this.time = 0;
        this.call = null;
        this.ext = '' || {};
    }
    return ClockItem;
}());
__reflect(ClockItem.prototype, "ClockItem");
//egret暂停 计时器依然继续
var Clock = (function () {
    function Clock() {
        this.timers = {};
        this.isRun = false;
        this.timers = {};
        this.isRun = false;
    }
    Clock.prototype.start = function () {
        this.isRun = true;
    };
    Clock.prototype.stop = function () {
        this.isRun = false;
    };
    /**
     * 添加时钟
     * @param time:number 超时时间
     * @param call:Function 超时回调
     * @param count:number 时间分段
     * @param callpre:Function 每段回调
     */
    Clock.prototype.addTimer = function (name, time, call) {
        var that = this;
        return new Promise(function (resolve, reject) {
            var clockItem = new ClockItem();
            clockItem.call = call;
            clockItem.time = time;
            clockItem.ext = name;
            clockItem.id = setTimeout(function () {
                if (that.isRun) {
                    resolve(clockItem);
                }
                else {
                    reject(clockItem);
                }
            }, clockItem.time);
            that.timers[name] = clockItem;
        })
            .then(function (item) {
            clearTimeout(item.id);
            item.call(item.ext);
        }).catch(function (item) {
            console.info('Clock is stop');
            clearTimeout(item.id);
        });
    };
    /**
     * removeTimer
     */
    Clock.prototype.removeTimer = function (name) {
        if (!this.timers[name]) {
            return;
        }
        clearTimeout(this.timers[name].id);
        delete this.timers[name];
    };
    /**
     * removeAllTimer
     */
    Clock.prototype.removeAllTimer = function () {
        for (var key in this.timers) {
            this.removeTimer(key);
        }
    };
    return Clock;
}());
__reflect(Clock.prototype, "Clock");
//# sourceMappingURL=Clock.js.map