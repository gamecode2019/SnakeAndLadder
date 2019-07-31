// TypeScript file
class GuildToggleBtn extends eui.ToggleButton implements UIWidget {
    //彩图
    private color: eui.Image;
    //灰图
    private gray: eui.Image;
    //图集名称
    private atlasName:string = "Login";
    /**
     * 构造函数
     */
    protected constructor() {
        super();
        this.skinName = "resource/eui_skins/widgetSkins/GuildBtnWidget.exml";
    }

    public onInit():void{

    }

    /**
     *设置皮肤显示图片
     *@param {string} cImg:彩色图
     *@param {string} gImg:灰色图  
     */
    public setImg(cImg:string,gImg:string): void {
        this.color.source = UIManager.instance().getSourceNameByAtlasAndName(this.atlasName,cImg);
        this.gray.source = UIManager.instance().getSourceNameByAtlasAndName(this.atlasName,gImg);
    }
    
}