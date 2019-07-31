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
 * 界面头部玩家信息
 */
var RoleTopInfoWidget = (function (_super) {
    __extends(RoleTopInfoWidget, _super);
    function RoleTopInfoWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 界面初始化
     */
    RoleTopInfoWidget.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/widgetSkins/RoleTopInfo.exml";
        this.playerInfo = UserManager.instance().getPlayerInfo(); //玩家信息
        this.registerBtnEvent();
        //初始化个人信息界面
        this.initWindow();
    };
    /**
     * 初始化个人信息界面
     */
    RoleTopInfoWidget.prototype.initWindow = function () {
        //let datas=ShopManager.instance().getAllItmeData(ShopBagType.piece);//测试用
        /**
         * 玩家个人形象初始化--测试
         */
        if (ShopManager.instance().isFirstLoad == false) {
            ShopManager.instance().isFirstLoad = true;
            //加载物品数据
            ShopManager.instance().setShopData();
            // this.playerInfo.myEmoticons=[];
            // this.playerInfo.myScans=[];
            // GameNetwork.Instance.requestUpdatePlayerData();//更新到服务器
            //测试商店数据
            this.testData(ShopBagType.emojis, this.playerInfo.myEmoticons);
            this.testData(ShopBagType.piece, this.playerInfo.myScans);
            //设置当前选择皮肤,不是正确的皮肤id就设置默认第1个形象--默认100
            var myscanArr = ShopManager.instance().getItemID(ShopBagType.piece);
            if (myscanArr.length > 0 && (this.playerInfo.selectScan < 100 || this.playerInfo.selectScan >= 200)) {
                this.playerInfo.selectScan = myscanArr[0];
            }
            GameNetwork.Instance.requestUpdatePlayerData(); //更新到服务器     
        }
        //设置游戏顶部人物UI信息
        this.lab_nickName.text = this.playerInfo.nickName;
        this.lab_gold.text = this.playerInfo.gold.toString();
        console.log("设置游戏顶部人物UI信息RoleTopInfo:" + this.playerInfo.nickName);
        //初始化打开商店和设置button
        this.btn_setting.setImgScore('Common_json.icon_SET');
        this.btn_shop.setImgScore('Common_json.icon_+');
        /**
         * 图像使用范例
         */
        var that = this;
        this.head_icon.setNameVisiable(false);
        this.head_icon.data = { playerInfo: this.playerInfo, event: function (data) {
                //
                that.OnClickToRoleInfo(data.playerInfo);
            } };
    };
    /**
     * 注册事件
     */
    RoleTopInfoWidget.prototype.registerBtnEvent = function () {
        var _this = this;
        this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickEnterShop, this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSetting, this);
        EventManager.instance().addEventListener(GameEvents.PlayerGoldUIUpdate, function (data) {
            _this.lab_gold.text = data; //购买表情包金币UI更新
        }, this);
    };
    /**
     * 打开个人信息界面
     */
    RoleTopInfoWidget.prototype.OnClickToRoleInfo = function (playerinfo) {
        console.log("打开个人信息！");
        UserManager.instance().setCurPlayerInfo(this.playerInfo);
        UIManager.instance().openWindow("RoleHeadInfoWindow");
    };
    /**
     * 打开商店
     */
    RoleTopInfoWidget.prototype.clickEnterShop = function (event) {
        if (!UIManager.instance().findWindow("ShopWindow")) {
            console.log("打开商店");
            //UIManager.instance().closeWindow("MainWindow");
            // UIManager.instance().closeWindow("RankWindow")
            // UIManager.instance().closeWindow("FriendRankWindow")
            // UIManager.instance().closeWindow("GobalRankWindow")
            //UIManager.instance().closeWindow("RoleTopInfoWidget")
            UIManager.instance().openWindow("ShopWindow");
        }
    };
    /**
     * 打开设置界面
     */
    RoleTopInfoWidget.prototype.onClickSetting = function () {
        console.log("打开游戏设置界面");
        UIManager.instance().openWindow("SettingWindow");
    };
    /**
     * 关闭界面
     */
    RoleTopInfoWidget.prototype.closeRoleHeadInfo = function () {
        console.log("关闭界面");
        UIManager.instance().closeWindow("RoleHeadInfoWindow");
    };
    /**
     * 测试商店数据
     */
    RoleTopInfoWidget.prototype.testData = function (type, dataArr) {
        var pieceArr = ShopManager.instance().getItemID(type);
        if (typeof dataArr === "string") {
            //数组化
            var str = dataArr;
            var strArr = str.split(',');
            var myScans = [];
            for (var i = 0; i < strArr.length; i++) {
                if (strArr[i]) {
                    myScans.push(parseInt(strArr[i]));
                }
            }
            dataArr = myScans.slice();
            //如果没有数据，就初始化一组测试数据
            if (str.length <= 0 && pieceArr.length >= 4) {
                dataArr = [];
                //设置初始化我拥有的皮肤-个人形象(默认4个形象)
                for (var i = 0; i < 4; i++) {
                    dataArr.push(pieceArr[i]);
                }
            }
            else {
                console.log("RoleTopInfoWidget添加服务器数据成功!");
            }
        }
        else if (dataArr.length == 0) {
            if (pieceArr.length >= 4) {
                //设置初始化我拥有的皮肤-个人形象(默认4个形象)
                for (var i = 0; i < 4; i++) {
                    dataArr.push(pieceArr[i]);
                }
            }
            else {
                console.log("RoleTopInfoWidget添加测试数据失败--length小于4!");
            }
        }
        switch (type) {
            case ShopBagType.emojis:
                this.playerInfo.myEmoticons = dataArr.slice();
                break;
            case ShopBagType.piece:
                this.playerInfo.myScans = dataArr.slice();
                break;
            default: break;
        }
    };
    return RoleTopInfoWidget;
}(UIWindow));
__reflect(RoleTopInfoWidget.prototype, "RoleTopInfoWidget");
//# sourceMappingURL=RoleTopInfoWidget.js.map