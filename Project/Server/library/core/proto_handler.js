"use strict";
const fs = require('fs');
const path = require('path');
const format = require("string-format");
const proto_handler = {};

/**
 * 读取HTTP协议
 * @param {string} dir 协议路径
 * @param {object} callback 回调
 * @return void
 */
proto_handler.readHttpProtocols = function(dir, callback) {
    let fileArr = fs.readdirSync(dir);
    if (fileArr.length < 1) {
        callback(null);
        return;
    }

    // 注册协议
    for (let i = 0; i < fileArr.length; ++i) {
        if (path.extname(fileArr[i]) !== '.js') {
            continue;
        }
        let protoPath = format('../.{0}/{1}', dir, path.basename(fileArr[i], '.js'));
        require(protoPath).importProtocol(function(protocolArr) {
            for (let idx = 0; idx < protocolArr.length; idx++) {
                callback(protocolArr[idx]);
            }
        });
    }
};

/**
 * 读取RPC服务接口
 * @param {object} server rpc服务器
 * @param {string} dir 协议路径
 * @param {object} callback 回调
 * @return void
 */
proto_handler.readRpcProtocols = function(server, dir, callback) {
    let fileArr = fs.readdirSync(dir);
    if (fileArr.length < 1) {
        callback(null);
        return;
    }

    // 注册协议
    for (let i = 0; i < fileArr.length; ++i) {
        if (path.extname(fileArr[i]) !== '.js') {
            continue;
        }
        let protoPath = format('../.{0}/{1}', dir, path.basename(fileArr[i], '.js'));
        require(protoPath).importProtocol(server, function(data) { callback(data); });
    }
};

module.exports = proto_handler;