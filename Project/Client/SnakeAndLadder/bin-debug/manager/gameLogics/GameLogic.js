var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MAX_PLAYER = 4;
/**
 * 游戏主要逻辑 需要（UserType.ts  CommonParam.ts）
 */
var GameLogic = (function () {
    //
    function GameLogic(gameType) {
        //玩家信息
        this.roomInfo = null;
        //完成人数
        this.finishCount = 0;
        //参入先手摇点玩家座位号
        this.rollHandArrLen = MAX_PLAYER;
        this.rollHandArr = [];
        //我的座位
        this.mySeatId = 0;
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
        if (this.gameType == GameType.test) {
        }
        this.rollHandArrLen = MAX_PLAYER;
        for (var i = 0; i < MAX_PLAYER; i++) {
            this.roomInfo.gameInfos.push(null);
        }
    }
    /**
     * 玩家进入游戏
     * @param player 玩家个人信息
     * @param self 我进入
     */
    GameLogic.prototype.playerEnter = function (player, self, seatid) {
        if (GameDebug == DebugType.OffLine) {
            //加入一个玩家信息
            this.roomInfo.players.push(player);
            this.roomInfo.playerNum = this.roomInfo.players.length;
            this.rollHandArrLen = this.roomInfo.playerNum;
            //初始游戏信息
            var gameinfo = new GameInfo();
            gameinfo.state = 0;
            gameinfo.seatid = this.roomInfo.players.length - 1;
            this.roomInfo.gameInfos[this.roomInfo.players.length - 1] = gameinfo;
            //
            if (self) {
                this.mySeatId = gameinfo.seatid;
            }
            return gameinfo.seatid;
        }
        else {
            this.rollHandArrLen = this.roomInfo.playerNum;
            //我的座位
            if (self) {
                this.mySeatId = seatid;
            }
            return seatid;
        }
    };
    /**
     * 轮到下一个
     */
    GameLogic.prototype.nextOpt = function () {
        this.roomInfo.optIndex++;
        this.roomInfo.optIndex = this.roomInfo.optIndex % this.roomInfo.playerNum;
    };
    /**
     * 摇点数
     * @returns 返回随机点数
     */
    GameLogic.prototype.roll = function () {
        var roll = 1 + Math.floor(Math.random() * 6);
        // console.info("roll：",roll);
        return roll;
    };
    /**
     * addPlayerToRollHandArr 参加先手选择
     * @param seatid 座位号
     * @param callback.success 一轮返回 选出先手返回成功 结束该流程
     * @param callback.continue 一轮返回 存在点数同时最大继续等待
     */
    GameLogic.prototype.addPlayerToRollHandArr = function (seatid, callback) {
        //参加先手选择
        this.rollHandArr.push(seatid);
        //选择先手
        if (this.rollHandArr.length >= this.rollHandArrLen) {
            console.info("rollHandArr", this.rollHandArr);
            if (this.selFirstHander()) {
                //状态
                if (callback) {
                    callback.success();
                }
            }
            else {
                this.rollHandArrLen = this.rollHandArr.length;
                console.info("存在点数同时最大的玩家：", this.rollHandArrLen);
                for (var i = 0; i < this.rollHandArrLen; i++) {
                    //继续等待
                    if (callback) {
                        callback.continue(this.rollHandArr[i]);
                    }
                }
                this.rollHandArr.splice(0, this.rollHandArr.length);
            }
        }
    };
    /**
     * 选出先手玩家
     */
    GameLogic.prototype.selFirstHander = function () {
        var max_index = 0;
        for (var i = 0; i < this.rollHandArr.length; i++) {
            var index = this.roomInfo.gameInfos[this.rollHandArr[i]].firstHandRoll;
            if (index >= max_index) {
                max_index = index;
            }
        }
        //最大点数个数
        var reRollArr = [];
        for (var i = 0; i < this.rollHandArr.length; i++) {
            var index = this.roomInfo.gameInfos[this.rollHandArr[i]].firstHandRoll;
            if (index == max_index) {
                reRollArr.push(this.rollHandArr[i]);
            }
        }
        if (reRollArr.length == 1) {
            //选出了先手
            this.roomInfo.firstHandIdx = reRollArr[0];
            this.roomInfo.optIndex = this.roomInfo.firstHandIdx;
            return true;
        }
        else {
            //筛选后重选
            this.rollHandArr = reRollArr;
            return false;
        }
    };
    /**
     * 通过摇色子移动
     * @param {seatid:number,step:number} 座位号、摇出的步数
     * @returns {step:number,out:number} 算出的步数、超出步数
     */
    GameLogic.prototype.addRollStep = function (seatid, rollNum) {
        this.roomInfo.gameInfos[seatid].nowRoll = rollNum;
        this.roomInfo.gameInfos[seatid].preStep = this.roomInfo.gameInfos[seatid].nowStep;
        //计算步数
        this.roomInfo.gameInfos[seatid].nowStep += rollNum;
        var out = this.checkStep(seatid);
        //下一个
        this.nextOpt();
        console.info("RollStep:", seatid, '-当前在-', this.roomInfo.gameInfos[seatid].nowStep);
        return { step: this.roomInfo.gameInfos[seatid].nowStep, out: out };
    };
    /**
     * 通过摇色子移动
     * @param {seatid:number,step:number} 座位号、步数
     * @returns {step:number,out:number} 算出的步数、超出步数
     */
    GameLogic.prototype.setStep = function (seatid, step) {
        this.roomInfo.gameInfos[seatid].preStep = this.roomInfo.gameInfos[seatid].nowStep;
        //计算步数
        this.roomInfo.gameInfos[seatid].nowStep = step;
        var out = this.checkStep(seatid);
        console.info("setStep:", seatid, '-当前在-', this.roomInfo.gameInfos[seatid].nowStep);
        return { step: this.roomInfo.gameInfos[seatid].nowStep, out: out };
    };
    /**
     * 修正检查步数
     */
    GameLogic.prototype.checkStep = function (seatid) {
        var out_step = 0;
        if (this.roomInfo.gameInfos[seatid].nowStep > this.roomInfo.gameInfos[seatid].maxStep) {
            out_step = this.roomInfo.gameInfos[seatid].nowStep - this.roomInfo.gameInfos[seatid].maxStep;
            this.roomInfo.gameInfos[seatid].nowStep = this.roomInfo.gameInfos[seatid].maxStep * 2 - this.roomInfo.gameInfos[seatid].nowStep;
        }
        return out_step;
    };
    /**
     * 触碰到棋子事件
     */
    GameLogic.prototype.cashEvent = function (seatid, step) {
        if (GameMapEvents[step]) {
            console.info("触碰到棋子事件", GameMapEvents[step]);
            //处理事件
            var key = GameMapEvents[step].name;
            switch (key) {
                case "start":
                    break;
                case "tree":
                    {
                    }
                    break;
                case "ladder":
                    {
                        var toIndex = GameMapEvents[step].toIndex;
                        //处理梯子效果
                        var res = this.setStep(seatid, toIndex);
                    }
                    break;
                case "snake":
                    {
                        var toIndex = GameMapEvents[step].toIndex;
                        //处理蛇效果
                        var res = this.setStep(seatid, toIndex);
                    }
                    break;
                case "destination":
                    {
                        var toIndex = GameMapEvents[step].toIndex;
                        //终点
                    }
                    break;
                default:
                    break;
            }
            return GameMapEvents[step];
        }
        return null;
    };
    /**
     *  get先手玩家seatid
     */
    GameLogic.prototype.getFirstHander = function () {
        return this.roomInfo.firstHandIdx;
    };
    /**
     * 我的座位
     */
    GameLogic.prototype.getMySeatId = function () {
        return this.mySeatId;
    };
    /**
     * 到终点
     */
    GameLogic.prototype.setFinish = function (seatid) {
        this.finishCount++;
        this.roomInfo.gameInfos[seatid].state = 9;
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map