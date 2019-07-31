/**
 * 商店物品列表金币类
 */
class ShopItemGold extends eui.ItemRenderer {
    //金币数量
    private goldCount:eui.Label;
    //物品图标
    private itemIco:eui.Image;
    //购买金币所需金钱
    private money:eui.Label;
    //物品id
    private buy_btn:MyButton;
    private gro_buy:eui.Group;

    public constructor()
    {
        super()
        this.skinName = "resource/eui_skins/widgetSkins/ShopItemGoldWidget.exml"
    }

    public createChildren(): void {
        super.createChildren()
        this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ShopingGoods,this)
        this.buy_btn.setImgScore('Common_json.button_blue_l')
        this.gro_buy.touchChildren = true;       //禁用可触摸子类属性
        this.gro_buy.touchThrough=true;
        //this.gro_buy.touchEnabled = false;
        this.gro_buy.getChildAt(1).touchEnabled=false;
        this.gro_buy.getChildAt(2).touchEnabled=false;
        this.buy_btn.touchEnabled=true;
    }

    protected dataChanged(): void
    {
        //获取物品图片
        let data=ShopManager.instance().getShopItemData(this.buy_btn.label)
        if(data)
        {
            this.itemIco.source=data.sourceName;
        }else{
            console.log("ShopItemGold获取商品图片失败！")
        }   
    } 

        /**
     * 购买物品
     */
    private ShopingGoods()
    {
        //点击后跳转支付页面；
        console.log("跳转到支付页面购买物品!");
    }   
}