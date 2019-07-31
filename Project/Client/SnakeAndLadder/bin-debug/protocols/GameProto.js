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
var GameProto = (function (_super) {
    __extends(GameProto, _super);
    function GameProto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取单例
     * @return {object} GameProto
     */
    GameProto.instance = function () {
        if (!GameProto._instance) {
            GameProto._instance = new GameProto();
        }
        return GameProto._instance;
    };
    ///////////////////////////////////////////////////////////
    //登陆
    /**
     * 处理登录.
     * @param {object} message
     * @return void
     */
    GameProto.prototype.requestRomeLogin = function (message) {
        message.type = GameType.test;
    };
    GameProto.prototype.failRomeLogin = function (message) {
    };
    GameProto.prototype.handleRomeLogin = function (message) {
    };
    /**
     * 注册全部协议
     */
    GameProto.prototype.registerProtocol = function () {
    };
    // 单例
    GameProto._instance = null;
    return GameProto;
}(ProtoBase));
__reflect(GameProto.prototype, "GameProto");
//# sourceMappingURL=GameProto.js.map