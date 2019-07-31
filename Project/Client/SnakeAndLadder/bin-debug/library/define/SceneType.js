var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 常量定义
 */
var RENDER_OFFSET_WIDTH = 100; // 渲染区域和视口的水平偏移量
var RENDER_OFFSET_HEIGHT = 100; // 渲染区域和视口的垂直偏移量
var ACTOR_SORT_INTERVAL = 10; // 角色排序时间间隔
var MONSTER_TRACE_DIST = 2000; // 怪物追击距离
//////////////////////////////////////////////////////////////
// 路径类型
var PathType;
(function (PathType) {
    PathType[PathType["OBSTACLE"] = -1] = "OBSTACLE";
    PathType[PathType["WALKABLE"] = 0] = "WALKABLE";
    PathType[PathType["TRANSPARENT"] = 1] = "TRANSPARENT"; // 透明
})(PathType || (PathType = {}));
// 路径结点
var PathNode = (function () {
    function PathNode(_label, _type, _color) {
        this.label = _label;
        this.type = _type;
        this.color = _color;
    }
    return PathNode;
}());
__reflect(PathNode.prototype, "PathNode");
// 设置路径
var PATH_TYPES = [
    new PathNode("障碍", PathType.OBSTACLE, 0xff0000),
    new PathNode("可行走", PathType.WALKABLE, 0x0),
    new PathNode("透明", PathType.TRANSPARENT, 0xff)
];
//////////////////////////////////////////////////////////////
// 场景类型
var SceneType;
(function (SceneType) {
    SceneType[SceneType["ST_HOME"] = 0] = "ST_HOME";
    SceneType[SceneType["ST_NORMAL_COPY"] = 1] = "ST_NORMAL_COPY";
    SceneType[SceneType["ST_EQUIP_COPY"] = 2] = "ST_EQUIP_COPY";
    SceneType[SceneType["ST_BOSS_LIANYU"] = 3] = "ST_BOSS_LIANYU";
    SceneType[SceneType["ST_BOSS_WORLD"] = 4] = "ST_BOSS_WORLD";
    SceneType[SceneType["ST_BOSS_COPY"] = 5] = "ST_BOSS_COPY";
    SceneType[SceneType["ST_COIN_COPY"] = 6] = "ST_COIN_COPY";
    SceneType[SceneType["ST_EXP_COPY"] = 7] = "ST_EXP_COPY";
    SceneType[SceneType["ST_METERIAL_COPY"] = 8] = "ST_METERIAL_COPY";
})(SceneType || (SceneType = {}));
// 场景元素类型
var SceneElementType;
(function (SceneElementType) {
    SceneElementType[SceneElementType["SET_NPC"] = 0] = "SET_NPC";
    SceneElementType[SceneElementType["SET_ENTRY_POINT"] = 1] = "SET_ENTRY_POINT";
    SceneElementType[SceneElementType["SET_SCENERY"] = 2] = "SET_SCENERY";
    SceneElementType[SceneElementType["SET_ROLE_BORN_POINT"] = 3] = "SET_ROLE_BORN_POINT";
    SceneElementType[SceneElementType["SET_MONSTER_BORN_POINT"] = 4] = "SET_MONSTER_BORN_POINT";
    SceneElementType[SceneElementType["SET_COLLECT_GOODS"] = 5] = "SET_COLLECT_GOODS";
    SceneElementType[SceneElementType["SET_EVENT_POINT"] = 6] = "SET_EVENT_POINT";
    SceneElementType[SceneElementType["SET_PATROL_PATH"] = 7] = "SET_PATROL_PATH";
})(SceneElementType || (SceneElementType = {}));
// 场景原始数据
var SceneRawData = (function () {
    function SceneRawData() {
        this.npcBornData = []; // npc出生点数据
        this.monsterBornData = []; // 怪物出生点数据
        this.roleBornData = []; // 角色出生点数据
        this.entryData = []; // 传送点列表
    }
    return SceneRawData;
}());
__reflect(SceneRawData.prototype, "SceneRawData");
//# sourceMappingURL=SceneType.js.map