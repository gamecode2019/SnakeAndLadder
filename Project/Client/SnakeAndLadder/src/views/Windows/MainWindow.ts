class MainWindow extends UIWindow {
    // 用户信息
    private g_main_userinfo: eui.Group;
    private nick_name:eui.Label;
    //设置
    //private setting_btn: eui.Button;

    //商店
    //private add_shop: eui.Button;


    //角色信息背景图
    private head:eui.Panel;

    /**
     * 初始化主界面
     */
    protected onInit() {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/MainSkin.exml";
        this.registerBtnEvent();
        this.initWindow();
    }

    /**
     * 组件第一次添加到舞台时回调
     */
    public createChildren(): void {
        super.createChildren();

        UIManager.instance().openWindow("RankWindow")
        UIManager.instance().openWindow("RoleTopInfoWidget")
        UIManager.instance().openWindow("GameEnterWindow");
        
    }

    /**
     * 初始化窗口
     */
    private initWindow(): void {

        //ShopManager.instance().setShopData();
        console.info(UserManager.instance().getUserInfo())
        //this.nick_name.text = UserManager.instance().getUserInfo().nickName;
    }

    /**
     * 更新大厅信息
     */
    public updateInfo(){
        
    }               

    /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {

    }

    /**
     * 打开游戏设置界面
     */
    private clickEnterSetting(event:egret.TouchEvent):void
    {
        console.log("打开游戏设置界面")
        UIManager.instance().openWindow("SettingWindow")
    }
    // /**
    //  * 打开商店
    //  */
    // private clickEnterShop(event:egret.TouchEvent):void
    // {
    //     console.log("打开商店")
    //     UIManager.instance().closeWindow("MainWindow");
    //     UIManager.instance().closeWindow("RankWindow")
    //     UIManager.instance().closeWindow("FriendRankWindow")
    //     UIManager.instance().closeWindow("GobalRankWindow")
    //     UIManager.instance().openWindow("ShopWindow");
    // }


    /**
     * 关闭主界面
     */
    public closeMainUI(): void {
        if (this.parent != null) {
            this.parent.removeChild(this);
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