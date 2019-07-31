"use strict";
const manager = autoload('core/manager');
const room_type = require('../define/room_type');
const room = require('../logic/room');
const player_manager = require('../manager/player_manager').instance();
const player_type = require('../define/player_type');
const logger = autoload('core/logger').getLogger('checks_game');
const error_type = autoload('define/error_type');
const packet_type = autoload("define/packet_type");
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const util = require('util');
let _singleton = null;

/**
 * Manager 构造函数
 * @param void
 * @return void
 */
const room_manager = extend(manager, function() {
    this._roomMap = {};
    this._roomIndex = 0;
    this._taskMap = {}; // 匹配人物
    this._roomID = 1000; // 当前房间分配ID
    this._roomIDList = []; // 回收房间ID
    this._roomPool = []; // 房间回收池

    this._firstHandTaskMap = [];//先手选择任务
    
});

/**
 * 单例
 * @param void
 * @return {object} 管理器实例
 */
room_manager.instance = function() {
    if (_singleton === null) { _singleton = new room_manager(); }
    return _singleton;
};

/**
 * 初始化管理器
 * @param void
 * @return void
 */
room_manager.prototype.init = function() {};

/**
 * 更新管理器
 * @param void
 * @return void
 */
room_manager.prototype.update = function() {
    this.doMatchTask();
    this.doFirstHand();
    this.doRemoveNullRoom();
};

/**
 * 创建匹配加入房间
 * @param {number} roleid 发起的玩家
 * @param {object} reqData 发起参数
 * @return {object} 房间
 */
room_manager.prototype.createMatchTask = thunkify(function(roleid, reqData ,callback) {
    let self = this;
    
    hprose.co(function*() {
        if(reqData.roomid<0){
            logger.error('[room_manager.createMatchTask]err!!! roomid error!!! roomid is: ' + reqData.roomid);
            return callback(null, null);
        }
        if(reqData.type<0){
            logger.error('[room_manager.createMatchTask]err!!! roomid error!!! roomid is: ' + reqData.roomid);
            return callback(null, null);
        }
        //在游戏中
        let fighter = player_manager.findFightPlayer(roleid)
        if(fighter){
            
            let roomid = fighter.getRoomID()
            let room = self.findRoom(roomid);
            if(!room){
                logger.error('[room_manager.createMatchTask]err!!! findFightPlayer error!!! roleid is: ' + roleid);
                return callback(null, null);
            }
            player_manager.addFightPlayer(roleid);
            room.recomePlayer(roleid);
            return callback(null, null);
        }
        player_manager.addFightPlayer(roleid);

        //好友房
        if(reqData.type==4){
            if(reqData.roomid>0){
                
                self.createPrivateRoom(roleid);
                return callback(null, null);
            }else{
                //查找房间 加入 
                self.joinRoom(reqData.roomid,roleid)
                return callback(null, null);
            }
        }
        //匹配
        if(reqData.roomid==0){
            //匹配
            let taskObj = new room_type.MatchTask(roleid, reqData.type, room_type.PLAYER_TYPE_FOUR, room_type.CHESS_TYPE_ONE);
            self._taskMap[roleid] = taskObj;

            return callback(null, taskObj);
        }else{
            
            return callback(null, null);
        }
        
    }).catch(function(err) {
        logger.error('[room_manager.createMatchTask] error: ' + err.message);
        return callback(err, null);
    });
});

/**
 * 执行单次匹配任务
 * @param {object} self 房间管理器
 * @param {object} task 匹配任务
 * @param {bool} fillRobot 是否填充机器人
 */
const _matchTask = function(self, task, fillRobot) {
    if (task.roleid < 1) {
        return mutiret(error_type.ROOM_TASK_ERR, null);
    }

    // 查找玩家
    let findData = self.findFightPlayer(task, fillRobot);
    if (findData.hasError()) {
        return mutiret(findData.getError(), null);
    }
    let opponentArr = findData.getData();
    if (opponentArr.length < 2) {
        return mutiret(null, null);
    }
    
    // 设置房间
    let room = self.createRoom(task.modeType, opponentArr.length,task.chessNumber, fillRobot);
    room.setPlayerInfo(opponentArr, task.modeType);

    let playerArr = room.getPlayerArray();

    for (let index = 0; index < playerArr.length; index++) {
        room.setPlayerSeatid(playerArr[index], parseInt(index));
    }

    // 将匹配到房间中的玩家状态设置为匹配成功
    task.status = room_type.ROOM_MATCH_SUCCEED;
    task.roomid = room.id();

    for (let roleid of playerArr) {
        if (roleid == task.roleid) {
            continue;
        }

        let taskObj = self._taskMap[roleid];
        if (util.isNullOrUndefined(taskObj)) {
            // logger.error('[_matchTask] taskObj err!!! roleid is: ' + roleid)
            // return mutiret(error_type.ROOM_PLAYER_COUNT_ERR, null);
            continue;
        }
        taskObj.status = room_type.ROOM_MATCH_SUCCEED;
        taskObj.roomid = room.id();
    }

    return mutiret(null, room);
};

