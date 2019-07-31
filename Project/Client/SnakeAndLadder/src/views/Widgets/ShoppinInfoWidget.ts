class ShoppinInfoWidget extends UIWindow {
    private lab_content:eui.Label; //内容
    private im_image:eui.Image;    //物品小图
    private btn_confirm:MyButton;//确定
    private btn_close:MyButton;  //关闭窗口
    private img_title:eui.Image;   //标题图
    /**
     * 初始化主界面
     */
    protected onInit()
    {
        this.skinName = "resource/eui_skins/widgetSkins/ShoppinInfo.exml"

        this.initWindow();
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeWindow,this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeWindow,this);
        this.btn_confirm.setImgScore('Common_json.button_green_l');
        this.btn_confirm.getLabel().text='Confirm'
        this.btn_close.setImgScore('Common_json.icon_x');
    }

    /**
     * 组件第一次添加到舞台时回调
     */
    public createChildren(): void {
        super.createChildren();
    }

    /**
     * 初始化显示窗口
     */
    private initWindow()
    {
        let shoppingItemInfo:ShoppingItemInfo=ShopManager.instance().shoppingItemInfo;
        switch(shoppingItemInfo.type)
        {
            case ShoppingType.emojiSuccess:
               this.lab_content.text=shoppingItemInfo.name+" emoji was purchased successfully!"
               this.lab_content.textAlign=egret.HorizontalAlign.CENTER;
               this.lab_content.lineSpacing = 15;
               this.img_title.source="Common_json.font_succ";
               this.im_image.source="";
                break;
            case ShoppingType.emojiFailed:
               this.lab_content.text="Your balance is not enough, please recharge and purchase!"
               this.lab_content.textAlign=egret.HorizontalAlign.CENTER;
               this.lab_content.lineSpacing = 15;
               this.img_title.source="Common_json.font_fail";
               this.im_image.source="";
                break;
            case ShoppingType.goldSuccess:
               this.lab_content.text="Successful purchase "+shoppingItemInfo.price+"apples"
               this.lab_content.textAlign=egret.HorizontalAlign.CENTER;
               this.lab_content.lineSpacing = 15;
               this.img_title.source="Common_json.font_succ";
               this.im_image.source="";
                break;
            case ShoppingType.goldFailed:
               this.lab_content.text="Your payment was unsuccessful, please try it later!"
               this.lab_content.textAlign=egret.HorizontalAlign.CENTER;
               this.lab_content.lineSpacing = 15;
               this.img_title.source="Common_json.font_fail";
               this.im_image.source="";
                break;
        }
        shoppingItemInfo.type=ShoppingType.NONE;
    }

    /**
     * 关闭窗口
     */
    private closeWindow()
    {
        UIManager.instance().closeWindow("ShoppinInfoWidget");
    }
}