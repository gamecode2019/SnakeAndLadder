var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMessageCode = (function () {
    function GameMessageCode() {
    }
    //登录游戏
    GameMessageCode.SC_UserLogin = "UserLogin";
    GameMessageCode.CS_UserLogin = "UserLogin";
    //更新用户信息
    GameMessageCode.SC_UpdatePlayerData = "UpdatePlayerData";
    GameMessageCode.CS_UpdatePlayerData = "UpdatePlayerData";
    //----------------------------------------------
    //请求进入房间
    GameMessageCode.CS_RomeLogin = "RomeLogin";
    //广播进入房间
    GameMessageCode.SC_RomeLogin = "RomeLogin";
    //请求退出房间
    GameMessageCode.CS_RomeLoguot = "RomeLoguot";
    //广播退出房间
    GameMessageCode.SC_RomeLoguot = "RomeLoguot";
    //请求房间和游戏信息
    GameMessageCode.CS_RoomInfo = "RoomInfo";
    //返回房间和游戏信息
    GameMessageCode.SC_RoomInfo = "RoomInfo";
    //请求游戏开始
    GameMessageCode.CS_StartGame = "StartGame";
    //广播游戏开始
    GameMessageCode.SC_StartGame = "StartGame";
    //请求操作
    GameMessageCode.CS_Operation = "Operation";
    //广播操作结果
    GameMessageCode.SC_Operation = "Operation";
    //游戏结算
    GameMessageCode.CS_EndGame = "EndGame";
    //广播游戏结算
    GameMessageCode.SC_EndGame = "EndGame";
    //请求发送聊天
    GameMessageCode.CS_Chat = "Chat";
    //广播聊天信息
    GameMessageCode.SC_Chat = "Chat";
    //----------------------------------------------
    //请求商店物品数据
    GameMessageCode.CS_InitShop = "InitShop";
    //广播商店数据
    GameMessageCode.SC_InitShop = "InitShop";
    //请求更新玩家物品数据
    GameMessageCode.CS_UpdatePlayerItem = "UpdatePlayerItem";
    //广播更新玩家物品数据
    GameMessageCode.SC_UpdatePlayerItem = "UpdatePlayerItem";
    return GameMessageCode;
}());
__reflect(GameMessageCode.prototype, "GameMessageCode");
/**
 * 网络连接示例
 * 游戏中需要根据自己的逻辑进行适当的修改
 * 这里提供的是如何使用。具体游戏中自行更改
*/
var GameNetwork = (function () {
    function GameNetwork() {
        this.connect_callback = null;
        this.heartTimer = -1;
        this.link = new NetSocket();
        this.initListener();
    }
    Object.defineProperty(GameNetwork, "Instance", {
        get: function () {
            if (this.instance == null) {
                this.instance = new GameNetwork();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 连接服务器
     * @returns void
     */
    GameNetwork.prototype.connect = function (callback) {
        // this.link.secureConnect(GameConfig.wsServer, GameConfig.port, this.onSocketHandler, this);
        this.link.connect(GameConfig.wsServer, GameConfig.port, this.onSocketHandler, this);
        this.connect_callback = callback;
    };
    Object.defineProperty(GameNetwork.prototype, "isConnected", {
        get: function () {
            return this.link.isConnected;
        },
        enumerable: true,
        configurable: true
    });
    GameNetwork.prototype.close = function () {
        this.link.close();
    };
    /**
     * 初始化消息监听
     * 所关心的协议在初始化时应注册进去
     * @returns void
     */
    GameNetwork.prototype.initListener = function () {
        this.link.addListenerMessage(GameMessageCode.SC_UserLogin, this.recUserLogin, this);
        this.link.addListenerMessage(GameMessageCode.SC_UpdatePlayerData, this.recUpdatePlayerData, this);
        //
        this.link.addListenerMessage(GameMessageCode.SC_RomeLogin, this.recRomeLogin, this);
        this.link.addListenerMessage(GameMessageCode.SC_RomeLoguot, this.recRomeLoguot, this);
        this.link.addListenerMessage(GameMessageCode.SC_RoomInfo, this.recRoomInfo, this);
        this.link.addListenerMessage(GameMessageCode.SC_StartGame, this.recStartGame, this);
        this.link.addListenerMessage(GameMessageCode.SC_Operation, this.recOperation, this);
        this.link.addListenerMessage(GameMessageCode.SC_EndGame, this.recEndGame, this);
        this.link.addListenerMessage(GameMessageCode.SC_Chat, this.recChat, this);
        //商城
        this.link.addListenerMessage(GameMessageCode.SC_InitShop, this.recInitShop, this);
        this.link.addListenerMessage(GameMessageCode.SC_UpdatePlayerItem, this.recUpdatePlayerItem, this);
    };
    GameNetwork.prototype.onSocketHandler = function (status) {
        switch (status) {
            case NetSocketStatus.Connected:
                {
                    if (this.connect_callback) {
                        this.connect_callback();
                    }
                }
                break;
            case NetSocketStatus.ConnectFailed:
                {
                    this.link.close();
                    this.openConnectTip("  Connection failed, whether to reconnect!");
                }
                break;
            case NetSocketStatus.Disconnect:
                {
                    this.link.close();
                    this.closeHeart();
                    this.openConnectTip("  The network has been disconnected, is it reconnected?");
                }
                break;
            case NetSocketStatus.Error:
                {
                    this.link.close();
                    this.openConnectTip("  Connection error, whether to reconnect!");
                }
                break;
        }
    };
    /**
     * 连接提示
     */
    GameNetwork.prototype.openConnectTip = function (msg) {
        UIManager.instance().openWindow("ConnectTipWindow");
        var tipWindow = (UIManager.instance().findWindow("ConnectTipWindow"));
        if (tipWindow) {
            tipWindow.setTipMsg(msg);
        }
    };
    /**
     * 定时发送心跳连接
     */
    GameNetwork.prototype.sendHeart = function (timeout) {
        var that = this;
        this.heartTimer = setTimeout(function () {
            that.link.send("Ping", "");
        }, timeout);
    };
    /**
     * 关闭心跳
     */
    GameNetwork.prototype.closeHeart = function () {
        clearTimeout(this.heartTimer);
    };
    /**
     * WEB账号密码登录
     */
    GameNetwork.prototype.requestLoginByWeb = function (message) {
        message.type = LoginType.USERNAME;
        message.acc = 'zhang12';
        message.pw = '1233456';
        message.inviteId = 0;
        this.link.send(GameMessageCode.CS_UserLogin, JSON.stringify(message));
    };
    /**
     * 微信登录
     */
    GameNetwork.prototype.requestLoginByWeChat = function (message, code) {
        message.type = GameLoginType;
        message.code = code;
        message.inviteId = 0;
        this.link.send(GameMessageCode.CS_UserLogin, JSON.stringify(message));
    };
    /**
     * feceBook登录
     */
    GameNetwork.prototype.requestLoginByFaceBook = function (message, player) {
        // console.info(player.getSignedPlayerInfoAsync());
        message.type = LoginType.FACEBOOK;
        message.uid = parseInt(player.getID());
        message.nickName = player.getName();
        message.avatarUrl = player.getPhoto();
        message.inviteId = 0;
        this.link.send(GameMessageCode.CS_UserLogin, JSON.stringify(message));
    };
    /**
     * 处理用户登录.
     * @param {SC_UserLogin} message
     * @return void
     */
    GameNetwork.prototype.recUserLogin = function (message) {
        UserManager.instance().setUserInfo(JSON.parse(message));
        this.requestUpdatePlayerData();
        this.reqInitShop();
        //心跳
        // this.sendHeart(10000);
    };
    /**
     * 处理请求更新玩家数据
     */
    GameNetwork.prototype.requestUpdatePlayerData = function () {
        var message = new CS_UpdatePlayerData();
        //测试
        message.playerData = UserManager.instance().getPlayerInfo();
        message.playerData.nickName = Math.random().toString(36).substr(2);
        message.playerData.gold = Number((Math.random() * 1000).toFixed(2));
        message.playerData.gameTotalCount = Math.floor(Math.random() * 1000);
        this.link.send(GameMessageCode.CS_UpdatePlayerData, JSON.stringify(message));
    };
    /**
     * 处理成功获得玩家数据
     */
    GameNetwork.prototype.recUpdatePlayerData = function (message) {
        console.info('handleUpdatePlayerData:', message);
        UserManager.instance().updatePlayerInfo(JSON.parse(message));
        if (!UserManager.instance().isLogin) {
            UserManager.instance().isLogin = true;
            MySceneManager.OnCreate().LoadMainScene();
            UIManager.instance().openWindow("MainWindow");
        }
    };
    /**
     * 登入房间请求
     */
    GameNetwork.prototype.reqRomeLogin = function (roomID, player) {
        var message = new CS_RomeLogin();
        message.type = GameManager.instance().type;
        message.roomid = roomID;
        if (player) {
            message.playerData = player;
        }
        else {
            message.playerData = UserManager.instance().getPlayerInfo();
        }
        this.link.send(GameMessageCode.CS_RomeLogin, JSON.stringify(message));
    };
    /**
     * 玩家进入房间
     */
    GameNetwork.prototype.recRomeLogin = function (msg) {
        var body = new SC_RomeLogin();
        Util.safeCopy(body, JSON.parse(msg));
        var roomid = body.roomid;
        var player = body.playerData;
        if (player.id == UserManager.instance().getPlayerInfo().id) {
            if (GameManager.instance().gameLogic.roomInfo.gameState == GameState.matching) {
                GameManager.instance().matchingGame();
            }
        }
        if (roomid <= 0 && body.status == -1) {
            console.info('匹配失败了');
            GameManager.instance().endGame(true);
            return;
        }
        if (roomid > 0) {
            //进入房间成功
            GameManager.instance().gameLogic.roomInfo.roomID = roomid;
            var seatid = GameManager.instance().gameLogic.playerEnter(player, player.id == UserManager.instance().getPlayerInfo().id, body.seatid);
            GameManager.instance().playerEnter(seatid);
        }
        if (GameDebug == DebugType.OffLine) {
            //进入房间成功
            GameManager.instance().gameLogic.roomInfo.roomID = roomid;
            var seatid = GameManager.instance().gameLogic.playerEnter(player, player.id == UserManager.instance().getPlayerInfo().id, -1);
            GameManager.instance().playerEnter(seatid);
            return;
        }
    };
    /**
     * 请求退出房间
     */
    GameNetwork.prototype.reqRomeLoguot = function (seatid, roomid) {
        var message = new CS_RomeLoguot();
        message.seatid = seatid;
        message.roomid = roomid;
        this.link.send(GameMessageCode.CS_RomeLoguot, JSON.stringify(message));
    };
    /**
     * 广播退出房间
     */
    GameNetwork.prototype.recRomeLoguot = function (msg) {
        var body = new SC_RomeLoguot();
        Util.safeCopy(body, JSON.parse(msg));
        if (body.seatid == GameManager.instance().gameLogic.getMySeatId()) {
            GameManager.instance().endGame(true);
        }
        else {
            //
            GameManager.instance().gameLogic.roomInfo.gameInfos[body.seatid].state = 10;
            console.info("退出房间 seatid:", body.seatid);
        }
    };
    /**
     * 请求房间信息
     */
    GameNetwork.prototype.reqRoomInfo = function (roomid) {
        var message = new CS_RoomInfo();
        message.roomid = roomid;
        this.link.send(GameMessageCode.CS_RomeLoguot, JSON.stringify(message));
    };
    /**
     * 广播房间信息
     */
    GameNetwork.prototype.recRoomInfo = function (msg) {
        var body = new SC_RoomInfo();
        Util.safeCopy(body, JSON.parse(msg));
        GameManager.instance().setRoomInfo(body);
        //匹配成功开始游戏
        if (body.roominfo.gameState == GameState.matching) {
            if (GameManager.instance().type == GameType.firendMode) {
                //开始游戏
                GameNetwork.Instance.reqStartGame(false);
            }
            else {
                //开始游戏
                GameNetwork.Instance.reqStartGame(false);
            }
        }
        else {
            GameManager.instance().recomeGame();
        }
        //...
        if (body.roominfo.gameState == GameState.firstHand) {
        }
    };
    /**
     * 请求开始游戏
     */
    GameNetwork.prototype.reqStartGame = function (isHand) {
        var message = new CS_StartGame();
        message.roomid = GameManager.instance().gameLogic.roomInfo.roomID;
        message.seatid = GameManager.instance().gameLogic.getMySeatId();
        message.handStart = isHand;
        this.link.send(GameMessageCode.CS_StartGame, JSON.stringify(message));
    };
    /**
     * 广播开始游戏
     */
    GameNetwork.prototype.recStartGame = function (msg) {
        var body = new SC_StartGame();
        Util.safeCopy(body, JSON.parse(msg));
        GameManager.instance().readyGame();
    };
    /**
     * 请求操作
     */
    GameNetwork.prototype.reqOperation = function (seatid, optType) {
        var message = new CS_Operation();
        message.roomid = GameManager.instance().gameLogic.roomInfo.roomID;
        message.rollNum = GameManager.instance().gameLogic.roll();
        message.seatid = seatid;
        message.optType = optType;
        this.link.send(GameMessageCode.CS_Operation, JSON.stringify(message));
    };
    /**
     * 广播操作结果
     */
    GameNetwork.prototype.recOperation = function (msg) {
        var body = new SC_Operation();
        Util.safeCopy(body, JSON.parse(msg));
        GameManager.instance().dealOperation(body);
    };
    /**
     * 游戏结算
     */
    GameNetwork.prototype.recEndGame = function (msg) {
        var body = new SC_EndGame();
        Util.safeCopy(body, JSON.parse(msg));
        GameManager.instance().preEndGame();
    };
    /**
     * 请求发送聊天
     */
    GameNetwork.prototype.reqChat = function (msg) {
        var message = new CS_Chat();
        message.roomid = GameManager.instance().gameLogic.roomInfo.roomID;
        message.msg = msg;
        message.seatid = GameManager.instance().gameLogic.getMySeatId();
        this.link.send(GameMessageCode.CS_Chat, JSON.stringify(message));
    };
    /**
     * 广播聊天信息
     */
    GameNetwork.prototype.recChat = function (msg) {
        var body = new SC_Chat();
        Util.safeCopy(body, JSON.parse(msg));
        GameManager.instance().onChat(body);
    };
    //--------------------商城-------------
    /**
     * 请求商店数据
     */
    GameNetwork.prototype.reqInitShop = function () {
        var message = new CS_InitShop();
        // this.link.send(GameMessageCode.CS_InitShop,JSON.stringify(message));
    };
    /**
     * 广播商店数据
     */
    GameNetwork.prototype.recInitShop = function (msg) {
        var body = new SC_InitShop();
        Util.safeCopy(body, JSON.parse(msg));
        ShopManager.instance().setShopData(body);
    };
    /**
     * 请求更新玩家物品数据
     */
    GameNetwork.prototype.reqUpdatePlayerItem = function (msg) {
        // this.link.send(GameMessageCode.CS_UpdatePlayerItem,JSON.stringify(msg));
    };
    /**
     * 广播更新玩家物品数据
     */
    GameNetwork.prototype.recUpdatePlayerItem = function (msg) {
        var body = new SC_UpdatePlayerItem();
        Util.safeCopy(body, JSON.parse(msg));
        ShopManager.instance().updatePlayerItem(body);
    };
    return GameNetwork;
}());
__reflect(GameNetwork.prototype, "GameNetwork");
//# sourceMappingURL=GameNetwork.js.map