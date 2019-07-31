"use strict";
const util = require('util');
const logger = autoload('core/logger').getLogger('checks_game');
const error_type = autoload('define/error_type');
const packet_type = autoload('define/packet_type');
const http_handler = autoload('core/http_handler');
const hprose = require('hprose');
const thunkify = hprose.thunkify;
const user_manager = require('../manager/user_manager').instance();
const player_manager = require('../manager/player_manager').instance();
const room_manager = require('../manager/room_manager').instance();
const crypt = autoload('core/crypt');

/**
 * 构造函数
 * @param void
 * @return void
 */
const CS_UserLogin = function() {
    this.reqName = packet_type.CS_UserLogin.name.substr(3);
    this.message = new packet_type.SC_UserLogin();
};

/**
 * Handle protocol.
 * @param {object} request 客户端请求
 * @param {object} response 客户端响应
 * @return void
 */
CS_UserLogin.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 验证信息的合法性
        if (reqData.pt !== self.reqName) {
            callback(false);
            return;
        }

        // 账号登录
        let sessionID = 0;
        if(reqData.type==1){
            //账号登录
            sessionID = crypt.md5.get_md5_hash(reqData.acc+reqData.pw);
        }else if(reqData.type==3){
            sessionID = crypt.md5.get_md5_hash(reqData.uid);
        }else{
            sessionID = crypt.md5.get_md5_hash(client._ip);
        }
        let { userData, player } = yield user_manager.login(reqData, sessionID);
        if (!player) {
            callback(false);
            return;
        }

        // 设置头像和昵称
        player.setIndividualInfo(reqData);

        // 发送验证数据
        client.obj = player;
        player._socketClient = client;
        self.message.userData = userData;
        self.message.playerData = player.getBaseData();
        self.message.ret = error_type.COMMON_SUCCESS;
        client.sendResponse(self.message,callback);
    }).catch(function(err) {
        logger.error('[CS_UserLogin] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};

/**
 * 构造函数
 * @param void
 * @return void
 */
const CS_UserLogout = function() {
    this.reqName = packet_type.CS_UserLogout.name.substr(3);
    this.message = new packet_type.SC_UserLogout();
};

/**
 * Handle protocol.
 * @param {object} request 客户端请求
 * @param {object} response 客户端响应
 * @return void
 */
CS_UserLogout.prototype.handleProtocol = function(client, request) {
    let player = client.obj;
    if (player) {
        //退出房间
        if(player.getRoomID()>0){
            room_manager.exitRoom(player.id(),player.getRoomID());
        }
        player_manager.removePlayer(player.id());
        player._socketClient = null;
    }
    client.obj = null;
};

/**
 * 统一导入协议
 * @param {object} callback 回调
 * @return void
 */
function importProtocol(callback) {
    let protoArr = [];
    protoArr.push(new CS_UserLogin());
    protoArr.push(new CS_UserLogout());
    callback(protoArr);
}
exports.importProtocol = importProtocol;