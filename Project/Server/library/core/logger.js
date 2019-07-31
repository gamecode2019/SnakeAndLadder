"use strict";
const fs = require('fs');
const cluster = require('cluster');
const log4js = require('log4js');
const format = require('string-format');
const logger = {};

// 日志记录器配置
let configure = {};
configure.replaceConsole = true;
configure.levels = { name: "debug" };

/**
 * 创建日志规则
 * @param {string} name 日志名称
 * @return {object} 日志规则
 */
const _createRule = function(name) {
    let rule = {};
    rule.category = name;
    rule.type = "dateFile";
    rule.mode = (cluster.isWorker ? "worker" : "master");
    rule.filename = format("logs/{0}.log", name);
    rule.pattern = "-yyyy-MM-dd";
    rule.alwaysIncludePattern = true;
    rule.maxLogSize = 100000000;
    rule.backups = 200;
    rule.layout = {
        "type": "pattern",
        "pattern": "[%r] [%x{pid}] [%p] [%c] %m",
        "tokens": {
            "pid": function() { return process.pid; },
            "serverName": function() { return "oaserver"; }
        }
    };
    return rule;
};

/**
 * 获取日志记录器
 * @param {string} name 记录器名称
 * @return {object} 日志记录器
 */
logger.getLogger = function(name) {
    if (log4js.hasLogger(name)) {
        return log4js.getLogger(name);
    }

    // 创建日志目录
    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
    }

    // 创建日志记录器
    let rule = _createRule(name);
    configure.appenders = [rule];
    log4js.configure(configure);
    log4js.addAppender(log4js.appenders.console());
    return log4js.getLogger(name);
};

module.exports = logger;