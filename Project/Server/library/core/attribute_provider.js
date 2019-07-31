"use strict";
const _sign_ = "Attr_Buffer";

/**
 * 二级算子
 * @param {int} sub 
 * @param {object} obj 
 * @param {object} func 
 */
const SubOperator = function(sub, obj, func) {
    this.opArray = [];
    this.opArray.push({ "sub": sub, "obj": obj, "func": func });
};

/**
 * 二级刷新算子
 * @param {int} sub 
 * @param {object} obj 
 * @param {object} func 
 * @param {object} logger 
 */
const SubRefreshOperator = extend(SubOperator, function(sub, obj, func, logger) {
    SubOperator.apply(this, arguments);
    this.logger = logger;
});

/**
 * 获取二级元素
 * @param {int} sub 
 */
SubRefreshOperator.prototype.getElement = function(sub) {
    let idx = this.opArray.findIndex(function(element) {
        return element.sub === sub;
    });
    if (idx !== -1) {
        return this.opArray[idx];
    }
    return null;
};

/**
 * 增加刷新器
 * @param {int}} sub 
 * @param {object} obj 
 * @param {object} func 
 */
SubRefreshOperator.prototype.add = function(sub, obj, func) {
    let idx = this.opArray.findIndex(function(element) {
        return element.sub === sub;
    });
    let element = this.getElement(sub);
    if (!element) {
        this.opArray.push({ "sub": sub, "obj": obj, "func": func });
    }
};

/**
 * 执行刷新
 * @param {int}} attr 
 * @param {int} sub 
 * @param {int} id 
 * @param {object} arg 
 */
SubRefreshOperator.prototype.refresh = function(attr, sub, id, arg) {
    let element = this.getElement(sub);
    if (element) {
        return element.func.apply(element.obj, [attr, sub, id, arg]) || 0;
    }
    this.logger.error("[SubRefreshOperator.refresh]:couldn't find element attr:" + attr + "|sub:" + sub);
    return 0;
};

/**
 * 构造函数
 * @return void
 */
function AttrProvider(logger) {
    this.logger = logger;
    this.subRefreshMap = new Map();
    this.subBuffer = { _sign_: _sign_ };
}

/**
 * 注册refresh算子
 * @param {int} attr属性
 * @param {object} obj 对象
 * @param {object} func 对象成员函数
 * @return void
 */
AttrProvider.prototype.regRefresh = function(attr, obj, func) {
    this.regSubRefresh(attr, 0, obj, func);
};

/**
 * 注销refresh算子
 * @param {int} attr属性
 * @return void
 */
AttrProvider.prototype.unregRefresh = function(attr) {
    this.unregSubRefresh(attr);
};

/**
 * 刷新属性值
 * @param {int} attr属性
 * @param arg[object]附加参数
 * @return [object] 属性值
 */
AttrProvider.prototype.refresh = function(attr, arg) {
    return this.subRefresh(attr, 0, 0, arg);
};

/**
 * get
 * @param {int} attr属性
 * @return [object] 属性值
 */
AttrProvider.prototype.get = function(attr) {
    return this.subGet(attr, 0, 0);
};

/**
 * forEach
 * @param pred[function]谓语函数 ->(attr,value)
 * @return {bool}
 */
AttrProvider.prototype.forEach = function(pred) {
    return this.subForEach(pred, 0);
};

/**
 * 注册subrefresh算子
 * @param {int} attr属性
 * @param {int} sub 子属性
 * @param {object} obj 对象
 * @param {object} func 对象成员函数
 * @return void
 */
AttrProvider.prototype.regSubRefresh = function(attr, sub, obj, func) {
    let opt = this.subRefreshMap.get(attr);
    if (!opt) {
        opt = new SubRefreshOperator(sub, obj, func, this.logger);
        this.subRefreshMap.set(attr, opt);
    } else {
        opt.add(sub, obj, func);
    }
};

/**
 * 注销subget算子
 * @param {int} attr属性
 * @return void
 */
AttrProvider.prototype.unregSubRefresh = function(attr) {
    this.subRefreshMap.delete(attr);
};

/**
 * 查找缓冲值
 * @param {int} attr属性
 * @param {int} sub 子属性
 * @param {int} id 对象id optional
 * @return [object] 缓冲值
 */
AttrProvider.prototype.subFindCache = function(attr, sub, id) {
    if (this.subBuffer[id] && this.subBuffer[id][attr] && this.subBuffer[id][attr][sub]) {
        return this.subBuffer[id][attr][sub];
    }
    return 0;
};

