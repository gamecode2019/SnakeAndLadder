class MatchTipWindow extends UIWindow {
    private determine: eui.Button
    private back: eui.Button
    private quit: eui.Image
    protected onInit() {
        super.onInit()
        this.skinName = "resource/eui_skins/windowSkins/MatchTipSkin.exml"
        this.registerBtnEvent()
    }

    public createChildren(): void {
        super.createChildren()
    }

    private registerBtnEvent(): void {
        Utils.getInstance().buttonEffect(this.determine, this.onDetermine, this)
        Utils.getInstance().buttonEffect(this.back, this.onBack, this)
        Utils.getInstance().buttonEffect(this.quit, this.onBack, this)
    }

    private onDetermine(e: egret.TouchEvent) {
        //从游戏界面到大厅用这一句
        GameManager.instance().endGame();
    }

    private onBack(e: egret.TouchEvent) {
        this.closeMainUI()
    }

    public closeMainUI(): void {
        UIManager.instance().closeWindow("MatchTipWindow")
    }
}