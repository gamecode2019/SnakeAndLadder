class ShopWindow extends UIWindow {
    //用户信息
    private g_main_userinfo:eui.Group;
    private nick_name:eui.Label;
    //角色信息背景图
    //private head:eui.Panel;
    //设置
    //private setting_btn:eui.Button;
    //商店
    //private add_shop: eui.Button;
    //关闭
    private close_btn:MyButton;
    //商品列表滚动框
    private shop_Scroller:eui.Scroller;
    //商品列表
    private shopItmeList:eui.List;
    //商店默认显示表情包
    private curShopBagType:ShopBagType=null;
    //切换表情包btn
    private emojis_btn:MyButton;
    //切换金币商店包
    private gameGold_btn:MyButton;

    /**
     * 初始化主界面
     */
    protected onInit()
    {
        super.onInit();
        UIManager.instance().openWindow("RoleTopInfoWidget")
        this.skinName = "resource/eui_skins/windowSkins/ShopSkin.exml";
        this.registerBtnEvent();

        this.curShopBagType=ShopBagType.emojis;
        ShopManager.instance().curShopBagType=this.curShopBagType;
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

        console.info(UserManager.instance().getUserInfo())
        //this.nick_name.text = UserManager.instance().getUserInfo().nickName;
        //初始化表情包和金币包按钮
        //this.emojis_btn.skinName="myButtonSkin"
        this.emojis_btn.getLabel().text='Emojis';
        this.emojis_btn.setImgScore('Common_json.button_green_l')
        this.gameGold_btn.getLabel().text='Apples'
        this.gameGold_btn.setImgScore('Common_json.button_blue_l')
        this.close_btn.setImgScore('Common_json.icon_x')
        //初始化窗口显示物品列表
        this.initShopItemList();
    }

    /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {      
        //this.add_shop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickEnterShop,this)
        //this.setting_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickEnterSetting,this)
        this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeShopUI,this)
        //this.head.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickToRoleInfo,this)
        
        this.emojis_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickToEmojis,this)
        this.gameGold_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickToGameGold,this)
    }
    /**
     * 切换到表情包
     */
    private OnClickToEmojis()
    {
        this.curShopBagType=ShopBagType.emojis;
        ShopManager.instance().curShopBagType=this.curShopBagType;

        this.shop_Scroller.stopAnimation();
        this.showShopItemByType();
    }

    /**
     * 切换到金币包
     */
    private OnClickToGameGold()
    {
        this.curShopBagType=ShopBagType.gold;
        ShopManager.instance().curShopBagType=this.curShopBagType;

        this.shop_Scroller.stopAnimation();     
        this.showShopItemByType();
    }

    /**
     * 打开游戏设置界面
     */
    private clickEnterSetting(event:egret.TouchEvent):void
    {
        console.log("打开游戏设置界面")
        UIManager.instance().openWindow("SettingWindow")
    }
    /**
     * 打开商店
     */
    private clickEnterShop(event:egret.TouchEvent):void
    {
        console.log("打开商店")
    }

    /**
     * 关闭商店界面
     */
    public closeShopUI(): void {
        // if (this.parent != null) {
        //     this.parent.removeChild(this);
        // }ShopWindow
        UIManager.instance().closeWindow("ShoppinInfoWidget");
        UIManager.instance().closeWindow("ShopWindow");
        // UIManager.instance().closeWindow("RoleTopInfoWidget")
        UIManager.instance().openWindow("MainWindow");

    }

    /**
     * 初始化窗口显示物品列表
     */
    private initShopItemList()
    {
        this.showShopItemByType();
        //let a=this.shopItmeList.dataProvider.getItemAt(0);
    }

    private valueChange()
    {
        console.log("valueChange")
    }
    /**
     * 根据商店背包类型显示物品
     */
    private showShopItemByType()
    {
        let dataArr:Array<any>=[];
        dataArr=ShopManager.instance().getShopBagByType(this.curShopBagType).values();
        ShopManager.instance().shoppingItemInfo.shopdataArr=dataArr;

        switch(this.curShopBagType)
        {
            case ShopBagType.emojis:
            case ShopBagType.piece:             
                let euiArr:eui.ArrayCollection=new eui.ArrayCollection(dataArr);      
                this.shopItmeList.dataProvider=euiArr;
                this.shopItmeList.itemRenderer=ShopItemList;
                //用了validateNow()你会看到不断刷新的画面效果
                this.shopItmeList.validateNow();
                break;
            case ShopBagType.gold:

                let euiArr1:eui.ArrayCollection=new eui.ArrayCollection(dataArr);      
                this.shopItmeList.dataProvider=euiArr1;
                this.shopItmeList.itemRenderer=ShopItemGold;
                //用了validateNow()你会看到不断刷新的画面效果
                this.shopItmeList.validateNow();
                
                break;
        }
    }

    /**
     * 释放窗口
     */
    public release() {
        // this.union.onRelease();
        // this.task.onRelease();
    }
}