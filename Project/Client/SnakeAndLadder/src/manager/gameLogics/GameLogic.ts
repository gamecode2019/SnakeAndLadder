const MAX_PLAYER = 4
/**
 * 游戏主要逻辑 需要（UserType.ts  CommonParam.ts）
 */
class GameLogic {
	//玩家信息
	public roomInfo:RoomInfo = null;
	//完成人数
	public finishCount:number = 0;

	//游戏类型
	private gameType:GameType;
	//参入先手摇点玩家座位号
	private rollHandArrLen = MAX_PLAYER;
	private rollHandArr:Array<number> = [];
	//我的座位
	private mySeatId:number = 0;
	//



	public constructor(gameType:GameType) {
		// gameType
		this.gameType = gameType;

		//roomInfo
		this.roomInfo = new RoomInfo();
		this.roomInfo.roomID = 0;
		this.roomInfo.gameState = GameState.matching;
		this.roomInfo.firstHandIdx = -1;
		this.roomInfo.players = [];
		this.roomInfo.gameInfos = [];
		this.roomInfo.optIndex = 0;
		this.roomInfo.optCD = 5;
		this.roomInfo.playerNum = 0;
		if(this.gameType == GameType.test){
			
		}
		this.rollHandArrLen = MAX_PLAYER;

		for(let i:number = 0;i<MAX_PLAYER;i++){
			this.roomInfo.gameInfos.push(null)
		}

	}
	/**
	 * 玩家进入游戏
	 * @param player 玩家个人信息
	 * @param self 我进入
	 */
	public playerEnter(player:PlayerInfo,self:boolean,seatid:number):number{
		if(GameDebug==DebugType.OffLine){
			//加入一个玩家信息
			this.roomInfo.players.push(player);
			this.roomInfo.playerNum = this.roomInfo.players.length;
			this.rollHandArrLen = this.roomInfo.playerNum;
			//初始游戏信息
			let gameinfo = new GameInfo()
			gameinfo.state = 0;
			gameinfo.seatid = this.roomInfo.players.length-1;
			this.roomInfo.gameInfos[this.roomInfo.players.length-1]=gameinfo;

			//
			if(self){
				this.mySeatId = gameinfo.seatid;
			}
			return gameinfo.seatid;
		}else{
			this.rollHandArrLen = this.roomInfo.playerNum;
			//我的座位
			if(self){
				this.mySeatId = seatid;
			}
			return seatid;
		}

	}

	/**
	 * 轮到下一个
	 */
	public nextOpt(){
		this.roomInfo.optIndex++;
		this.roomInfo.optIndex = this.roomInfo.optIndex%this.roomInfo.playerNum;
	}

