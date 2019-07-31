class ProgressBarWidget extends eui.Component implements UIWidget{
    //底图
    public background:eui.Image; 
    //前面进度图;
    public forward:eui.Image;
    //进度条遮罩
    public forwardMask :egret.Rectangle;

    /**
     * 构造
     */
    public constructor(){
        super();
        this.skinName = "resource/eui_skins/widgetSkins/ProgressBarWidget.exml";
        this.forward.mask = this.forwardMask ;      
    }

    /**
     * 初始化
     */
    public onInit(){

    }

    /**
     * 设置图片
     * @param {string} background 底图资源名称
     * @param {string} forward 前面进度图名称
     * @return {void}
     */
    public setBarImg(background:string,forward:string):void{
        this.background.source = background; 
        this.forward.source =forward ;
    }

    /**
     * 设置进度条值
     * @param {number} percent 进度百分比值 
     * @return {void}
     */
    public setProgress(percent):void{
        if (percent > 1){
            percent = 1; 
        } else if (percent < 0){
            percent=0;
        }         
        this.forwardMask = new egret.Rectangle(0,0,this.width *percent,this.height);
        this.forward.mask = this.forwardMask;
    }
}

