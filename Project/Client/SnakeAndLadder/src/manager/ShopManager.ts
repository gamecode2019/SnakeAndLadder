/**
 * 商店背包类型
 */
enum ShopBagType{
    emojis=0,//表情
    piece=1, //棋子
    gold=2   //金币
}
/**
 * 购买物品提示信息类型
 */
enum ShoppingType{
    NONE,
    emojiSuccess,
    emojiFailed,
    goldSuccess,
    goldFailed
}

/**
 * 商店管理
 */
class ShopManager{
    //表情和棋子造型背包
    private emojisBag:HashMap=null;
    //金币包
    private goldBag:HashMap=null;
    //商店当前显示背包类型
    public curShopBagType:ShopBagType=null;
    //当前购买物品数据信息
    public shoppingItemInfo:ShoppingItemInfo=new ShoppingItemInfo();

    public isFirstLoad:boolean=false;
    /**
     * 商店所有数据
     */
    public shopHasMap:HashMap=new HashMap();//{id:ShoppingItemInfo}
    //单列
    private static _instance=null;
    /**
     * 获取单列
     */
    public static instance():ShopManager{
        if(!ShopManager._instance)
        {
            ShopManager._instance=new ShopManager();
        }
        return ShopManager._instance;
    }

    /**
     * 获取表情包数据
     */
    public getEmojisBag()
    {
        return this.emojisBag;
    }
    /**
     * 获取金币包数据
     */
    public getGoldBag()
    {
        return this.goldBag;
    }
    
    /**
     * 初始化所有背包
     */
    private initAllBag()
    {
        if(this.emojisBag===null)
        {
            this.emojisBag=new HashMap();
            this.goldBag=new HashMap();
        }
    }

    /**
     * 清空所有背包数据
     */
    private clearAllBag()
    {
        if(this.emojisBag!=null)
        {
            this.emojisBag.clear();
            this.goldBag.clear();
        }
    }

    /**
     * 根据物品类型获取背包
     */
    public getShopBagByType(type:ShopBagType)
    {
        switch(type)
        {
            case ShopBagType.emojis:
            case ShopBagType.piece:
                return this.emojisBag;
            case ShopBagType.gold:
                return  this.goldBag;
            default:return this.emojisBag;
        }
    }

    /**
     * 获取背包数据
     */
    public getPackList(data:any):void
    {
        this.initAllBag();
        this.clearAllBag();
        //初始化各背包数据
        data.map((value,key)=>
        {
            //let type=Math.floor(value.type/100);
            let type=value.type;
            switch(type)
            {
                case ShopBagType.emojis:
                case ShopBagType.piece:
                    this.emojisBag.put(key,value);
                    break;
                case ShopBagType.gold:
                    this.goldBag.put(key,value);
                    break;                
            }
        })
        let emojisbag=this.emojisBag;
        let goldbag=this.goldBag;
    }
    /**
     * 从本地Json加载的商店物品数据
     */
    private getShopItemDataFromJson()
    {
        let shopData=RES.getRes("ShopConfig_json")
        let emojsData=shopData.emojis;
        let pieceData=shopData.piece;
        let goldData=shopData.gold;        
        let itemData=[];
        itemData=itemData.concat(emojsData,pieceData,goldData);

        return itemData;
    }

    /**
     * 加载所有商品数据
     */
    private initAllShopItemData(itemData:any)
    {
        //商品信息数据
        let shopInfo:ShoppingItemInfo=null;

        for(let i=0;i<itemData.length;i++)
        {
            if(this.shopHasMap.getValue(itemData[i].id)==null)
            {
                shopInfo=new ShoppingItemInfo();
                shopInfo.shopdataArr=[];
                this.shopHasMap.put(this.shopHasMap.size(),shopInfo);
            }
            shopInfo.id=itemData[i].id;         //商品id
            shopInfo.itemType=itemData[i].type; //商品类型
            shopInfo.name=itemData[i].itemName; //商品名字
            shopInfo.sourceName=itemData[i].gropname+"_json."+itemData[i].name;//商品图片名字
            shopInfo.price=itemData[i].price;                   //价格
            shopInfo.shopdataArr.push({icoId:itemData[i].id,itemIco:shopInfo.sourceName,type:"local"});//每组表情包数据
            //itemIcos.push({icoId:i,itemIco:name,type:"local"})
            let shopHashMap=this.shopHasMap;
        }
    }

