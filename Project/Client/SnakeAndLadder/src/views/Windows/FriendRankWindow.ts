class FriendRankWindow extends UIWindow {
    private srcItemList: eui.Scroller
    private itemList: eui.List

    protected onInit() {
        super.onInit()
        this.skinName = "resource/eui_skins/windowSkins/RankingSkin.exml"

    }

    public createChildren(): void {
        super.createChildren()
        this.initRank()

    }

    private initRank() {
        var listData: Array<Object> = []
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
        var listData: Array<Object> = [
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
        ]
        this.itemList.dataProvider = new eui.ArrayCollection(listData)
        this.itemList.itemRenderer = ItemListIRSkin 
    }

    public closeMainUI(): void {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }
}

class ItemListIRSkin extends eui.ItemRenderer {
    public rank:eui.Label
    public constructor() {
        super()
        this.skinName = "RankItem"    
    }
    protected createChildren(): void {
        super.createChildren();        
    }
}