	/**
	 * 摇点数
	 * @returns 返回随机点数
	 */
	public roll():number{
		let roll:number = 1+Math.floor(Math.random()*6)
		// console.info("roll：",roll);
		return roll;
	}
	/**
	 * addPlayerToRollHandArr 参加先手选择
	 * @param seatid 座位号
	 * @param callback.success 一轮返回 选出先手返回成功 结束该流程
	 * @param callback.continue 一轮返回 存在点数同时最大继续等待
	 */
	public addPlayerToRollHandArr(seatid:number,callback?:any){
		//参加先手选择
		this.rollHandArr.push(seatid);
		//选择先手
		if(this.rollHandArr.length>=this.rollHandArrLen){
			console.info("rollHandArr",this.rollHandArr);
			if(this.selFirstHander()){
				//状态
				if(callback){
					callback.success();
				}
			}else{
				this.rollHandArrLen = this.rollHandArr.length;
				console.info("存在点数同时最大的玩家：",this.rollHandArrLen);
				for(let i:number = 0;i< this.rollHandArrLen;i++){
					//继续等待
					if(callback){
						callback.continue(this.rollHandArr[i]);
					}

				}
				this.rollHandArr.splice(0,this.rollHandArr.length)
			}
		}
	}
	/**
	 * 选出先手玩家
	 */
	private selFirstHander():boolean{
		let max_index = 0;
		for(let i:number = 0;i<this.rollHandArr.length;i++){
			let index = this.roomInfo.gameInfos[this.rollHandArr[i]].firstHandRoll;
			if(index>=max_index){
				max_index = index;
			}
		}
		//最大点数个数
		let reRollArr:Array<number> = [];
		for(let i:number = 0;i<this.rollHandArr.length;i++){
			let index = this.roomInfo.gameInfos[this.rollHandArr[i]].firstHandRoll;
			if(index==max_index){
				reRollArr.push(this.rollHandArr[i]);
			}
		}

		if(reRollArr.length==1){
			//选出了先手
			this.roomInfo.firstHandIdx = reRollArr[0];
			this.roomInfo.optIndex = this.roomInfo.firstHandIdx;
			return true;
		}else{
			//筛选后重选
			this.rollHandArr = reRollArr;
			return false;
		}

	}
	/**
	 * 通过摇色子移动
	 * @param {seatid:number,step:number} 座位号、摇出的步数 
	 * @returns {step:number,out:number} 算出的步数、超出步数 
	 */
	public addRollStep(seatid:number,rollNum:number):{step:number,out:number}{

		this.roomInfo.gameInfos[seatid].nowRoll = rollNum;
		this.roomInfo.gameInfos[seatid].preStep = this.roomInfo.gameInfos[seatid].nowStep;
		//计算步数
		this.roomInfo.gameInfos[seatid].nowStep += rollNum;

		let out = this.checkStep(seatid);
		
		//下一个
		this.nextOpt();
		console.info("RollStep:",seatid,'-当前在-',this.roomInfo.gameInfos[seatid].nowStep);
		return {step:this.roomInfo.gameInfos[seatid].nowStep,out:out}
	}
	/**
	 * 通过摇色子移动
	 * @param {seatid:number,step:number} 座位号、步数 
	 * @returns {step:number,out:number} 算出的步数、超出步数 
	 */
	public setStep(seatid:number,step:number):{step:number,out:number}{
		this.roomInfo.gameInfos[seatid].preStep = this.roomInfo.gameInfos[seatid].nowStep;
		//计算步数
		this.roomInfo.gameInfos[seatid].nowStep = step;
		let out = this.checkStep(seatid);
		
		console.info("setStep:",seatid,'-当前在-',this.roomInfo.gameInfos[seatid].nowStep);
		return {step:this.roomInfo.gameInfos[seatid].nowStep,out:out}
	}
	/**
	 * 修正检查步数
	 */
	public checkStep(seatid:number){
		let out_step = 0;
		if(this.roomInfo.gameInfos[seatid].nowStep>this.roomInfo.gameInfos[seatid].maxStep){
			out_step = this.roomInfo.gameInfos[seatid].nowStep - this.roomInfo.gameInfos[seatid].maxStep;
			this.roomInfo.gameInfos[seatid].nowStep = this.roomInfo.gameInfos[seatid].maxStep*2-this.roomInfo.gameInfos[seatid].nowStep;
		}
		return out_step;
	}

	/**
     * 触碰到棋子事件
     */
    public cashEvent(seatid: number, step: number):any {
		if(GameMapEvents[step]){
			console.info("触碰到棋子事件", GameMapEvents[step])
			//处理事件
			let key = GameMapEvents[step].name;
			switch (key) {
				case "start":
					break;
				case "tree":
					{

					}
					break;
				case "ladder":
					{
						let toIndex = GameMapEvents[step].toIndex;
						//处理梯子效果
						let res:{step:number,out:number} = this.setStep(seatid,toIndex);
					}
					break;
				case "snake":
					{
						let toIndex = GameMapEvents[step].toIndex;
						//处理蛇效果
						let res:{step:number,out:number} = this.setStep(seatid,toIndex);
					}
					break;
				case "destination":
					{
						let toIndex = GameMapEvents[step].toIndex;
						//终点
						
					}
					break;

				default:
					break;
			}

			return GameMapEvents[step];
		}
        return null;
    }

	/**
	 *  get先手玩家seatid
	 */
	public getFirstHander():number{
		return this.roomInfo.firstHandIdx;
	}
	/**
	 * 我的座位
	 */
	public getMySeatId():number{
		return this.mySeatId;
	}

	/**
	 * 到终点
	 */
	public setFinish(seatid:number){
		this.finishCount++;
		this.roomInfo.gameInfos[seatid].state = 9;
	}


	
}