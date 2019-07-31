const GameConfig: any = {};
GameConfig.loginUrl = 'http://192.168.1.107:8201/';//
GameConfig.gameUrl = 'http://127.0.0.1:8202/';
GameConfig.assetUrl = 'http://127.0.0.1:7000/';

GameConfig.wsServer = '127.0.0.1';
GameConfig.port = 8200;

//登陆方式（与服务器保持一致）
enum LoginType {
    DEFAULT = 0,
    USERNAME = 1,  //账号密码登陆
    WECHAT = 2,   //微信登陆
    FACEBOOK = 3, //facebook 登录
}
const GameLoginType: number = LoginType.FACEBOOK; 

//游戏模式
enum DebugType {
    OnLine = 1,  
    OffLine = 2,   
}
const GameDebug: number = DebugType.OnLine; 