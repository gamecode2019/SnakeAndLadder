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
// 用户登陆
class CS_Ping extends CS_Packet {
    public constructor() {
        super();
        this.pt = "Ping";
    }
}

////////////////////////////////////////////////////
// 用户登陆
class CS_UserLogin extends CS_Packet {
    public type: number = 0;    //登陆类型 
    public acc: string = "zhangte";     //账号
    public pw: any = 1;             //密码
    public code: string = ''; // 微信登陆生成的code
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
class CS_UpdatePlayerData extends CS_Packet {
    public playerData:PlayerInfo = null;    //玩家信息
    public constructor() {
        super();
        this.pt = "UpdatePlayerData";
    }
}
class SC_UpdatePlayerData extends SC_Packet {
    public playerData:PlayerInfo = null;    //玩家信息
    public constructor() {
        super();
        this.pt = "UpdatePlayerData";
    }
}


//////////////////////商城//////////////////////////////
//登录初始化商店
class CS_InitShop extends CS_Packet{
    public constructor(){
        super();
        this.pt="InitShop";
    }
}
class SC_InitShop extends SC_Packet{
    // public name:string='';              //物品名字
    // public price:number=0;              //价格
    // public id:number=0;                 //物品id
    // public itemType:ShopBagType=null;   //商品类型
    public itemlist:Array<ShopItemInfo> =[]; 
    public constructor(){
        super();
        this.pt="InitShop";
    }
}

//更新玩家物品信息和金币数量
class CS_UpdatePlayerItem extends CS_Packet{
    public gold:number = 0;                 //货币
    public myScans:Array<number> = [];      //我的皮肤
    public myEmoticons:Array<number> = [];  //我拥有的表情包

    public itemId:number=0;                 //购买的物品id
    public price:number=0;                  //购买的物品价格
    public constructor(){
        super();
        this.pt="UpdatePlayerItem";
    }
}

class SC_UpdatePlayerItem extends SC_Packet{
    public gold:number = 0;                 //货币
    public myScans:Array<number> = [];      //我的皮肤
    public myEmoticons:Array<number> = [];  //我拥有的表情包
    
    public constructor(){
        super();
        this.pt="UpdatePlayerItem";
    }
}
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
    public seatid: number = -1;
    public playerData: PlayerInfo = null; //玩家信息
    public status:number = 0; //1.继续匹配 2.可以开始 3.自动开始 -1失败
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
    public constructor() {
        super();
        this.pt = "RomeLoguot";
    }
}


// 房间信息
class CS_RoomInfo extends CS_Packet {
    public roomid: number = 0;    //房间编号
    public constructor() {
        super();
        this.pt = "RomeInfo";
    }
}
class SC_RoomInfo extends SC_Packet {
    public roominfo: RoomInfo = null;    //
    public constructor() {
        super();
        this.pt = "RomeInfo";
    }
}

// 开始游戏
class CS_StartGame extends CS_Packet {
    public roomid: number = 0;    //房间编号
    public seatid: number = 0;    //玩家编号
    public handStart:boolean = false;//《好友房》手动开始
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
    public roomid: number = 0;    //房间编号
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

    public firstHandSeatId = -1;  //先手座位号
    public moveArr:Array<any> = []; //操作事件列表
    public constructor() {
        super();
        this.pt = "Operation";
    }
}

//结算
class CS_EndGame extends CS_Packet {
    public roomid: number = 0;    //房间编号
    public constructor() {
        super();
        this.pt = "EndGame";
    }
}
class SC_EndGame extends SC_Packet {
    public constructor() {
        super();
        this.pt = "EndGame";
    }
}


//聊天
class CS_Chat extends CS_Packet {
    public roomid: number = 0;    //房间编号
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
