"use strict";
const logger = autoload('core/logger').getLogger('checks_game');
const error_type = autoload('define/error_type');
const packet_type = autoload('define/packet_type');
const user_manager = require('../manager/user_manager').instance();
const player_manager = require('../manager/player_manager').instance();
const room_manager = require('../manager/room_manager').instance();
const hprose = require('hprose');
const player_type = require('../define/player_type');
const room_type = require('../define/room_type');
const data_object = autoload('define/data_object');
const math = autoload('core/math');

/**
 * 构造函数
 * @param  void
 * @return void
 */
const CS_RomeLogin = function() {
    this.reqName = packet_type.CS_RomeLogin.name.substr(3);
    this.message = new packet_type.SC_RomeLogin();
};

/**
 * Handle protocol.
 * @param {object} client  连接客户端
 * @param {object} data    接受数据包
 * @param {object} callback 回调
 * @return void
 */
CS_RomeLogin.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 验证信息的合法性
        if (reqData.pt !== self.reqName) {
            logger.error('[CS_RomeLogin] invalid message ' + self.reqName);
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_ERR, callback);
            return;
        }

        // 检查登录
        let playerObj = yield user_manager.checkSession(reqData);
        if (isempty(playerObj)) {
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_NOLOGIN, callback);
            return;
        }

        // 匹配房间玩家
        let taskObj = yield room_manager.createMatchTask(playerObj._id,reqData);
        self.message.roomid = -1;
        self.message.playerData = playerObj.getBaseData();
        self.message.type = reqData.type;
        self.message.status = room_type.ROOM_MATCH_FINDING;
        self.message.ret = error_type.COMMON_SUCCESS;
        client.sendResponse(self.message, callback);

    }).catch(function(err) {
        logger.error('[CS_RomeLogin] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};

/**
 * 构造函数
 * @param  void
 * @return void
 */
const CS_RomeLoguot = function() {
    this.reqName = packet_type.CS_RomeLoguot.name.substr(3);
    this.message = new packet_type.SC_RomeLoguot();
};

/**
 * Handle protocol.
 * @param {object} client  连接客户端
 * @param {object} data    接受数据包
 * @param {object} callback 回调
 * @return void
 */
CS_RomeLoguot.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 验证信息的合法性
        if (reqData.pt !== self.reqName) {
            logger.error('[CS_RomeLogin] invalid message ' + self.reqName);
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_ERR, callback);
            return;
        }

        // 检查登录
        let playerObj = yield user_manager.checkSession(reqData);
        if (isempty(playerObj)) {
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_NOLOGIN, callback);
            return;
        }

        //退出房间
        room_manager.exitRoom(playerObj._id,reqData.roomid);

        self.message.seatid = reqData.seatid;
        self.message.ret = error_type.COMMON_SUCCESS;
        client.sendResponse(self.message, callback);

    }).catch(function(err) {
        logger.error('[CS_RomeLoguot] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};

/**
 * 构造函数
 * @param  void
 * @return void
 */
const CS_RoomInfo = function() {
    this.reqName = packet_type.CS_RoomInfo.name.substr(3);
    this.message = new packet_type.SC_RoomInfo();
};

/**
 * Handle protocol.
 * @param {object} client  连接客户端
 * @param {object} data    接受数据包
 * @param {object} callback 回调
 * @return void
 */
CS_RoomInfo.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        123
    }).catch(function(err) {
        logger.error('[CS_RoomInfo] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};


/**
 * 构造函数
 * @param  void
 * @return void
 */
const CS_StartGame = function() {
    this.reqName = packet_type.CS_StartGame.name.substr(3);
    this.message = new packet_type.SC_StartGame();
};

/**
 * Handle protocol.
 * @param {object} client  连接客户端
 * @param {object} data    接受数据包
 * @param {object} callback 回调
 * @return void
 */
CS_StartGame.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 验证信息的合法性
        if (reqData.pt !== self.reqName) {
            logger.error('[CS_StartGame] invalid message ' + self.reqName);
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_ERR, callback);
            return;
        }

        // 检查登录
        let playerObj = yield user_manager.checkSession(reqData);
        if (isempty(playerObj)) {
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_NOLOGIN, callback);
            return;
        }

        //玩家准备开始
        let flag = room_manager.readyOrStart(playerObj._id,reqData);
        if(flag){
            
        }
        self.message.seatid = reqData.seatid;
        client.sendResponse(self.message, callback);
        
    }).catch(function(err) {
        logger.error('[CS_StartGame] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};

/**
 * 构造函数
 * @param  void
 * @return void
 */
const CS_Operation = function() {
    this.reqName = packet_type.CS_Operation.name.substr(3);
    this.message = new packet_type.SC_Operation();
};

/**
 * Handle protocol.
 * @param {object} client  连接客户端
 * @param {object} data    接受数据包
 * @param {object} callback 回调
 * @return void
 */
CS_Operation.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 验证信息的合法性
        if (reqData.pt !== self.reqName) {
            logger.error('[CS_Operation] invalid message ' + self.reqName);
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_ERR, callback);
            return;
        }

        // 检查登录
        let playerObj = yield user_manager.checkSession(reqData);
        if (isempty(playerObj)) {
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_NOLOGIN, callback);
            return;
        }

        //
        if(reqData.optType == room_type.OperationType.firstHandRoll){
            // room_manager.firstHand(playerObj._id,reqData);
        }else{
            room_manager.operation(playerObj._id,reqData);
        }
        callback(true);
    }).catch(function(err) {
        logger.error('[CS_Operation] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};

/**
 * 构造函数
 * @param  void
 * @return void
 */
const CS_EndGame = function() {
    this.reqName = packet_type.CS_EndGame.name.substr(3);
    this.message = new packet_type.SC_EndGame();
};

/**
 * Handle protocol.
 * @param {object} client  连接客户端
 * @param {object} data    接受数据包
 * @param {object} callback 回调
 * @return void
 */
CS_EndGame.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        
        callback(true);
    }).catch(function(err) {
        logger.error('[CS_EndGame] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};

/**
 * 构造函数
 * @param  void
 * @return void
 */
const CS_Chat = function() {
    this.reqName = packet_type.CS_Chat.name.substr(3);
    this.message = new packet_type.SC_Chat();
};

/**
 * Handle protocol.
 * @param {object} client  连接客户端
 * @param {object} data    接受数据包
 * @param {object} callback 回调
 * @return void
 */
CS_Chat.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 验证信息的合法性
        if (reqData.pt !== self.reqName) {
            logger.error('[CS_Chat] invalid message ' + self.reqName);
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_ERR, callback);
            return;
        }

        // 检查登录
        let playerObj = yield user_manager.checkSession(reqData);
        if (isempty(playerObj)) {
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_NOLOGIN, callback);
            return;
        }

        //广播聊天
        room_manager.onChat(playerObj._id,reqData);
        callback(true);
    }).catch(function(err) {
        logger.error('[CS_Chat] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};


/**
 * 统一导入协议
 * @param {object} callback 回调
 * @return void
 */
function importProtocol(callback) {
    let protoArr = [];
    protoArr.push(new CS_RomeLogin());
    protoArr.push(new CS_RoomInfo());
    protoArr.push(new CS_RomeLoguot());
    protoArr.push(new CS_StartGame());
    protoArr.push(new CS_Operation());
    protoArr.push(new CS_Chat());
    protoArr.push(new CS_EndGame());
    callback(protoArr);
}
exports.importProtocol = importProtocol;