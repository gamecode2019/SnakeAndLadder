"use strict";
const dateFormat = require('dateformat');
const time_util = {};
module.exports = time_util;

// 常量定义
const WEEK_NUM = [7, 1, 2, 3, 4, 5, 6];
const MS_PERDAY = 24 * 60 * 60 * 1000;

/**
 * 获取当前的时间字符串 格式为 年月日
 */
time_util.getStringDate = function() {
    return dateFormat(new Date(), "yyyymmdd");
};

/**
 * 获取当前的时间字符串 格式为 年月日时分秒
 */
time_util.getStringDateTime = function() {
    return dateFormat(new Date(), "yyyymmddHHMMss");
};

/**
 * 得到当前是第几周
 * @param {int} toDay 
 */
time_util.getWeekNumber = function(toDay) {
    // Copy date so don't modify original
    var day = new Date(toDay.valueOf());
    day.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    day.setDate(day.getDate() + 4 - (day.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(day.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    return Math.ceil((((day.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
};

/**
 * 获取当日剩余时间(毫秒)
 */
time_util.getTodayLeftTime = function() {
    var limit = new Date();
    limit.setHours(0, 0, 0, 0);
    limit = limit.getTime() + 86400000;
    return (limit - new Date().valueOf());
};

/**
 * 获取12点时间戳(毫秒)
 */
time_util.getMidnight = function() {
    var limit = new Date();
    limit.setHours(0, 0, 0, 0);
    return limit.getTime() + 86400000;
};

/**
 * 距离时间戳的间隔时间(毫秒)
 * @param {int} timestamp 
 */
time_util.getInterval = function(timestamp) {
    return (timestamp - new Date().valueOf());
};

/**
 * 获取未来时间戳(毫秒)
 * @param {int} interval 毫秒
 */
time_util.getTimestamp = function(interval) {
    return (interval || 0 + new Date().valueOf());
};

/**
 * 获取当前时间戳(毫秒)
 */
time_util.getCurTimestamp = function() {
    return this.getTimestamp(0);
};

/**
 * 获取当前时间戳(秒)
 */
time_util.getCurTimestampBySec = function() {
    return parseInt(this.getCurTimestamp() / 1000, 10);
};

/**
 * 获取当前时间戳(秒),别名
 */
time_util.getNowSec = function() {
    return this.getCurTimestampBySec();
};

/**
 * 获取当前星期
 */
time_util.getWeek = function() {
    var day = new Date().getDay();
    return WEEK_NUM[day];
};

/**
  * 获取规格化的时间差(天数)
  * @param {*} lhsTimestamp 时间戳
  * @param {*} rhsTimestamp 时间戳
  * @param {*} normalizeFlag 0:lhs规格化;1:rhs规格化;2:全规格化
  */
time_util.diffTimeSEC = function(lhsTimestamp, rhsTimestamp, normalizeFlag) {
    lhsTimestamp *= 1000;
    rhsTimestamp *= 1000;
    return this.diffTimeMS(lhsTimestamp, rhsTimestamp, normalizeFlag);
};

/**
 * 获取规格化的时间差(天数)
 * @param {*} lhsTimestamp 时间戳
 * @param {*} rhsTimestamp 时间戳
 * @param {*} normalizeFlag normalizeFlag:0:lhs规格化;1:rhs规格化;2:全规格化
 */
time_util.diffTimeMS = function(lhsTimestamp, rhsTimestamp, normalizeFlag) {
    normalizeFlag = (normalizeFlag === undefined) ? -1 : normalizeFlag;
    if (normalizeFlag === 0) {
        lhsTimestamp = this.normalizeTimestamp(lhsTimestamp);
    } else if (normalizeFlag === 1) {
        rhsTimestamp = this.normalizeTimestamp(rhsTimestamp);
    } else if (normalizeFlag === 2) {
        lhsTimestamp = this.normalizeTimestamp(lhsTimestamp);
        rhsTimestamp = this.normalizeTimestamp(rhsTimestamp);
    }
    let diff = lhsTimestamp - rhsTimestamp;
    return parseFloat((diff / MS_PERDAY).toFixed(1));
};

/**
 * 规格化时间
 * @param {int} ts 时间戳 
 */
time_util.normalizeTimestamp = function(ts) {
    let date = new Date(ts);
    if (date) {
        date.setHours(0, 0, 0, 0);
        ts = date.getTime();
    }
    return ts;
};