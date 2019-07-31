var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 商店物品列表类
 */
var ShopItemList = (function (_super) {
    __extends(ShopItemList, _super);
    function ShopItemList() {
        var _this = _super.call(this) || this;
        //商店背包的引用
        _this.shopManager = ShopManager.instance();
        _this.skinName = "resource/eui_skins/widgetSkins/ShopItemWidget.exml";
        return _this;
    }
    ShopItemList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ShopingGoods, this);
        this.buy_btn.setImgScore('Common_json.button_blue_l');
        this.gro_buy.touchChildren = true; //禁用可触摸子类属性
        this.gro_buy.touchThrough = true;
        //this.gro_buy.touchEnabled = false;
        this.gro_buy.getChildAt(1).touchEnabled = false;
        this.gro_buy.getChildAt(2).touchEnabled = false;
        this.buy_btn.touchEnabled = true;
    };
    /**
     * 显示表情图片
     */
    ShopItemList.prototype.showShopItemIcon = function (iconArr) {
        var idStr1 = this.itemName.text;
        var collection = new eui.ArrayCollection();
        var length = iconArr.length;
        for (var i = 0; i < length; i++) {
            var source = iconArr[i].itemIco;
            var type = iconArr[i].type;
            var id = iconArr[i].icoId;
            collection.addItem({ itemIcoType: type, itemIcoId: id, source: source });
        }
        //this.shopItemIcoList.dataProvider=new eui.ArrayCollection(iconArr);
        this.shopItemIcoList.dataProvider = collection;
        this.shopItemIcoList.itemRenderer = ShopItemIcos;
    };
    /**
     * 购买物品
     */
    ShopItemList.prototype.ShopingGoods = function () {
        console.log("购买物品" + this.itemName.text + "_金币:" + this.buy_goldcount.text + "ico:" + this.buy_btn.label);
        //保存当前购买的物品id,所需金币数量、物品名字
        this.shopManager.shoppingItemInfo.id = parseInt(this.buy_btn.label);
        this.shopManager.shoppingItemInfo.name = this.itemName.text;
        this.shopManager.shoppingItemInfo.price = parseInt(this.buy_goldcount.text);
        var itemInfo = this.shopManager.getShopItemData(this.shopManager.shoppingItemInfo.id.toString());
        //判断玩家金币数量是否可以购买，弹出提示信息框
        //获取玩家有金币的数量
        var playerInfo = UserManager.instance().getPlayerInfo();
        if (playerInfo.gold >= parseInt(this.buy_goldcount.text)) {
            if (this.shopManager.shoppingItemInfo.type == ShoppingType.NONE) {
                //发送购买物品更新玩家物品请求
                var reqUpdaePlayerItem = new CS_UpdatePlayerItem();
                reqUpdaePlayerItem.gold = playerInfo.gold;
                reqUpdaePlayerItem.myScans = playerInfo.myScans;
                reqUpdaePlayerItem.myEmoticons = playerInfo.myEmoticons;
                reqUpdaePlayerItem.itemId = itemInfo.id;
                reqUpdaePlayerItem.price - itemInfo.price;
                GameNetwork.Instance.reqUpdatePlayerItem(reqUpdaePlayerItem);
            }
            else {
                console.log("正在支付中，请等待。。。");
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
        else {
            //提示购买失败，余额不足
            this.shopManager.shoppingItemInfo.type = ShoppingType.emojiFailed;
            UIManager.instance().openWindow("ShoppinInfoWidget");
            console.log("提示购买失败，余额不足！");
        }
    };
    ShopItemList.prototype.dataChanged = function () {
        var data = this.shopManager.getShopItemData(this.buy_btn.label);
        if (data) {
            this.showShopItemIcon(data.shopdataArr);
        }
        else {
            console.log("ShopItemList获取商品图片失败！");
        }
    };
    return ShopItemList;
}(eui.ItemRenderer));
__reflect(ShopItemList.prototype, "ShopItemList");
/**
 * 商店物品显示图
 */
var ShopItemIcos = (function (_super) {
    __extends(ShopItemIcos, _super);
    function ShopItemIcos() {
        var _this = _super.call(this) || this;
        _this.itemIcoType = null; //图片类型，网络图片或本地加载的图片
        _this.skinName = "resource/eui_skins/widgetSkins/ShopItemEmojis.exml";
        return _this;
    }
    ShopItemIcos.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 用户图像数据更新时调用
     */
    ShopItemIcos.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.itemIcoType) {
            this.itemIcoType = this.data.itemIcoType;
            if (this.itemIcoType == "local") {
                this.img_itemIco.source = this.data.source;
            }
            else {
                this.loadHttpIcon(this.data.source);
            }
        }
    };
    //加载网络物品图片
    ShopItemIcos.prototype.loadHttpIcon = function (obj) {
        var that = this;
        var imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous"; // 跨域请求
        imgLoader.load(obj);
        imgLoader.once(egret.Event.COMPLETE, function (evt) {
            if (evt.currentTarget.data) {
                var texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                that.img_itemIco.texture = texture;
                //obj.success();
            }
        }, this);
    };
    return ShopItemIcos;
}(eui.ItemRenderer));
__reflect(ShopItemIcos.prototype, "ShopItemIcos");
//# sourceMappingURL=ShopItemList.js.map