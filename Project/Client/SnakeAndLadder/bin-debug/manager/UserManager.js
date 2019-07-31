var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserManager = (function () {
    function UserManager() {
        this.isLogin = false;
        // 用户数据
        this._userInfo = new UserInfo();
        this._playerInfo = new PlayerInfo();
        //当前点击图像的用户
        this._curPlayerInfo = null;
        /**
         * 测试玩家形象图片
         */
    }
    /**
     * 获取单例
     * @return {object} UserManager
     */
    UserManager.instance = function () {
        if (!UserManager._instance) {
            UserManager._instance = new UserManager();
        }
        return UserManager._instance;
    };
    /**
     * 设置用户数据
     * @param {object} message 登陆消息
     */
    UserManager.prototype.setUserInfo = function (message) {
        Util.safeCopy(this._userInfo, message.userData);
        Util.safeCopy(this._playerInfo, message.playerData);
        console.log("设置用户数据:UserManager");
    };
    /**
     * 获得用户信息
     */
    UserManager.prototype.getUserInfo = function () {
        return this._userInfo;
    };
    /**
     * 获得用户信息
     */
    UserManager.prototype.getPlayerInfo = function () {
        return this._playerInfo;
    };
    /**
     * 更新用户信息
     */
    UserManager.prototype.updatePlayerInfo = function (message) {
        Util.safeCopy(this._playerInfo, message.playerData);
    };
    /**
     * 获得当前玩家的用户信息
     */
    UserManager.prototype.getCurPlayerInfo = function () {
        if (this._curPlayerInfo) {
            return this._curPlayerInfo;
        }
        else {
            return this._playerInfo;
        }
    };
    /**
     * 设置当前玩家的用户信息
     */
    UserManager.prototype.setCurPlayerInfo = function (value) {
        this._curPlayerInfo = value;
    };
    // 单例
    UserManager._instance = null;
    return UserManager;
}());
__reflect(UserManager.prototype, "UserManager");
//# sourceMappingURL=UserManager.js.map