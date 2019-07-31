/**
 * 品质颜色
 */
var QualityColor;
(function (QualityColor) {
    QualityColor[QualityColor["White"] = 7435091] = "White";
    QualityColor[QualityColor["Green"] = 1271403] = "Green";
    QualityColor[QualityColor["Blue"] = 1593986] = "Blue";
    QualityColor[QualityColor["Red"] = 11544255] = "Red";
    QualityColor[QualityColor["Orange"] = 9910326] = "Orange";
})(QualityColor || (QualityColor = {}));
/**
 * 事件类型
 */
var EventType;
(function (EventType) {
    EventType[EventType["test1"] = 1] = "test1";
    EventType[EventType["test2"] = 2] = "test2";
    EventType[EventType["updateBagWindow"] = 3] = "updateBagWindow";
})(EventType || (EventType = {}));
/**
 * 游戏模式
 */
var GameType;
(function (GameType) {
    GameType[GameType["test"] = 1] = "test";
    GameType[GameType["normalMode"] = 2] = "normalMode";
    GameType[GameType["matchingMode"] = 3] = "matchingMode";
    GameType[GameType["firendMode"] = 4] = "firendMode";
})(GameType || (GameType = {}));
/**
 * 游戏阶段
 */
var GameState;
(function (GameState) {
    GameState[GameState["matching"] = 1] = "matching";
    GameState[GameState["gameStart"] = 2] = "gameStart";
    GameState[GameState["firstHand"] = 3] = "firstHand";
    GameState[GameState["gameing"] = 4] = "gameing";
    GameState[GameState["gameEnd"] = 5] = "gameEnd";
})(GameState || (GameState = {}));
/**
 * OperationType操作类型
 */
var OperationType;
(function (OperationType) {
    OperationType[OperationType["firstHandRoll"] = 1] = "firstHandRoll";
    OperationType[OperationType["rollStep"] = 2] = "rollStep";
})(OperationType || (OperationType = {}));
/**
 * 玩家小图像类型
 */
var HeadIconType;
(function (HeadIconType) {
    HeadIconType[HeadIconType["headIcon"] = 0] = "headIcon";
    HeadIconType[HeadIconType["gameIcon"] = 1] = "gameIcon";
    HeadIconType[HeadIconType["gameIconOne"] = 2] = "gameIconOne"; //玩家游戏中形象列表
})(HeadIconType || (HeadIconType = {}));
/**
 * 保存本地皮肤形象图json
 */
var selectScan = "selectScan";
//# sourceMappingURL=CommonParam.js.map