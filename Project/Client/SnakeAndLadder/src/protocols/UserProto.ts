class UserProto extends ProtoBase {
    // 单例
    private static _instance = null;

	/**
	 * 获取单例
	 * @return {object} UserProto
	 */
    public static instance(): UserProto {
        if (!UserProto._instance) {
            UserProto._instance = new UserProto();
        }
        return UserProto._instance;
    }

    ///////////////////////////////////////////////////////////
    //登陆
    /**
     * 处理用户登录.
     * @param {object} message
     * @return void
     */
    public requestUserLogin(message: CS_UserLogin): void {
        message.type = GameLoginType;
        HttpHandler.instance().sendLoginMessage(message);
    }

    /**
     * WEB账号密码登录
     */
    public requestLoginByWeb(message: CS_UserLogin): void {
        message.type = LoginType.USERNAME;
        message.acc = '张辉';
        message.pw = '1233456';
        message.inviteId = 0;
        if(GameDebug==DebugType.OffLine){
            //测试用户信息
            UserManager.instance().getPlayerInfo().nickName = '123';
            UserManager.instance().getPlayerInfo().avatarUrl = 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUbNicL4RicqD50sFfian0CRH9AkMbicN5q8YhaTeC4df8aG8MPkiaNwK8vM36f7OTppH2SdZOlpkTUvA/132';


            MySceneManager.OnCreate().LoadMainScene();
            UIManager.instance().openWindow("MainWindow");
            return;
        }
        HttpHandler.instance().sendLoginMessage(message);
    }

    /**
     * 微信登录
     */
    public requestLoginByWeChat(message: CS_UserLogin,code:string): void {
        message.type = GameLoginType;
        message.code = code;
        message.inviteId = 0;
        HttpHandler.instance().sendLoginMessage(message);
    }

    /**
     * feceBook登录
     */
    public requestLoginByFaceBook(message: CS_UserLogin,player:FBInstant.FBPlayer): void {
        // console.info(player.getSignedPlayerInfoAsync());
        message.type = LoginType.FACEBOOK;
        message.uid =  parseInt(player.getID());
        message.nickName = player.getName();
        message.avatarUrl = player.getPhoto();
        message.inviteId = 0;
        if(GameDebug==DebugType.OffLine){
            //测试用户信息
            UserManager.instance().getPlayerInfo().nickName = player.getName();
            UserManager.instance().getPlayerInfo().avatarUrl = player.getPhoto();
            UserManager.instance().getPlayerInfo().id = parseInt(player.getID());

            MySceneManager.OnCreate().LoadMainScene();
            UIManager.instance().openWindow("MainWindow");
            return;
        }

        HttpHandler.instance().sendLoginMessage(message);
    }

    /**
     * 处理用户登录.
     * @param {SC_UserLogin} message
     * @return void
     */
    public handleUserLogin(message: SC_UserLogin): void {
        UserManager.instance().setUserInfo(message);

        this.requestUpdatePlayerData()
    }

    /**
     * 用户登录失败
     * @param {SC_UserLogin} 
     * @return void
     */
    public failUserLogin(message: SC_UserLogin): void {

    }

    //////////////////////////////////////////////////
    //玩家数据
    /**
     * 处理请求玩家数据
     */
    public requestUpdatePlayerData(): void {
        let message: CS_UpdatePlayerData = new CS_UpdatePlayerData();
        //测试
        message.playerData = UserManager.instance().getPlayerInfo();
        message.playerData.gold = 998;
        message.playerData.gameTotalCount = 999;

        HttpHandler.instance().sendLoginMessage(message);
    }

    /**
     * 处理成功获得玩家数据
     */
    public handleUpdatePlayerData(message: SC_UpdatePlayerData): void {
        console.info('handleUpdatePlayerData:',message);
        UserManager.instance().updatePlayerInfo(message);

        if(!UserManager.instance().isLogin){
            UserManager.instance().isLogin = true;
            MySceneManager.OnCreate().LoadMainScene();
            UIManager.instance().openWindow("MainWindow");
        }
        
    }

    /**
     * 处理获取玩家数据失败
     */
    public failUpdatePlayerData(message: SC_UpdatePlayerData): void {

    }


    /**
     * 注册全部协议
     */
    public registerProtocol(): void {
        // HttpHandler.instance().registerProtocol('UserLogin', this);
        // HttpHandler.instance().registerProtocol('UpdatePlayerData', this);
    }
}