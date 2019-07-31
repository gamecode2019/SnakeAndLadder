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
var FriendRankWindow = (function (_super) {
    __extends(FriendRankWindow, _super);
    function FriendRankWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendRankWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/RankingSkin.exml";
    };
    FriendRankWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initRank();
    };
    FriendRankWindow.prototype.initRank = function () {
        var listData = [];
        //TODO传入排行榜名称
        // platform.getRankData("", false).then(
        //     (rankData) => {            
        //         for (let i = 0; i < rankData.length; i++) {
        //             if (i == 0) {
        //                 let data = { rank: rankData[0].rank, icon: rankData[0].icon, name: rankData[0].name, won: rankData[0].score, bg: "Common_json.frame_09", rankImg: "Common_json.halo_01" }
        //                 listData.push(data)
        //             } else if (i == 1) {
        //                 let data = { rank: rankData[1].rank, icon: rankData[1].icon, name: rankData[1].name, won: rankData[1].score, bg: "Common_json.frame_11", rankImg: "Common_json.halo_02" }
        //                 listData.push(data)
        //             } else if (i == 2) {
        //                 let data = { rank: rankData[2].rank, icon: rankData[2].icon, name: rankData[2].name, won: rankData[2].score, bg: "Common_json.frame_09", rankImg: "Common_json.halo_02" }
        //                 listData.push(data)
        //             } else {
        //                 if (i % 2 == 0) {
        //                     let data = { rank: rankData[i].rank, icon: rankData[i].icon, name: rankData[i].name, won: rankData[i].score, bg: "Common_json.frame_09"}
        //                     listData.push(data)
        //                 }else{
        //                     let data = { rank: rankData[i].rank, icon: rankData[i].icon, name: rankData[i].name, won: rankData[i].score, bg: "Common_json.frame_11"}
        //                     listData.push(data)
        //                 }
        //             }
        //         }
        //     }
        // )
        var listData = [
            { bg: "Common_json.frame_09", rank: "1", icon: "Common_json.icon_apple", name: "nick1", won: "10", rankImg: "Common_json.halo_01" },
            { rank: "2", icon: "Common_json.icon_apple", name: "nick1", won: "10", bg: "Common_json.frame_11", rankImg: "Common_json.halo_02" },
            { rank: "3", icon: "Common_json.icon_apple", name: "nick1", won: "10", bg: "Common_json.frame_09", rankImg: "Common_json.halo_02" },
            { rank: "4", icon: "Common_json.icon_apple", name: "nick", won: "10", bg: "Common_json.frame_11" },
            { rank: "5", icon: "Common_json.icon_apple", name: "nick", won: "10" },
            { rank: "6", icon: "Common_json.icon_apple", name: "nick", won: "10" },
            { rank: "7", icon: "Common_json.icon_apple", name: "nick", won: "10" },
            { rank: "8", icon: "Common_json.icon_apple", name: "nick", won: "10" },
            { rank: "9", icon: "Common_json.icon_apple", name: "nick", won: "10" },
            { rank: "10", icon: "Common_json.icon_apple", name: "nick", won: "10" },
            { rank: "11", icon: "Common_json.icon_apple", name: "nick", won: "10" },
            { rank: "12", icon: "Common_json.icon_apple", name: "nick", won: "10" }
        ];
        this.itemList.dataProvider = new eui.ArrayCollection(listData);
        this.itemList.itemRenderer = ItemListIRSkin;
    };
    FriendRankWindow.prototype.closeMainUI = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return FriendRankWindow;
}(UIWindow));
__reflect(FriendRankWindow.prototype, "FriendRankWindow");
var ItemListIRSkin = (function (_super) {
    __extends(ItemListIRSkin, _super);
    function ItemListIRSkin() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankItem";
        return _this;
    }
    ItemListIRSkin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return ItemListIRSkin;
}(eui.ItemRenderer));
__reflect(ItemListIRSkin.prototype, "ItemListIRSkin");
//# sourceMappingURL=FriendRankWindow.js.map