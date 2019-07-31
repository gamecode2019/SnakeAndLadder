const util = require('util');
const sceneobj = autoload('core/sceneobj');
const room_type = require('../define/room_type');
const player_type = require('../define/player_type');
const logger = autoload('core/logger').getLogger('checks_game');
const player_manager = require('../manager/player_manager').instance();
const packet_type = autoload("define/packet_type");
const error_type = autoload('define/error_type');
const data_object = autoload("define/data_object");
const math = autoload('core/math');

// eventScript file
//地图总格数
const GameMapStepLen = 48;
//地图事件格
var GameMapEvents = {
    0:{name:"start",toIndex:0},
    1:{name:"tree",toIndex:0},
    7:{name:"ladder",toIndex:19},
    17:{name:"ladder",toIndex:29},
    20:{name:"snake",toIndex:1},
    24:{name:"ladder",toIndex:41},
    27:{name:"ladder",toIndex:38},
    30:{name:"snake",toIndex:12},
    36:{name:"snake",toIndex:19},
    46:{name:"snake",toIndex:25},
    47:{name:"destination",toIndex:0}

};


/**
 * 构造函数
 * @param {number} roomid 房间ID
 * @param {number} type 房间类型 2 练习 3 匹配 4 好友
 * @return void
 */
const room = extend(sceneobj, function(id, type, playerNumber, chessNumber, isRobotAI) {
    sceneobj.apply(this, arguments);
    this.init(type, playerNumber, chessNumber, isRobotAI);
});

/**
 * 初始化
 * @param {number} modeType 房间类型
 * @return void
 */
room.prototype.init = function(modeType, playerNumber, chessNumber, isRobotAI) {
    this._roomType = modeType;
    this._chessNumber = chessNumber;
    this._playerNumber = playerNumber;
    this._playerArr = new Array(playerNumber).fill(0);
    if(this._roundInfo&&(typeof this._roundInfo == 'Array')){
        this._roundInfo.splice(0,this._roundInfo.length)
    }
    this._roundInfo = new Array(playerNumber).fill({}); // 回合信息
    this._firstPlayer = -1; //先手玩家座位
    this._isRobotAI = isRobotAI; //是否是机器人AI
    this._optCD = 10*1000; //操作时间
    this._optIndex = -1; //当前操作玩家
    this._gameState = room_type.GameState.matching;


    
    this._readyCount = 0; //准备玩家计数
    this._firstHandTimer = 0;//先手时间
    this._firstHandArr = new Array(playerNumber).fill(0);//先手未淘汰数组

    this._optTimer = -1;//操作计时器

    this._completeCount = 0; //完成游戏人数
    
    this._isNULL = false; //是否空闲
};

/**
 * 设置房间玩家
 * @param {array} playerArr 玩家ID数组
 * @param {number} modeType 模式类型
 */
room.prototype.setPlayerInfo = function(playerArr, modeType) {
    let self = this;
    if (playerArr.length < 2) {
        logger.error('[room.setPlayerInfo]player count err!! count is: ' + playerArr.length);
        return;
    }
    //
    for (let roleid of playerArr) {
        //加入战斗
        player_manager.addFightPlayer(parseInt(roleid));
    }
    for (let index in playerArr) {
        if (playerArr[index] < 0) {
            logger.error('[room.setPlayer]invalid player ' + playerArr[index]);
            return;
        }
        
        //
        self._playerArr[index] = parseInt(playerArr[index]);
        self._firstHandArr[index] = parseInt(playerArr[index]);
        let player = player_manager.findFightPlayer(parseInt(playerArr[index]));
        player.setRoomID(self.id());
    }

    //初始化道具模式下，玩家的的背包,刷出一个道具
    if (modeType == room_type.MODE_TYPE_ATHLETICS) {
        
    }
};

/**
 * 玩家加入
 */
room.prototype.pushPlayerInfo = function(roleid) {
    let self = this;
    if (roleid<=0) {
        logger.error('[room.pushPlayerInfo]roleid  err!!  ',roleid );
        return;
    }
    //加入战斗
    player_manager.addFightPlayer(parseInt(roleid));

    self._playerArr.push(roleid);
    self._firstHandArr.push(roleid);
    //分配座位
    let seatid = self._playerArr.length-1;
    this._roundInfo[seatid] = new room_type.RoundInfo();
    this._roundInfo[seatid].seatid = seatid;
    //设置玩家房间号
    let player = player_manager.findFightPlayer(roleid);
    player.setRoomID(self.id());

    //广播玩家加入
    
};

/**
 * 获取房间玩家列表
 * @return {Array} 玩家数组
 */
room.prototype.getPlayerArray = function() {
    return this._playerArr;
};

