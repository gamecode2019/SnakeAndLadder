/**
 * 游戏控制
 */
class GameManager {
	//游戏类型
	type:GameType;
	//
	public gameLogic:GameLogic = null;
	
	// 匹配时间
	MatchingTime:number = 15000;
	
	//计时
	private matchingTimer:egret.Timer = null;
	private waitClock:Clock = new Clock();
	private timer:number = 0;

	// 单例
	private static _instance = null;

	/**
	 * 获取单例
	 * @return {object} BagManager
	 */
	public static instance(): GameManager {
		if (!GameManager._instance) {
			GameManager._instance = new GameManager();
		}
		return GameManager._instance;
	}

	constructor(){

	}

	public init(){

	}

	/**
     * 进入游戏
     */
    public enterGame(type:GameType,roomId?:number){
		this.type = type;
		if(this.type==GameType.firendMode){
			this.MatchingTime = 60000
		}else{
			this.MatchingTime = 15000
		}
		console.info("enterGame:",type);
		//加载游戏场景
		MySceneManager.OnCreate().LoadGameScene();
		UIManager.instance().openWindow("GameWindow");
		//创建游戏逻辑
		this.gameLogic = new GameLogic(this.type);

		//ws connect
		if(roomId>=0){
			GameManager.instance().gameLogic.roomInfo.roomID = roomId;
		}
		GameNetwork.Instance.reqRomeLogin(GameManager.instance().gameLogic.roomInfo.roomID);
	
		
		//游戏计时
		this.waitClock.start();
    }

	/**
	 * 开始匹配
	 */
	public matchingGame(){
		//匹配界面
		UIManager.instance().openWindow("MatchingWindow");
		//创建一个计时器对象
        this.matchingTimer = new egret.Timer(1000,Math.floor(this.MatchingTime/1000));
        this.matchingTimer.addEventListener(egret.TimerEvent.TIMER,this.matchingTimerFunc,this);
        this.matchingTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.matchingTimerComFunc,this);
        //开始计时
        this.matchingTimer.start();