/**
 * 在房间中
 * @param {number} roleid 玩家id
 * @return {number} roomid
 */
room_manager.prototype.isInRoom = function(roleid){
    let self = this;
    let roomid = 0;
    return roomid;
}


/**
 * 查找匹配玩家
 * @param {object} task 匹配任务
 * @param {bool} fillRobot 是否填充机器人
 */
room_manager.prototype.findFightPlayer = function(task, fillRobot) {
    let totalPlayer = task.playerNumber;
    let foundCount = 0;
    let retArr = [task.roleid];
    let self = this;
    if (fillRobot) {
        for (let i = 0; i < totalPlayer - 1; ++i) {
            let robot = player_manager.createRobotPlayer();
            retArr.push(robot.id());
        }
        return mutiret(null, retArr);
    }

    for (let idx in self._taskMap) {
        if (idx == task.roleid) {
            continue;
        }
        if (self._taskMap[idx].playerNumber != task.playerNumber) {
            continue;
        }

        if (self._taskMap[idx].chessNumber != task.chessNumber) {
            continue;
        }

        if (self._taskMap[idx].modeType != task.modeType) {
            continue;
        }

        foundCount += 1;
        retArr.push(idx);
        if (retArr.length >= totalPlayer) {
            return mutiret(null, retArr);
        }
    }

    return mutiret(null, retArr);
};

/**
 * 执行匹配任务
 */
room_manager.prototype.doMatchTask = function() {
    let removeArr = [];
    let nowTime = Date.now();
    let self = this;
    for (let idx in self._taskMap) {
        let taskObj = self._taskMap[idx];
        if (!taskObj) {
            removeArr.push(idx);
            continue;
        }
        let matchData = null;
        //练习模式
        if(taskObj.modeType == 2){
            //进入机器人匹配流程
            matchData = _matchTask(self, taskObj, true);
            if (matchData.hasError()) {
                taskObj.status = room_type.ROOM_MATCH_FAILURE;
            }
            removeArr.push(idx);
            continue;
        }

        //比赛
        if(taskObj.modeType == 3){
            // 玩家匹配时间结束，进入机器人匹配流程
            if (nowTime - taskObj.startTime > room_type.MATCH_TIMEOUT) {
                matchData = _matchTask(self, taskObj, true);
                if (matchData.hasError()) {
                    taskObj.status = room_type.ROOM_MATCH_FAILURE;
                }
                removeArr.push(idx);
                continue;
            }

            // 状态移除
            matchData = _matchTask(self, taskObj, false);
           

        }

        if(!matchData){
            logger.error('[room_manager.doMatchTask]err!!! err is: null');
            return;
        }
        if (matchData.hasError()) {
            logger.error('[room_manager.doMatchTask]err!!! err is: ' + matchData.getError());
            return;
        }

        //检查房间
        let room = matchData.getData();
        if (util.isNullOrUndefined(room)) {
            continue;
        }

        let playerArr = room.getPlayerArray();
        for (let roleid of playerArr) {
            let task = self._taskMap[roleid];
            if (task.status !== room_type.ROOM_MATCH_FINDING) {
                removeArr.push(roleid);
                continue;
            }
        }

        break;
    }

    // 移除过期任务
    for (let roleid of removeArr) {
        roleid = parseInt(roleid);
        let taskObj = self._taskMap[roleid];
        delete self._taskMap[roleid];
        if (!taskObj) {
            continue;
        }
        let playerObj = player_manager.findFightPlayer(roleid);
        if (!playerObj) {
            continue;
        }
        
        // 失败只给发起人通知
        if (taskObj.status === room_type.ROOM_MATCH_FAILURE) {
            playerObj.onMatchFail();
            player_manager.removeFightPlayer(roleid);
            continue;
        }

        //设置玩家为对战中状态
        // 成功给玩家发送创建成功的消息
        if (taskObj.status === room_type.ROOM_MATCH_SUCCEED) {
            let room = self.findRoom(taskObj.roomid);
            if (room) {
                room.onMatchSuccess(roleid);
            } else {
                player_manager.removeFightPlayer(roleid);
                logger.error('[room_manager.doMatchTask]must cerate room after match');
            }
        }
    }
};

/**
 * 分配房间索引号
 */
room_manager.prototype.allocRoomID = function() {
    if (this._roomIDList.length > 0) {
        return this._roomIDList.pop();
    }
    return ++this._roomID;
};

/**
 * 创建房间
 * @return {object} 房间
 */
