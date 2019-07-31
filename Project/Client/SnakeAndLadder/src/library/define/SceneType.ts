/**
 * 常量定义
 */
const RENDER_OFFSET_WIDTH = 100;    // 渲染区域和视口的水平偏移量
const RENDER_OFFSET_HEIGHT = 100;   // 渲染区域和视口的垂直偏移量
const ACTOR_SORT_INTERVAL = 10;     // 角色排序时间间隔
const MONSTER_TRACE_DIST = 2000;    // 怪物追击距离

//////////////////////////////////////////////////////////////
// 路径类型
enum PathType {
    OBSTACLE = -1, // 障碍
    WALKABLE = 0, // 可行走
    TRANSPARENT = 1 // 透明
}

// 路径结点
class PathNode {
    public label: string; // 标签
    public type: number; // 类型
    public color: number; // 颜色
    constructor(_label: string, _type: number, _color: number) {
        this.label = _label;
        this.type = _type;
        this.color = _color;
    }
}

// 设置路径
const PATH_TYPES = [
    new PathNode("障碍", PathType.OBSTACLE, 0xff0000),
    new PathNode("可行走", PathType.WALKABLE, 0x0),
    new PathNode("透明", PathType.TRANSPARENT, 0xff)
];

//////////////////////////////////////////////////////////////
// 场景类型
enum SceneType {
    ST_HOME, // 主城场景
    ST_NORMAL_COPY, // 野外副本
    ST_EQUIP_COPY, // 装备副本(羽毛)
    ST_BOSS_LIANYU, // 炼狱副本
    ST_BOSS_WORLD, // 世界BOSS副本
    ST_BOSS_COPY, // 野外BOSS副本
    ST_COIN_COPY, // 金币副本
    ST_EXP_COPY, // 经验副本
    ST_METERIAL_COPY, // 材料副本
}

// 场景元素类型
enum SceneElementType {
    SET_NPC, // NPC
    SET_ENTRY_POINT, // 传送点
    SET_SCENERY, // 景物
    SET_ROLE_BORN_POINT, // 角色出生点
    SET_MONSTER_BORN_POINT, // 怪物出生点
    SET_COLLECT_GOODS, // 采集物
    SET_EVENT_POINT, // 事件点
    SET_PATROL_PATH, // 巡逻路径
}

// 场景原始数据
class SceneRawData {
    public npcBornData = []; // npc出生点数据
    public monsterBornData = []; // 怪物出生点数据
    public roleBornData = []; // 角色出生点数据
    public entryData = []; // 传送点列表
}