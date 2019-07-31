class GameWindow extends UIWindow {

    //设置
    private setting_btn: eui.Button;
    //返回
    // private back_btn: eui.Button;
    //private btn_drop: eui.Button;//下拉框
    private roomInfo: RoomInfo
    //玩家面板
    private players_group: eui.Group;
    private player_list: eui.List;
    //操作面板
    private operations: { [key: number]: Dice } = {};

    //游戏地图
    public map: GameMap;
    private currentInfo:string
    /**
     * 初始化主界面
     */
    protected onInit() {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/GameSkin.exml";
        this.registerBtnEvent();
        this.initWindow();
    }

    /**
     * 组件第一次添加到舞台时回调
     */
    public createChildren(): void {
        super.createChildren();
        UIManager.instance().openWindow("GropRewardWindow")
    }

    /**
     * 初始化窗口
     */
    private initWindow(): void {
        //初始画地图


        //玩家列表
        this.player_list.dataProvider = new eui.ArrayCollection()
        this.player_list.itemRenderer = HeadIconWidget

        //初始操作面板


    }

    /**
     * 玩家进入动作
     */
    public playerEnter(seatid: number, playerinfo: PlayerInfo) {
        var that = this;
        // 玩家列表
        let collection = (<eui.ArrayCollection>(this.player_list.dataProvider));
        collection.addItem({
            scale_img: 0.76, headType: HeadIconType.headIcon, playerInfo: playerinfo, seatid: seatid, event: function (data) {
                //
                that.touchPlayer(data.seatid, data.playerInfo);

            }
        });
        let item = collection.getItemIndex(collection.length - 1);
        collection.itemUpdated(item);

        //我自己
        if (seatid == GameManager.instance().gameLogic.getMySeatId()) {

        }

        //玩家跳跃到地图
        this.map.addPlayerToMap(seatid);
    }

    /**
     * 显示操作面板
     */
    public showOperationBD(seatid: number, istouch?: boolean) {
        if (this.operations[seatid]) {
            this.operations[seatid].show(istouch);
        } else {
            let dice = new Dice();
            this.players_group.addChild(dice);
            this.operations[seatid] = dice;
            this.operations[seatid].setPosition(seatid);
            dice.show(istouch);
        }
    }
    /**
     * 隐藏操作面板
     */
    public hideOperationBD(seatid: number) {
        if (this.operations[seatid]) {
            this.operations[seatid].removeTouch();
        }
    }


    /**
     * 此处点击玩家图像事件
     */
    private touchPlayer(seatid: number, playerinfo: PlayerInfo) {
        console.info("touch player:", seatid, playerinfo.nickName);
        //打开用户信息面板
        UserManager.instance().setCurPlayerInfo(playerinfo);
        if (seatid == GameManager.instance().gameLogic.getMySeatId()) {
            if (this.currentInfo != null) {
                UIManager.instance().closeWindow(this.currentInfo)
            }
            let window = UIManager.instance().openWindow("ChatWindow") as ChatWindow
            this.currentInfo = "ChatWindow"
        } else {
            if (this.currentInfo != null) {
                UIManager.instance().closeWindow(this.currentInfo)
            }
            let window=UIManager.instance().openWindow("RoleHeadInfoWindow")
            this.currentInfo = "RoleHeadInfoWindow"
        }
    }
    /**
     * 展示开始游戏
     */
    public playStart() {

    }

    /**
     * 摇塞子先手
     */
    public playRollFirst(seatid: number, rollnum: number) {
        //摇塞子
        this.showOperationBD(seatid, false);
        this.operations[seatid].playRoll(rollnum, function () {
            //移动
        });


    }
    /**
     * 摇塞子
     */
    public playRoll(seatid: number, rollnum: number, step: number, out: number) {
        var that = this;
        //摇塞子
        this.operations[seatid].playRoll(rollnum, function () {
            //移动
            that.map.jumpToStep(seatid, rollnum, step, out);
        });



    }

    /**
     * 摇塞子
     */
    public playMoveArr(seatid:number,rollnum:number,moveArr:Array<any>) {
        var that = this;
        if (this.operations[seatid]) {
            //摇塞子
            this.operations[seatid].playRoll(rollnum, function () {
                //移动
                that.map.jumpWithArr(seatid, rollnum, moveArr);
            });
        }else{
             //移动
            that.map.jumpWithArr(seatid, rollnum, moveArr);
        }
        



    }

    /**
     * show 聊天信息
     */
    public showChatMsg(seatid: number, msg: string) {
        console.info('玩家：', seatid, ' 发送聊天内容：', msg);
        if (UIManager.instance().findWindow("ShowChatWindow")) {
            let window = UIManager.instance().findWindow("ShowChatWindow") as ShowChatWindow
            window.showChat(seatid, msg)
        } else {
            let window = UIManager.instance().openWindow("ShowChatWindow") as ShowChatWindow
            window.showChat(seatid, msg)
        }
    }

    /**
     * show 聊天表情
     */
    public showChatFace(seatid: number, score: string) {
        console.info('玩家：', seatid, ' 发送表情聊天资源：', score);
        if (UIManager.instance().findWindow("ShowChatWindow")) {
            let window = UIManager.instance().findWindow("ShowChatWindow") as ShowChatWindow
            window.showEmojis(seatid, score)
        } else {
            let window = UIManager.instance().openWindow("ShowChatWindow") as ShowChatWindow
            window.showEmojis(seatid, score)
        }
    }


    /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {
        // this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBackBtn, this);
        this.setting_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickToSettingBtn, this)

    }


    /**
     * 显示设置面板
     */
    private clickToSettingBtn() {
        UIManager.instance().openWindow("SettingWindow")
    }
    /**
     * 显示奖励列表
     */
    private clickShowRewardBtn() {
        //
    }
    /**
     * 点击返回按钮
     */
    private clickBackBtn(event: egret.TouchEvent): void {
        //结束游戏
        GameManager.instance().endGame();
    }

    /**
     * 释放窗口
     */
    public release() {

        // this.union.onRelease();
        // this.task.onRelease();
    }
}