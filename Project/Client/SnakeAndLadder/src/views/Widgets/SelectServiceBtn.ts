class SelectServiceBtn extends eui.ItemRenderer implements UIWidget {
    //服务器状态图标
    private ser_state: eui.Image;

    //服务器名称
    private ser_name: eui.Label;

    //新区标志
    private isNew: eui.Image;

    public constructor() {
        super();
        this.onInit();
    }

    public onInit() {
        this.skinName = "resource/eui_skins/widgetSkins/SelectServiceBtn.exml";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
    }

    /**
    * 数据改变时候，更新视图
    */
    protected dataChanged(): void {
        this.ser_name.text = this.data.ser_name;
        this.isNew.visible = (this.data.ser_isNew === 1);
        //todo 服务器状态显示
    }

    /**
     * 点击事件
     */
    private click(): void {
        if (UIManager.instance().findWindow("LoginWindow")){
            
        }
        UIManager.instance().closeWindow("SelecteServiceWindow");
    }
}