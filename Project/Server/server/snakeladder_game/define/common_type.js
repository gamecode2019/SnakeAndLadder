"use strict";
const type = {};
module.exports = type;

// 变量枚举
type.VAR_INVALID = 0;
type.VAR_MAX = 1; // 最大值（请手动修改）

// 初始化表类型
type.INITTYPE_INVALID = 0;
type.INITTYPE_LORD = 1; // 主公用
type.INITTYPE_PLANE = 2; // 小飞机用
type.INITTYPE_CURRENCY = 3; // 货币类型
type.INITTYPE_GIFT = 4; // 初始赠送
type.INITTYPE_OFFLINE_DIAMOND = 5; // 离线钻石
type.INITTYPE_DIAMOND_BUYLV = 6; // 钻石购买等级
type.INITTYPE_MAX = 7;

// 玩家投放属性类型（严格跟玩家属性表property统一）
type.LORDATT_INVALID = 100;
type.LORDATT_ATK = 101; // 攻击力 
type.LORDATT_HP = 102; // 血量
type.LORDATT_HURT_ADD = 103; // 伤害加成(总百分百)
type.LORDATT_ATKSPEED = 104; // 攻速
type.LORDATT_ATKSPEED_ADD = 105; // 攻速加成(百分百)
type.LORDATT_MOVE = 106; // 移动
type.LORDATT_MOVE_ADD = 107; // 移动加成(百分百)
type.LORDATT_ATK_ADD = 108; // 攻击百分比 
type.LORDATT_HP_ADD = 109; // 血量百分比
type.LORDATT_HURT = 110; // 伤害加成
type.LORDATT_MAX = 111; // 请手动修改最大值

// 主公属性与百分比属性映射
type.LOAR_PERCENT_MAP = {};
type.LOAR_PERCENT_MAP[type.LORDATT_ATK] = type.LORDATT_ATK_ADD;
type.LOAR_PERCENT_MAP[type.LORDATT_HP] = type.LORDATT_HP_ADD;
type.LOAR_PERCENT_MAP[type.LORDATT_ATKSPEED] = type.LORDATT_ATKSPEED_ADD;
type.LOAR_PERCENT_MAP[type.LORDATT_MOVE] = type.LORDATT_MOVE_ADD;

// 主公属性投放类型
type.LAR_DIMENSION_UP = 100101; // 次元进化
type.LAR_SUPER_OIL = 100201; // 超级机油
type.LAR_WARSHIP_COMBIN = 100301; // 战舰合一
type.LAR_NATURE_HUMAN = 100401; // 天人合一
type.LAR_ENGINE_CHANGE = 100501; // 升级引擎
type.LAR_ACTION_RULE = 100601; // 行动规划
type.LAR_ACADEMY_UP = 100701; // 学院进修
type.LAR_ENGINE_UP = 100801; // 引擎提升
type.LAR_CABIN_SPACE = 100901; // 机舱空位

type.LAR_ADJUTANT_101 = 200101; //副官罗德尼
type.LAR_ADJUTANT_201 = 200201; //副官胡德
type.LAR_ADJUTANT_301 = 200301; //副官欧根亲王
type.LAR_ADJUTANT_401 = 200401; //副官蒙彼利埃
type.LAR_ADJUTANT_501 = 200501; //副官鲟

type.LAR_EQUIP_SYNTHESIS = 300001; //装备合成

// 强化消耗结构
type.checkLordUpgrade = function checkLordUpgrade(uptype) {
    switch (uptype) {
        case type.LAR_DIMENSION_UP:
        case type.LAR_SUPER_OIL:
        case type.LAR_WARSHIP_COMBIN:
        case type.LAR_NATURE_HUMAN:
        case type.LAR_ENGINE_CHANGE:
        case type.LAR_ACTION_RULE:
        case type.LAR_ACADEMY_UP:
        case type.LAR_ENGINE_UP:
        case type.LAR_CABIN_SPACE:
            return true;
        default:
            return false;
    }
};

////////////////////////////////////////////////////
// 宠物投放属性
type.PETATT_INVALID = 200;
type.PETATT_ATK = 201; // 攻击力 
type.PETATT_ATK_ADD = 202; // 攻击力加成(百分百)
type.PETATT_ATKSPEED = 203; // 攻速
type.PETATT_MAX = 204; // 请手动修改最大值

// 宠物属性与百分比属性映射
type.PET_PERCENT_MAP = {};
type.PET_PERCENT_MAP[type.PETATT_ATK] = type.PETATT_ATK_ADD;

// 宠物属性投放类型
type.PAR_INVALID = 0;
type.PAR_LEVEL = 1; // 等级事件
type.PAR_MAX = 2; // 请手动修改最大值

////////////////////////////////////////////////////
// 全属性投放（同时针对玩家和宠物）
type.ALLATT_INVALID = 300;
type.ALLATT_ADD = 301; // 全属性百分比 
type.ALLATT_MAX = 302; // 请手动修改最大值

// 主公属性与全属性百分比属性映射
type.ALL_PERCENT_MAP = {};
type.ALL_PERCENT_MAP[type.LORDATT_ATK] = type.ALLATT_ADD;
type.ALL_PERCENT_MAP[type.LORDATT_HP] = type.ALLATT_ADD;
type.ALL_PERCENT_MAP[type.PETATT_ATK] = type.ALLATT_ADD;

////////////////////////////////////////////////////
// 属性成长结构
type.GrowthInfo = function GrowthInfo() {
    this.id = 0;
    this.min = 0;
    this.max = 0;
    this.attribute = 0;
};

// 强化消耗结构
type.UpgradeCost = function UpgradeCost() {
    this.id = 0; // ID
    this.currency = 0; // 货币
    this.min = 0; // 最小值
    this.max = 0; // 最大值
    this.consume = 0; // 消耗
};