"use strict";
const logger = autoload('core/logger').getLogger('checks_game');
const error_type = autoload('define/error_type');
const packet_type = autoload('define/packet_type');
const hprose = require('hprose');
const user_manager = require('../manager/user_manager').instance();
const player_manager = require('../manager/player_manager').instance();
const http_handler = autoload('core/http_handler');

/**
 * 构造函数
 * @param void
 * @return void
 */
let CS_UpdatePlayerData = function() {
    this.reqName = packet_type.CS_UpdatePlayerData.name.substr(3);
    this.message = new packet_type.SC_UpdatePlayerData();
};

/**
 * Handle protocol.
 * @param client [object] 连接客户端
 * @param data [object] 接受数据包
 * @param callback [object] 回调
 * @return [] 无返回值
 */
CS_UpdatePlayerData.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 验证信息的合法性
        if (reqData.pt !== self.reqName) {
            logger.error('[CS_UpdatePlayerData] invalid message ' + self.reqName);
            callback(false);
            return;
        }

        //验证登录
        let playerObj = yield user_manager.checkSession(reqData);
        if (!isObjEmpty(reqData.playerData)) {
            playerObj.setInfo(reqData.playerData);
            // playerObj.saveAll(); // 直接大存档
        }

        //
        self.message.playerData = playerObj.getBaseData();
        self.syncHelper(playerObj);
        self.message.ret = error_type.COMMON_SUCCESS;
        client.sendResponse(self.message,callback);

    }).catch(function(err) {
        logger.error('[CS_UpdatePlayerData] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};

/**
 * 同步助手数据
 * @param {object} playerObj 
 */
CS_UpdatePlayerData.prototype.syncHelper = function(playerObj) {};

/**
 * 统一导入协议
 * @param {object} callback 回调
 * @return void
 */
function importProtocol(callback) {
    let protoArr = [];
    protoArr.push(new CS_UpdatePlayerData());
    callback(protoArr);
}
exports.importProtocol = importProtocol;