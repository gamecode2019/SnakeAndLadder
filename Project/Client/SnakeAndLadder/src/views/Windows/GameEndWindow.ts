// TypeScript file
class GameEndWindow extends UIWindow {
    private g_panel:eui.Panel
    //
    private back:MyButton;
    private next:MyButton;

    /**
     * 初始化主界面
     */
    protected onInit() {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/GameEndSkin.exml";
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
        
        this.back.setImgScore('Common_json.button_blue_l');
        this.back.getLabel().text = 'Start';
        this.back.getLabel().size = 30;
        this.next.setImgScore('Common_json.button_green_l');
        this.next.getLabel().text = 'Invite more';
        this.next.getLabel().size = 30;

    }

    /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBackBtn, this);
        this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchNextBtn, this);
    }

    /**
     * 点击back
     */

    private touchBackBtn(){
        this.closeMe();
    }

    /**
     * 点击next
     */
    private touchNextBtn(){
        
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

