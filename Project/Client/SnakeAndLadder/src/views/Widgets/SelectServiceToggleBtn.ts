class SelectServiceToggleBtn extends eui.ToggleButton implements UIWidget {
    //未选中图片
    private unSelec: eui.Image;
    //选中图片
    private selec: eui.Image;
    //服务器名称
    private ser_area: eui.Label;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.onInit();
    }

    /**
     * 初始化
     */
    public onInit() {
        this.skinName = "resource/eui_skins/widgetSkins/SelectServiceToggleBtn.exml";
    }

    /**
     * 设置大区名称
     */
    public setLabel(text: string) {
        this.ser_area.text = text;
    }

}