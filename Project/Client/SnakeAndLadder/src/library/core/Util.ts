class Util {
    /**
     * 根据name关键字创建一个Bitmap对象。
     * name属性请参考resources/resource.json配置文件的内容。
     * @param {string} name 位图名称
     * @return {object} 位图
     */
    public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 格式化日期
     * @param {Date} date
     */
    public static formatDateMonth(date: Date) {
        const month: number = date.getMonth() + 1;
        const day: number = date.getDate();
        return month + '月' + day + '日';
    }

    /**
     * 安全拷贝对象
     * @param {object} dst 目标
     * @param {object} src 拷贝源
     * @param {string} dstPrefix 目标前缀
     * @param {string} srcPrefix 来源前缀
     * @return {object} values
     */
    public static safeCopy(dst: any, src: any, dstPrefix?: string, srcPrefix?: string) {
        dstPrefix = dstPrefix || '';
        srcPrefix = srcPrefix || '';
        for (let srcName in src) {
            let dstName = dstPrefix + srcName.replace(srcPrefix, '');
            let type = typeof dst[dstName];
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

    /**
     * 安全扩展对象
     * @param {object} dst 目标
     * @param {object} src 拷贝源
     * @return {object} values
     */
    public static safeExtend(dst, src) {
        for (let name in src) {
            dst[name] = src[name];
        }
        return dst;
    };


    /**
     * 将锚点设置为正中心
     * @param {egret.DisplayObject} obj
     * @return  {Array<number>}  
     */
    public static setAnchorMiddle(obj: egret.DisplayObject): void {
        obj.$anchorOffsetX = obj.width / 2;
        obj.$anchorOffsetY = obj.height / 2;
    }

    /**
     * 获得当前屏幕中心
     */
    public static getScreenCenterPos(): Array<number> {
        let re: Array<number> = [];
        re.push(UIManager.instance().stageWidth() / 2);
        re.push(UIManager.instance().stageHeight() / 2);
        return re;
    }

    //--------本地数据存储
    /**
     * 数据存储函数
     */
    public static save_key(key_name:string,key_value:any){
        let value:any = key_value;
        value = JSON.stringify(value);
        egret.localStorage.setItem(key_name,value);     
    }

    /**
     * 读取数据
     */
    public static get_key<T>(key_name:string):T{
        let value:any = egret.localStorage.getItem(key_name);
        if (value && value != "undefined" && value != "null") {
            return <T>JSON.parse(value);
        }
        return null;
    }


    /**
     * 删除数据
     */
    public static del_key(key_name:string){
        egret.localStorage.removeItem(key_name);
        return true;
    }

    /**
     * 图片转base64格式
     */
    public static getBase64Image(res){
        var png = RES.getRes(res);
        let Bitmap = new egret.Bitmap(png)
        return Bitmap.texture.toDataURL('image/png');
    }
}