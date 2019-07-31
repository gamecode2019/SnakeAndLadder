var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//zt
var MusicManager = (function () {
    function MusicManager() {
        this.EffectStart = 0;
        this.EffectLoop = 0;
        this.isMuteMusic = false;
        this.isMuteEffect = false;
        this.effectList = new Array();
    }
    MusicManager.getInstance = function () {
        return MusicManager.Manager;
    };
    MusicManager.prototype.StopMusic = function () {
        if (this.Music != null) {
            this.Music.stop();
        }
    };
    MusicManager.prototype.PlayMusic = function (name) {
        this.StopMusic();
        var sound = RES.getRes(name);
        if (sound == null) {
            console.log("sound" + name + ":::error");
        }
        sound.type = egret.Sound.MUSIC;
        this.Music = sound.play(0, 0);
    };
    MusicManager.prototype.PlayEffect = function (name, start, loop) {
        if (!this.isMuteEffect) {
            var sound = RES.getRes(name);
            if (sound == null) {
                console.log("sound" + name + ":::error");
                return;
            }
            sound.type = egret.Sound.EFFECT;
            var effect = sound.play(start, loop);
            this.effectList.push(effect);
            effect.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        }
    };
    MusicManager.prototype.MuteMusic = function () {
        if (this.Music)
            this.Music.volume = 0;
    };
    MusicManager.prototype.RestoreMusic = function () {
        if (this.Music)
            this.Music.volume = 1;
    };
    MusicManager.prototype.MuteEffect = function () {
        for (var i = 0; i < this.effectList.length; i++) {
            this.effectList[i].volume = 0;
        }
    };
    MusicManager.prototype.RestoreMuteEffect = function () {
        for (var i = 0; i < this.effectList.length; i++) {
            this.effectList[i].volume = 1;
        }
    };
    MusicManager.prototype.onSoundComplete = function (event) {
    };
    MusicManager.Manager = new MusicManager();
    return MusicManager;
}());
__reflect(MusicManager.prototype, "MusicManager");
//# sourceMappingURL=MusicManager.js.map