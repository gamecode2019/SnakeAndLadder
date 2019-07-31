"use strict";
const type = {};

//商店类型定义
type.HeroObj = function HeroObj(id) {
    this.id = id;
    this.level = 0;
};

//初始武将ID
type.FIRST_HERO = 1;

module.exports = type;