"use strict";

const packet_type = autoload('define/packet_type');
const hprose = require('hprose');

/**
 * 构造函数
 * @param void
 * @return void
 */
const CS_ShopBuyInfo = function() {
    this.reqName = packet_type.CS_ShopBuyInfo.name.substr(3);
    this.message = new packet_type.SC_ShopBuyInfo();
};

/**
 * Handle protocol.
 * @param {object} client  连接客户端
 * @param {object} data    接受数据包
 * @param {object} callback 回调
 * @return void
 */
CS_ShopBuyInfo.prototype.handleProtocol = function(client, reqData, callback) {
    let self = this;
    hprose.co(function*() {
        // 验证信息的合法性
        if (reqData.pt !== self.reqName || !reqData.shopType || !reqData.Id) {
            logger.error('[CS_ShopBuyInfo] invalid message ' + self.reqName);
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_ERR, callback);
            return;
        }

        // 检查玩家数据
        let playerobj = yield user_manager.checkSession(reqData);
        if (isempty(playerobj)) {
            client.sendResponseWithErrorCode(self.message, error_type.COMMON_NOLOGIN, callback);
            return;
        }

        let res = playerobj.getShopHelper().buyItem(reqData.shopType, reqData.Id);
        if (res.hasError()) {
            client.sendResponseWithErrorCode(self.message, res.getError(), callback);
            return;
        }
        self.message.Id = reqData.Id;
        self.message.shopType = reqData.shopType;
        self.message.buySuccess = res.getData();
        client.sendResponse(self.message, callback);
    }).catch(function(err) {
        logger.error('[CS_ShopBuyInfo] error: ' + err);
        let errcode = parseInt(err.message, 10) || error_type.COMMON_ERR;
        client.sendResponseWithErrorCode(self.message, errcode, callback);
    });
};

function importProtocol(callback) {
    let protoArr = [];
    protoArr.push(new CS_ShopBuyInfo());
    callback(protoArr);
}

exports.importProtocol = importProtocol;