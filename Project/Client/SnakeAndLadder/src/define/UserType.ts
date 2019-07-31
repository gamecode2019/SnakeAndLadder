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
    public avatarUrl:string = 'https://lg-3q7kbp58-1257126548.cos.ap-shanghai.myqcloud.com/images/test/ball.png';   //图像
    public diamond:number = 0; 
    public gold:number = 10000;        //货币
    public loginTime:string = ''; //登录时间
    //other
    public myScans:Array<number> = []; //我的皮肤
    public selectScan:number = 0;  //当前选择皮肤
    public myEmoticons:Array<number> = []; //我拥有的表情包
    public gameTotalCount:number = 0; //参加游戏总场次
    public getFirstCount:number = 0; //获取第一名场次

    //public myScansHasMap:HashMap=null;

}

class GameInfo {
    /**
     * 游戏状态(0未开始,1操作中,2操作完,3等待中,9完成,10 offLine离线托管)
     */
    public state: number = 0; 
    public seatid: number = -1; //座位号
    public firstHandRoll = 0; //先手摇到的点数
    public nowStep: number = 0; //步数
    public nowRoll: number = 0; // 摇到的点数
    public preStep: number = 0; //上一次的步数
    public maxStep: number = 47;//目标步数
}

class RoomInfo {
    public roomID: number = 0; // 房间id
    public playerNum: number = 4; // 游戏人数
    public gameState :GameState = 0;  //游戏状态
    public firstHandIdx:number = -1; //先手标识
    public players: Array<PlayerInfo> = []; //玩家列表
    public gameInfos: Array<GameInfo> = []; //玩家操作
    public optIndex: number = 0; //当前操作玩家
    public optCD: number = 5; //操作时间
}

/**
 * 物品
 */
class ShopItemInfo
{
    public name:string='';              //物品名字
    public price:number=0;              //价格
    public id:number=0;                 //物品id
    public itemType:ShopBagType=null;   //商品类型
}

/**
 * 商店物品信息
 */
class ShoppingItemInfo{
    public type:ShoppingType;           //购买物品提示信息类型
    public name:string='';              //物品名字
    public price:number=0;              //价格
    public id:number=0;                 //物品id
    public shopdataArr:Array<any>=[];   //商店物品数据
    public itemType:ShopBagType=null;   //商品类型
    public sourceName:string='';        //物品图片名字
}

