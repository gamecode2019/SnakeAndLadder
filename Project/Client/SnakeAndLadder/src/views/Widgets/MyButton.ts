/**
 * MyButton 
 * 自定义按钮 自带点击效果（缩放 可扩展）
 * 
 * ```
 * //使用范例
 * private btn:MyButton;
 * btn.setImgScore('Common_json.button_green_l');
 * btn.getLabel().text = 'MyButton';
 * btn.getLabel().size = 30;
 * btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){}, this);
 * ```
 */
class MyButton extends eui.Button{
    private group:eui.Group;
	private btn:eui.Button
    //缩放动画
    private scaleTo:egret.tween.TweenGroup;
    private scaleBack:egret.tween.TweenGroup;

    public constructor() {
        super()
        this.skinName = 'resource/eui_skins/widgetSkins/MyButton.exml'
        this.registerBtnEvent();
        this.init();
    }
    protected createChildren(): void {
        super.createChildren();
    }
    /**
     * 设置皮肤
     */
    public setImgScore(img:string){
        var image1: eui.Image = <eui.Image>this.btn.getChildAt(0);
        image1.source = RES.getRes(img);
        image1.smoothing = true;
        

        // this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
        //     console.info("?????????");
        // }, this);

    }
    /**
     * 获取文本
     */
    public getLabel():eui.Label{
        return <eui.Label>(this.btn.labelDisplay);
    }

    /**
     * init
     */
    private init(){
        this.group.width = 0;
        this.group.height = 0;

        this.getLabel().text = '';
        this.getLabel().fontFamily = 'hydsf'
        this.getLabel().size = 40;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;

        // this.group.touchEnabled = true;        //禁用可触摸属性
        // this.group.touchThrough = true;         //启用点击穿透属性
        // this.group.touchChildren = true;       //禁用可触摸子类属性
        // this.touchChildren = true;
        // this.btn.touchEnabled = true;
    }
     /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleBeginZoom, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.scaleEndZoom, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.scaleEndZoom, this);
    }
    /**
     * 体积变化效果
     */
    private scaleBeginZoom(event: egret.TouchEvent): void {
        this.scaleTo.play(0);
    }
    private scaleEndZoom(event: egret.TouchEvent): void {
        this.scaleBack.play(0);
    }
    
   
}
