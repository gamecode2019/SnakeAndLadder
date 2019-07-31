class ShowChatWindow extends UIWindow {
    private emojis_group0: eui.Group
    private emojis0: eui.Image
    private emojis_group1: eui.Group
    private emojis1: eui.Image
    private emojis_group2: eui.Group
    private emojis2: eui.Image
    private emojis_group3: eui.Group
    private emojis3: eui.Image
    private emojis_group4: eui.Group
    private emojis_group5: eui.Group
    private emojis_group6: eui.Group
    private emojis_group7: eui.Group
    private chat0: eui.Label
    private chat1: eui.Label
    private chat2: eui.Label
    private chat3: eui.Label
    private current:eui.Group
    private arr: any
    private time: egret.Timer
    protected onInit() {
        super.onInit()
        this.skinName = "resource/eui_skins/windowSkins/ShowChatSkin.exml"
        this.registerEvent()
    }

    private registerEvent() {

    }

    public createChildren(): void {
        super.createChildren()
        this.time = new egret.Timer(3000, 1)
        this.arr = [[this.emojis_group0, this.emojis0, this.emojis_group4, this.chat0], [this.emojis_group1, this.emojis1, this.emojis_group5, this.chat1],
        [this.emojis_group2, this.emojis2, this.emojis_group6, this.chat2], [this.emojis_group3, this.emojis3, this.emojis_group7, this.chat3]]
    }

    public closeMainUI(): void {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    public showEmojis(seadID: number, source: string) {
        if(this.current!=null){
            this.current.visible=false
        }
        this.arr[seadID][0].visible = true
        this.arr[seadID][1].source = source
        this.current=this.arr[seadID][0]
        this.time.start()
        this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
            this.arr[seadID][0].visible = false
            this.time.stop()
            this.current=null
        }, this)

    }

    public showChat(seadID: number, tex: string) {
          if(this.current!=null){
            this.current.visible=false
        }
        this.arr[seadID][2].visible = true
        this.arr[seadID][3].text = tex
        this.current=this.arr[seadID][2]
        this.time.start()
        this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
            this.arr[seadID][2].visible = false
            this.current=null
            this.time.stop()
        }, this)
    }

}

