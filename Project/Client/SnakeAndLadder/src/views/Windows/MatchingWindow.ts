// TypeScript file
class MatchingWindow extends UIWindow {
    private g_panel:eui.Panel
    // 匹配中动画
    private math_loading: MacthLoading;

    //匹配列表
    private match_list:eui.List;
    //匹配数据
    private matchListDate:eui.ArrayCollection = new eui.ArrayCollection();
    //关闭
    private close_bn:MyButton;
    //
    private start:MyButton;
    private invite:MyButton;

    /**
     * 初始化主界面
     */
    protected onInit() {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/MatchingSkin.exml";
        this.registerBtnEvent();
        this.initWindow();
    }

    /**
     * 组件第一次添加到舞台时回调
     */
    public createChildren(): void {
        super.createChildren();

    }

    /**
     * 初始化窗口
     */
    private initWindow(): void {
        
        this.start.setImgScore('Common_json.button_blue_l');
        this.start.getLabel().text = 'Start';
        this.start.getLabel().size = 30;
        this.invite.setImgScore('Common_json.button_green_l');
        this.invite.getLabel().text = 'Invite more';
        this.invite.getLabel().size = 30;
        this.close_bn.setImgScore('Common_json.icon_x');

        this.match_list.dataProvider = new eui.ArrayCollection()
        this.match_list.itemRenderer = HeadIconWidget

        this.start.visible = false;
        this.invite.visible = false;
        if(GameManager.instance().type == GameType.normalMode){
            
        }else if(GameManager.instance().type == GameType.matchingMode){

        }else if(GameManager.instance().type == GameType.firendMode){
            this.start.visible = true;
            this.invite.visible = true;
        }

    }

    /**
     * 玩家进入动作
     */
    public playerEnter(seatid:number,playerinfo:PlayerInfo){
        let collection = (<eui.ArrayCollection>(this.match_list.dataProvider));
        collection.addItem({scale:1,playerInfo:playerinfo});
        let item = collection.getItemIndex(collection.length-1);
        collection.itemUpdated(item);
    }

    /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {
        this.close_bn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeMe , this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStartBtn, this);
        this.invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchInviteBtn, this);
    }

    /**
     * 点击开始
     */

    private touchStartBtn(){
        console.info('touchStartBtn');
        //人数齐了开始游戏
        if(GameManager.instance().gameLogic.roomInfo.players.length>=2){
			//开始游戏
			GameNetwork.Instance.reqStartGame(true);
			return;
		}
    }

    /**
     * 点击分享邀请
     */
    private touchShareInviteBtn(){
        console.info('touchInviteBtn');
        let base64Img = Util.getBase64Image('map_01_png');
        // console.info(base64Img)
        platform.share({
            intent:'INVITE',
            title:UserManager.instance().getPlayerInfo().nickName+'邀请你来玩了！',
            imgurl:base64Img,
            data:{inviteRomeId:GameManager.instance().gameLogic.roomInfo.roomID},
            complete:function(){

            }

        });
        
    }

    /**
     * 邀请好友一起玩
     */
    private touchInviteBtn(){
        console.info('touchInviteBtn');
        var that = this;
        platform.chooseAsync({
            fail:function(err){
                console.error(err);
            },
            success:function(){
                //切换环境成功
                platform.getContext()
                .then((context)=>{
                    console.info("切换环境成功:",context.getID(),context.getType(),context.getPlayersAsync())
                });
                
                that.updateGame();
            }
        });


        
        
    }

    /**
     * 
     */
    private updateGame(){
        let base64Img = Util.getBase64Image('map_01_png');
        //更新数据
        platform.updateAsync({
            payload:{
                action:'CUSTOM',
                template:'join_room',
                cta:{
                    default:"Play with me",
                    localizations:{
                        zh_CN:"和我一起玩吧"
                    }
                },
                image:base64Img,
                text:{
                    default:"Welcom to play",
                    localizations:{
                        zh_CN:"欢迎欢迎"
                    }
                },
                data:{inviteRomeId:GameManager.instance().gameLogic.roomInfo.roomID},
                strategy:'IMMEDIATE_CLEAR',
                notification:'NO_PUSH'

            },
            success:function(){
                console.info("更新完成，控制权还给游戏");
            },
            fail:function(err){
                console.error(err);
            }
        })
    }

    
    
    /**
     * 关闭主界面
     */
    public closeMe(): void {
        GameManager.instance().endGame();
        this.close();
    }

    /**
     * 释放窗口
     */
    public release() {
        // this.union.onRelease();
        // this.task.onRelease();
    }
}

