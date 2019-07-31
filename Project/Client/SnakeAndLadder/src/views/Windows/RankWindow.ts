
class RankWindow extends UIWindow {
    private gobalBtn: eui.ToggleButton
    private friendBtn: eui.ToggleButton
    private friendText:eui.Label
    private globalText:eui.Label
    private friendRank: UIWindow
    private gobalRank: UIWindow

    protected onInit() {
        super.onInit()
        this.skinName = "resource/eui_skins/windowSkins/RankSkin.exml"

       Utils.getInstance().buttonEffect(this.friendBtn,this.friendRankHandler,this,this.friendText) 
       Utils.getInstance().buttonEffect(this.gobalBtn,this.gobalRankHandler,this,this.globalText)      
    }

    public createChildren(): void {
        super.createChildren()
        UIManager.instance().openWindow("GobalRankWindow")
    }

    private gobalRankHandler(e: egret.TouchEvent) {
        UIManager.instance().openWindow("GobalRankWindow")
        UIManager.instance().closeWindow("FriendRankWindow")
    }

    private friendRankHandler(e: egret.TouchEvent) {
        UIManager.instance().openWindow("FriendRankWindow")
        UIManager.instance().closeWindow("GobalRankWindow")
    }
}
