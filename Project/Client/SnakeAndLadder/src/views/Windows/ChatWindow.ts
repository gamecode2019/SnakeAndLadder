class ChatWindow extends UIWindow {
    private srcListImg: eui.Scroller
    private listImg: eui.List
    public group: eui.Group
    private srcListText: eui.Scroller
    private listText: eui.List
    private chatBtn: eui.Button
    private chatText: eui.Label
    private textInput: eui.EditableText
    private sendImg: eui.Image
    public bg: eui.Image
    public chatBg: eui.Image
    protected onInit() {
        super.onInit()
        this.skinName = "resource/eui_skins/windowSkins/ChatSkin.exml"
        this.registerEvent()
        this.initData()

    }

    private registerEvent() {
        this.chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtn, this)
        Utils.getInstance().buttonEffect(this.sendImg, this.send, this)
        EventManager.instance().addEventListener(GameEvents.DISPATCH_CHAT_MESSAGE, (data) => {
            this.textInput.text = data
            this.bg.visible = false
            this.srcListText.visible = false
        }, this)
    }

    private send() {
        if (this.textInput.text != "") {
            //TODO发送文字信息this.textInput.text
            console.log("发送文字消息", this.textInput.text)
            GameNetwork.Instance.reqChat(this.textInput.text);
            UIManager.instance().closeWindow("ChatWindow")
        }
    }

    private onChatBtn(e: egret.TouchEvent) {
        this.srcListText.visible = true
        this.bg.visible = true
    }

    private initData() {
        var listDate1: Array<Object> = [
            { text: "You are so pretty" },
            { text: "Charming eyes" },
            { text: "Mad about you" },
            { text: "Singe ich mein lied" }
        ]
        this.listText.dataProvider = new eui.ArrayCollection(listDate1)
        this.listText.itemRenderer = ChatText

        var listDate: Array<Object> = [
            { icon: "Emojis_json.emojis_01" },
            { icon: "Emojis_json.emojis_02" },
            { icon: "Emojis_json.emojis_03" },
            { icon: "Emojis_json.emojis_04" },
            { icon: "Emojis_json.emojis_04" },
            { icon: "Emojis_json.emojis_04" },
            { icon: "Emojis_json.emojis_04" },
            { icon: "Emojis_json.emojis_04" },
            { icon: "Emojis_json.emojis_04" },
            { icon: "Emojis_json.emojis_04" }

        ]
        this.listImg.dataProvider = new eui.ArrayCollection(listDate)
        this.listImg.itemRenderer = ListImgIRSkin
    }

    public createChildren(): void {
        super.createChildren()
    }

    public closeMainUI(): void {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }
}

class ListImgIRSkin extends eui.ItemRenderer {
    private playerSkin: eui.Image
    public constructor() {
        super()
        this.skinName = "SigleSkin"
        this.width = 82
        this.height = 82
        this.playerSkin.width = 82
        this.playerSkin.height = 82
        this.playerSkin.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            UIManager.instance().closeWindow("ChatWindow")
            //TODO发送表情this.playerSkin.source
            GameNetwork.Instance.reqChat(`[f:${this.playerSkin.source}]`);
            console.log("发送表情" + this.playerSkin.source)
        }, this)
    }
    protected createChildren(): void {
        super.createChildren();
    }
}

class ChatText extends eui.ItemRenderer {
    private text: eui.Label
    public constructor() {
        super()
        this.skinName = "LabelSkin"
        this.text.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            EventManager.instance().dispatchEvent(GameEvents.DISPATCH_CHAT_MESSAGE, this.text.text)

        }, this)
    }
    protected createChildren(): void {
        super.createChildren();
    }

}