room_manager.prototype.createRoom = function(modeType, playerNumber,chessNumber, isRobotAI) {
    let self = this;
    // 先从房间池拿数据
    if (self._roomPool.length > 0) {
        let room = self._roomPool.pop();
        room.init(modeType, playerNumber, chessNumber, isRobotAI); // 初始化房间数据
        self._roomMap[room.id()] = room;
        return room;
    }

    // 新创建房间
    let roomId = self.allocRoomID();
    let roomObj = new room(roomId, modeType, playerNumber, chessNumber, isRobotAI);
    self._roomMap[roomId] = roomObj;
    return roomObj;
};

/**
 * 删除房间
 * @param {number} id 房间id
 * @return void
 */
room_manager.prototype.removeRoom = function(id) {
    let roomObj = this._roomMap[id];
    if (!roomObj) {
        logger.error('[room_manager.removeRoom]not find room ' + id);
        return;
    }

    // 房间解散
    roomObj.onRemove();

    // 回收房间(不要回收ID)
    if (this._roomPool.length < room_type.ROOM_POOL_SIZE) {
        delete this._roomMap[id];
        this._roomPool.push(roomObj);
        return;
    }

    // 回收房间ID
    delete this._roomMap[id];
    this._roomIDList.push(id);
};

/**
 * 获取房间对象
 * @param {number} id 房间ID
 */
room_manager.prototype.findRoom = function(id) {
    return this._roomMap[id];
};

/**
 * 移除空闲房间
 */
room_manager.prototype.doRemoveNullRoom = function(){
    let self = this;
    for (let roomid in self._roomMap) {
        let room  = this._roomMap[roomid];
        if(room._isNULL){
            self.removeRoom(roomid);
        }
    }
};

/**
 * 准备开始
 */
room_manager.prototype.readyOrStart = function(roleid, reqData) {
    let self = this;
    let room = self.findRoom(reqData.roomid);
    if(!room){
        logger.error('[room_manager.readyOrStart]not find room ' + reqData.roomid);
        return false;
    }
    //好友模式手动请求开始
    if(room._roomType==room_type.MODE_TYPE_FIREND&&reqData.handStart){
        let playerArr = room.getPlayerArray();
        if(playerArr.length<2){
            return false;
        }
        //人满开始
        for (let ridx of playerArr) {
            room.onMatchSuccess(ridx);
        }
        return false
    }
    room._readyCount++;
    //机器人逻辑**机器人自动准备
    let playerArr = room.getPlayerArray();
    for (const roleid of playerArr) {
        const player = player_manager.findFightPlayer(roleid);
        if(player.isRobot()){
            room._readyCount++;
        }
    }
    //玩家逻辑
    room._gameState = room_type.GameState.gameStart;
    if(room._readyCount>=room._playerArr.length){
        //选先手
        room._gameState = room_type.GameState.firstHand;
        room._firstHandTimer = Date.now();
        //执行先手任务
        self._firstHandTaskMap.push(reqData.roomid);
    }else{
        //
        logger.error('[room_manager.readyOrStart] 居然有玩家准备失败 ' + roleid);
    }
    return true
};

/**
 * 执行匹配任务
 */
room_manager.prototype.doFirstHand = function() {
    let nowTime = Date.now();
    let self = this;
    for (let index = 0; index < self._firstHandTaskMap.length; index++) {
        const roomid = self._firstHandTaskMap[index];
        let room = self.findRoom(roomid);
        if(!room){
            //移除
            self._firstHandTaskMap.splice(index, 1);
            index--;
            continue
        }

        if (room._gameState!=room_type.GameState.firstHand) {
            //移除
            self._firstHandTaskMap.splice(index, 1);
            index--;
            continue
    　　}

        
        //每3秒来一次
        if(nowTime - room._firstHandTimer > room_type.FIRSTHAND_TIMEOUT){
            room._firstHandTimer = nowTime;
            //找到先手
            if(room._firstPlayer!=-1){
                room._gameState = room_type.GameState.gameing;
                //通知
                let message = new packet_type.SC_Operation();
                message.seatid = -1;
                message.rollNum =  room._roundInfo[room._firstPlayer].firstHandRoll;
                message.optType = room_type.OperationType.firstHandRoll
                message.firstHandSeatId = room._firstPlayer;
                room.broadcastMsg(message);

                //设置操作轮次
                room.setRoundInfo(room._firstPlayer,room_type.OperationType.firstHandRoll);

                //移除
                self._firstHandTaskMap.splice(index, 1);
                index--;
                continue
            }

            //寻找
            room.findFirstHand();
        }

    }
    
};

/**
 * 先手 room_type.GameState.firstHand
 */
