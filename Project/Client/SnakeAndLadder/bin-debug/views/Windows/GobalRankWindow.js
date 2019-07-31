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
var GobalRankWindow = (function (_super) {
    __extends(GobalRankWindow, _super);
    function GobalRankWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GobalRankWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/RankingSkin.exml";
    };
    GobalRankWindow.prototype.initRank = function () {
        // var listData:Array<Object>=[]
        // //TODO传入排行榜名称
        // platform.getRankData("",true).then(
        //     (rankData)=>{
        //         rankData.forEach(element => {
        //             let data={rank:element.rank, icon: element.icon, name: element.name, won: element.score}
        //             listData.push(data)
        //         });
        //     }
        // )  
        var listData = [
            { bg: "Common_json.frame_09", rank: "1", icon: "Common_json.icon_apple", name: "nick", won: "10", rankImg: "Common_json.halo_01" },
            { rank: "2", icon: "Common_json.icon_apple", name: "nick", won: "10", bg: "Common_json.frame_11", rankImg: "Common_json.halo_02" },
            { rank: "3", icon: "Common_json.icon_apple", name: "nick", won: "10", bg: "Common_json.frame_09", rankImg: "Common_json.halo_02" },
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
    GobalRankWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initRank();
    };
    GobalRankWindow.prototype.closeMainUI = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return GobalRankWindow;
}(UIWindow));
__reflect(GobalRankWindow.prototype, "GobalRankWindow");
//# sourceMappingURL=GobalRankWindow.js.map