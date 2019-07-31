var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvents = (function () {
    function GameEvents() {
    }
    GameEvents.CHANGE_PLAYER_SKIN = "CHANGE_PLAYER_SKIN";
    GameEvents.LOAD_RANK_PAGE = "LOAD_RANK_PAGE";
    GameEvents.DISPATCH_CHAT_MESSAGE = "DISPATCH_CHAT_MESSAGE";
    GameEvents.ShowReward = "ShowReward";
    GameEvents.PlayerGoldUIUpdate = "PlayerGoldUIUpdate";
    return GameEvents;
}());
__reflect(GameEvents.prototype, "GameEvents");
//# sourceMappingURL=GameEvents.js.map