room_manager.prototype.firstHand = function(roleid, reqData) {
    let self = this;
    let room = self.findRoom(reqData.roomid);
    if(!room){
        return;
    }
    // room._gameState = room_type.GameState.firstHand;

    
    // let message = new packet_type.SC_Operation();
    // message.seatid = reqData.seatid;
    // message.rollNum =  room.getRoll();
    // message.optType = room_type.OperationType.firstHandRoll
    // room.broadcastMsg(message);
};


/**
 * 操作 room_type.GameState.gameing
 */
room_manager.prototype.operation = function(roleid, reqData) {
    let self = this;
    let room = self.findRoom(reqData.roomid);
    if(!room){
        return;
    }
    if(reqData.seatid<0||reqData.seatid>=room_type.ROOM_POS_MAX){
        return;
    }
    if(!reqData.optType){
        return;
    }

    room._gameState = room_type.GameState.gameing;
    room.optRoundRool(reqData.seatid,reqData.optType,reqData.rollNum);
};

/**
 * 结算 
 */
room_manager.prototype.sumGame = function(roleid, reqData) {
    let self = this;
    let room = self.findRoom(reqData.roomid);
    if(!room){
        return;
    }
    room._gameState = room_type.GameState.gameEnd;
};


/**
 * 退出房间
 */
room_manager.prototype.exitRoom = function(roleid, roomid) {
    let self = this;
    //匹配中中断匹配
    if(self._taskMap[roleid]){
        self._taskMap[roleid].status = room_type.ROOM_MATCH_FAILURE
        player_manager.removeFightPlayer(roleid);
        delete self._taskMap[roleid];
    }

    if(roomid<=0){
        return;
    }
    let room = self.findRoom(roomid);
    if(!room)
    {
        return;
    }
    if(roleid<0){
        return;
    }
   
    //离开房间
    room.leftPlayer(roleid);

    //好友模式还在匹配中
    if(room._roomType==room_type.MODE_TYPE_FIREND&&room._gameState==room_type.GameState.matching){
        
    }
    
    let playerArr = room.getPlayerArray();
    let seatid = playerArr.indexOf(roleid);
    if(seatid<0||seatid>=room_type.ROOM_POS_MAX){
        return;
    }
    let message = new packet_type.SC_RomeLoguot();
    message.seatid = seatid;
    room.broadcastMsg(message);
};


/**
 * 聊天
 */
room_manager.prototype.onChat = function(roleid, reqData) {
    let self = this;

    let room = self.findRoom(reqData.roomid);
    if(!room){
        return;
    }

    let message = new packet_type.SC_Chat();
    message.seatid = reqData.seatid;
    message.msg = reqData.msg;
    room.broadcastMsg(message);
};


//
/**
 * 创建好友房
 */
room_manager.prototype.createPrivateRoom = function(roleid){
    if (roleid < 1) {
        logger.error('[room_manager.createPrivateRoom]not find roleid ' + roleid);
        return null;
    }
    
    // 设置房间
    let room = self.createRoom(room_type.MODE_TYPE_FIREND, room_type.PLAYER_TYPE_FOUR,1, false);

    room.pushPlayerInfo(roleid);

    let player = player_manager.findFightPlayer(roleid);
    if(player){
        //广播加入房间成功
        let message = new packet_type.SC_RomeLogin();
        message.type = room._roomType;
        message.roomid = room.id(); // 房间ID
        message.seatid = room.getPlayerSeatid(roleid)
        message.playerData = player.getBaseData();
        message.status = room_type.ROOM_MATCH_FINDING;
        player.sendMsg(message);
    }

    return room;
}

/**
 * 加入房间
 * @param {number} roomid 房间id
 * @param {number} roleid 玩家id
 */
room_manager.prototype.joinRoom = function(roomid,roleid){
    let self = this;
    let room = self.findRoom(roomid);
    if(!room){
        return null;
    }
    if(room._gameState!=room_type.GameState.matching){
        logger.error('[room_manager.joinRoom] not in matching, roomid is:' + roomid);
        return null;
    }
    
    room.pushPlayerInfo(roleid);
    let playerArr = room.getPlayerArray();
    let player = player_manager.findFightPlayer(roleid);

    if(player){
        //加入房间成功
        let message = new packet_type.SC_RomeLogin();
        message.type = room._roomType;
        message.roomid = roomid; // 房间ID
        message.seatid = room.getPlayerSeatid(roleid)
        message.playerData = player.getBaseData();
        message.status = room_type.ROOM_MATCH_SUCCEED;
        player.sendMsg(message);
    }
    

    
    if(playerArr.length<2){
        return room;
    }
    //人满开始
    if(playerArr.length>=room_type.ROOM_POS_MAX){
        for (let ridx of playerArr) {
            room.onMatchSuccess(ridx);
        }
        
    }
    

}

module.exports = room_manager;