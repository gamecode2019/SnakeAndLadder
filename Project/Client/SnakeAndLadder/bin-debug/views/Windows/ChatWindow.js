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
var ChatWindow = (function (_super) {
    __extends(ChatWindow, _super);
    function ChatWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/ChatSkin.exml";
        this.registerEvent();
        this.initData();
    };
    ChatWindow.prototype.registerEvent = function () {
        var _this = this;
        this.chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtn, this);
        Utils.getInstance().buttonEffect(this.sendImg, this.send, this);
        EventManager.instance().addEventListener(GameEvents.DISPATCH_CHAT_MESSAGE, function (data) {
            _this.textInput.text = data;
            _this.bg.visible = false;
            _this.srcListText.visible = false;
        }, this);
    };
    ChatWindow.prototype.send = function () {
        if (this.textInput.text != "") {
            //TODO发送文字信息this.textInput.text
            console.log("发送文字消息", this.textInput.text);
            GameNetwork.Instance.reqChat(this.textInput.text);
            UIManager.instance().closeWindow("ChatWindow");
        }
    };
    ChatWindow.prototype.onChatBtn = function (e) {
        this.srcListText.visible = true;
        this.bg.visible = true;
    };
    ChatWindow.prototype.initData = function () {
        var listDate1 = [
            { text: "You are so pretty" },
            { text: "Charming eyes" },
            { text: "Mad about you" },
            { text: "Singe ich mein lied" }
        ];
        this.listText.dataProvider = new eui.ArrayCollection(listDate1);
        this.listText.itemRenderer = ChatText;
        var listDate = [
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
        ];
        this.listImg.dataProvider = new eui.ArrayCollection(listDate);
        this.listImg.itemRenderer = ListImgIRSkin;
    };
    ChatWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ChatWindow.prototype.closeMainUI = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return ChatWindow;
}(UIWindow));
__reflect(ChatWindow.prototype, "ChatWindow");
var ListImgIRSkin = (function (_super) {
    __extends(ListImgIRSkin, _super);
    function ListImgIRSkin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SigleSkin";
        _this.width = 82;
        _this.height = 82;
        _this.playerSkin.width = 82;
        _this.playerSkin.height = 82;
        _this.playerSkin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            UIManager.instance().closeWindow("ChatWindow");
            //TODO发送表情this.playerSkin.source
            GameNetwork.Instance.reqChat("[f:" + _this.playerSkin.source + "]");
            console.log("发送表情" + _this.playerSkin.source);
        }, _this);
        return _this;
    }
    ListImgIRSkin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return ListImgIRSkin;
}(eui.ItemRenderer));
__reflect(ListImgIRSkin.prototype, "ListImgIRSkin");
var ChatText = (function (_super) {
    __extends(ChatText, _super);
    function ChatText() {
        var _this = _super.call(this) || this;
        _this.skinName = "LabelSkin";
        _this.text.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            EventManager.instance().dispatchEvent(GameEvents.DISPATCH_CHAT_MESSAGE, _this.text.text);
        }, _this);
        return _this;
    }
    ChatText.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return ChatText;
}(eui.ItemRenderer));
__reflect(ChatText.prototype, "ChatText");
//# sourceMappingURL=ChatWindow.js.map