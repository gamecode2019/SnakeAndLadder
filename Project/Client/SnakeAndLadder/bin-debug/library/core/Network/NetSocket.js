var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * WebSocket网络连接
 * 多条连接的多个new对象。每一个对象对应一条连接
*/
var NetSocket = (function () {
    function NetSocket() {
        this.status = NetSocketStatus.None;
        this.recFuncMaps = new Object();
        this.adress = new HostAdress();
    }
    Object.defineProperty(NetSocket.prototype, "isConnected", {
        get: function () {
            if (this.socket == null) {
                return false;
            }
            return this.socket.connected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加监听消息
     * @param  {number} id 所关心的协议号
     * @param  {Function} func 对应的协议返回函数
     * @param  {any} thisObject this指针
     * @returns void
     */
    NetSocket.prototype.addListenerMessage = function (id, func, thisObject) {
        console.log(this.recFuncMaps);
        if (this.recFuncMaps[id] == null) {
            var reciveFunc = new ReciveFunction();
            reciveFunc.ID = id;
            reciveFunc.handler = func;
            reciveFunc.thisObj = thisObject;
            this.recFuncMaps[id] = reciveFunc;
        }
        else {
            console.log("The same ID already exists in the receive message list:" + id);
        }
    };
    /**
     * 连接服务器，不加密连接，以ws开头
     * @param  {string} host 连接地址
     * @param  {number} port 连接端口
     * @param  {Function} func 连接后回调函数，成功，失败，服务器强制关闭，错误，都会触发
     * @param  {any} thisObject this指针
     * @returns void
     */
    NetSocket.prototype.connect = function (host, port, func, thisObject) {
        if (host == "" || port == 0) {
            console.error("[socket] connect error,host or port is null..");
            this.status = NetSocketStatus.None;
        }
        this.funcObj = thisObject;
        this.onSocketFunc = func;
        this.connectToServer(host, port, false);
    };
    /**
     * 连接服务器，加密连接，以wss开头
     * @param  {string} host 连接地址
     * @param  {number} port 连接端口
     * @param  {Function} func 连接后回调函数，成功，失败，服务器强制关闭，错误，都会触发
     * @param  {any} thisObject this指针
     * @returns void
     */
    NetSocket.prototype.secureConnect = function (host, port, func, thisObject) {
        if (host == "" || port == 0) {
            console.error("[socket] connect error,host or port is null..");
            this.status = NetSocketStatus.None;
        }
        this.funcObj = thisObject;
        this.onSocketFunc = func;
        this.connectToServer(host, port, true);
    };
    /**
     * 发送消息
     * @param  {string} id 协议ID
     * @param  {any} Obj
     * @returns void
     */
    NetSocket.prototype.send = function (id, json) {
        if (GameDebug == DebugType.OffLine) {
            console.info("offline onReceive:", JSON.parse(json));
            var reciveFunc = this.recFuncMaps[id];
            reciveFunc.handler.call(reciveFunc.thisObj, json);
            return;
        }
        if (!this.isConnected) {
            this.close();
            return;
        }
        console.info("ws send:", json);
        {
            this.socket.writeUTF(json);
            this.socket.flush();
        }
    };
    /**
     * 关闭连接服务
     * @returns void
     */
    NetSocket.prototype.close = function () {
        if (this.socket != null) {
            this.socket.removeEventListener(egret.Event.CONNECT, this.onConnectSucceed, this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
            this.socket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.socket.close();
            this.socket = null;
        }
        this.status = NetSocketStatus.None;
    };
    /**
     * 连接服务器
     * @param  {string} host 服务器地址
     * @param  {number} port 服务器端口
     * @param  {boolean} encryption 是否加密
     * @returns void
     */
    NetSocket.prototype.connectToServer = function (host, port, encryption) {
        this.adress.host = host;
        this.adress.port = port;
        this.adress.encryption = encryption;
        this.onInit();
    };
    /**
     * 初始化socket服务
     * @returns void
     */
    NetSocket.prototype.onInit = function () {
        if (this.isConnected == false) {
            this.status = NetSocketStatus.BeginConnect;
            if (this.socket == null) {
                this.socket = new egret.WebSocket();
                this.socket.type = egret.WebSocket.TYPE_BINARY;
                this.socket.addEventListener(egret.Event.CONNECT, this.onConnectSucceed, this);
                this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
                this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
                this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            }
            this.socket.connectByUrl(this.adress.completeAddress());
        }
    };
    /**
     * 连接成功后回调
     * @returns void
     */
    NetSocket.prototype.onConnectSucceed = function () {
        this.status = NetSocketStatus.Connected;
        console.log("[socket] connect server succeed!");
        if (this.onSocketFunc != null && this.funcObj != null) {
            this.onSocketFunc.call(this.funcObj, this.status);
        }
    };
    /**
     * 接收服务器返回消息回调
     * @param  {egret.Event} e 消息参数
     * @returns void
     */
    NetSocket.prototype.onReceive = function (e) {
        var message = this.socket.readUTF();
        var cmd = JSON.parse(message).pt;
        if (this.recFuncMaps[cmd] != null) {
            if (JSON.parse(message).ret != 1) {
                console.error("ws onReceive err:", message);
                return;
            }
            console.info("ws onReceive:", message);
            var reciveFunc = this.recFuncMaps[cmd];
            reciveFunc.handler.call(reciveFunc.thisObj, message);
        }
    };
    /**
     * 服务器主动断开连接回调
     * @returns void
     */
    NetSocket.prototype.onClose = function () {
        this.status = NetSocketStatus.Disconnect;
        console.log("[socket] server close!");
        if (this.onSocketFunc != null && this.funcObj != null) {
            this.onSocketFunc.call(this.funcObj, this.status);
        }
    };
    /**
     * 连接错误回调
     * @returns void
     */
    NetSocket.prototype.onError = function () {
        this.status = NetSocketStatus.Error;
        console.error("[socket] connect server error!");
        if (this.onSocketFunc != null && this.funcObj != null) {
            this.onSocketFunc.call(this.funcObj, this.status);
        }
    };
    /**
     * ByteArray转int
     * @param  {egret.ByteArray} bytes
     * @returns Array
     */
    NetSocket.prototype.getUint8Array = function (bytes) {
        var data = [];
        for (var i = 0; i < bytes.dataView.byteLength; i++) {
            data.push(bytes.dataView.getUint8(i));
        }
        return data;
    };
    return NetSocket;
}());
__reflect(NetSocket.prototype, "NetSocket", ["INetSocket"]);
/**
 * 返回函数封装
*/
var ReciveFunction = (function () {
    function ReciveFunction() {
    }
    return ReciveFunction;
}());
__reflect(ReciveFunction.prototype, "ReciveFunction");
//# sourceMappingURL=NetSocket.js.map