var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventManager = (function () {
    function EventManager() {
        this._handlers = null;
    }
    /**
     * 获得单例
     */
    EventManager.instance = function () {
        if (EventManager._instance == null) {
            EventManager._instance = new EventManager();
        }
        return EventManager._instance;
    };
    /**
     * 添加事件监听
     */
    EventManager.prototype.addEventListener = function (type, handler, thisObj) {
        if (this._handlers == null) {
            this._handlers = new HashMap();
        }
        var eventHandles = this._handlers.get(type);
        if (eventHandles == null) {
            eventHandles = new Array();
            this._handlers.put(type, eventHandles);
        }
        var index = this.indexOf(handler, eventHandles);
        if (index == -1) {
            eventHandles.push({ func: handler, owner: thisObj });
        }
        else {
            Logger.log("EventType:" + type + " repeat register !!!!!!!!!!!");
        }
    };
    /**
     * 元素在数组中的下标
     */
    EventManager.prototype.indexOf = function (handler, handlerAry) {
        for (var i = 0, len = handlerAry.length; i < len; ++i) {
            if (handlerAry[i].func === handler) {
                return i;
            }
        }
        return -1;
    };
    /**
     * 移除事件监听
     */
    EventManager.prototype.removeEventListener = function (type, handler) {
        if (this._handlers != null && this._handlers.size() > 0) {
            var eventHandles = this._handlers.get(type);
            if (eventHandles != null) {
                var index = this.indexOf(handler, eventHandles);
                if (index == -1) {
                    Logger.log("EventType:" + type + " removeEventListener error !!!!!!!!!!!");
                }
                else {
                    eventHandles.splice(index, 1);
                }
                if (eventHandles.length == 0) {
                    this._handlers.remove(type);
                }
            }
        }
    };
    /**
     * 分发事件
     */
    EventManager.prototype.dispatchEvent = function (type) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        if (this._handlers != null && this._handlers.size() > 0) {
            var eventHandles = this._handlers.get(type);
            if (eventHandles != null) {
                eventHandles.forEach(function (data) {
                    var func = data.func;
                    if (func) {
                        func.call.apply(func, [data.owner].concat(arg));
                    }
                });
            }
        }
    };
    //单例
    EventManager._instance = null;
    return EventManager;
}());
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map