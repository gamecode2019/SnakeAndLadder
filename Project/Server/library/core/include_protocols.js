"use strict";
const fs = require('fs');
const __path = require('path');
const format = require("string-format");
var protocols = {};

// 读取http协议
protocols.read_http_protocols = function (protocol_dir, on_protocol_callback) {
    var read_files = fs.readdirSync(protocol_dir);
    for (var i = 0; i < read_files.length; ++i) {
        if (__path.extname(read_files[i]) != '.js') {
            continue;
        }
        var module_name = '../.' + protocol_dir + '/' + __path.basename(read_files[i], '.js');
        var load_protocol = require(module_name);
        if (typeof load_protocol.importProtocol === 'function') {
            let sysName = __path.basename(module_name).replace('pt_', '');
            load_protocol.importProtocol(function (protocol_handlers) {
                for (var j = 0; j < protocol_handlers.length; j++) {
                    protocol_handlers[j].sysName = format('SWITCH_{0}', sysName.toUpperCase());
                    on_protocol_callback(protocol_handlers[j]);
                }
            });
        }
    }
};

// 读取rpc服务接口
protocols.read_rpc_protocols = function (server, dir, callback) {
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; ++i) {
        if (__path.extname(files[i]) != '.js') {
            continue;
        }
        var ppath = format('../.{0}/{1}', dir, __path.basename(files[i], '.js'));
        require(ppath).importProtocol(server, function (data) { callback(data); });
    }
};

module.exports = protocols;