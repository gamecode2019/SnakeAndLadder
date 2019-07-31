var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProtoBase = (function () {
    function ProtoBase() {
    }
    /**
 * 处理服务器消息
 * @param {string} message 消息
 */
    ProtoBase.prototype.handleProtocol = function (message) {
        if (message.ret !== 1 /* COMMON_SUCCESS */) {
            Logger.warn(ErrorLang[message.ret]);
            var func_1 = this['fail' + message.pt];
            if (func_1) {
                func_1.call(this, message);
            }
            else {
                Logger.warn('失败消息解析错误');
            }
            return;
        }
        // 分发消息
        var func = this['handle' + message.pt];
        if (func) {
            func.call(this, message);
        }
        else {
            Logger.warn('成功消息解析错误');
        }
    };
    return ProtoBase;
}());
__reflect(ProtoBase.prototype, "ProtoBase");
//# sourceMappingURL=ProtoBase.js.map