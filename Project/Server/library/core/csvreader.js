"use strict";
const fs = require('fs');
const async = require('async');
const csv = require('csv');

/**
 * CSVInfo构造函数
 */
const CSVInfo = function() {
    this.fname = '';
    this.fullpath = '';
};

/**
 * 异步读取数据
 * @param {object} logger 日志对象 
 * @param {string} path 文件路径 
 * @param {string} _index 文件名
 * @param {function} callback 回调函数
 */
const _reader_getData = function(logger, path, _index, callback) {
    let parser = csv.parse({ columns: true }, function(err, data) {
        if (err) {
            logger.error('[_reader_getData] read CSV err: ' + path);
            callback(-1, 0);
            return;
        }

        logger.info('[_reader_getData] Reading Config File: ' + path);
        callback(data, _index);
    });
    let readStream = fs.createReadStream(path, { encoding: 'utf8' });
    readStream.pipe(parser);
};

/**
 * 递归读取配置
 * @param {string} path 路径
 */
const _reader_traverse = function(path) {
    let list = [];
    let files = fs.readdirSync(path);
    files.forEach(function(item) {
        let tmp_path = path + '/' + item;
        let stats = fs.statSync(tmp_path);
        if (stats.isDirectory()) {
            _reader_traverse(tmp_path);
        } else {
            let ci = new CSVInfo();
            ci.fname = item.substring(0, item.length - 4); //不带后缀名的文件名
            ci.fullpath = tmp_path;
            list.push(ci);
        }
    });
    return list;
};

/**
 * CSV配置表读取
 */
const reader = { 'config_csv_tables': [] };

/**
 * 分析csv表
 * @param {object} logger 
 * @param {string} path 
 * @param {object} callback 
 */
reader.csvReader = function(logger, path, callback) {
    let self = this;
    let list = _reader_traverse(path);
    async.forEach(list, function(item, each_cb) {
        _reader_getData(logger, item.fullpath, item.fname, function(data, fname) {
            if (data === -1) {
                each_cb('[csvReader] read ERR!');
            } else {
                //data.shift();
                while (data[0].ID === '0') {
                    data.shift();
                }

                while (data[data.length - 1].ID === '') {
                    data.pop();
                }
                self.config_csv_tables[fname] = data;
                each_cb();
            }
        });
    }, function(err) {
        callback(err);
    });
};

module.exports = reader;