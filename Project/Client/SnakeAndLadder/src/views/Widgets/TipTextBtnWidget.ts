class TipTextBtnWidget extends eui.Component implements UIWidget {
    //图片
    public icon: eui.Image;
    //上部分label 
    public topText: eui.Label;
    //下部分label 
    public bottomText: eui.Label;
    //底图 
    public bg: eui.Image;
    //特效
    private effect: UIEffect = null;
    //特效父节点
    private effectParent: eui.Group;

    /**
     * 皮肤初始化
     */
    protected constructor() {
        super();
        this.skinName = "resource/eui_skins/widgetSkins/TipTextBtnWidget.exml";
    }

    /**
     * 初始化
     */
    public onInit(){
        
    }

    protected createChildren(): void {
        super.createChildren()
        this.effect = EffectManager.instance().createEffect("btn_flash", "test1", -1);
        this.effectParent.x += 10;
        if (this.effect != null) {
            this.effect.play(-1, this.effectParent);
        }
    }

    /**
     * 设置图片
     * @param {string} imgName 图片名称
     * @return {void} 
     */
    public setIcon(imgName: string) {
        this.icon.source = imgName;
    }

    /**
     * 设置top部分文字
     * @param {string} 文字内容
     * @return {void} 
     */
    public setTop(top: string): void {
        this.topText.text = top;
    }

    /**
     * 设置底部文字
     * @param {string} 文字内容
     * @return {void}
     */
    public setBottom(bo: string) {
        this.bottomText.text = bo;
    }

    /**
     * 释放特效 
     */
    public onRelease() {
        this.effect = null;
    }
}