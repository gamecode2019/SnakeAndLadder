class GobalRankWindow extends UIWindow {
    private srcItemList: eui.Scroller
    private itemList: eui.List

    protected onInit() {
        super.onInit()
        this.skinName = "resource/eui_skins/windowSkins/RankingSkin.exml"

    }

    private initRank() {
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
       var listData: Array<Object> = [
            { bg:"Common_json.frame_09",rank: "1", icon: "Common_json.icon_apple", name: "nick", won: "10",rankImg:"Common_json.halo_01" },
            { rank: "2", icon: "Common_json.icon_apple", name: "nick", won: "10",bg:"Common_json.frame_11" ,rankImg:"Common_json.halo_02"  },
            { rank: "3", icon: "Common_json.icon_apple", name: "nick", won: "10" ,bg:"Common_json.frame_09",rankImg:"Common_json.halo_02"  },
            { rank: "4", icon: "Common_json.icon_apple", name: "nick", won: "10" ,bg:"Common_json.frame_11" },
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

    public createChildren(): void {
        super.createChildren()
        this.initRank()
    }

    public closeMainUI(): void {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }
}
