class SelectSkinWindow extends UIWindow {  
    private srcListPlayers:eui.Scroller//滚动条
    private listPlayers:eui.List      //显示个人形象列表
    private head_icon:HeadIconWidget; //个人形象
    private btn_close:eui.Button;     //关闭按钮
    private btn_exit:eui.Button;      //退出按钮
    private btn_share:eui.Button;     //分享按钮

    private playerInfo:PlayerInfo;//玩家信息类
    protected onInit() {
        super.onInit()

        this.skinName = "resource/eui_skins/windowSkins/SelectSkin.exml"
        this.playerInfo=UserManager.instance().getPlayerInfo();
        //注册按钮事件
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickClose,this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickExit,this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickShare,this);

        let key:string = "data_name";
        let value:string = "data_value";
        egret.localStorage.setItem(key,value);
        let getData:string = egret.localStorage.getItem(key);
        //console.log(getData)

        // this.listPlayers.dataProvider=new eui.ArrayCollection(listDate)
        // this.listPlayers.itemRenderer=HeadIconWidget;
        var collection = new eui.ArrayCollection();
        let length=this.playerInfo.myScans.length;
        for(var i = 0; i < length; i ++)//默认4个形象
        {
            let index=this.playerInfo.myScans[i];
            //let texture=this.playerInfo.myScansHasMap.getValue(index);
            collection.addItem({playerInfo:this.playerInfo,headType:HeadIconType.gameIconOne,headIconIndex:index});
        }
        this.listPlayers.dataProvider = collection;
        this.listPlayers.itemRenderer=HeadIconWidget;
        
        /**
         * 当前选择的个人形象
         */
        // var that=this;
        // this.head_icon.setNameVisiable(true);
        // this.head_icon.headType=HeadIconType.gameIcon;
        // this.head_icon.data={playerInfo:this.playerInfo}     
    }
        
    public createChildren(): void {
        super.createChildren()
    }   
    /**
     * 关闭界面
     */
    private onClickClose()
    {
        UIManager.instance().closeWindow("SelectSkinWindow");
    }

    /**
     * 退出按钮
     */
    private onClickExit()
    {
        console.log("退出游戏！");
    }
    /**
     * 分享
     */
    private onClickShare()
    {
        console.log("分享游戏！");
    }

    public closeMainUI(): void {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }    
}
