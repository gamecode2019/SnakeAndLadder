// TypeScript file
class ClassifyWindowItem extends eui.ItemRenderer implements UIWidget {

    public selectedIcon: eui.Image;
    public tag: eui.Label;
    public icon: eui.Image;
    /**
     * 构造函数
     */
    protected constructor() {
        super();
        this.onInit();
    }

    /**
     * 初始化
     */
    public onInit() {
        this.skinName = "resource/eui_skins/widgetSkins/ClassifyWindowItem.exml";
        this.selectedIcon.visible = false;
    }

    /**
     * 数据改变时候，更新视图
     */
    protected dataChanged(): void {

    }

    public setSelected(): void {
        this.selectedIcon.visible = true;
    }

}