/**
 * 设置房间玩家座位信息
 * @param {number} roleid 玩家ID
 * @param {number} seatid 位置索引
 */
room.prototype.setPlayerSeatid = function(roleid, seatid) {
    this._roundInfo[seatid] = new room_type.RoundInfo();
    this._roundInfo[seatid].seatid = seatid;
};


/**
 * 获取房间玩家座位信息
 */
room.prototype.getPlayerSeatid = function(roleid) {
    return this._playerArr.indexOf(roleid);
};

/**
 * 获取房间玩家ID
 * @param {number} seatid 房间位置
 * @return {number} 玩家ID
 */
room.prototype.getPlayerId = function(seatid) {
    if (seatid < 0 || seatid >= room_type.ROOM_POS_MAX) {
        logger.error('[room.getPlayerId]invalid room seatid ' + seatid);
        return -1;
    }
    return this._playerArr[seatid];
};

/**
 * 摇点数
 * @returns 返回随机点数
 */
room.prototype.getRoll = function(){
    let roll = 1+Math.floor(Math.random()*6)
    return roll;
}

/**
 * 轮到下一个
 */
room.prototype.getNextOpt = function(){
    let nextIndex = this._optIndex;
    nextIndex++;
    nextIndex = nextIndex%this._playerArr.length;
    return nextIndex;
}

/**
 * 
 */


/**
 * 通过摇色子移动
 * @param {seatid:number,step:number} 座位号、摇出的步数 
 * @returns {step:number,out:number} 算出的步数、超出步数 
 */
room.prototype.addRollStep = function(seatid,rollNum){
    let self = this;
    self._roundInfo[seatid].nowRoll = rollNum;
    self._roundInfo[seatid].preStep = self._roundInfo[seatid].nowStep;

    //计算步数
    self._roundInfo[seatid].nowStep += rollNum;

    let out = this.checkStep(seatid);
    
    return {step:self._roundInfo[seatid].nowStep,out:out}
}

/**
 * 通过摇色子移动
 * @param {seatid:number,step:number} 座位号、步数 
 * @returns {step:number,out:number} 算出的步数、超出步数 
 */
room.prototype.setStep = function(seatid,step){
    let self = this;
    self._roundInfo[seatid].preStep = self._roundInfo[seatid].nowStep;
    //计算步数
    self._roundInfo[seatid].nowStep = step;
    let out = this.checkStep(seatid);

    return {step:self._roundInfo[seatid].nowStep,out:out}
}

/**
 * 修正检查步数
 */
room.prototype.checkStep = function(seatid){
    let self = this;
    let out_step = 0;
    if(self._roundInfo[seatid].nowStep>self._roundInfo[seatid].maxStep){
        out_step = self._roundInfo[seatid].nowStep - self._roundInfo[seatid].maxStep;
        self._roundInfo[seatid].nowStep = self._roundInfo[seatid].maxStep*2-self._roundInfo[seatid].nowStep;
    }
    return out_step;
}




//------------------------------------------------------------------------

/**
 * 广播消息
 * @param jsonObj [object] 消息
 * @return void
 */
room.prototype.broadcastMsg = function(jsonObj) {
    let self = this;
    for (let roleid of this._playerArr) {
        roleid = parseInt(roleid, 10);
        let seatid = self.getPlayerSeatid(roleid);
        if(self._roundInfo[seatid].isLeft){
            continue;
        }
        player_manager.sendMsg(roleid, jsonObj);
    }
};


/**
 * 匹配成功事件
 * @param roleid [int] 玩家ID
 */
room.prototype.onMatchSuccess = function(roleid) {
    let self = this;
    if (self._playerArr.indexOf(roleid) == -1) {
        logger.error('[room.onMatchSuccess]error!!! roleid is: ' + roleid);
        return;
    }

    // 查找玩家
    let player = player_manager.findFightPlayer(roleid);
    if (!player) {
        return;
    }

    // 通知玩家匹配成功
    // let message = new packet_type.SC_RomeLogin();
    // message.type = self._roomType;
    // message.roomid = self.id(); // 房间ID
    // message.status = room_type.ROOM_MATCH_SUCCEED
    // message.playerData = player.getBaseData();
    // message.ret = error_type.COMMON_SUCCESS;
    // message.isRobotAI = self._isRobotAI ? 1 : 0;
    // message.seatid = self.getPlayerSeatid(roleid)
    // player.sendMsg(message);

    let players = new Array();
    for (let index = 0; index < self._playerArr.length; index++) {
        const element = player_manager.findFightPlayer(self._playerArr[index]);
        players.push(element.getBaseData());
    }

    //直接给出房间信息
    let message = self.getRoomInfo();

    //消息
    if (player && !player.isRobot()) {
        player.sendMsg(message);
    }
    


    //道具模式
    if (self._roomType == room_type.MODE_TYPE_ATHLETICS) {
        
    }

    
};