		//状态
		this.gameLogic.roomInfo.gameState = GameState.matching;
	}
	private matchingTimerFunc(){
		

		//继续模拟匹配
		if(GameDebug==DebugType.OffLine){
			//人数齐了开始游戏
			if(this.gameLogic.roomInfo.players.length>=MAX_PLAYER){
				//开始游戏
				GameNetwork.Instance.reqStartGame(false);
				return;
			}

			if(this.type != GameType.firendMode){
				let player = new PlayerInfo();
				player.id = this.gameLogic.roomInfo.players.length;
				player.nickName = "离线测试"+player.id;

				GameNetwork.Instance.reqRomeLogin(this.gameLogic.roomInfo.roomID,player);
			}
			
		}
    }
    private matchingTimerComFunc(){
        console.log("匹配超时");
		this.endGame();
    }

	/**
	 * 玩家进入
	 */
	public playerEnter(seatid:number){
		let player = this.gameLogic.roomInfo.players[seatid];
		if(this.getGameWindow()){
			this.getGameWindow().playerEnter(seatid,player);
		}
		if(UIManager.instance().findWindow("MatchingWindow")){
			let matchWin:MatchingWindow = <MatchingWindow>(UIManager.instance().findWindow("MatchingWindow"));
			matchWin.playerEnter(seatid,player);
		}
	}

	/**
     * 准备游戏
     */
    public readyGame(){
		console.info("readyGame:",this.type);
		//移除匹配
		if(this.matchingTimer){
			this.matchingTimer.stop();
			this.matchingTimer.removeEventListener(egret.TimerEvent.TIMER,this.matchingTimerFunc,this);
			this.matchingTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.matchingTimerComFunc,this);
			this.matchingTimer = null;
		}
		UIManager.instance().closeWindow("MatchingWindow");

		//启用update
		this.timer = 0;
		egret.startTick(this.update,this);

		//状态
		this.gameLogic.roomInfo.gameState = GameState.gameStart;


		if(GameDebug==DebugType.OffLine){
			//播放开始动画
			if(this.getGameWindow()){
				this.getGameWindow().playStart();
				let that = this;
				//添加时钟 来选先手
				this.waitClock.addTimer("startClock",2000,function(extinfo){
					that.firstHand(0);
					that.firstHand(1);
					that.firstHand(2);
					that.firstHand(3);
				});
			}

		}else{

		}
		
    }

	/**
     * 开始游戏
     */
    public startGame(){
		let that = this;
		//播放开始动画
		if(this.getGameWindow()){
			this.getGameWindow().playStart();
			
			
		}
		//状态
		that.gameLogic.roomInfo.gameState = GameState.gameing;
		GameManager.instance().turnToSeatId(that.gameLogic.getFirstHander());
    }

	/**
     * 返回游戏
     */
    public recomeGame(){
		//移除匹配
		if(this.matchingTimer){
			this.matchingTimer.stop();
			this.matchingTimer.removeEventListener(egret.TimerEvent.TIMER,this.matchingTimerFunc,this);
			this.matchingTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.matchingTimerComFunc,this);
			this.matchingTimer = null;
		}
		UIManager.instance().closeWindow("MatchingWindow");

		//启用update
		this.timer = 0;
		egret.startTick(this.update,this);

    }

	/**
	 * 摇先手
	 */
	public firstHand(seatid:number){
		GameNetwork.Instance.reqOperation(seatid,OperationType.firstHandRoll);
		//状态
		this.gameLogic.roomInfo.gameState = GameState.firstHand;
		if(seatid == this.gameLogic.getMySeatId()){

		}
		
	}

	/**
	 * 轮到seatid操作
	 */
	public turnToSeatId(seatid:number){
		if(!this.getGameWindow()){
			return;
		}
		var that = this;
		if(GameDebug==DebugType.OffLine){
			//已完成
			if(this.gameLogic.roomInfo.gameInfos[seatid].state==9){
				this.gameLogic.nextOpt();
				if(this.gameLogic.roomInfo.playerNum-this.gameLogic.finishCount>1){
					this.turnToSeatId(that.gameLogic.roomInfo.optIndex)
				}else{
					//游戏结束
					this.preEndGame();
				}
				return;
			}
		}
		
		//操作
		if(this.gameLogic.roomInfo.gameInfos[seatid].state == 1){
			return;
		}
		this.gameLogic.roomInfo.gameInfos[seatid].state = 1;
		this.getGameWindow().showOperationBD(seatid,true);
		if(GameDebug==DebugType.OffLine){
			//超时
			this.waitClock.addTimer("waitTurn",5000,function(extinfo){
				console.info("操作超时",seatid);
				// that.gameLogic.roomInfo.gameInfos[seatid].state = 10;
				GameManager.instance().rollStep(seatid);
				that.getGameWindow().hideOperationBD(seatid)
			})
		}
		
	}

	/**
	 * 摇点数=步数
	 */
	public rollStep(seatid:number){
		if(this.gameLogic.roomInfo.gameInfos[seatid].state != 1){
			return;
		}
		//
		this.waitClock.removeTimer("waitTurn");

		this.gameLogic.roomInfo.optIndex = seatid;
		if(GameDebug==DebugType.OffLine){
			GameNetwork.Instance.reqOperation(seatid,OperationType.rollStep);
		}else{
			if(seatid == this.gameLogic.getMySeatId()){
				GameNetwork.Instance.reqOperation(seatid,OperationType.rollStep);
			}
		}
		

		// this.wait(2,function(){
			
		// })
		// this.gameLogic.nextOpt();

	}


	/**
	 * 处理操作
	 */
	public dealOperation(body:SC_Operation){
		let opt_name = ''
		switch (body.optType) {
			case OperationType.firstHandRoll:
				{
					opt_name = 'firstHandRoll';
					if(body.firstHandSeatId>=0){
						this.gameLogic.roomInfo.firstHandIdx = body.firstHandSeatId;
						console.info("先手玩家:",this.gameLogic.getFirstHander());
						GameManager.instance().startGame();
					}else{
						this.gameLogic.roomInfo.gameInfos[body.seatid].firstHandRoll = body.rollNum;
						GameManager.instance().showRollFirstHand(body.seatid,body.rollNum);
					}
					
				}
				break;
			case OperationType.rollStep:
				{
					opt_name = 'rollStep';
					if(GameDebug==DebugType.OffLine){
						let res:{step:number,out:number} = this.gameLogic.addRollStep(body.seatid,body.rollNum);
						GameManager.instance().playRollStep(body.seatid,body.rollNum,res.step,res.out);
					}else{
						if(body.rollNum == -1){
							//轮到
							this.turnToSeatId(body.seatid);
						}else{
							//操作
							if(body.moveArr.length>0){
								GameManager.instance().playArrStep(body.seatid,body.rollNum,body.moveArr);
							}
							
							
						}
					}
				}
				break;
		
			default:
				break;
		}

		console.info("dealOperation:",opt_name,body.seatid);
	}
	/**
	 * 游戏结算
	 */
	public preEndGame(){
		//展示结算信息
		console.info('游戏结束');
		this.waitClock.stop();
		this.waitClock.removeAllTimer();

		UIManager.instance().openWindow("GameEndWindow");
	}

	/**
	 * 结束游戏
	 */
	public endGame(froce?:boolean){
		if(!froce){
			GameNetwork.Instance.reqRomeLoguot(this.gameLogic.getMySeatId(),this.gameLogic.roomInfo.roomID);
			return;
		}
		//ws close
		// GameNetwork.Instance.close();
		//游戏逻辑
		this.gameLogic = null;
		
		//停用update
		egret.stopTick(this.update,this);

		//切换到大厅场景
		MySceneManager.OnCreate().LoadMainScene();
		UIManager.instance().openWindow("MainWindow");

		//移除匹配
		if(this.matchingTimer){
			this.matchingTimer.stop();
			this.matchingTimer.removeEventListener(egret.TimerEvent.TIMER,this.matchingTimerFunc,this);
			this.matchingTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.matchingTimerComFunc,this);
			this.matchingTimer = null;
		}
		this.waitClock.stop();
		this.waitClock.removeAllTimer();
	}

	/**
	 * 先手摇色子
	 */
	public showRollFirstHand(seatid:number,rollnum:number){
		console.info("showRollFirstHand:",seatid,rollnum);
		if(this.getGameWindow()){
			var that = this;
			this.getGameWindow().playRollFirst(seatid,rollnum);
			if(GameDebug==DebugType.OffLine){
				//等待先手摇塞子
				this.waitClock.addTimer(`waitFirstHand${seatid}`,3000,function(extinfo){
					//摇完塞子动画回调
					that.gameLogic.addPlayerToRollHandArr(seatid,{
						success:function(){
							console.info("先手玩家:",that.gameLogic.getFirstHander());
							//状态
							that.gameLogic.roomInfo.gameState = GameState.gameing;
							GameManager.instance().turnToSeatId(that.gameLogic.getFirstHander());
						},
						continue:function(res){
							//继续等待
							if(typeof res ==='number'&&res>=0){
								if(GameDebug == DebugType.OffLine){
									GameManager.instance().firstHand(res);
								}else{
									if(res == that.gameLogic.getMySeatId()){
										GameManager.instance().firstHand(res);
									}
								}
							}
						}
					});

				})
			}else{

			}
			

			
			
		}
		
	}

	/**
	 * 摇色子移动
	 */
	public playRollStep(seatid:number,rollnum:number,step:number,out:number){
		console.info("playRollStep:",seatid,rollnum);
		this.gameLogic.roomInfo.gameInfos[seatid].state =2

		var that = this;
		//移动
		if(this.getGameWindow()){
			this.getGameWindow().playRoll(seatid,rollnum,step,out);
		}
		if(GameDebug==DebugType.OffLine){
			//等待完成动作（*** 大于3s）
			this.waitClock.addTimer(`waitRollStep${seatid}`,4000,function(extinfo){
				that.gameLogic.roomInfo.gameInfos[seatid].state =3
				GameManager.instance().turnToSeatId(that.gameLogic.roomInfo.optIndex);
			})
		}

	}
	/**
	 * 摇色子移动 参照服务端返回
	 */
	public playArrStep(seatid:number,rollnum:number,moveArr:Array<any>){
		this.gameLogic.roomInfo.gameInfos[seatid].state =2
		var that = this;
		//移动
		if(this.getGameWindow()){
			this.getGameWindow().playMoveArr(seatid,rollnum,moveArr);
		}
		
	}



	/**
	 * 触发事件移动
	 */
	public playEventStep(key:string,seatid:number,step:number){
		console.info("playEventStep:",key,seatid,step);
		var that = this;
		//停止时间回调 继续等待
		this.waitClock.removeTimer("waitTurn");
		this.waitClock.removeTimer(`waitRollStep${seatid}`);

		if(GameDebug==DebugType.OffLine){
			//等待完成动作
			this.waitClock.addTimer(`waitRollStep${seatid}`,2000,function(extinfo){
				that.gameLogic.roomInfo.gameInfos[seatid].state =3
				GameManager.instance().turnToSeatId(that.gameLogic.roomInfo.optIndex);
			})

		}

		
		
		//移动到事件导向的位置
		let res:{step:number,out:number} = this.gameLogic.setStep(seatid,step)
		if(this.getGameWindow()){
			this.getGameWindow().map.moveToStep(seatid,res.step);
		}

		

	}
	/**
	 * 玩家到达终点
	 */
	public playerFinish(seatid:number){
		console.info("playerFinish:",seatid);
		//停止时间回调 继续等待
		this.waitClock.removeTimer("waitTurn");
		this.waitClock.removeTimer(`waitRollStep${seatid}`);
		var that = this;
		
		this.gameLogic.setFinish(seatid)
		if(this.gameLogic.roomInfo.playerNum-this.gameLogic.finishCount==1){
			//游戏结束
			this.preEndGame();
		}
		if(this.getGameWindow()){
			
		}

		//
		this.waitClock.addTimer(`waitRollStep${seatid}`,3000,function(extinfo){
			GameManager.instance().turnToSeatId(that.gameLogic.roomInfo.optIndex);
		})

	}

	/**
	 * 广播聊天
	 */
	public onChat(rec:SC_Chat){
		if(rec.msg.indexOf('[f:')>=0){
			//表情聊天
			let score = rec.msg.substring(3,rec.msg.length-1);
			//
			if(this.getGameWindow()){
				this.getGameWindow().showChatFace(rec.seatid,score);
			}
		}else{
			//聊天
			let score = rec.msg;
			if(this.getGameWindow()){
				this.getGameWindow().showChatMsg(rec.seatid,score);
			}
		}


	}


	/**
	 * 
	 */
	public setRoomInfo(res:SC_RoomInfo){
		console.info('设置玩家信息',res);
		//进入房间成功
		GameManager.instance().gameLogic.roomInfo.roomID = res.roominfo.roomID;
		GameManager.instance().gameLogic.roomInfo.playerNum = res.roominfo.playerNum;
		GameManager.instance().gameLogic.roomInfo.gameState = res.roominfo.gameState;
		GameManager.instance().gameLogic.roomInfo.players = res.roominfo.players;
		GameManager.instance().gameLogic.roomInfo.gameInfos = res.roominfo.gameInfos;
		GameManager.instance().gameLogic.roomInfo.firstHandIdx = res.roominfo.firstHandIdx;
		GameManager.instance().gameLogic.roomInfo.optIndex = res.roominfo.optIndex;
		GameManager.instance().gameLogic.roomInfo.optCD = res.roominfo.optCD;

		for (let index = 0; index <res.roominfo.players.length; index++) {
			const player = res.roominfo.players[index];
			GameManager.instance().gameLogic.playerEnter(player,player.id==UserManager.instance().getPlayerInfo().id,index);
			let seatid = res.roominfo.gameInfos[index].seatid;
			if(seatid == index){
				GameManager.instance().playerEnter(index);
			}else{
				console.error('error: 检查座位')
			}
			


			//设置棋子位置
			if(GameManager.instance().gameLogic.roomInfo.gameState==GameState.gameing){
				if(this.getGameWindow()){
					this.getGameWindow().map.setStep(seatid,res.roominfo.gameInfos[index].nowStep);
				}
			}
			
		}

		//
		if(res.roominfo.optIndex==GameManager.instance().gameLogic.getMySeatId()){
			if(res.roominfo.gameInfos[res.roominfo.optIndex].state==1){
				this.getGameWindow().showOperationBD(res.roominfo.optIndex,true);
			}
		}

		

	}

	/**
	 * 暂停
	 */
	public pauseGame(){

	}
	/**
	 * 恢复
	 */
	public resumeGame(){

	}

	/**
	 * 重玩
	 */
	public reStartGame(){

	}

	/**
	 * 获取游戏场景
	 */
	private getGameWindow():GameWindow{
		if(UIManager.instance().findWindow("GameWindow")){
			return <GameWindow>(UIManager.instance().findWindow("GameWindow"));
		}
		return null;
	}

	/**
	 * 以 60 帧速率定时回调函数，改变帧率也不会影响回调速度。
	 */
	private update(timeStamp:number): any{
        var pass = timeStamp - this.timer;
		this.timer = timeStamp;

		//todo

		return false;

	}
}