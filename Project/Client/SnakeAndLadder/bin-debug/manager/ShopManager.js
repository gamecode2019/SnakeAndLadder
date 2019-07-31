var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 商店背包类型
 */
var ShopBagType;
(function (ShopBagType) {
    ShopBagType[ShopBagType["emojis"] = 0] = "emojis";
    ShopBagType[ShopBagType["piece"] = 1] = "piece";
    ShopBagType[ShopBagType["gold"] = 2] = "gold"; //金币
})(ShopBagType || (ShopBagType = {}));
/**
 * 购买物品提示信息类型
 */
var ShoppingType;
(function (ShoppingType) {
    ShoppingType[ShoppingType["NONE"] = 0] = "NONE";
    ShoppingType[ShoppingType["emojiSuccess"] = 1] = "emojiSuccess";
    ShoppingType[ShoppingType["emojiFailed"] = 2] = "emojiFailed";
    ShoppingType[ShoppingType["goldSuccess"] = 3] = "goldSuccess";
    ShoppingType[ShoppingType["goldFailed"] = 4] = "goldFailed";
})(ShoppingType || (ShoppingType = {}));
/**
 * 商店管理
 */
var ShopManager = (function () {
    function ShopManager() {
        //表情和棋子造型背包
        this.emojisBag = null;
        //金币包
        this.goldBag = null;
        //商店当前显示背包类型
        this.curShopBagType = null;
        //当前购买物品数据信息
        this.shoppingItemInfo = new ShoppingItemInfo();
        this.isFirstLoad = false;
        /**
         * 商店所有数据
         */
        this.shopHasMap = new HashMap(); //{id:ShoppingItemInfo}
    }
    /**
     * 获取单列
     */
    ShopManager.instance = function () {
        if (!ShopManager._instance) {
            ShopManager._instance = new ShopManager();
        }
        return ShopManager._instance;
    };
    /**
     * 获取表情包数据
     */
    ShopManager.prototype.getEmojisBag = function () {
        return this.emojisBag;
    };
    /**
     * 获取金币包数据
     */
    ShopManager.prototype.getGoldBag = function () {
        return this.goldBag;
    };
    /**
     * 初始化所有背包
     */
    ShopManager.prototype.initAllBag = function () {
        if (this.emojisBag === null) {
            this.emojisBag = new HashMap();
            this.goldBag = new HashMap();
        }
    };
    /**
     * 清空所有背包数据
     */
    ShopManager.prototype.clearAllBag = function () {
        if (this.emojisBag != null) {
            this.emojisBag.clear();
            this.goldBag.clear();
        }
    };
    /**
     * 根据物品类型获取背包
     */
    ShopManager.prototype.getShopBagByType = function (type) {
        switch (type) {
            case ShopBagType.emojis:
            case ShopBagType.piece:
                return this.emojisBag;
            case ShopBagType.gold:
                return this.goldBag;
            default: return this.emojisBag;
        }
    };
    /**
     * 获取背包数据
     */
    ShopManager.prototype.getPackList = function (data) {
        var _this = this;
        this.initAllBag();
        this.clearAllBag();
        //初始化各背包数据
        data.map(function (value, key) {
            //let type=Math.floor(value.type/100);
            var type = value.type;
            switch (type) {
                case ShopBagType.emojis:
                case ShopBagType.piece:
                    _this.emojisBag.put(key, value);
                    break;
                case ShopBagType.gold:
                    _this.goldBag.put(key, value);
                    break;
            }
        });
        var emojisbag = this.emojisBag;
        var goldbag = this.goldBag;
    };
    /**
     * 从本地Json加载的商店物品数据
     */
    ShopManager.prototype.getShopItemDataFromJson = function () {
        var shopData = RES.getRes("ShopConfig_json");
        var emojsData = shopData.emojis;
        var pieceData = shopData.piece;
        var goldData = shopData.gold;
        var itemData = [];
        itemData = itemData.concat(emojsData, pieceData, goldData);
        return itemData;
    };
    /**
     * 加载所有商品数据
     */
    ShopManager.prototype.initAllShopItemData = function (itemData) {
        //商品信息数据
        var shopInfo = null;
        for (var i = 0; i < itemData.length; i++) {
            if (this.shopHasMap.getValue(itemData[i].id) == null) {
                shopInfo = new ShoppingItemInfo();
                shopInfo.shopdataArr = [];
                this.shopHasMap.put(this.shopHasMap.size(), shopInfo);
            }
            shopInfo.id = itemData[i].id; //商品id
            shopInfo.itemType = itemData[i].type; //商品类型
            shopInfo.name = itemData[i].itemName; //商品名字
            shopInfo.sourceName = itemData[i].gropname + "_json." + itemData[i].name; //商品图片名字
            shopInfo.price = itemData[i].price; //价格
            shopInfo.shopdataArr.push({ icoId: itemData[i].id, itemIco: shopInfo.sourceName, type: "local" }); //每组表情包数据
            //itemIcos.push({icoId:i,itemIco:name,type:"local"})
            var shopHashMap = this.shopHasMap;
        }
    };
    /**
     * 获取list呈示器数据
     */
    ShopManager.prototype.getShopItemRendererData = function () {
        var datas = [];
        var size = this.shopHasMap.size();
        //遍历所有商品
        for (var i = 0; i < size; i++) {
            var shopDataInfo = this.shopHasMap.getValue(i);
            switch (shopDataInfo.itemType) {
                case ShopBagType.emojis:
                case ShopBagType.piece:
                    datas.push({
                        type: shopDataInfo.itemType,
                        id: shopDataInfo.id,
                        itemName: shopDataInfo.name,
                        itemArr: shopDataInfo.shopdataArr,
                        gold: shopDataInfo.price
                    });
                    break;
                case ShopBagType.gold:
                    datas.push({
                        type: ShopBagType.gold,
                        id: shopDataInfo.id,
                        goldCount: shopDataInfo.name,
                        itemIco: shopDataInfo.sourceName,
                        money: shopDataInfo.price
                    });
                    break;
                default: break;
            }
        }
        return datas;
    };
    /**
     * 初始化商店数据
     */
    ShopManager.prototype.loadShopData = function () {
        //从本地Json加载的商店物品数据
        var itemData = this.getShopItemDataFromJson();
        //加载所有商品数据
        this.initAllShopItemData(itemData);
        var datas = this.getShopItemRendererData();
        //获取背包数据
        this.getPackList(datas);
    };
    /**
     * 接受服务器数据设置商店
     */
    ShopManager.prototype.setShopData = function (data) {
        if (data) {
            //从本地Json加载的商店物品数据
            var itemData = this.getShopItemDataFromJson();
            console.log("接受服务器数据json配置--例：ShopConfig");
        }
        else {
            this.loadShopData();
        }
    };
    /**
     * 根据商品类型返回一类商品id
     */
    ShopManager.prototype.getItemID = function (type) {
        var datas = [];
        for (var i = 0; i < this.shopHasMap.size(); i++) {
            var itemInfo = this.shopHasMap.getValue(i);
            if (type == itemInfo.itemType) {
                datas.push(itemInfo.id);
            }
        }
        return datas;
    };
    /**
     * 根据商品类型返回该类型全部物品数据
     */
    ShopManager.prototype.getAllItmeData = function (type) {
        var datas = [];
        for (var i = 0; i < this.shopHasMap.size(); i++) {
            var itemInfo = this.shopHasMap.getValue(i);
            if (type == itemInfo.itemType) {
                datas.push(itemInfo);
            }
        }
        return datas;
    };
    /**
     * 根据物品id获取物品数据--id从PlayerInfo中取
     */
    ShopManager.prototype.getShopItemData = function (_id) {
        for (var i = 0; i < this.shopHasMap.size(); i++) {
            if (parseInt(_id) == this.shopHasMap.getValue(i).id) {
                return this.shopHasMap.getValue(i);
            }
        }
        return null;
    };
    /**
     * 返回商品购买结果
     */
    ShopManager.prototype.updatePlayerItem = function (datas) {
        if (datas.ret == 1) {
            var playerInfo = UserManager.instance().getPlayerInfo();
            playerInfo.gold = datas.gold;
            playerInfo.myEmoticons = datas.myEmoticons.slice();
            playerInfo.myScans = datas.myScans.slice();
            this.shoppinUpdateUI();
            return true;
        }
        //提示购买失败，余额不足
        this.shoppingItemInfo.type = ShoppingType.NONE;
        console.log("ShopManager:服务器返回购买失败！");
        return false;
    };
    /**
     * 处理商品购买
     */
    ShopManager.prototype.shoppinUpdateUI = function () {
        var itemInfo = this.getShopItemData(this.shoppingItemInfo.id.toString());
        var playerInfo = UserManager.instance().getPlayerInfo();
        //更新UI金币显示
        EventManager.instance().dispatchEvent(GameEvents.PlayerGoldUIUpdate, playerInfo.gold.toString());
        //添加购买表情到人物表情包
        switch (itemInfo.itemType) {
            case ShopBagType.emojis:
                playerInfo.myEmoticons.push(this.shoppingItemInfo.id);
                break;
            case ShopBagType.piece:
                playerInfo.myScans.push(this.shoppingItemInfo.id);
                break;
            default: break;
        }
        //提示成功购买
        this.shoppingItemInfo.type = ShoppingType.emojiSuccess;
        UIManager.instance().openWindow("ShoppinInfoWidget");
    };
    //单列
    ShopManager._instance = null;
    return ShopManager;
}());
__reflect(ShopManager.prototype, "ShopManager");
//# sourceMappingURL=ShopManager.js.map