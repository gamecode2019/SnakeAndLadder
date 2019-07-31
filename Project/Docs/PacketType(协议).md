# 自定义结构
```
/**
 * 游戏模式
 */
enum GameType {
	test = 1,
	normalMode = 2,
	matchingMode = 4,
	firendMode = 4,
}

/**
 * 游戏阶段
 */
enum GameState {
	matching = 1,//匹配
	firstHand = 2,//先手
	gameStart = 3,//开始
	gameing = 4,//游戏进行中
	gameEnd = 5,//游戏结束
}


class UserInfo {
    public uid: number = 0; // 用户ID
    public token: string = ''; // 用户登陆令牌
    public isNewPlayer: string = ''; // 新用户
}

class PlayerInfo {
    //base
    public id: number = 0; // 用户ID
    public nickName: string = '游客'; // 用户昵称
    public gender:number = 1; //性别
    public newPlayer: number = 0; // 新用户
    public avatarUrl:string = '';   //图像
    public diamond:number = 0; 
    public gold:number = 0;        //货币
    public loginTime:string = ''; //登录时间
    //other
    public myScans:Array<number> = []; //我的皮肤
    public selectScan:number = 0;  //当前选择皮肤
    public myEmoticons:Array<number> = []; //我拥有的表情包
    public gameTotalCount:number = 0; //参加游戏总场次
    public getFirstCount:number = 0; //获取第一名场次



}

class GameInfo {
    public state: number = 0; // 游戏状态(0未开始,1游戏中,2完成,3离线托管offLine)
    public nowStep: number = 0; //步数
    public nowRoll: number = 0; // 摇到的点数
    public preStep: number = 0; //上一次的步数
}

class RoomInfo {
    public roomID: number = 0; // 房间id
    public playerNum: number = 4; // 游戏人数
    public gameState :GameState = 0;  //游戏状态
    public firstHandIdx:number = 0; //先手标识
    public players: Array<PlayerInfo> = []; //玩家列表
    public gameInfos: Array<GameInfo> = []; //玩家操作
    public optIndex: number = 0; //当前操作玩家
    public optCD: number = 5; //操作时间



}

// 所有协议的基类
class IPacket {
    public pt: string = ''; // 协议名称
}
class CS_Packet extends IPacket {
    public tk: string = ''; // 登录令牌
    public uid: number = 0;
    public zid: number = 0;
    protected constructor() {
        super();
        this.tk = UserManager.instance().getUserInfo().token;
        this.uid = UserManager.instance().getUserInfo().uid;
        this.zid = 0;
    }
}
class SC_Packet extends IPacket {
    public ret: number = 1; // 操作结果
}

```
# Http Protocol 
```

////////////////////////////////////////////////////
// 用户登陆
class CS_UserLogin extends CS_Packet {
    public type: number = 0;    //登陆类型 
    public acc: string = "zhangte";     //账号
    public pw: any = 1;             //密码
    public code: string = 'zhangte'; // 微信登陆生成的code
    public inviteId: number = 0; // 邀请人的id
    public avatarUrl: string = ''; // 头像
    public gender: number = 1; // 性别
    public nickName: string = '游客'; // 昵称
    public constructor() {
        super();
        this.pt = "UserLogin";
    }
}
class SC_UserLogin extends SC_Packet {
    public ret:number = -1;
    public userData:UserInfo = null;    //账户
    public playerData:PlayerInfo = null;    //玩家信息
    public constructor() {
        super();
        this.pt = "UserLogin";
    }
}

////////////////////////////////////////////////////
// 角色数据
class CS_GetPlayerData extends CS_Packet {
    public constructor() {
        super();
        this.pt = "GetPlayerData";
    }
}
class SC_GetPlayerData extends SC_Packet {
    public playerData:PlayerInfo = null;    //玩家信息
    public constructor() {
        super();
        this.pt = "GetPlayerData";
    }
}
```

# Websocket Protocol 
```
class GameMessageCode {
	//请求进入房间
	public static CS_RomeLogin:string = "RomeLogin";
	//广播进入房间
	public static SC_RomeLogin:string = "RomeLogin";
	//请求退出房间
	public static CS_RomeLoguot:string = "RomeLoguot";
	//广播退出房间
	public static SC_RomeLoguot:string = "RomeLoguot";
    //广播房间和游戏信息
	//请求游戏开始
	public static CS_StartGame:string = "StartGame";
	//广播游戏开始
	public static SC_StartGame:string = "StartGame";
	//请求操作
	public static CS_Operation:string = "Operation";
	//广播操作结果
	public static SC_Operation:string = "Operation";
    //广播游戏结算
	//请求发送聊天
	public static CS_Chat:string = "Chat";
	//广播聊天信息
	public static SC_Chat:string = "Chat";
    ...
}
```
```
////////////////////////////////////////////////////////
//////////////////////游戏//////////////////////////////
// 房间登录
class CS_RomeLogin extends CS_Packet {
    public type: number = 0;    //登陆类型 
    public roomid: number = 0;    //房间编号(0创建匹配到房间、其他加入roomid房间)
    public playerData: PlayerInfo = null; //玩家信息
    public constructor() {
        super();
        this.pt = "RomeLogin";
    }
}
class SC_RomeLogin extends SC_Packet {
    public type: number = 0;    //登陆类型
    public roomid: number = 0;    //房间编号
    public playerData: PlayerInfo = null; //玩家信息

    public constructor() {
        super();
        this.pt = "RomeLogin";
    }
}

// 房间退出
class CS_RomeLoguot extends CS_Packet {
    public seatid: number = 0;    //玩家编号
    public roomid: number = 0;    //房间编号
    public constructor() {
        super();
        this.pt = "RomeLoguot";
    }
}
class SC_RomeLoguot extends SC_Packet {
    public seatid: number = 0;    //玩家编号
    public roomid: number = 0;    //房间编号
    public constructor() {
        super();
        this.pt = "RomeLoguot";
    }
}

// 开始游戏
class CS_StartGame extends CS_Packet {
    public seatid: number = 0;    //玩家编号
    public constructor() {
        super();
        this.pt = "StartGame";
    }
}
class SC_StartGame extends SC_Packet {
    public seatid: number = 0;    //玩家编号
    public constructor() {
        super();
        this.pt = "StartGame";
    }
}


//操作
class CS_Operation extends CS_Packet {
    public seatid: number = 0;    //玩家编号
    public rollNum: number = 0;  //随机点数
    public optType: number = 0; //操作类型
    public constructor() {
        super();
        this.pt = "Operation";
    }
}
class SC_Operation extends SC_Packet {
    public seatid: number = 0;    //玩家编号
    public rollNum: number = 0;  //随机点数
    public optType: number = 0; //操作类型
    public constructor() {
        super();
        this.pt = "Operation";
    }
}


//聊天
class CS_Chat extends CS_Packet {
    public seatid: number = 0;    //玩家编号
    public msg: string = '';  //聊天信息， 表情：'[f:0]'、快捷语：'[k:1]' 命令：[cmd:exit]
    public constructor() {
        super();
        this.pt = "Chat";
    }
}
class SC_Chat extends SC_Packet {
    public seatid: number = 0;    //玩家编号
    public msg: string = '';  //聊天信息
    public constructor() {
        super();
        this.pt = "Chat";
    }
}


```