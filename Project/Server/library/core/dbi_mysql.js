"use strict";
const driver = require('mysql');
const hprose = require('hprose');
const thunkify = hprose.thunkify;

/**
 * 构造函数.
 * @param void
 * @return void
 */
const dbi_mysql = function(server) {
    this._pool = null;
    this._server = server;
};

/**
 * Connect to mysql pool.
 * @param {object} 连接参数
 * @returns void
 */
dbi_mysql.prototype.connect = function(params) {
    if (this._pool === null) {
        this._pool = driver.createPool(params);
    }
};

/**
 * Query the specified database.
 * @param {string} sql
 * @param {object} callback
 * @returns {object} Query result
 */
dbi_mysql.prototype.query = function(sql, callback) {
    let self = this;
    this._pool.getConnection(function(err, conn) {
        if (err) {
            callback(err);
            return;
        }
        conn.query(sql, function(qerr, rows, fields) {
            if (qerr) {
                callback(qerr);
            } else {
                callback(null, rows);
            }
            conn.release();
        });
    });
};
dbi_mysql.prototype.coQuery = thunkify(dbi_mysql.prototype.query);

/**
 * Fetchs the row.
 * @param {object} select sql选择器
 * @param {object} callback
 * @returns {object} Query result
 */
dbi_mysql.prototype.fetchRow = function(select, callback) {
    let sql = this.select(select, 'select');
    this.query(sql, function(err, data) {
        if (err === null) {
            callback(null, (data.length === 0) ? null : data[0]);
        } else {
            callback(err);
        }
    });
};
dbi_mysql.prototype.coFetchRow = thunkify(dbi_mysql.prototype.fetchRow);

/**
 * Fetchs the rows.
 * @param {object} select sql选择器
 * @param {object} callback
 * @returns {object} Query result
 */
dbi_mysql.prototype.fetchRows = function(select, callback) {
    let sql = this.select(select, 'select');
    this.query(sql, callback);
};
dbi_mysql.prototype.coFetchRows = thunkify(dbi_mysql.prototype.fetchRows);

/**
 * Fetchs the rows.
 * @param {object} select sql选择器
 * @param {object} callback
 * @returns {object} Query result
 */
dbi_mysql.prototype.count = function(select, callback) {
    let from = select.from;
    select.from = 'COUNT(*) AS total';
    let sql = this.select(select, 'select');
    select.from = from;
    this.query(sql, function(err, data) {
        if (err === null) {
            callback(null, data[0].total);
        } else {
            callback(err);
        }
    });
};
dbi_mysql.prototype.coCount = thunkify(dbi_mysql.prototype.count);

/**
 * Insert rows.
 * @param {object} select
 * @param {object} callback
 * @returns {object} Query result
 */
dbi_mysql.prototype.insert = function(select, callback) {
    let sql = this.select(select, 'insert');
    this.query(sql, callback);
};
dbi_mysql.prototype.coInsert = thunkify(dbi_mysql.prototype.insert);

/**
 * Delete rows.
 * @param {object} select
 * @param {object} callback
 * @returns {object} Query result
 */
dbi_mysql.prototype.delete = function(select, callback) {
    let sql = this.select(select, 'delete');
    this.query(sql, callback);
};
dbi_mysql.prototype.coDelete = thunkify(dbi_mysql.prototype.delete);

/**
 * Update rows.
 * @param {object} select
 * @param {object} callback
 * @returns {object} Query result
 */
dbi_mysql.prototype.update = function(select, callback) {
    let sql = this.select(select, 'update');
    this.query(sql, callback);
};
dbi_mysql.prototype.coUpdate = thunkify(dbi_mysql.prototype.update);

/**
 * Replace rows.
 * @param {object} select
 * @param {object} callback
 * @returns {object} Query result
 */
dbi_mysql.prototype.replace = function(select, callback) {
    let sql = this.select(select, 'replace');
    this.query(sql, callback);
};
dbi_mysql.prototype.coReplace = thunkify(dbi_mysql.prototype.replace);

/**
 * Get standard select sentence.
 * @param {object} select data
 * @param {object} select type
 * @returns {string} Query select.
 */
dbi_mysql.prototype.select = function(data, type) {
    switch (type.toLowerCase()) {
        case 'insert':
            {
                let sql = 'INSERT INTO ';
                let keys = [];
                let values = [];
                for (let item in data.data) {
                    keys.push(item);
                    values.push('"' + data.data[item] + '"');
                }
                sql += data.table + ' (' + keys.join(',') + ') ';
                sql += 'VALUES (' + values.join(',') + ') ';
                return sql;
            }
        case 'replace':
            {
                let sql = 'REPLACE INTO ';
                let keys = [];
                let values = [];
                for (let item in data.data) {
                    keys.push(item);
                    values.push('"' + data.data[item] + '"');
                }
                sql += data.table + ' (' + keys.join(',') + ') ';
                sql += 'VALUES (' + values.join(',') + ') ';
                return sql;
            }
        case 'select':
            {
                let sql = 'SELECT ';
                sql += (("undefined" !== typeof data.from) ? data.from : '*') + ' FROM ';
                sql += data.table + ' WHERE ';
                sql += (("undefined" !== typeof data.where) ? data.where : '0') + ' ';
                sql += (("undefined" !== typeof data.groupby) ? ('GROUP BY ' + data.groupby + ' ') : '');
                sql += (("undefined" !== typeof data.having) ? ('HAVING ' + data.having + ' ') : '');
                sql += (("undefined" !== typeof data.order) ? ('ORDER BY ' + data.order + ' ') : '');
                sql += (("undefined" !== typeof data.limit) ? ('LIMIT ' + data.limit) : '');
                return sql;
            }
        case 'update':
            {
                let update = [];
                for (let item in data.data) {
                    update.push(item + '="' + data.data[item] + '"');
                }
                let sql = 'UPDATE ';
                sql += data.table + ' SET ' + update.join(',') + ' WHERE ';
                sql += (("undefined" !== typeof data.where) ? data.where : '0');
                return sql;
            }
        case 'delete':
            {
                let sql = 'DELETE FROM  ' + data.table + ' WHERE ';
                sql += (("undefined" !== typeof data.where) ? data.where : '0');
                return sql;
            }
        default:
            throw Error('不存在该种数据库操作：' + type.toLowerCase());
    }
};

module.exports = dbi_mysql;