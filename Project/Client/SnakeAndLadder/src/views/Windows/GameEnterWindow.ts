class GameEnterWindow extends UIWindow {
    //匹配模式
    private start_1: MyButton;

    //好友模式
    private start_2: MyButton;

    //练习模式
    private start_3: MyButton;

    protected onInit() {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/GameEnterSkin.exml";
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

        this.start_1.getLabel().text = 'Play now'
        this.start_2.getLabel().text = 'with Friends'
        this.start_3.getLabel().text = 'Training'
    }

    /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {
        this.start_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterGame1, this);
        this.start_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterGame2, this)
        this.start_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterGame3, this)
    }

    /**
     * start_1点击开始游戏(匹配模式)
     */
    private clickEnterGame1(event: egret.TouchEvent): void {
        //开始游戏
        GameManager.instance().enterGame(GameType.matchingMode);
    }
    
        /**
     * start_2点击开始游戏(好友模式)
     */
    private clickEnterGame2(event: egret.TouchEvent): void {
        //开始游戏
        GameManager.instance().enterGame(GameType.firendMode);
    }

        /**
     * start_3点击开始游戏(练习模式)
     */
    private clickEnterGame3(event: egret.TouchEvent): void {
        //开始游戏
        GameManager.instance().enterGame(GameType.normalMode);
    }

    /**
     * 释放窗口
     */
    public release() {
        // this.union.onRelease();
        // this.task.onRelease();
    }
}