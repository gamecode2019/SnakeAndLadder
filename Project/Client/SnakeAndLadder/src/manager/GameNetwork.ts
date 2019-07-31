class GameMessageCode {
	//登录游戏
	public static SC_UserLogin:string = "UserLogin";
	public static CS_UserLogin:string = "UserLogin";
	//更新用户信息
	public static SC_UpdatePlayerData:string = "UpdatePlayerData";
	public static CS_UpdatePlayerData:string = "UpdatePlayerData";

	//----------------------------------------------
	//请求进入房间
	public static CS_RomeLogin:string = "RomeLogin";
	//广播进入房间
	public static SC_RomeLogin:string = "RomeLogin";
	//请求退出房间
	public static CS_RomeLoguot:string = "RomeLoguot";
	//广播退出房间
	public static SC_RomeLoguot:string = "RomeLoguot";
	//请求房间和游戏信息
	public static CS_RoomInfo:string = "RoomInfo";
	//返回房间和游戏信息
	public static SC_RoomInfo:string = "RoomInfo";
	//请求游戏开始
	public static CS_StartGame:string = "StartGame";
	//广播游戏开始
	public static SC_StartGame:string = "StartGame";
	//请求操作
	public static CS_Operation:string = "Operation";
	//广播操作结果
	public static SC_Operation:string = "Operation";
	//游戏结算
	public static CS_EndGame:string = "EndGame";
	//广播游戏结算
	public static SC_EndGame:string = "EndGame";
	//请求发送聊天
	public static CS_Chat:string = "Chat";
	//广播聊天信息
	public static SC_Chat:string = "Chat";

	//----------------------------------------------
	//请求商店物品数据
	public static CS_InitShop:string="InitShop";
	//广播商店数据
	public static SC_InitShop:string="InitShop";
	//请求更新玩家物品数据
	public static CS_UpdatePlayerItem:string="UpdatePlayerItem";
	//广播更新玩家物品数据
	public static SC_UpdatePlayerItem:string="UpdatePlayerItem";

}
/**
 * 网络连接示例
 * 游戏中需要根据自己的逻辑进行适当的修改
 * 这里提供的是如何使用。具体游戏中自行更改
*/
class GameNetwork {
	private static instance: GameNetwork;
	public static get Instance(): GameNetwork {
		if (this.instance == null) {
			this.instance = new GameNetwork();
		}
		return this.instance;
	}
	private link: NetSocket;
	private connect_callback:Function = null;
	private heartTimer:number = -1;
	public constructor() {
		this.link = new NetSocket();
		this.initListener();
	}
	
	/**
	 * 连接服务器
	 * @returns void
	 */
	public connect(callback:Function): void {
		// this.link.secureConnect(GameConfig.wsServer, GameConfig.port, this.onSocketHandler, this);
		this.link.connect(GameConfig.wsServer, GameConfig.port, this.onSocketHandler, this);
		this.connect_callback = callback;
	}
	public get isConnected():boolean{
		return this.link.isConnected;
	}
	
	public close(): void {
		this.link.close();
	}
	/**
	 * 初始化消息监听
	 * 所关心的协议在初始化时应注册进去
	 * @returns void
	 */
	private initListener(): void {
		this.link.addListenerMessage(GameMessageCode.SC_UserLogin, this.recUserLogin, this);
		this.link.addListenerMessage(GameMessageCode.SC_UpdatePlayerData, this.recUpdatePlayerData, this);
		//
		this.link.addListenerMessage(GameMessageCode.SC_RomeLogin, this.recRomeLogin, this);
		this.link.addListenerMessage(GameMessageCode.SC_RomeLoguot, this.recRomeLoguot, this);
		this.link.addListenerMessage(GameMessageCode.SC_RoomInfo, this.recRoomInfo, this);
		this.link.addListenerMessage(GameMessageCode.SC_StartGame, this.recStartGame, this);
		this.link.addListenerMessage(GameMessageCode.SC_Operation, this.recOperation, this);
		this.link.addListenerMessage(GameMessageCode.SC_EndGame, this.recEndGame, this);
		this.link.addListenerMessage(GameMessageCode.SC_Chat, this.recChat, this);
		
		//商城
		this.link.addListenerMessage(GameMessageCode.SC_InitShop,this.recInitShop,this);
		this.link.addListenerMessage(GameMessageCode.SC_UpdatePlayerItem,this.recUpdatePlayerItem,this);

	}
	private onSocketHandler(status: NetSocketStatus): void {
		switch (status) {
			case NetSocketStatus.Connected:
				{
					if(this.connect_callback){
						this.connect_callback();
					}
				}
				break;
			case NetSocketStatus.ConnectFailed:
				{
					this.link.close();
					this.openConnectTip("  Connection failed, whether to reconnect!");
				}
				
				break;
			case NetSocketStatus.Disconnect:
				{
					this.link.close();
					this.closeHeart();
					this.openConnectTip("  The network has been disconnected, is it reconnected?");
				}
				break;
			case NetSocketStatus.Error:
				{
					this.link.close();
					this.openConnectTip("  Connection error, whether to reconnect!");
				}
				break;
		}
	}
	/**
	 * 连接提示
	 */
	private openConnectTip(msg){
		UIManager.instance().openWindow("ConnectTipWindow");
		let tipWindow = <ConnectTipWindow>(UIManager.instance().findWindow("ConnectTipWindow"));
		if(tipWindow){
			tipWindow.setTipMsg(msg);
		}
	}
	/**
	 * 定时发送心跳连接
	 */
	private sendHeart(timeout:number){
		var that = this;
		this.heartTimer = setTimeout(function () {
			that.link.send("Ping","");
		}, timeout);
	}

