/**
 * 角色个人信息
 */
class RoleHeadInfoWindow extends UIWindow {
    private bgImage:eui.Image;//界面背景图
    private lab_total:eui.Label;//总游戏局数
    private lab_one:eui.Label;  //第一名局数
    private playerInfo:PlayerInfo;//玩家信息类

    private head_icon:HeadIconWidget;//头像
    private btn_close:MyButton;    //关闭窗口

    /**
     * 界面初始化
     */
    protected onInit(): void 
    {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/RoleHeadInfoSkin.exml";
        this.registerBtnEvent();
        //初始化个人信息界面
        this.initWindow();
    }
    /**
     * 初始化个人信息界面
     */
    private initWindow()
    {
        this.playerInfo=UserManager.instance().getCurPlayerInfo();      //获取当前点击小头像的用户信息
        this.lab_total.text=this.playerInfo.gameTotalCount.toString();  //参加游戏总场次
        this.lab_one.text=this.playerInfo.getFirstCount.toString();    //获取第一名场次

        /**
         * 图像使用范例
         */
        var that = this;
        this.head_icon.setNameVisiable(true);
        this.head_icon.data = {playerInfo:this.playerInfo};
    }

    /**
     * 注册事件
     */
    private registerBtnEvent()
    {
        //this.bgImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeRoleHeadInfo,this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeRoleHeadInfo,this);
        this.btn_close.setImgScore("Common_json.icon_x")       
    }

    /**
     * 关闭界面
     */
    private closeRoleHeadInfo()
    {
        console.log("关闭界面")
        UIManager.instance().closeWindow("RoleHeadInfoWindow");
    }
}