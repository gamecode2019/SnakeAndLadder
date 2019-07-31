"use strict";

/**
 * IoBuffer 构造函数.
 * @param [] void
 * @return [] 无返回值
 */
var IoBuffer = function () {
    this._totalLength = 1024 * 8;
    this._buffer = new Buffer(this._totalLength);
    this._writePosition = 0;
    this._readPosittion = 0;
};

/**
 * 写入数据
 * @param buffer [object] 数据流
 * @param parsePacket [object] 解析数据函数
 * @return [bool] 操作结果
 */
IoBuffer.prototype.write = function (buffer, parsePacket) {
    // 比较好的一种情况就是每次接收到的数据都是一个完成的报文
    var recvLength = buffer.length;
    var readLength = 0;
    if (this._writePosition == 0) {
        readLength = parsePacket(buffer, recvLength);
        if (readLength > recvLength) {
            return false;
        }

        if (readLength < recvLength) {
            var leftLength = recvLength - readLength;
            buffer.copy(this._buffer, this._writePosition, readLength, buffer.length);
            this._writePosition += leftLength;
        }
        return true;
    }
    if (recvLength > this._totalLength - this._writePosition) {
        return false;
    }

    // 拼接之前不完整的buffer
    buffer.copy(this._buffer, this._writePosition);
    this._writePosition += recvLength;
    readLength = parsePacket(this._buffer, this._writePosition);
    if (readLength == 0) {
        return true;
    }
    if (readLength > this._writePosition) {
        return false;
    }

    // 移动读走的buffer
    this._buffer.copy(this._buffer, 0, this._writePosition - readLength, this._writePosition);
    this._writePosition -= readLength;
    return true;
};

module.exports = IoBuffer;