// TypeScript file
/**
 * 连接状态枚举
*/
var NetSocketStatus;
(function (NetSocketStatus) {
    /**
     * 空状态
    */
    NetSocketStatus[NetSocketStatus["None"] = 0] = "None";
    /**
     * 开始连接
    */
    NetSocketStatus[NetSocketStatus["BeginConnect"] = 1] = "BeginConnect";
    /**
     * 连接成功
    */
    NetSocketStatus[NetSocketStatus["Connected"] = 2] = "Connected";
    /**
     * 连接失败
    */
    NetSocketStatus[NetSocketStatus["ConnectFailed"] = 3] = "ConnectFailed";
    /**
     * 未连接
    */
    NetSocketStatus[NetSocketStatus["Disconnect"] = 4] = "Disconnect";
    /**
     * 连接错误
    */
    NetSocketStatus[NetSocketStatus["Error"] = 5] = "Error";
})(NetSocketStatus || (NetSocketStatus = {}));
//# sourceMappingURL=INetSocket.js.map