var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地址封装
 * 支持加密和不加密
*/
var HostAdress = (function () {
    function HostAdress() {
    }
    /**
     * 获取完整地址：
     * 加密格式："wss:echo.websocket.org:80"
     * 不加密格式："ws:echo.websocket.org:80"
     * @returns string
     */
    HostAdress.prototype.completeAddress = function () {
        var prefix = this.encryption ? "wss" : "ws";
        return prefix + "://" + this.host + ":" + this.port;
    };
    return HostAdress;
}());
__reflect(HostAdress.prototype, "HostAdress");
//# sourceMappingURL=HostAdress.js.map