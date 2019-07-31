class LoginWindow extends UIWindow {

    //友情提示
    private tip: eui.Label;

    //进入游戏图片（为其添加btn事件）
    private enter_btn: eui.Button;


    /**
     * 界面初始化
     */
    protected onInit(): void {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/LoginUISkin.exml";
        this.registerBtnEvent();
        console.log("into ")     
        // this.initWindow();
    }

    /**
     * 创建子结点
     */
    protected createChildren() {
        super.createChildren();
        console.log("createChildren");
    }

    /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {
        this.enter_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterGame, this);
    }

    /**
     * 初始化窗口
     */
    private initWindow(): void {
        this.tip.lineSpacing = 5;
    }

    /**
     * 点击游戏按钮事件
     */
    private clickEnterGame(event: egret.TouchEvent): void {
        //GameNetwork.Instance.connect();
        //UserProto.instance().requestGetPlayerData();
        UIManager.instance().closeWindow("LoginWindow");
        UIManager.instance().openWindow("MainWindow");
        
    }

}