/**
 * 房间信息
 */
room.prototype.getRoomInfo = function() {
    let self = this;
    let message = new packet_type.SC_RoomInfo();

    let players = new Array();
    for (let roleid of self._playerArr) {
        const player = player_manager.findFightPlayer(roleid);
        if(!player){
            players.push({});
            continue
        }
        players.push(player.getBaseData());
    }

    message.roominfo = {
        roomID:self.id(), // 房间ID
        playerNum:self._playerArr.length, // 游戏人数
        gameState:self._gameState, //游戏状态
        firstHandIdx:self._firstPlayer, //先手标识
        players:players, //玩家列表
        gameInfos:self._roundInfo, //玩家操作
        optIndex:self._optIndex,  //当前操作玩家
        optCD:self._optCD
    };
    return message;
};


/**
 * 找先手
 */
room.prototype.findFirstHand = function(){
    let self = this;

    for (let roleid of self._firstHandArr) {
        const player = player_manager.findFightPlayer(roleid);
        let seatid = self.getPlayerSeatid(roleid);
        self._roundInfo[seatid].firstHandRoll = self.getRoll();
        //返回点数
        let message = new packet_type.SC_Operation();
        message.seatid = seatid;
        message.rollNum =  self._roundInfo[seatid].firstHandRoll;
        message.optType = room_type.OperationType.firstHandRoll
        self.broadcastMsg(message);
    }

    //选出最大点数
    let maxRool = 0;
    for (let roleid of self._firstHandArr) {
        let seatid = self.getPlayerSeatid(roleid);
        if(self._roundInfo[seatid].firstHandRoll>=maxRool){
            maxRool = self._roundInfo[seatid].firstHandRoll
        }
    }

    //淘汰点数不是最大的
    for (var i = 0; i < self._firstHandArr.length; i++) {
        let seatid = self.getPlayerSeatid(self._firstHandArr[i]);
    　　if (self._roundInfo[seatid].firstHandRoll<maxRool) {
        　　self._firstHandArr.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
    　　　　i--; // 如果不减，将漏掉一个元素
    　　}
    }

    if(self._firstHandArr.length == 1){
        self._firstPlayer = self.getPlayerSeatid(self._firstHandArr[0]);
        return self._firstPlayer;
    }
    
    return -1;
}

//------- (轮到->处理操作->轮到) :SC_Operation-----------------------
//------- (轮到->处理超时->轮到) :SC_Operation-----------------------

/**
 * 设置轮次信息
 * @param {number} seatid 
 * @param {number} optType //操作类型
 */
room.prototype.setRoundInfo = function(seatid,optType) {
    let self = this;
    clearTimeout(self._optTimer);
    if(seatid<0||seatid>=room_type.ROOM_POS_MAX){
        logger.error('[room.setRoundInfo]error! not exist seatid in[0-4]! seatid is: ' + seatid);
        return;
    }
    if (util.isNullOrUndefined(self._roundInfo[seatid])) {
        logger.error('[room.setRoundInfo]error! not exist seatid! seatid is: ' + seatid);
        return;
    }
    self._optIndex = seatid;
    
    //游戏结束
    if(self._playerArr.length-self._completeCount<=1){
        self.completeGame();
        return;
    }
    //已完成
    if(self._roundInfo[seatid].state==room_type.ROUND_COMPLETE){
        if(self._playerArr.length-self._completeCount>1){
            let nextSeatID = self.getNextOpt()
            self.setRoundInfo(nextSeatID,optType);
        }else{
            //游戏结束
            self.completeGame();
        }
        return;
    }
    if(self._roundInfo[seatid].state == room_type.ROUND_OPTING){
        return;
    }
    self._roundInfo[seatid].state = room_type.ROUND_OPTING;

    //通知操作回合
    if(optType==room_type.OperationType.rollStep){
        //通知
        let message = new packet_type.SC_Operation();
        message.seatid = seatid;
        message.rollNum =  -1;
        message.optType = room_type.OperationType.rollStep
        self.broadcastMsg(message);
    }

    
    //机器人 **自动摇塞子
    const player = player_manager.findFightPlayer(self.getPlayerId(seatid));
    if(!player){
        logger.console.warn('[room.setRoundInfo]error! not exist player! player is: ' + player);
    }
    if(!player||player.isRobot()||self._roundInfo[seatid].isLeft){
        let time = 1000+Math.floor(Math.random()*self._optCD/2)
        self._optTimer = setTimeout(self.roundTimeOut,time,self,seatid,true);  
    }else{
        //超时 **自动摇塞子
        self._optTimer = setTimeout(self.roundTimeOut,self._optCD,self,seatid,false);
    }
     

};

