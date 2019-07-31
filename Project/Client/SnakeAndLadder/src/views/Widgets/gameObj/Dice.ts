//
// 骰子
//
class Dice extends eui.Component{
    //
    private g_me:eui.Group;
    private img_me:eui.Image;

    private light:egret.tween.TweenGroup;
    private roll_1:egret.tween.TweenGroup;
    private seatid = -1;

    //roll_1动画监听事件
    private roll_call:Function = null;

	public constructor() {
		super()
        this.skinName = "resource/eui_skins/widgetSkins/DiceSkin.exml";
        this.Init();
	}
    protected createChildren(): void {
        super.createChildren();
    }


    private Init(){
        this.hide();
    }

    /**
     * setPosition
     */
    public setPosition(seatid:number){
        this.x = 57 + 140*seatid - 20;
        this.y = 72 - 219;

        this.seatid = seatid;
    }

    /**
     * show
     */
    public show(istouch?:boolean){
        this.visible = true;
        if(istouch){
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDice, this);
        }
        this.light.play(0);
    }

    /**
     * hide
     */
    public hide(){
        this.visible = false;
        this.removeTouch();
    }

    public removeTouch(){
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDice, this);
    }

    /**
     * 点击塞子
     */
    private touchDice(){
        this.removeTouch();
        GameManager.instance().rollStep(this.seatid);
    }

    /**
     * 播放摇色子playRoll
     */
    public playRoll(roll:number,callback:Function){
        var that = this;
        this.removeTouch();
        this.roll_1.removeEventListener('complete',this.roll_call,this);
        this.roll_call = ()=>{
            callback();
            that.hide();
        }
        if(this.seatid>=0){
            this.roll_1.addEventListener('complete', this.roll_call, this);
            this.roll_1.play(0);

        }

    }
    


	

}

