"use strict";
const util = require('util');
const logger = autoload('core/logger').getLogger('checks_game');
const error_type = autoload('define/error_type');
const packet_type = autoload('define/packet_type');
const hprose = require('hprose');
const thunkify = hprose.thunkify;

/**
 * 构造函数
 * @param void [void]
 * @return [] 无返回值
 */
let SC_UserLogin = function() {
    this.resName = packet_type.SC_UserLogin.name.substr(3);
};

/**
 * Handle protocol.
 * @param client [object] 连接客户端
 * @param response [object] 接受数据包
 * @param callback [object] 回调
 * @return [] 无返回值
 */
SC_UserLogin.prototype.handleProtocol = function(client, resData, callback) {
    logger.info("[SC_UserLogin.handleProtocol]resData:" + util.inspect(resData));
    let msgGetPlayerData = new packet_type.CS_UpdatePlayerData();
    msgGetPlayerData.uid = resData.userData.uid;
    msgGetPlayerData.tk = resData.userData.token;
    msgGetPlayerData.individualInfo.avatarUrl = "./img/beauty.jpg";
    msgGetPlayerData.individualInfo.nickName = "大力丸";
    client.send(msgGetPlayerData);
    callback(null, null);
};

/**
 * 构造函数
 * @param void [void]
 * @return [] 无返回值
 */
let SC_UpdatePlayerData = function() {
    this.resName = packet_type.SC_UpdatePlayerData.name.substr(3);
};

/**
 * Handle protocol.
 * @param client [object] 连接客户端
 * @param response [object] 接受数据包
 * @param callback [object] 回调
 * @return [] 无返回值
 */
SC_UpdatePlayerData.prototype.handleProtocol = function(client, resData, callback) {
    logger.info("[SC_UpdatePlayerData.handleProtocol]resData:" + util.inspect(resData));
    callback(null, null);
};

/**
 * 统一导入协议
 * @param {object} callback 回调
 * @return void
 */
function importProtocol(callback) {
    let protoArr = [];
    protoArr.push(new SC_UserLogin());
    protoArr.push(new SC_UpdatePlayerData());
    callback(protoArr);
}
exports.importProtocol = importProtocol;