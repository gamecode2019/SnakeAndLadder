"use strict";
const libmd5 = require('md5');
let crypt = {};
module.exports = crypt;

// base64
crypt.base64 = {};
crypt.base64.encode = function(source, count) {
    let encode_string = new Buffer(source).toString('base64');
    if (--count > 0) {
        return crypt.base64.encode(encode_string, count);
    }
    return encode_string;
};
crypt.base64.decode = function(source, count) {
    let decode_string = new Buffer(source, 'base64').toString();
    if (--count > 0) {
        return crypt.base64.decode(decode_string, count);
    }
    return decode_string;
};

// md5
crypt.md5 = {};
crypt.md5.get_md5_hash = function(plane_text) {
    return libmd5(plane_text);
};

// strip
crypt.sqlstrip = {};
crypt.sqlstrip.encode = function(source) {
    let target = JSON.stringify(source);
    return crypt.base64.encode(target);
};
crypt.sqlstrip.decode = function(source) {
    let target = crypt.base64.decode(source);
    return JSON.parse(target);
};

// uindex
crypt.uindex = {};
crypt.uindex.rowkey = function(row, uindex, primary) {
    let len = uindex.length;
    let data = new Array(len);
    for (let i = 0; i < len; ++i) { data[i] = row[uindex[i]]; }
    return crypt.md5.get_md5_hash(data.join(':'));
};
crypt.uindex.strkey = function() {
    let key = Array.prototype.slice.call(arguments).join(':');
    return crypt.md5.get_md5_hash(key);
};

crypt.uindex.globalid = function(nodeid, uid) {
    nodeid = parseInt(nodeid);
    if (nodeid > 9999) {
        throw Error('nodeid must less than 9999');
    }
    return (parseInt(uid) * 10000 + nodeid);
};