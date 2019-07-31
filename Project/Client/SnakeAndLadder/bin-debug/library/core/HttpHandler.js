var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpHandler = (function () {
    function HttpHandler() {
        // 协议组
        this._protoMap = {};
    }
    /**
     * 获得单例
     */
    HttpHandler.instance = function () {
        if (!HttpHandler._instance) {
            HttpHandler._instance = new HttpHandler();
        }
        return HttpHandler._instance;
    };
    /**
     * 注册协议
     * @param {string} pt 协议名称
     * @param {object} hanlder 协议处理
     * @param void
     */
    HttpHandler.prototype.registerProtocol = function (pt, hanlder) {
        this._protoMap[pt] = hanlder;
    };
    /**
     * 发送登陆服消息.
     * @param {object} message 消息
     * @return void
     */
    HttpHandler.prototype.sendLoginMessage = function (message) {
        var url = GameConfig.loginUrl + 'api/' + message.pt;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostError, this);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(message));
        console.info("http sendLoginMessage:", message);
    };
    /**
     * 发送游戏服消息.
     * @param {object} message 消息
     * @return void
     */
    HttpHandler.prototype.sendGameMessage = function (message) {
        var url = GameConfig.loginUrl + 'api/' + message.pt;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostError, this);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(message));
    };
    /**
     * 分发消息.
     * @param {Object} msgArr 消息数组
     * @return void
     */
    HttpHandler.prototype.dispatch = function (msgArr) {
        var that = this;
        msgArr.forEach(function (msg) {
            if (that._protoMap[msg.pt]) {
                that._protoMap[msg.pt].handleProtocol(msg);
            }
            else {
                Logger.log('未定义pt ' + msg.pt);
            }
        });
    };
    ;
    /**
     * 发送消息完成.
     * @param {object} event 事件
     * @return void
     */
    HttpHandler.prototype.onPostComplete = function (event) {
        try {
            var data = event.currentTarget;
            this.dispatch(JSON.parse(data.response));
        }
        catch (err) {
            Logger.log("返回数据必须为数组：", err);
        }
    };
    /**
     * 发送消息错误.
     * @param {object} event 事件
     * @return void
     */
    HttpHandler.prototype.onPostError = function (event) {
        Logger.log("发送消息错误: ", event);
    };
    // 单例
    HttpHandler._instance = null;
    return HttpHandler;
}());
__reflect(HttpHandler.prototype, "HttpHandler");
//# sourceMappingURL=HttpHandler.js.map