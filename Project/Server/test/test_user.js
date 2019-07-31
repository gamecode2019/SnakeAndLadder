"use strict";
const logger = autoload('core/logger').getLogger('test');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const driver = autoload('core/dbi_mysql');
const config = require("../../config/server.json");

/**
 * 构造函数
 * @param void
 * @return void
 */
let test_user = function() {
    this._mysql = new driver();
    this._mysql.connect(config.mysql);
};

/**
 * 执行测试
 * @param void
 * @return void
 */
test_user.prototype.run = thunkify(function(callback) {
    hprose.co(function*() {
        logger.info("test_user 测试通过");
        callback(null, null);
    }).catch(function(err) {
        logger.error(err);
        callback(err, null);
    });
});

module.exports = new test_user();