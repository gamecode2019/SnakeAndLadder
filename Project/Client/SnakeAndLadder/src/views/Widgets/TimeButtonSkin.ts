class TimeButtonSkin extends eui.Component {
	private Btn:eui.Button;
	private Prog:eui.Image;
	private TimeText:eui.Label;
	private Shape:egret.Shape;//进度条遮罩
 
	private MaxTime:number = 0.1; //进度总时间
	private Pass:number = 0; //经过时间
	private Timer:number;
	private IsOK:boolean =false;
	private CallBack:Function = null;

	public constructor()
	{
		super();
		this.skinName = "resource/eui_skins/widgetSkins/TimeButtonSkin.exml";
	}



	public createChildren():void{
		this.InitProcess();
		this.TimeGet();
		this.startTime(this.MaxTime);
	}

	public setCD(val:number):void{
		this.MaxTime = val;
	}

	public setImage(res:string):void{
		var image1: eui.Image = <eui.Image>this.Btn.getChildAt(0);
        image1.source = RES.getRes(res);

	}

	public setCallBack(call:Function,take?:any):void{
		this.CallBack = call;
	}
	public addTouchEvent(){
		this.Btn.touchEnabled = true;
		this.Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}
	public startTime(cd){
		this.MaxTime = cd;
		this.Prog.visible = true;
		this.TimeText.visible = true;
		this.Pass = 0;
		this.IsOK = false;
		this.Timer = egret.setInterval(this.TimeGo,this,16.6666,16.6666);
	}

	private TimeGo(val:number):void
	{
		this.TimeText.text = (this.MaxTime - this.Pass/1000).toFixed(0).toString()+'s';
		this.Pass += val;
		let angle =  (this.Pass/1000)/this.MaxTime*360;
		if(angle > 360&&!this.IsOK)
		{
			this.TimeGet();
		}

		this.setProcess(angle);

	}

	private TimeGet():void //时间到达
	{
		this.IsOK = true;
		this.Prog.visible = false;
		this.TimeText.visible = false;
		this.TimeText.text = (this.MaxTime - this.Pass/1000).toFixed(0).toString()+'s';
		egret.clearInterval(this.Timer);
	}


	private onTouch(event: egret.TouchEvent): void {
        console.info("onTouch");
		if(this.IsOK){
			if(this.CallBack){
				this.CallBack();
			}

			this.startTime(this.MaxTime);
		}
    }

	private InitProcess():void
	{
		var shape: egret.Shape = this.Shape = new egret.Shape();
		this.Shape.touchEnabled = true;
		shape.x = this.width / 2;
        shape.y = this.width / 2;
        this.addChild(shape);
		this.Prog.mask = shape;
	}


	private changeGraphics(angle:number): void {
		let self = this;
		if(angle >= 360&& !this.IsOK)
		{
			return;
		}
        var shape: egret.Shape = this.Shape;
		shape.x = this.Prog.width / 2;
        shape.y = this.Prog.width / 2;
		
        function changeGraphicsEx(angle:number):void {
            shape.graphics.clear();

            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(100, 0);
            shape.graphics.drawArc(0, 0, 100,0, angle * Math.PI / 180, true);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
       changeGraphicsEx(angle);
    }

	private setProcess(angle:number):void
	{
		this.changeGraphics(angle);	
	}

}