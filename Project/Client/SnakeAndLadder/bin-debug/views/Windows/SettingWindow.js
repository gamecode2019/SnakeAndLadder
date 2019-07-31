var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SettingWindow = (function (_super) {
    __extends(SettingWindow, _super);
    function SettingWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/SettingSkin.exml";
        //TODO传入当前皮肤
        this.playerInfo = UserManager.instance().getPlayerInfo();
        this.playerImg.setNameVisiable(false);
        this.playerImg.headType = HeadIconType.gameIcon;
        this.playerImg.data = { playerInfo: this.playerInfo };
        //this.playerImg.setTouchCallBack()
        // this.playerImg.source=ShopManager.instance().getShopItemData(
        //     this.playerInfo.selectScan.toString()).sourceName;
        this.registerBtnEvent();
        this.InitData();
    };
    SettingWindow.prototype.InitData = function () {
        if (MusicManager.getInstance().isMuteMusic) {
            this.musicOnImg.visible = false;
            this.musicOffImg.visible = true;
            this.musicImg.source = "Common_json.icon_music1";
        }
        else {
            this.musicOnImg.visible = true;
            this.musicOffImg.visible = false;
            this.musicImg.source = "Common_json.icon_music";
        }
        if (MusicManager.getInstance().isMuteEffect) {
            this.effectOnImg.visible = false;
            this.effectOffImg.visible = true;
            this.effectImg.source = "Common_json.icon_sound1";
        }
        else {
            this.effectOnImg.visible = true;
            this.effectOffImg.visible = false;
            this.effectImg.source = "Common_json.iconsound";
        }
        if (UIManager.instance().findWindow("GameWindow") != null) {
            this.quitRoom.visible = true;
            this.quitBtn.visible = false;
            this.shareBtn.visible = false;
        }
        else {
            this.quitRoom.visible = false;
            this.quitBtn.visible = true;
            this.shareBtn.visible = true;
        }
    };
    SettingWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    SettingWindow.prototype.registerBtnEvent = function () {
        var _this = this;
        this.playerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeImg, this);
        this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicClick, this);
        this.effectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEffectClick, this);
        Utils.getInstance().buttonEffect(this.shareBtn, this.onShare, this);
        Utils.getInstance().buttonEffect(this.quitBtn, this.onQuit, this);
        Utils.getInstance().buttonEffect(this.closeBtn, this.onClose, this);
        Utils.getInstance().buttonEffect(this.quitRoom, this.QuitRoom, this);
        EventManager.instance().addEventListener(GameEvents.CHANGE_PLAYER_SKIN, function (data) {
            //设置当前选择的皮肤形象图
            _this.playerInfo.selectScan = data;
            _this.playerImg.data = { playerInfo: _this.playerInfo };
            // this.playerImg.source=ShopManager.instance().getShopItemData(
            // this.playerInfo.selectScan.toString()).sourceName;
            //本地存贮当前选择皮肤形象图
            //Util.save_key(selectScan,date);
            //关闭形象选择界面
            UIManager.instance().closeWindow("SelectSkinWindow");
            //发送服务器个人形象图片改变
            GameNetwork.Instance.requestUpdatePlayerData();
        }, this);
    };
    SettingWindow.prototype.QuitRoom = function () {
        //关闭房间
        UIManager.instance().openWindow("MatchTipWindow");
    };
    SettingWindow.prototype.onClose = function (e) {
        UIManager.instance().closeWindow("SelectSkinWindow");
        this.closeMainUI();
    };
    SettingWindow.prototype.onShare = function (e) {
        //TODO分享          
        // platform.share()   
    };
    SettingWindow.prototype.onQuit = function (e) {
        if (!UIManager.instance().findWindow("MainWindow")) {
            UIManager.instance().openWindow("MatchTipWindow");
        }
        else {
            UIManager.instance().openWindow("UnMatchTipWindow");
        }
    };
    SettingWindow.prototype.onChangeImg = function (e) {
        UIManager.instance().openWindow("SelectSkinWindow");
    };
    SettingWindow.prototype.onMusicClick = function () {
        MusicManager.getInstance().isMuteMusic = !MusicManager.getInstance().isMuteMusic;
        if (MusicManager.getInstance().isMuteMusic) {
            MusicManager.getInstance().MuteMusic();
            this.musicOnImg.visible = false;
            this.musicOffImg.visible = true;
            this.musicImg.source = "Common_json.icon_music1";
        }
        else {
            MusicManager.getInstance().RestoreMusic();
            this.musicOnImg.visible = true;
            this.musicOffImg.visible = false;
            this.musicImg.source = "Common_json.icon_music";
        }
    };
    SettingWindow.prototype.onEffectClick = function () {
        MusicManager.getInstance().isMuteEffect = !MusicManager.getInstance().isMuteEffect;
        if (MusicManager.getInstance().isMuteEffect) {
            MusicManager.getInstance().MuteEffect();
            this.effectOffImg.visible = true;
            this.effectOnImg.visible = false;
            this.effectImg.source = "Common_json.icon_sound1";
        }
        else {
            MusicManager.getInstance().RestoreMuteEffect();
            this.effectOffImg.visible = false;
            this.effectOnImg.visible = true;
            this.effectImg.source = "Common_json.iconsound";
        }
    };
    SettingWindow.prototype.closeMainUI = function () {
        UIManager.instance().closeWindow("SettingWindow");
    };
    SettingWindow.prototype.release = function () {
    };
    return SettingWindow;
}(UIWindow));
__reflect(SettingWindow.prototype, "SettingWindow");
//# sourceMappingURL=SettingWindow.js.map