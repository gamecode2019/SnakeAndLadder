/**
 * 商店物品列表类
 */
class ShopItemList extends eui.ItemRenderer {
    //商店物品显示图片
    private shopItemIcoList:eui.List;
    //商店背包的引用
    private shopManager:ShopManager=ShopManager.instance();
    //购买物品btn
    private buy_btn:MyButton;
    //购买商品名字
    private itemName:eui.Label;
    //购买物品所需金币或金钱
    private buy_goldcount:eui.Label;

    private gro_buy:eui.Group;

    public constructor()
    {
        super()
        this.skinName = "resource/eui_skins/widgetSkins/ShopItemWidget.exml"      
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

    /**
     * 显示表情图片
     */
    private showShopItemIcon(iconArr:Array<any>)
    {
        let idStr1= this.itemName.text;

        var collection=new eui.ArrayCollection();
        let length=iconArr.length;
        for(let i=0;i<length;i++)
        {
            let source=iconArr[i].itemIco;
            let type=iconArr[i].type;
            let id=iconArr[i].icoId;
            collection.addItem({itemIcoType:type,itemIcoId:id,source:source});        
        }
        //this.shopItemIcoList.dataProvider=new eui.ArrayCollection(iconArr);
        this.shopItemIcoList.dataProvider=collection;
        this.shopItemIcoList.itemRenderer=ShopItemIcos;
    }

    /**
     * 购买物品
     */
    private ShopingGoods()
    {
        console.log("购买物品"+this.itemName.text+"_金币:"+this.buy_goldcount.text+"ico:"+this.buy_btn.label)
        //保存当前购买的物品id,所需金币数量、物品名字
        this.shopManager.shoppingItemInfo.id=parseInt(this.buy_btn.label);
        this.shopManager.shoppingItemInfo.name=this.itemName.text;
        this.shopManager.shoppingItemInfo.price=parseInt(this.buy_goldcount.text);
        let itemInfo:ShoppingItemInfo=this.shopManager.getShopItemData(this.shopManager.shoppingItemInfo.id.toString());

        //判断玩家金币数量是否可以购买，弹出提示信息框
        //获取玩家有金币的数量
        let playerInfo=UserManager.instance().getPlayerInfo();
        
        if(playerInfo.gold>=parseInt(this.buy_goldcount.text))
        {
            if(this.shopManager.shoppingItemInfo.type==ShoppingType.NONE)
            {
                //发送购买物品更新玩家物品请求
                let reqUpdaePlayerItem=new CS_UpdatePlayerItem();
                reqUpdaePlayerItem.gold=playerInfo.gold;
                reqUpdaePlayerItem.myScans=playerInfo.myScans;
                reqUpdaePlayerItem.myEmoticons=playerInfo.myEmoticons;
                reqUpdaePlayerItem.itemId=itemInfo.id;
                reqUpdaePlayerItem.price-itemInfo.price;

                GameNetwork.Instance.reqUpdatePlayerItem(reqUpdaePlayerItem);
            }else{
                console.log("正在支付中，请等待。。。")
            }

            // playerInfo.gold-=this.shopManager.shoppingItemInfo.price;
            
            // //更新UI金币显示
            // EventManager.instance().dispatchEvent(GameEvents.PlayerGoldUIUpdate,playerInfo.gold.toString())
            // //添加购买表情到人物表情包
            // switch(itemInfo.itemType)
            // {
            //     case ShopBagType.emojis:
            //         playerInfo.myEmoticons.push(this.shopManager.shoppingItemInfo.id);
            //         break;
            //     case ShopBagType.piece:
            //         playerInfo.myScans.push(this.shopManager.shoppingItemInfo.id);
            //         break;
            //     default:break;
            // }

            // //发送消息给服务器，同步玩家金币数量、拥有的表情包
            // GameNetwork.Instance.requestUpdatePlayerData();
            // // let item=ShopManager.instance().getEmojisBag().getValue(0);
            // // console.log(item)
            // //提示成功购买
            // this.shopManager.shoppingItemInfo.type=ShoppingType.emojiSuccess;
            // UIManager.instance().openWindow("ShoppinInfoWidget");
        }
        else
        {
            //提示购买失败，余额不足
            this.shopManager.shoppingItemInfo.type=ShoppingType.emojiFailed;
            UIManager.instance().openWindow("ShoppinInfoWidget");
            console.log("提示购买失败，余额不足！");
        }                     
    }

    protected dataChanged(): void
    {
        let data=this.shopManager.getShopItemData(this.buy_btn.label)
        if(data)
        {
            this.showShopItemIcon(data.shopdataArr);
        }
        else{
            console.log("ShopItemList获取商品图片失败！")
        } 
    } 
}

/**
 * 商店物品显示图
 */
class ShopItemIcos extends eui.ItemRenderer 
{
    private img_itemIco:eui.Image;//物品图片
    //商店物品显示图片
    private shopItemIcoList:eui.List;
    private itemIcoType=null;           //图片类型，网络图片或本地加载的图片
    private itemIcoId:number;
    private source:string;

    public constructor()
    {
        super()
        this.skinName = "resource/eui_skins/widgetSkins/ShopItemEmojis.exml"     
    }

    public createChildren(): void {
        super.createChildren()
    }

    /**
     * 用户图像数据更新时调用
     */
    protected dataChanged(): void {
        super.dataChanged();
        if(this.data.itemIcoType)//网络加载物品图
        {
            this.itemIcoType=this.data.itemIcoType;
            if(this.itemIcoType=="local"){
                this.img_itemIco.source=this.data.source;
            }else{
                this.loadHttpIcon(this.data.source)
            }
        }
    }

    //加载网络物品图片
    private loadHttpIcon(obj){
        let that = this;
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";// 跨域请求
        imgLoader.load(obj);    
        imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
            if (evt.currentTarget.data) {
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                
                that.img_itemIco.texture = texture;
                //obj.success();
                }
            }, this);
    }
}