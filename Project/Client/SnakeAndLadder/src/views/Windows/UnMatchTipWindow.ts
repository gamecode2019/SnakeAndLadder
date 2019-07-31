class UnMatchTipWindow extends UIWindow {
    private determine: eui.Button
    private back: eui.Button
    private quit:eui.Image
    protected onInit() {
        super.onInit()
        this.skinName = "resource/eui_skins/windowSkins/UnMatchTipSkin.exml"
        this.registerBtnEvent()      
    }

    public createChildren(): void {
        super.createChildren()
    }

    private registerBtnEvent(): void {
        Utils.getInstance().buttonEffect(this.determine,this.onDetermine,this)
        Utils.getInstance().buttonEffect(this.back,this.onBack,this)
        Utils.getInstance().buttonEffect(this.quit,this.onBack,this)
    }
    private onDetermine(e: egret.TouchEvent) {         
        // UIManager.instance().closeWindow("SettingWindow")
        // this.closeMainUI()
        platform.quit()
    }

    private onBack(e: egret.TouchEvent) {
        this.closeMainUI()
    }

    public closeMainUI(): void {
        UIManager.instance().closeWindow("UnMatchTipWindow")
    }
}