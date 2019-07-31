"use strict";
const math = {};

/**
 * 随机函数
 * @param {int} min 最小随机数
 * @param {int} max 最大随机数
 * @returns {int} 返回随机数字
 */
math.rand = function rand(min, max) {
    if (min <= max) {
        let range = max - min;
        let rand = Math.random();
        return (min + Math.round(rand * range));
    } else {
        let range = min - max;
        let rand = Math.random();
        return (max + Math.round(rand * range));
    }
};

/**
 * Vector2
 * @param {int} x 坐标X
 * @param {int} y 坐标Y
 */
math.Vector2 = function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

module.exports = math;