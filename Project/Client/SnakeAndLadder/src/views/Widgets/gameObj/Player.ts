//
// 玩家
//
class Player extends eui.Component{
    //
    private g_me:eui.Group;
    private img_me:eui.Image;
    
    private move_timer:number;
    //tween动画
    // private action:egret.Tween;
    private pre_prop = {x:0,y:0}
    private to_prop = {x:0,y:0}

	public constructor() {
		super()
        this.skinName = "resource/eui_skins/widgetSkins/PlayerSkin.exml";
        this.Init();
	}
    protected createChildren(): void {
        super.createChildren();
    }

    /**
     * 设置皮肤
     */
    public setImg(res:string){
        this.img_me.source = RES.getRes(res);
        this.img_me.smoothing = true;
    }

    private Init(){
        this.setPreProp();
    }
    /**
     * 记录前一刻属性
     */
    private setPreProp(){
        this.pre_prop.x = this.x;
        this.pre_prop.y = this.y;
    }
    /**
     * 记录目标属性
     */
    private setToProp(x,y){
        this.to_prop.x = x;
        this.to_prop.y = y;
    }

    /**
     * 按数组移动
     */
    public moveWithArr(arr:Array<any>,call:Function){
        var that = this;
        let time = 1200/arr.length;
        time = time>200?200:time;
        let count = 0;
        clearInterval(that.move_timer);
        this.move_timer = setInterval(function(){
            if(count<arr.length){
                that.move(arr[count].x,arr[count].y,time)
            }else{
                call();
                clearInterval(that.move_timer);
            }
            
            count++;
        },time);
    }

    /**
     * 移动
     */
    private move(x,y,time){
        this.setPreProp();
        this.setToProp(x,y);
        // egret.Tween.get(this).to({x:x,y:y},1000);
        //在1秒内，this的factor属性将会缓慢趋近1这个值，这里的factor就是曲线中的t属性，它是从0到1的闭区间。
        var that = this;
        // this.action = ;
        egret.Tween.removeTweens(that);
        egret.Tween.get(this).to({factor: 1}, time);
    }

    /**
     * 移动
     */
    public moveTo(x,y,call:Function){
        this.setPreProp();
        this.setToProp(x,y);
        // egret.Tween.get(this).to({x:x,y:y},1000);
        //在1秒内，this的factor属性将会缓慢趋近1这个值，这里的factor就是曲线中的t属性，它是从0到1的闭区间。
        var that = this;
        // this.action = ;
        egret.Tween.removeTweens(that);
        egret.Tween.get(this).to({factor: 1}, 1000).call(call,this);
    }

    
    //添加factor的set,get方法,注意用public
    public get factor():number {
        return 0;
    }
    //利用egret的缓动动画Tween来实现动画
    //二次方贝塞尔公式B(t) = (1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2 ,t->[0-1]
    //起点P0  控制点P1  终点P2
    public set factor(value:number) {
        let dis = Math.sqrt(Math.pow(this.to_prop.x-this.pre_prop.x,2)+Math.pow(this.to_prop.y-this.pre_prop.y,2));
        let H =  dis/2;
        let centerx  = (this.to_prop.x+this.pre_prop.x)/2;
        let centery  = (this.to_prop.y+this.pre_prop.y)/2-dis*0.3;

        this.x = (1-value)*(1-value)*this.pre_prop.x + 2*value*(1-value)*centerx+value*value*this.to_prop.x;
        this.y = (1-value)*(1-value)*this.pre_prop.y + 2*value*(1-value)*centery+value*value*this.to_prop.y;
    }


	

}