	/**
	 * 关闭心跳
	 */
	private closeHeart(){
		clearTimeout(this.heartTimer);
	}



	/**
     * WEB账号密码登录
     */
    public requestLoginByWeb(message: CS_UserLogin): void {
        message.type = LoginType.USERNAME;
        message.acc = 'zhang12';
        message.pw = '1233456';
        message.inviteId = 0;
        
        this.link.send(GameMessageCode.CS_UserLogin, JSON.stringify(message));
    }

    /**
     * 微信登录
     */
    public requestLoginByWeChat(message: CS_UserLogin,code:string): void {
        message.type = GameLoginType;
        message.code = code;
        message.inviteId = 0;
        this.link.send(GameMessageCode.CS_UserLogin, JSON.stringify(message));
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

        this.link.send(GameMessageCode.CS_UserLogin, JSON.stringify(message));
    }
	/**
     * 处理用户登录.
     * @param {SC_UserLogin} message
     * @return void
     */
	public recUserLogin(message: any){
		UserManager.instance().setUserInfo(JSON.parse(message));
        this.requestUpdatePlayerData()
		this.reqInitShop();
		//心跳
		// this.sendHeart(10000);
	}

    /**
     * 处理请求更新玩家数据
     */
    public requestUpdatePlayerData(): void {
        let message: CS_UpdatePlayerData = new CS_UpdatePlayerData();
        //测试
        message.playerData = UserManager.instance().getPlayerInfo();
		 message.playerData.nickName = Math.random().toString(36).substr(2);
		message.playerData.gold = Number((Math.random()*1000).toFixed(2));
		message.playerData.gameTotalCount = Math.floor(Math.random()*1000);

		this.link.send(GameMessageCode.CS_UpdatePlayerData, JSON.stringify(message));
    }

    /**
     * 处理成功获得玩家数据
     */
    public recUpdatePlayerData(message: any): void {
        console.info('handleUpdatePlayerData:',message);
        UserManager.instance().updatePlayerInfo(JSON.parse(message));

        if(!UserManager.instance().isLogin){
            UserManager.instance().isLogin = true;
            MySceneManager.OnCreate().LoadMainScene();
            UIManager.instance().openWindow("MainWindow");
        }
        
    }


	/**
	 * 登入房间请求
	 */
	public reqRomeLogin(roomID:number,player?:PlayerInfo): void {
		var message:CS_RomeLogin = new CS_RomeLogin();
		message.type = GameManager.instance().type;
		message.roomid = roomID;
		if(player){
			message.playerData = player
		}else{
			message.playerData = UserManager.instance().getPlayerInfo()
		}
		
		this.link.send(GameMessageCode.CS_RomeLogin, JSON.stringify(message));
	}
	/**
	 * 玩家进入房间
	 */
	private recRomeLogin(msg: any): void {
		var body:SC_RomeLogin = new SC_RomeLogin();
		Util.safeCopy(body, JSON.parse(msg));

		let roomid = body.roomid;
		let player = body.playerData;
		
		if(player.id==UserManager.instance().getPlayerInfo().id){
			if(GameManager.instance().gameLogic.roomInfo.gameState == GameState.matching){
				GameManager.instance().matchingGame();
			}
		}

		if(roomid<=0&&body.status==-1){
			console.info('匹配失败了');
			GameManager.instance().endGame(true);
			return;
		}
		if(roomid>0){
			//进入房间成功
			GameManager.instance().gameLogic.roomInfo.roomID = roomid;
			let seatid =GameManager.instance().gameLogic.playerEnter(player,player.id==UserManager.instance().getPlayerInfo().id,body.seatid);
			GameManager.instance().playerEnter(seatid);
		}
		
		if(GameDebug==DebugType.OffLine){
			//进入房间成功
			GameManager.instance().gameLogic.roomInfo.roomID = roomid;
			let seatid =GameManager.instance().gameLogic.playerEnter(player,player.id==UserManager.instance().getPlayerInfo().id,-1);
			GameManager.instance().playerEnter(seatid);
			return;
		}
		
		
		
	}
	/**
	 * 请求退出房间
	 */
	public reqRomeLoguot(seatid:number,roomid:number): void {
		var message:CS_RomeLoguot = new CS_RomeLoguot();
		message.seatid = seatid;
		message.roomid = roomid;
		this.link.send(GameMessageCode.CS_RomeLoguot, JSON.stringify(message));
	}
	/**
	 * 广播退出房间
	 */
	private recRomeLoguot(msg: any): void {
		var body:SC_RomeLoguot = new SC_RomeLoguot();
		Util.safeCopy(body, JSON.parse(msg));
		if(body.seatid==GameManager.instance().gameLogic.getMySeatId()){
			GameManager.instance().endGame(true);
		}else{
			//
			GameManager.instance().gameLogic.roomInfo.gameInfos[body.seatid].state = 10;
			console.info("退出房间 seatid:",body.seatid);
		}
		
	}

