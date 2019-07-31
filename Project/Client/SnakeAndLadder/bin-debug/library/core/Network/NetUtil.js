var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 网络连接工具类
 * 负责架子啊protocol并进行静态缓存
*/
var NetUtil = (function () {
    function NetUtil() {
    }
    Object.defineProperty(NetUtil, "ApcData", {
        get: function () {
            return this._ApcData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetUtil, "MessageData", {
        get: function () {
            return this._MessageData;
        },
        enumerable: true,
        configurable: true
    });
    return NetUtil;
}());
__reflect(NetUtil.prototype, "NetUtil");
//# sourceMappingURL=NetUtil.js.map