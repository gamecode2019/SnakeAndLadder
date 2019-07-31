class GameProto extends ProtoBase {
    // 单例
    private static _instance = null;

	/**
	 * 获取单例
	 * @return {object} GameProto
	 */
    public static instance(): GameProto {
        if (!GameProto._instance) {
            GameProto._instance = new GameProto();
        }
        return GameProto._instance;
    }

    ///////////////////////////////////////////////////////////
    //登陆
    /**
     * 处理登录.
     * @param {object} message
     * @return void
     */
    public requestRomeLogin(message: CS_RomeLogin): void {
        message.type = GameType.test;
    }

    public failRomeLogin(message: SC_RomeLogin){

    }

    public handleRomeLogin(message: SC_RomeLogin){

    }
  


    /**
     * 注册全部协议
     */
    public registerProtocol(): void {
       


    }
}