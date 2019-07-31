
class SettingWindow extends UIWindow {
    private shareBtn: eui.Button
    private quitBtn: eui.Button
    private closeBtn: eui.Button
    private effectBtn: eui.Button
    private musicBtn: eui.Button
    private playerImg: HeadIconWidget
    private quitRoom: eui.Button
    private effectImg: eui.Image
    private musicImg: eui.Image
    private effectOnImg: eui.Image
    private effectOffImg: eui.Image
    private musicOnImg: eui.Image
    private musicOffImg: eui.Image

    private playerInfo:PlayerInfo;//玩家信息


    protected onInit() {
        super.onInit()
        this.skinName = "resource/eui_skins/windowSkins/SettingSkin.exml"
        //TODO传入当前皮肤
        this.playerInfo=UserManager.instance().getPlayerInfo();
        this.playerImg.setNameVisiable(false);
        this.playerImg.headType=HeadIconType.gameIcon;
        this.playerImg.data={playerInfo:this.playerInfo}
        //this.playerImg.setTouchCallBack()
        // this.playerImg.source=ShopManager.instance().getShopItemData(
        //     this.playerInfo.selectScan.toString()).sourceName;
        this.registerBtnEvent()
        this.InitData()
    }

    private InitData() {
        if (MusicManager.getInstance().isMuteMusic) {
            this.musicOnImg.visible = false
            this.musicOffImg.visible = true
            this.musicImg.source = "Common_json.icon_music1"
        } else {
            this.musicOnImg.visible = true
            this.musicOffImg.visible = false
            this.musicImg.source = "Common_json.icon_music"
        }

        if (MusicManager.getInstance().isMuteEffect) {
            this.effectOnImg.visible = false
            this.effectOffImg.visible = true
            this.effectImg.source = "Common_json.icon_sound1"
        } else {
            this.effectOnImg.visible = true
            this.effectOffImg.visible = false
            this.effectImg.source = "Common_json.iconsound"
        }
        if (UIManager.instance().findWindow("GameWindow") != null) {
            this.quitRoom.visible = true
            this.quitBtn.visible = false
            this.shareBtn.visible = false
        } else {
            this.quitRoom.visible = false
            this.quitBtn.visible = true
            this.shareBtn.visible = true
        }
    }
    public createChildren(): void {
        super.createChildren()
    }

    private registerBtnEvent(): void {
        this.playerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeImg, this)
        this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicClick, this)
        this.effectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEffectClick, this)
        Utils.getInstance().buttonEffect(this.shareBtn, this.onShare, this)
        Utils.getInstance().buttonEffect(this.quitBtn, this.onQuit, this)
        Utils.getInstance().buttonEffect(this.closeBtn, this.onClose, this)
        Utils.getInstance().buttonEffect(this.quitRoom, this.QuitRoom, this)
        EventManager.instance().addEventListener(GameEvents.CHANGE_PLAYER_SKIN, (data) => {
            //设置当前选择的皮肤形象图
            this.playerInfo.selectScan=data;
            this.playerImg.data={playerInfo:this.playerInfo}
            // this.playerImg.source=ShopManager.instance().getShopItemData(
            // this.playerInfo.selectScan.toString()).sourceName;
            //本地存贮当前选择皮肤形象图
            //Util.save_key(selectScan,date);
            //关闭形象选择界面
            UIManager.instance().closeWindow("SelectSkinWindow");          
            
            //发送服务器个人形象图片改变
            GameNetwork.Instance.requestUpdatePlayerData();     
        }, this)
    }

    private QuitRoom() {
        //关闭房间
        UIManager.instance().openWindow("MatchTipWindow")
    }
    private onClose(e: egret.TouchEvent) {
        UIManager.instance().closeWindow("SelectSkinWindow")
        this.closeMainUI()
    }

    private onShare(e: egret.TouchEvent) {
        //TODO分享          
        // platform.share()   
      
    }

    private onQuit(e: egret.TouchEvent) {
        if (!UIManager.instance().findWindow("MainWindow")) {
            UIManager.instance().openWindow("MatchTipWindow")
        } else {
            UIManager.instance().openWindow("UnMatchTipWindow")
        }
    }

    private onChangeImg(e: egret.TouchEvent) {
        UIManager.instance().openWindow("SelectSkinWindow")
    }

    private onMusicClick() {
        MusicManager.getInstance().isMuteMusic = !MusicManager.getInstance().isMuteMusic
        if (MusicManager.getInstance().isMuteMusic) {
            MusicManager.getInstance().MuteMusic()
            this.musicOnImg.visible = false
            this.musicOffImg.visible = true
            this.musicImg.source = "Common_json.icon_music1"
        } else {
            MusicManager.getInstance().RestoreMusic()
            this.musicOnImg.visible = true
            this.musicOffImg.visible = false
            this.musicImg.source = "Common_json.icon_music"
        }
    }

    private onEffectClick() {

        MusicManager.getInstance().isMuteEffect = !MusicManager.getInstance().isMuteEffect
        if (MusicManager.getInstance().isMuteEffect) {
            MusicManager.getInstance().MuteEffect()
            this.effectOffImg.visible = true
            this.effectOnImg.visible = false
            this.effectImg.source = "Common_json.icon_sound1"
        } else {
            MusicManager.getInstance().RestoreMuteEffect()
            this.effectOffImg.visible = false
            this.effectOnImg.visible = true
            this.effectImg.source = "Common_json.iconsound"
        }
    }

    public closeMainUI(): void {
        UIManager.instance().closeWindow("SettingWindow")
    }

    public release() {

    }
}