/**
 * 查找匹配的缓冲值
 * @param {int} attr属性
 * @param {array} wildcard 通配符
 * @param {int} id 对象id optional
 * @return [object] 缓冲值求和
 */
AttrProvider.prototype.subFindCacheWithWildcard = function(attr, wildcard, id) {
    let attrBuffer = this.subBuffer[id];
    if (!attrBuffer) {
        return 0;
    }
    let _subBuffer = attrBuffer[attr];
    if (!_subBuffer) {
        return 0;
    }
    if (!Array.isArray(wildcard) || wildcard.length === 0) {
        return 0;
    }
    let cacheResult = 0;
    if (wildcard[0] === "*") {
        for (let sub in _subBuffer) {
            let cache = _subBuffer[sub];
            if (!cache || (typeof cache !== "number")) {
                continue;
            }
            cacheResult += cache;
        }
    } else {
        for (let sub in _subBuffer) {
            if (wildcard.includes(parseInt(sub, 10))) {
                let cache = _subBuffer[sub];
                if (!cache || (typeof cache !== "number")) {
                    continue;
                }
                cacheResult += cache;
            }
        }
    }
    return cacheResult;
};

/**
 * 带子属性的刷新属性值
 * @param {int} attr属性
 * @param {int} sub 子属性
 * @param {int} id 对象id optional
 * @param arg[object]附加参数
 * @return [object] 缓冲值
 */
AttrProvider.prototype.subRefresh = function(attr, sub, id, arg) {
    let opt = this.subRefreshMap.get(attr);
    if (!opt) {
        return 0;
    }
    id = id || 0;
    let val = opt.refresh(attr, sub, id, arg);
    if (val !== 0) {
        if (!this.subBuffer[id]) {
            this.subBuffer[id] = {};
        }
        if (!this.subBuffer[id][attr]) {
            this.subBuffer[id][attr] = {};
        }
        this.subBuffer[id][attr][sub] = val;
    } else {
        if (this.subBuffer[id] && this.subBuffer[id][attr]) {
            delete this.subBuffer[id][attr][sub];
        }
    }
    return val;
};

/**
 * 查找缓冲值
 * @param {int} attr属性
 * @param {int} sub 子属性
 * @param {int} id 对象id optional
 * @return [object] 缓冲值
 */
AttrProvider.prototype.subGet = function(attr, sub, id) {
    return this.subFindCache(attr, sub, id || 0);
};

/**
 * 带子属性的获取部分属性值之和(通配符格式:全部获取["*"];部分获取[sub1,sub2...])
 * @param {int} attr属性
 * @param {array} wildcard 通配符
 * @param {object} id对象id optional
 * @return void
 */
AttrProvider.prototype.subRawFullGet = function(attr, wildcard, id) {
    return this.subFindCacheWithWildcard(attr, wildcard, id || 0);
};

/**
 * 带子属性的获取全部属性值之和
 * @param {int} attr属性
 * @param {object} id对象id optional
 * @return void
 */
AttrProvider.prototype.subFullGet = function(attr, id) {
    return this.subRawFullGet(attr, ["*"], id);
};

/**
 * toBuffer
 * @return {object} buff 
 */
AttrProvider.prototype.toBuffer = function() {
    return this.subBuffer;
};

/**
 * fromBuffer
 * @return {bool}
 */
AttrProvider.prototype.fromBuffer = function(buffer) {
    if (buffer._sign_ !== _sign_) {
        return false;
    }
    for (let id in buffer) {
        if (id === "_sign_") {
            continue;
        }
        for (let attr in buffer[id]) {
            if (!this.subRefreshMap.has(parseInt(attr, 10))) {
                continue;
            }
            for (let sub in buffer[id][attr]) {
                if (!this.subBuffer[id]) {
                    this.subBuffer[id] = {};
                }
                if (!this.subBuffer[id][attr]) {
                    this.subBuffer[id][attr] = {};
                }
                this.subBuffer[id][attr][sub] = buffer[id][attr][sub];
            }
        }
    }
    return true;
};

/**
 * subForEach
 * @param {object} pred 谓语函数 ->(attr,fullValue)
 * @param {int} id 对象id optional
 * @return {bool}
 */
AttrProvider.prototype.subForEach = function(pred, id) {
    id = id || 0;
    let attrBuffer = this.subBuffer[id];
    if (!attrBuffer) {
        return false;
    }
    for (let attr in attrBuffer) {
        let fullValue = 0;
        for (let sub in attrBuffer[attr]) {
            fullValue += (parseInt(attrBuffer[attr][sub], 10) || 0);
        }
        pred(parseInt(attr, 10), fullValue);
    }
    return true;
};

module.exports = AttrProvider;