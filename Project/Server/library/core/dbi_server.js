"use strict";
const hprose = require("hprose");
const format = require("string-format");
const dbi_redis = autoload('core/dbi_redis');
const dbi_mysql = autoload('core/dbi_mysql');
const proto_handler = autoload('core/proto_handler');
const thunkify = hprose.thunkify;

/**
 * 构造函数.
 * 带自动落地的数据服务器.
 * @param {object} params
 * @return void
 */
const dbi_server = function(params) {
    this._name = params.name || 'data-server';
    this._logger = params.logger;
    this._mysql_conf = params.mysql_conf;
    this._redis_conf = params.redis_conf;
    this._server_conf = params.server_conf;
    this._protocols = params.protocols;
    this._mysql = null;
    this._redis = null;
    this._server = null;
    this._synclist = [];
};

/**
 * 启动mysql.
 * @param {object} self 实例
 * @param {object} conf 配置
 * @param {object} callback 回调函数
 * @return void
 */
let _start_mysql = thunkify(function(self, conf, callback) {
    self._mysql = new dbi_mysql(self);
    self._mysql.connect(conf);
    self._logger.info('Connect to mysql server');
    callback(null);
});

/**
 * 启动redis.
 * @param {object} self 实例
 * @param {object} conf 配置
 * @param {object} callback 回调函数
 * @return void
 */
let _start_redis = thunkify(function(self, conf, callback) {
    self._redis = new dbi_redis(self);
    self._redis.createDB(conf, function(err) {
        if (err === null) {
            self._logger.info('Connect to redis server');
        } else {
            self._logger.error(err.message);
        }
        callback(null);
    });
});

/**
 * 启动RPC服务.
 * @param {object} conf 配置
 * @param {string} path 协议路径
 * @param {object} callback 回调函数
 * @return void
 */
let _start_server = thunkify(function(self, conf, path, callback) {
    let url = format('tcp://{0}:{1}', conf.dbip, conf.dbport);
    self._server = hprose.Server.create(url);
    proto_handler.readRpcProtocols(self, path, function(protocol) {
        if (!protocol) {
            callback(null);
            return;
        }

        // 注册服务
        let classname = protocol.constructor.name;
        self._logger.info('[RPC Protocol Register] : ' + classname);
        self._server.addAsyncInstanceMethods(protocol, classname);
        callback(null);
    });
});

/**
 * Start server.
 * @param {object} config 数据表对象
 * @return void
 */
dbi_server.prototype.start = function(config) {
    let self = this;
    hprose.co(function*() {
        yield _start_mysql(self, self._mysql_conf);
        yield _start_redis(self, self._redis_conf);
        yield _start_server(self, self._server_conf, self._protocols);
        self._server.start();
        self._server.on('sendError', function(err) {
            self._logger.error('[Send error] : ', err.code);
        });

        // 加载冷数据到内存库
        self.loadData(config);
        self.publish('system'); // 订阅系统参数
        self._logger.info("Data server start OK");
    }).catch(function(err) {
        self._logger.error(err);
    });
};

/**
 * 根据分布式ID获取对应的Redis连接对象
 * @param {int} id 分布式ID
 * @returns {object} Redis连接对象
 */
dbi_server.prototype.redis = function(id) {
    return this._redis.getDB(id);
};

/**
 * 根据分布式ID获取对应的mysql连接对象
 * @param {int} id 分布式ID
 * @returns {object} Redis连接对象
 */
dbi_server.prototype.mysql = function(id) {
    return this._mysql;
};

/**
 * 增加待同步数据
 * @param {string} key 数据key
 * @param {string} type 数据操作类型
 * @param {object} row 数据对象
 * @return void
 */
dbi_server.prototype.addSync = function(key, type, row) {
    this._synclist.push({ key: key, type: type, value: row });
};

/**
 * 数据落地
 * @param {object} self 数据服务器 
 * @return void
 */
let _sync_data = function(self) {
    let length = self._synclist.length;
    for (let i = 0; i < length; ++i) {
        let command = self._synclist.shift();
        if (command === null) {
            continue;
        }

        // 设置表主键
        let params = command.key.split(':');
        let primary = params[0].substr(2, 3) + '_id';

        // 同步数据
        let select = {};
        select.table = params[0];
        select.data = command.value;
        select.where = format('{0}="{1}"', primary, params[1]);
        self._mysql[command.type](select, function(err) {
            if (err !== null) {
                self._logger.error(err, select.data);
            }
        });
    }
};

/**
 * 帧更新
 * @param {int} time 时间
 * @return void
 */
dbi_server.prototype.update = function(time) {
    _sync_data(this);
};

/**
 * 加载冷数据到redis
 * @param {object} redis 数据库
 * @param {string} key 主键
 * @param {object} row 表数据
 * @param {object} callback  回调
 * @return void
 */
let _redis_set = thunkify(function(redis, key, row, callback) {
    redis.oset(key, row, callback);
});

/**
 * 产生索引逆序
 * @param {object} config  数据定义
 * @param {object} redis 数据库
 * @param {string} tname  表名
 * @param {object} row 表数据
 * @param {object} callback  回调
 * @return void
 */
let _redis_uindex = thunkify(function(config, redis, tname, row, callback) {
    redis.uindex(config, tname, row, callback);
});

/**
 * 产生主键反向有序集合
 * @param {object} config  数据定义
 * @param {object} redis 数据库
 * @param {string} tname  表名
 * @param {object} row 表数据
 * @param {object} callback  回调
 * @return void
 */
let _redis_usets = thunkify(function(config, redis, tname, row, callback) {
    redis.uzset(config, tname, row, 0, callback);
});

/**
 * 删除主键反向有序集合
 * @param {object} config  数据定义
 * @param {object} redis 数据库
 * @param {string} tname  表名
 * @param {object} callback  回调
 * @return void
 */
let _redis_udel = thunkify(function(config, redis, tname, callback) {
    redis.udel(config, tname, 0, callback);
});

/**
 * 冷数据装载到内存
 * @param {object} config 数据表对象
 * @return void
 */
dbi_server.prototype.loadData = function(config) {
    let self = this;
    let keys = Object.keys(config);
    let redis = self.redis(0);
    let mysql = self.mysql(0);

    // 读mysql数据
    hprose.co(function*() {
        for (let item in keys) {
            let tname = keys[item];
            let table = config[keys[item]];
            if ('function' !== typeof table || tname.substr(1, 1) !== '_') {
                continue;
            }

            // 读取单个数据
            let select = {};
            select.table = tname;
            select.from = '*';
            select.where = '1';
            let total = yield mysql.coCount(select);

            yield _redis_udel(config, redis, tname);
            for (let i = 0; i < total; ++i) {
                select.limit = i + ',1';
                let row = yield mysql.coFetchRow(select);
                let primary = tname.substr(2, 3) + '_id';
                if (!row.hasOwnProperty(primary)) {
                    continue;
                }
                let key = redis.joinKey(tname, row[primary]);
                yield _redis_set(redis, key, row);
                yield _redis_uindex(config, redis, tname, row);
                yield _redis_usets(config, redis, tname, row);
            }
        }
    }).catch(function(err) {
        self._logger.error(err.message);
    });
};

/**
 * 发布订阅数据
 * @param {string} name 订阅名称
 * @return void
 */
dbi_server.prototype.publish = function(name) {
    this._server.publish(name);
};

/**
 * 推送订阅数据
 * @param {string} name 订阅名称
 * @param {object} data 订阅数据
 * @return void
 */
dbi_server.prototype.push = function(name, data) {
    this._server.push(name, data);
};

module.exports = dbi_server;