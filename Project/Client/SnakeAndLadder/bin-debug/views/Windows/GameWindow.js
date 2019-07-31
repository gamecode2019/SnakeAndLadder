var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameWindow = (function (_super) {
    __extends(GameWindow, _super);
    function GameWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //操作面板
        _this.operations = {};
        return _this;
    }
    /**
     * 初始化主界面
     */
    GameWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/GameSkin.exml";
        this.registerBtnEvent();
        this.initWindow();
    };
    /**
     * 组件第一次添加到舞台时回调
     */
    GameWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        UIManager.instance().openWindow("GropRewardWindow");
    };
    /**
     * 初始化窗口
     */
    GameWindow.prototype.initWindow = function () {
        //初始画地图
        //玩家列表
        this.player_list.dataProvider = new eui.ArrayCollection();
        this.player_list.itemRenderer = HeadIconWidget;
        //初始操作面板
    };
    /**
     * 玩家进入动作
     */
    GameWindow.prototype.playerEnter = function (seatid, playerinfo) {
        var that = this;
        // 玩家列表
        var collection = (this.player_list.dataProvider);
        collection.addItem({
            scale_img: 0.76, headType: HeadIconType.headIcon, playerInfo: playerinfo, seatid: seatid, event: function (data) {
                //
                that.touchPlayer(data.seatid, data.playerInfo);
            }
        });
        var item = collection.getItemIndex(collection.length - 1);
        collection.itemUpdated(item);
        //我自己
        if (seatid == GameManager.instance().gameLogic.getMySeatId()) {
        }
        //玩家跳跃到地图
        this.map.addPlayerToMap(seatid);
    };
    /**
     * 显示操作面板
     */
    GameWindow.prototype.showOperationBD = function (seatid, istouch) {
        if (this.operations[seatid]) {
            this.operations[seatid].show(istouch);
        }
        else {
            var dice = new Dice();
            this.players_group.addChild(dice);
            this.operations[seatid] = dice;
            this.operations[seatid].setPosition(seatid);
            dice.show(istouch);
        }
    };
    /**
     * 隐藏操作面板
     */
    GameWindow.prototype.hideOperationBD = function (seatid) {
        if (this.operations[seatid]) {
            this.operations[seatid].removeTouch();
        }
    };
    /**
     * 此处点击玩家图像事件
     */
    GameWindow.prototype.touchPlayer = function (seatid, playerinfo) {
        console.info("touch player:", seatid, playerinfo.nickName);
        //打开用户信息面板
        UserManager.instance().setCurPlayerInfo(playerinfo);
        if (seatid == GameManager.instance().gameLogic.getMySeatId()) {
            if (this.currentInfo != null) {
                UIManager.instance().closeWindow(this.currentInfo);
            }
            var window_1 = UIManager.instance().openWindow("ChatWindow");
            this.currentInfo = "ChatWindow";
        }
        else {
            if (this.currentInfo != null) {
                UIManager.instance().closeWindow(this.currentInfo);
            }
            var window_2 = UIManager.instance().openWindow("RoleHeadInfoWindow");
            this.currentInfo = "RoleHeadInfoWindow";
        }
    };
    /**
     * 展示开始游戏
     */
    GameWindow.prototype.playStart = function () {
    };
    /**
     * 摇塞子先手
     */
    GameWindow.prototype.playRollFirst = function (seatid, rollnum) {
        //摇塞子
        this.showOperationBD(seatid, false);
        this.operations[seatid].playRoll(rollnum, function () {
            //移动
        });
    };
    /**
     * 摇塞子
     */
    GameWindow.prototype.playRoll = function (seatid, rollnum, step, out) {
        var that = this;
        //摇塞子
        this.operations[seatid].playRoll(rollnum, function () {
            //移动
            that.map.jumpToStep(seatid, rollnum, step, out);
        });
    };
    /**
     * 摇塞子
     */
    GameWindow.prototype.playMoveArr = function (seatid, rollnum, moveArr) {
        var that = this;
        if (this.operations[seatid]) {
            //摇塞子
            this.operations[seatid].playRoll(rollnum, function () {
                //移动
                that.map.jumpWithArr(seatid, rollnum, moveArr);
            });
        }
        else {
            //移动
            that.map.jumpWithArr(seatid, rollnum, moveArr);
        }
    };
    /**
     * show 聊天信息
     */
    GameWindow.prototype.showChatMsg = function (seatid, msg) {
        console.info('玩家：', seatid, ' 发送聊天内容：', msg);
        if (UIManager.instance().findWindow("ShowChatWindow")) {
            var window_3 = UIManager.instance().findWindow("ShowChatWindow");
            window_3.showChat(seatid, msg);
        }
        else {
            var window_4 = UIManager.instance().openWindow("ShowChatWindow");
            window_4.showChat(seatid, msg);
        }
    };
    /**
     * show 聊天表情
     */
    GameWindow.prototype.showChatFace = function (seatid, score) {
        console.info('玩家：', seatid, ' 发送表情聊天资源：', score);
        if (UIManager.instance().findWindow("ShowChatWindow")) {
            var window_5 = UIManager.instance().findWindow("ShowChatWindow");
            window_5.showEmojis(seatid, score);
        }
        else {
            var window_6 = UIManager.instance().openWindow("ShowChatWindow");
            window_6.showEmojis(seatid, score);
        }
    };
    /**
     * 注册按钮事件
     */
    GameWindow.prototype.registerBtnEvent = function () {
        // this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBackBtn, this);
        this.setting_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickToSettingBtn, this);
    };
    /**
     * 显示设置面板
     */
    GameWindow.prototype.clickToSettingBtn = function () {
        UIManager.instance().openWindow("SettingWindow");
    };
    /**
     * 显示奖励列表
     */
    GameWindow.prototype.clickShowRewardBtn = function () {
        //
    };
    /**
     * 点击返回按钮
     */
    GameWindow.prototype.clickBackBtn = function (event) {
        //结束游戏
        GameManager.instance().endGame();
    };
    /**
     * 释放窗口
     */
    GameWindow.prototype.release = function () {
        // this.union.onRelease();
        // this.task.onRelease();
    };
    return GameWindow;
}(UIWindow));
__reflect(GameWindow.prototype, "GameWindow");
//# sourceMappingURL=GameWindow.js.map