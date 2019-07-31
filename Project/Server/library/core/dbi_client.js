"use strict";
const hprose = require("hprose");
const format = require("string-format");
const async = require('async');
const proto_handler = autoload('core/proto_handler');
const thunkify = hprose.thunkify;

/**
 * 构造函数(RPC客户端).
 * @param {object} params 数据库参数
 * @return void
 */
const dbi_client = function(params) {
    this._logger = params.logger;
    this._server_conf = params.server_conf;
    this._protocols = params.protocols;
    this._rpcclient = null;
};

/**
 * 获取rpcclient
 * @param void
 * @returns {object} rpcclient
 */
dbi_client.prototype.rpcclient = function() {
    return this._rpcclient;
};

/**
 * 连接RPC服务器
 * @param {object} self 实例
 * @param {object} callback
 * @return void
 */
let _connect_rpc = thunkify(function(self, callback) {
    let conf = self._server_conf;
    let url = format('tcp://{0}:{1}', conf.dbip, conf.dbport);
    let rpcclient = hprose.Client.create(url, []);
    rpcclient.fullDuplex = true;
    rpcclient.maxPoolSize = 1;
    callback(null, rpcclient);
});

/**
 * 加载RPC协议
 * @param {object} self 实例
 * @param {object} callback
 * @return void
 */
let _load_protocol = thunkify(function(self, callback) {
    proto_handler.readRpcProtocols(null, self._protocols, function(protocol) {
        if (!protocol) {
            callback(null);
            return;
        }

        // 注册服务
        let classname = protocol.constructor.name;
        self._logger.info('[RPC Protocol Register] : ' + classname);
        let service = newpair(classname, Object.keys(protocol.__proto__));
        self._rpcclient.useService(service);
        callback(null);
    });
});

/**
 * Connect to dbi_server.
 * @param {object} callback
 * @returns void
 */
dbi_client.prototype.connect = function(callback) {
    let self = this;
    hprose.co(function*() {
        self._rpcclient = yield _connect_rpc(self);
        yield _load_protocol(self);
        self._rpcclient.on('error', function(func, err) {
            self._logger.error(func, err.code);
        });
        self._logger.info("Connect rpc server ok");
        callback(null, self._rpcclient);
    }).catch(function(err) {
        this._logger.error(err);
        callback(err, self._rpcclient);
    });
};

/**
 * 调用RPC接口
 * @param void
 * @returns void
 */
dbi_client.prototype.call = function() {
    let protocol = arguments[0].split('.');
    let args = [].slice.call(arguments, 1);
    let callback = args[args.length - 1];
    if (protocol.length !== 2) {
        callback(Error('Error protocol'));
        return;
    }

    let inst = protocol[0];
    if (isempty(this._rpcclient[inst])) {
        callback(Error('Not exist protocol instance: ' + inst));
        return;
    }

    let func = protocol[1];
    if (isempty(this._rpcclient[inst][func])) {
        callback(Error('Not exist protocol function: ' + func));
        return;
    }
    this.rawcall(protocol, args, function(ret) {
        callback(ret.err ? Error(ret.err) : null, ret.result);
    });
};

/**
 * 调用RPC接口
 * @param {object} protocol 协议
 * @param {object} args 参数
 * @param {object} callback
 * @returns void
 */
dbi_client.prototype.rawcall = function(protocol, args, callback) {
    args[args.length - 1] = callback;
    let inst = protocol[0];
    let func = protocol[1];
    this._rpcclient[inst][func].apply(this._rpcclient, args).catchError(function(err) {
        callback({ err: err, result: null });
    });
};

/**
 * 订阅数据
 * @param {string} name 数据名称
 * @param {object} inst 对象
 * @param {object} func 函数
 * @returns void
 */
dbi_client.prototype.subscribe = function(name, inst, func) {
    this._rpcclient.subscribe(name, function(data) {
        func.apply(inst, [data]);
    });
};

/**
 * 取消订阅数据
 * @param {string} name 数据名称
 * @returns void
 */
dbi_client.prototype.unsubscribe = function(name) {
    this._rpcclient.subscribe(name);
};

module.exports = dbi_client;