class UserManager {
    // 单例
    private static _instance = null;
    public isLogin = false;
    // 用户数据
    private _userInfo: UserInfo = new UserInfo();
    private _playerInfo: PlayerInfo = new PlayerInfo();
    //当前点击图像的用户
    private _curPlayerInfo:PlayerInfo=null;

	/**
	 * 获取单例
	 * @return {object} UserManager
	 */
    public static instance(): UserManager {
        if (!UserManager._instance) {
            UserManager._instance = new UserManager();
        }
        return UserManager._instance;
    }

    /**
     * 设置用户数据
     * @param {object} message 登陆消息
     */
    public setUserInfo(message: SC_UserLogin): void {
        Util.safeCopy(this._userInfo, message.userData);
        Util.safeCopy(this._playerInfo, message.playerData);
        console.log("设置用户数据:UserManager",);
    }

    /**
     * 获得用户信息
     */
    public getUserInfo():UserInfo{
        return this._userInfo;
    }

    /**
     * 获得用户信息
     */
    public getPlayerInfo():PlayerInfo{
        return this._playerInfo;
    }

    /**
     * 更新用户信息
     */
    public updatePlayerInfo(message: SC_UpdatePlayerData){
        Util.safeCopy(this._playerInfo, message.playerData);
    }   

    /**
     * 获得当前玩家的用户信息
     */
    public getCurPlayerInfo():PlayerInfo{
        if(this._curPlayerInfo)
        {
            return this._curPlayerInfo;
        }
        else
        {
            return this._playerInfo;
        }
    }
    /**
     * 设置当前玩家的用户信息
     */
    public setCurPlayerInfo(value:PlayerInfo){
        this._curPlayerInfo=value;
    }

    /**
     * 测试玩家形象图片
     */
}