	/**
	 * 请求房间信息
	 */
	public reqRoomInfo(roomid:number): void {
		var message:CS_RoomInfo = new CS_RoomInfo();
		message.roomid = roomid;
		this.link.send(GameMessageCode.CS_RomeLoguot, JSON.stringify(message));
	}
	/**
	 * 广播房间信息
	 */
	private recRoomInfo(msg: any): void{
		var body:SC_RoomInfo = new SC_RoomInfo();
		Util.safeCopy(body, JSON.parse(msg));

		GameManager.instance().setRoomInfo(body);

		//匹配成功开始游戏
		if(body.roominfo.gameState == GameState.matching){
			if(GameManager.instance().type==GameType.firendMode){
				//开始游戏
				GameNetwork.Instance.reqStartGame(false);
			}else{
				//开始游戏
				GameNetwork.Instance.reqStartGame(false);
			}

		}else{
			GameManager.instance().recomeGame();
		}
		//...
		if(body.roominfo.gameState == GameState.firstHand){
			
		}
	}

	/**
	 * 请求开始游戏
	 */
	public reqStartGame(isHand):void{
		var message:CS_StartGame = new CS_StartGame();
		message.roomid = GameManager.instance().gameLogic.roomInfo.roomID;
		message.seatid = GameManager.instance().gameLogic.getMySeatId();
		message.handStart = isHand

		this.link.send(GameMessageCode.CS_StartGame, JSON.stringify(message));
	}
	/**
	 * 广播开始游戏
	 */
	private recStartGame(msg: any){
		var body:SC_StartGame = new SC_StartGame();
		Util.safeCopy(body, JSON.parse(msg));
		GameManager.instance().readyGame();
	}

	/**
	 * 请求操作
	 */
	public reqOperation(seatid:number,optType:OperationType):void{
		var message:CS_Operation = new CS_Operation();
		message.roomid = GameManager.instance().gameLogic.roomInfo.roomID;
		message.rollNum = GameManager.instance().gameLogic.roll();
		message.seatid = seatid;
		message.optType = optType; 
		this.link.send(GameMessageCode.CS_Operation, JSON.stringify(message));
	}
	/**
	 * 广播操作结果
	 */
	private recOperation(msg: any){
		var body:SC_Operation = new SC_Operation();
		Util.safeCopy(body, JSON.parse(msg));
		GameManager.instance().dealOperation(body);

	}

	/**
	 * 游戏结算
	 */
	private recEndGame(msg: any){
		var body:SC_EndGame = new SC_EndGame();
		Util.safeCopy(body, JSON.parse(msg));
		GameManager.instance().preEndGame();
	}

	/**
	 * 请求发送聊天
	 */
	public reqChat(msg:string):void{
		var message:CS_Chat = new CS_Chat();
		message.roomid = GameManager.instance().gameLogic.roomInfo.roomID;
		message.msg = msg;
		message.seatid = GameManager.instance().gameLogic.getMySeatId();
		this.link.send(GameMessageCode.CS_Chat, JSON.stringify(message));
	}
	/**
	 * 广播聊天信息
	 */
	private recChat(msg: any){
		var body:SC_Chat = new SC_Chat();
		Util.safeCopy(body, JSON.parse(msg));
		GameManager.instance().onChat(body);

	}


	
	//--------------------商城-------------
	/**
	 * 请求商店数据
	 */
	public reqInitShop():void
	{
		let message:CS_InitShop=new CS_InitShop();
		// this.link.send(GameMessageCode.CS_InitShop,JSON.stringify(message));
	}
	/**
	 * 广播商店数据
	 */
	public recInitShop(msg:any)
	{
		let body:SC_InitShop=new SC_InitShop();
		Util.safeCopy(body,JSON.parse(msg));
		ShopManager.instance().setShopData(body);
	}
	/**
	 * 请求更新玩家物品数据
	 */
	public reqUpdatePlayerItem(msg:CS_UpdatePlayerItem)
	{
		// this.link.send(GameMessageCode.CS_UpdatePlayerItem,JSON.stringify(msg));
	}
	/**
	 * 广播更新玩家物品数据
	 */
	public recUpdatePlayerItem(msg:any)
	{
		let body:SC_UpdatePlayerItem=new SC_UpdatePlayerItem();
		Util.safeCopy(body,JSON.parse(msg));
		ShopManager.instance().updatePlayerItem(body);
	}

}