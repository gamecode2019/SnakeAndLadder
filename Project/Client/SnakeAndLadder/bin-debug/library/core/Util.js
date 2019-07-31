var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。
     * name属性请参考resources/resource.json配置文件的内容。
     * @param {string} name 位图名称
     * @return {object} 位图
     */
    Util.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 格式化日期
     * @param {Date} date
     */
    Util.formatDateMonth = function (date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return month + '月' + day + '日';
    };
    /**
     * 安全拷贝对象
     * @param {object} dst 目标
     * @param {object} src 拷贝源
     * @param {string} dstPrefix 目标前缀
     * @param {string} srcPrefix 来源前缀
     * @return {object} values
     */
    Util.safeCopy = function (dst, src, dstPrefix, srcPrefix) {
        dstPrefix = dstPrefix || '';
        srcPrefix = srcPrefix || '';
        for (var srcName in src) {
            var dstName = dstPrefix + srcName.replace(srcPrefix, '');
            var type = typeof dst[dstName];
            if (type === 'undefined') {
                continue;
            }
            if (type === 'number') {
                dst[dstName] = parseFloat(src[srcName]);
                continue;
            }
            if (src.hasOwnProperty(srcName)) {
                dst[srcName] = src[srcName];
            }
            //dst[dstName] = src[srcName];
        }
        return dst;
    };
    ;
    /**
     * 安全扩展对象
     * @param {object} dst 目标
     * @param {object} src 拷贝源
     * @return {object} values
     */
    Util.safeExtend = function (dst, src) {
        for (var name_1 in src) {
            dst[name_1] = src[name_1];
        }
        return dst;
    };
    ;
    /**
     * 将锚点设置为正中心
     * @param {egret.DisplayObject} obj
     * @return  {Array<number>}
     */
    Util.setAnchorMiddle = function (obj) {
        obj.$anchorOffsetX = obj.width / 2;
        obj.$anchorOffsetY = obj.height / 2;
    };
    /**
     * 获得当前屏幕中心
     */
    Util.getScreenCenterPos = function () {
        var re = [];
        re.push(UIManager.instance().stageWidth() / 2);
        re.push(UIManager.instance().stageHeight() / 2);
        return re;
    };
    //--------本地数据存储
    /**
     * 数据存储函数
     */
    Util.save_key = function (key_name, key_value) {
        var value = key_value;
        value = JSON.stringify(value);
        egret.localStorage.setItem(key_name, value);
    };
    /**
     * 读取数据
     */
    Util.get_key = function (key_name) {
        var value = egret.localStorage.getItem(key_name);
        if (value && value != "undefined" && value != "null") {
            return JSON.parse(value);
        }
        return null;
    };
    /**
     * 删除数据
     */
    Util.del_key = function (key_name) {
        egret.localStorage.removeItem(key_name);
        return true;
    };
    /**
     * 图片转base64格式
     */
    Util.getBase64Image = function (res) {
        var png = RES.getRes(res);
        var Bitmap = new egret.Bitmap(png);
        return Bitmap.texture.toDataURL('image/png');
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map