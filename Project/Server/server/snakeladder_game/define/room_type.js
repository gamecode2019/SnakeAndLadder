"use strict";
const type = {};

// 常量
type.ROOM_POOL_SIZE = 50; // 机器人池最大数量
type.MATCH_TIMEOUT = 10 * 1000; // 匹配时间长度
type.FIRSTHAND_TIMEOUT = 4*1000; //先手等待时间
type.ROOM_ITEM_COUNT = 3; // 房间道具数量

// 创建房间
type.CREATE_ROOM_ERROR = 0;
type.CREATE_ROOM_SUCCEE = 1;

// 房间类型(同时表示查找人数)
type.ROOM_TYPE_ONEVONE = 1;
type.ROOM_TYPE_TWOVTWO = 3;

//模式类型
type.MODE_TYPE_NORMAL = 2; //练习
type.MODE_TYPE_MATCHING = 3; //匹配
type.MODE_TYPE_FIREND = 4; //好友
type.MODE_TYPE_ATHLETICS = 5; //道具

//人数定义
type.PLAYER_TYPE_TWO = 2; //两人场
type.PLAYER_TYPE_FOUR = 4; //四人场

//棋子定义
type.CHESS_TYPE_ONE = 1; //1颗棋子
type.CHESS_TYPE_TWO = 2; //两颗棋子
type.CHESS_TYPE_FOUR = 4; //四颗棋子

// 房间位置
// type.ROOM_POS_ONE = 0;
// type.ROOM_POS_TWO = 1;
// type.ROOM_POS_THREE = 2;
// type.ROOM_POS_FOUR = 3;
// type.ROOM_POS_FIVE = 4;
// type.ROOM_POS_SIX = 5;
type.ROOM_POS_MAX = 4; // 房间位置最大值，手动修改

// 房间匹配状态   (大于2人游戏可以开始，人满自动开始)
//0，1.继续匹配 2.可以开始 3.人满开始 4.匹配失败
type.ROOM_MATCH_NULL = 0; 
type.ROOM_MATCH_FINDING = 1; 
type.ROOM_MATCH_SUCCEED = 2; 
type.ROOM_MATCH_SUCCEED_FULL = 3; 
type.ROOM_MATCH_FAILURE = 4;

//玩家阵营信息定义
type.CAMP_A = 0; //A阵营
type.CAMP_B = 1; //B阵营
type.CAMP_C = 2; //C阵营
type.CAMP_D = 3; //D阵营
type.CAMP_ARR = [type.CAMP_A, type.CAMP_C, type.CAMP_B, type.CAMP_D]; //对角阵营

//棋子格子飞行映射关系
type.FLY_GRID_RELATION = {
    4: 16,
    17: 29,
    30: 42,
    43: 3,
};

//阵营和可飞行格子的映射关系
type.CAMP_GRID_RELATION = {
    0: 4,
    1: 17,
    2: 30,
    3: 43,
};

//初始起飞阵营和格子的对应关系
type.INIT_GRID_RELATION = {
    0: 39,
    1: 0,
    2: 13,
    3: 26,
};

//胜利通道入口
type.WIN_PATH_ENTER = {
    0: 36,
    1: 49,
    2: 10,
    3: 23,
};


//胜利通道位置
type.WIN_PATH_POS = {
    0: 52,
    1: 58,
    2: 64,
    3: 70,
};

//胜利位置终点
type.WIN_FINAL_POS = {
    0: 57,
    1: 53,
    2: 69,
    3: 75,
};


//单个玩家棋子个数定义
type.PIECE_ONE = 0; //1号棋子
type.PIECE_TWO = 1; //2号棋子
type.PIECE_THREE = 2; //3号棋子
type.PIECE_FOUR = 3; //4号棋子

// 房间状态
// type.ROOM_STATUS_INIT = 0; // 初始化状态
// type.ROOM_STATUS_READY = 1; // 准备完备状态
// type.ROOM_STATUS_RUN = 2; // 游戏中状态
// type.ROOM_STATUS_END = 3; // 游戏结束状态
// type.ROOM_STATUS_BROKE = 4; // 流局

//道具种类定义
type.LUCKY_DICE = 1001; //幸运6点骰子
type.DOUBLE_DICE = 1002; //双骰子
type.AVOID_INJURY_SHIELD = 1003; //免伤护盾
type.TRACK_MISSILES = 1004; //追踪导弹
type.TORNADO = 1005; //龙卷风
type.FENCE = 1006; //栅栏
type.ITEM_ARR = [
    type.LUCKY_DICE,
    type.DOUBLE_DICE,
    type.AVOID_INJURY_SHIELD,
    type.TRACK_MISSILES,
    type.TORNADO,
    type.FENCE,
];

//棋盘总格数(从0开始)定义，从绿色位起始点算起
type.MAX_CHESS_GRID = 51;

// 战局结果
type.ROOM_RESULT_FAIL = 0; // 失败
type.ROOM_RESULT_SUCCESS = 1; // 成功
type.ROOM_RESULT_PEACE = 2; // 平局

// 匹配任务
type.MatchTask = function MatchTask(roleid, modeType, playerNumber, chessNumber) {
    this.roomid = 0; // 房间ID
    this.roleid = roleid; // 发起人ID
    this.startTime = Date.now();
    this.modeType = modeType;
    this.playerNumber = playerNumber;
    this.chessNumber = chessNumber;
    this.status = type.ROOM_MATCH_FINDING;
};

// 回合信息
type.ROUND_NULL = 0; // 对局状态 未开始
type.ROUND_OPTING = 1; // 对局状态 操作中
type.ROUND_OPTEND = 2; // 对局状态 操作完
type.ROUND_WAITING = 3; // 对局状态 等待中
type.ROUND_COMPLETE= 9; // 对局状态 完成
type.RoundInfo = function RoundInfo() {
    /**
     * 游戏状态(ROUND_NULL未开始,....)
     */
    this.state = 0,
    this.seatid = -1, //座位号
    this.firstHandRoll = 0, //先手摇到的点数
    this.nowStep = 0, //步数
    this.nowRoll = 0, // 摇到的点数
    this.preStep = 0, //上一次的步数
    this.maxStep = 47//目标步数
    this.isLeft = false; //是否离开
};

//道具对象信息定义
type.ItemObject = function ItemObject(pos, itemID) {
    this.pos = pos; //道具位置
    this.itemID = itemID; //道具ID
};

/**
 * 游戏阶段
 */
type.GameState = {
	matching:1,//匹配
	gameStart:2,//开始
	firstHand:3,//先手
	gameing:4,//游戏进行中
	gameEnd:5,//游戏结束
}

/**
 * OperationType操作类型
 */
type.OperationType = {
	firstHandRoll:1,//先手
	rollStep:2, //摇点
}

module.exports = type;