/**
 * 处理玩家操作
 * @param {number} seatid 座位
 * @param {number} optType //操作类型
 */
room.prototype.optRoundRool = function(seatid,optType,test_rollNum) {
    
    let self = this;
    let delat_time = 4000;
    if(self._roundInfo[seatid].state == room_type.ROUND_COMPLETE){
        return;
    }
    if(self._roundInfo[seatid].state == room_type.ROUND_OPTEND){
        return;
    }
    self._roundInfo[seatid].state = room_type.ROUND_OPTEND;
    //通知
    let message = new packet_type.SC_Operation();
    message.seatid = seatid;
    message.rollNum =  self.getRoll();
    message.optType = optType;


    //
    let moveArr = [];
    let {step,out} = self.addRollStep(seatid,message.rollNum);
    moveArr.push({name:'tree',step:step,out:out})
    let nowStep = step;
    //触碰到事件
    while(true){
        let event = GameMapEvents[nowStep];
        if(!event){
            break;
        }
        
        if(event.name==='ladder'||event.name==='snake'){
            //蛇和梯子
            let {step,out} = self.setStep(seatid,event.toIndex);
            nowStep = step;
            moveArr.push({name:event.name,step:nowStep,out:out,})
            delat_time+=2000;
        }
        else if(event.name==='destination'){
            //终点
            self._roundInfo[seatid].state = room_type.ROUND_COMPLETE;
            self._completeCount++;
            moveArr.push({name:event.name,step:nowStep,out:0})
            delat_time+=4000;
            break;
        }else{
            break;
        }
    }

    message.moveArr = moveArr;
    self.broadcastMsg(message);

    //轮到下一个
    clearTimeout(self._optTimer);
    
    self._optTimer = setTimeout(function(){
        let nextSeatID = self.getNextOpt()

        if(self._roundInfo[seatid].state != room_type.ROUND_COMPLETE){
            self._roundInfo[seatid].state = room_type.ROUND_WAITING;
        }
        self.setRoundInfo(nextSeatID,optType);

    },delat_time);  

    
};

/**
 * 轮次超时托管操作
 * @param {number} self room
 * @param {number} seatid 座位
 * @param {number} isRobot 是否机器人
 */
room.prototype.roundTimeOut = function(self,seatid,isRobot) {
    self.optRoundRool(seatid,room_type.OperationType.rollStep);
};

/**
 * 玩家离开 机器人托管
 */
room.prototype.leftPlayer = function(roleid){
    let self = this;

    const player = player_manager.findFightPlayer(roleid);
    let seatid = self.getPlayerSeatid(roleid);
    if(!self._roundInfo||!self._roundInfo[seatid]){
        logger.console.error('[room.setRoundInfo]error! not exist is: ' + seatid);
        return seatid;
    }
    self._roundInfo[seatid].isLeft = true;
    
}

/**
 * 玩家回到房间 取消机器人托管
 */
room.prototype.recomePlayer = function(roleid){
    let self = this;
    const player = player_manager.findFightPlayer(roleid);
    if(!player){
        return;
    }
    player.setRoomID(self.id());

    let seatid = self.getPlayerSeatid(roleid);
    self._roundInfo[seatid].isLeft = false;

    //下发房间信息
    let message = self.getRoomInfo();
    //消息
    if (player && !player.isRobot()) {
        player.sendMsg(message);
    }
}

/**
 * 检查房间
 */
room.prototype.checkRoom = function(){
    let self = this;

}


/**
 * 完成游戏
 */
room.prototype.completeGame = function(){
    let self = this;
     //广播结算信息
    let message = new packet_type.SC_EndGame();
    self.broadcastMsg(message);
    //
    self.waitForRemove();

}

/**
 * 准备移除房间
 */
room.prototype.waitForRemove = function(){
    let self = this;
    
    //玩家离开战斗
    for (const roleid of self._playerArr) {
        player_manager.removeFightPlayer(roleid);
        //存档战斗积分
    }
    self._isNULL = true;

    //
}

/**
 * 房间移除
 */
room.prototype.onRemove = function(){

}













/**
 * 查找房间玩家是否存在
 * @return {boolean} 操作结果
 */
room.prototype.findPlayer = function(roleid) {
    return (this._playerArr.indexOf(roleid) !== -1);
};

/**
 * 是否有效房间
 * @return {boolean} 是否有效
 */
room.prototype.isValid = function() {
    return (this.status < room_type.ROOM_STATUS_BROKE);
};



module.exports = room;