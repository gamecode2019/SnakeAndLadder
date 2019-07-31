//zt
class MusicManager {
	private Music: egret.SoundChannel;
	private EffectStart: number = 0;
	private EffectLoop: number = 0;
	public isMuteMusic = false
	public isMuteEffect = false
	private effectList:Array<egret.SoundChannel>
	private static Manager = new MusicManager();
	private constructor() {
		this.effectList=new Array<egret.SoundChannel>()
	}

	static getInstance(): MusicManager {
		return MusicManager.Manager;
	}

	public StopMusic(): void {
		if (this.Music != null) {
			this.Music.stop();
		}
	}

	public PlayMusic(name: string) {
		this.StopMusic()
		let sound = <egret.Sound>RES.getRes(name);
		if (sound == null) {
			console.log("sound" + name + ":::error");

		}
		sound.type = egret.Sound.MUSIC;
		this.Music = sound.play(0, 0);
	}

	public PlayEffect(name: string, start: number, loop: number) {
		if (!this.isMuteEffect) {
			let sound = <egret.Sound>RES.getRes(name);
			if (sound == null) {
				console.log("sound" + name + ":::error");
				return;
			}
			sound.type = egret.Sound.EFFECT;
			let effect = sound.play(start, loop);
			this.effectList.push(effect)
			effect.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
		}
	}

	public MuteMusic() {
		if (this.Music)
			this.Music.volume = 0
	}

	public RestoreMusic() {
		if (this.Music)
			this.Music.volume = 1
	}

	public MuteEffect(){
		for(let i=0;i<this.effectList.length;i++){
			this.effectList[i].volume=0
		}
	}

	public RestoreMuteEffect(){
		for(let i=0;i<this.effectList.length;i++){
			this.effectList[i].volume=1
		}
	}
	private onSoundComplete(event: egret.Event): void {
	
		
	}


}