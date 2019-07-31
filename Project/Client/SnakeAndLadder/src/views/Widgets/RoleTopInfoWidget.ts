/**
 * 界面头部玩家信息
 */
class RoleTopInfoWidget extends UIWindow {
    private head_icon:HeadIconWidget;
    private lab_nickName:eui.Label;//玩家昵称
    private lab_gold:eui.Label;    //玩家金币
    private playerInfo:PlayerInfo;//玩家信息类   
    private btn_shop:MyButton;   //商店
    private btn_setting:MyButton;//设置界面
    /**
     * 界面初始化
     */
    protected onInit(): void 
    {
        super.onInit();
        this.skinName = "resource/eui_skins/widgetSkins/RoleTopInfo.exml";
        this.playerInfo=UserManager.instance().getPlayerInfo();//玩家信息
        this.registerBtnEvent();
        //初始化个人信息界面
        this.initWindow();
    }
    /**
     * 初始化个人信息界面
     */
    private initWindow()
    {
        //let datas=ShopManager.instance().getAllItmeData(ShopBagType.piece);//测试用
        /**
         * 玩家个人形象初始化--测试
         */
        if(ShopManager.instance().isFirstLoad==false)
        {
            ShopManager.instance().isFirstLoad=true;
            //加载物品数据
            ShopManager.instance().setShopData();
            // this.playerInfo.myEmoticons=[];
            // this.playerInfo.myScans=[];
            // GameNetwork.Instance.requestUpdatePlayerData();//更新到服务器
            //测试商店数据
            this.testData(ShopBagType.emojis,this.playerInfo.myEmoticons);
            this.testData(ShopBagType.piece,this.playerInfo.myScans);

            //设置当前选择皮肤,不是正确的皮肤id就设置默认第1个形象--默认100
            let myscanArr=ShopManager.instance().getItemID(ShopBagType.piece);
            if(myscanArr.length>0&&(this.playerInfo.selectScan<100||this.playerInfo.selectScan>=200)){
                this.playerInfo.selectScan=myscanArr[0];
            }  
            GameNetwork.Instance.requestUpdatePlayerData();//更新到服务器     
        }
        //设置游戏顶部人物UI信息
        this.lab_nickName.text=this.playerInfo.nickName;
        this.lab_gold.text=this.playerInfo.gold.toString();
        console.log("设置游戏顶部人物UI信息RoleTopInfo:"+this.playerInfo.nickName)

        //初始化打开商店和设置button
        this.btn_setting.setImgScore('Common_json.icon_SET')
        this.btn_shop.setImgScore('Common_json.icon_+')

        /**
         * 图像使用范例
         */
        var that = this;
        this.head_icon.setNameVisiable(false);
        this.head_icon.data = {playerInfo:this.playerInfo,event:function(data){
            //
            that.OnClickToRoleInfo(data.playerInfo);
            
        }};
      
    }

    /**
     * 注册事件
     */
    private registerBtnEvent()
    {
        this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickEnterShop,this)
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickSetting,this)
        EventManager.instance().addEventListener(GameEvents.PlayerGoldUIUpdate,(data)=>
        {
            this.lab_gold.text=data;//购买表情包金币UI更新
        },this)
    }

    /**
     * 打开个人信息界面
     */
    private OnClickToRoleInfo(playerinfo:PlayerInfo)
    {
        console.log("打开个人信息！")
        UserManager.instance().setCurPlayerInfo(this.playerInfo);
        UIManager.instance().openWindow("RoleHeadInfoWindow")
    }

    /**
     * 打开商店
     */
    private clickEnterShop(event:egret.TouchEvent):void
    {
        if(!UIManager.instance().findWindow("ShopWindow"))
        {
            console.log("打开商店")
            //UIManager.instance().closeWindow("MainWindow");
            // UIManager.instance().closeWindow("RankWindow")
            // UIManager.instance().closeWindow("FriendRankWindow")
            // UIManager.instance().closeWindow("GobalRankWindow")
            //UIManager.instance().closeWindow("RoleTopInfoWidget")
            UIManager.instance().openWindow("ShopWindow");
        }
    }
    /**
     * 打开设置界面
     */
    private onClickSetting()
    {
        console.log("打开游戏设置界面")
        UIManager.instance().openWindow("SettingWindow")
    }

    /**
     * 关闭界面
     */
    private closeRoleHeadInfo()
    {
        console.log("关闭界面")
        UIManager.instance().closeWindow("RoleHeadInfoWindow");
    }

    /**
     * 测试商店数据
     */
    private testData(type:ShopBagType,dataArr:any)
    {   //得到个人形象数据
        let pieceArr=ShopManager.instance().getItemID(type);
        if(typeof dataArr==="string")
        {
            //数组化
            let str:string=dataArr;
            let strArr:string[]=str.split(',')
            let myScans:number[]=[];
            for(let i=0;i<strArr.length;i++)
            {
                if(strArr[i]){
                    myScans.push(parseInt(strArr[i]));
                }
            }
            dataArr=[...myScans];

            //如果没有数据，就初始化一组测试数据
            if(str.length<=0&&pieceArr.length>=4)
            {
                dataArr=[];
                //设置初始化我拥有的皮肤-个人形象(默认4个形象)
                for(let i=0;i<4;i++)
                {
                    dataArr.push(pieceArr[i]); 
                }
            }else{
                console.log("RoleTopInfoWidget添加服务器数据成功!");
            }
        }else if(dataArr.length==0){
            if(pieceArr.length>=4)
            {
                //设置初始化我拥有的皮肤-个人形象(默认4个形象)
                for(let i=0;i<4;i++)
                {
                    dataArr.push(pieceArr[i]); 
                }
            }else{
                console.log("RoleTopInfoWidget添加测试数据失败--length小于4!");
            }
        }

        switch(type)
        {
            case ShopBagType.emojis:
                this.playerInfo.myEmoticons=[...dataArr];
                break;
            case ShopBagType.piece:
                this.playerInfo.myScans=[...dataArr];
                break;
            default:break;
        }
    }
}