    /**
     * 获取list呈示器数据
     */
    private getShopItemRendererData()
    {
        let datas:Array<any>=[];
        let size=this.shopHasMap.size();
        //遍历所有商品
        for(let i=0;i<size;i++)
        {
            let shopDataInfo:ShoppingItemInfo=this.shopHasMap.getValue(i); 
            switch(shopDataInfo.itemType)
            {
                case ShopBagType.emojis:
                case ShopBagType.piece:
                    datas.push(
                    {
                        type:shopDataInfo.itemType,
                        id:shopDataInfo.id,
                        itemName:shopDataInfo.name,
                        itemArr:shopDataInfo.shopdataArr,
                        gold:shopDataInfo.price                  
                    })
                    break;
                case ShopBagType.gold:
                    datas.push({
                        type:ShopBagType.gold,
                        id:shopDataInfo.id,
                        goldCount:shopDataInfo.name,
                        itemIco:shopDataInfo.sourceName,
                        money:shopDataInfo.price  
                    })
                    break;
                default:break;
            }      
        }
        return datas;
    }

    /**
     * 初始化商店数据
     */
    private loadShopData():void
    {   
        //从本地Json加载的商店物品数据
        let itemData=this.getShopItemDataFromJson();
        //加载所有商品数据
        this.initAllShopItemData(itemData);

        let datas=this.getShopItemRendererData();

        //获取背包数据
        this.getPackList(datas);
    }

    /**
     * 接受服务器数据设置商店
     */
    public setShopData(data?:SC_InitShop)
    {
        if(data)//接受服务器数据json配置--例：ShopConfig
        {
            //从本地Json加载的商店物品数据
            let itemData=this.getShopItemDataFromJson();
            
            console.log("接受服务器数据json配置--例：ShopConfig")
        }else{//商店本地文件放在本地配置
            this.loadShopData();
        }
    }

    /**
     * 根据商品类型返回一类商品id
     */
    public getItemID(type:ShopBagType):number[]
    {
        let datas:number[]=[];
        for(let i=0;i<this.shopHasMap.size();i++)
        {   
            let itemInfo=this.shopHasMap.getValue(i);
            if(type==itemInfo.itemType)
            {
                datas.push(itemInfo.id);
            }
        }
        return datas;
    }

    /**
     * 根据商品类型返回该类型全部物品数据
     */

    public getAllItmeData(type:ShopBagType):ShoppingItemInfo[]
    {
        let datas:ShoppingItemInfo[]=[];
        for(let i=0;i<this.shopHasMap.size();i++)
        {
            let itemInfo:ShoppingItemInfo=this.shopHasMap.getValue(i);
            if(type==itemInfo.itemType)
            {
                datas.push(itemInfo);
            }
        }
        return datas;
    }
    /**
     * 根据物品id获取物品数据--id从PlayerInfo中取
     */
    public getShopItemData(_id:string):any
    {
        for(let i=0;i<this.shopHasMap.size();i++)
        {
            if(parseInt(_id)==this.shopHasMap.getValue(i).id)
            {
                return this.shopHasMap.getValue(i);
            }
        }
        return null;
    }

    /**
     * 返回商品购买结果
     */
    public updatePlayerItem(datas:SC_UpdatePlayerItem)
    {
        if(datas.ret==1)//购买成功
        {
            let playerInfo=UserManager.instance().getPlayerInfo();
            playerInfo.gold=datas.gold;
            playerInfo.myEmoticons=[...datas.myEmoticons];
            playerInfo.myScans=[...datas.myScans];

            this.shoppinUpdateUI();
            return true;
        }

        //提示购买失败，余额不足
        this.shoppingItemInfo.type=ShoppingType.NONE;
        console.log("ShopManager:服务器返回购买失败！")
        return false;
    }

    /**
     * 处理商品购买
     */
    private shoppinUpdateUI()
    {
        let itemInfo:ShoppingItemInfo=this.getShopItemData(this.shoppingItemInfo.id.toString());
        let playerInfo=UserManager.instance().getPlayerInfo();
        //更新UI金币显示
        EventManager.instance().dispatchEvent(GameEvents.PlayerGoldUIUpdate,playerInfo.gold.toString())
        //添加购买表情到人物表情包
        switch(itemInfo.itemType)
        {
            case ShopBagType.emojis:
                playerInfo.myEmoticons.push(this.shoppingItemInfo.id);
                break;
            case ShopBagType.piece:
                playerInfo.myScans.push(this.shoppingItemInfo.id);
                break;
            default:break;
        }
        //提示成功购买
        this.shoppingItemInfo.type=ShoppingType.emojiSuccess;
        UIManager.instance().openWindow("ShoppinInfoWidget");
    }
}
