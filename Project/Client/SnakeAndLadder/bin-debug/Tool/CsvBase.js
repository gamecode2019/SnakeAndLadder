// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//type IKey = (number & string);
var CsvBaseManager = (function () {
    function CsvBaseManager() {
        //T : {new():CsvBase};
        this.mListCsv = new Array();
        this.mDictionaryCsv = {};
        this.onLoad();
    }
    CsvBaseManager.prototype.onLoad = function () {
        this.DoLoad(this.ConfigName());
    };
    CsvBaseManager.prototype.DoLoad = function (name) {
        var result = RES.getRes(name); //SingletonFactory.Instance(ResourcesManger).getRes(name)
        var lines = result.split('\r\n');
        this.UpdateValues(lines);
    };
    // create(c: {new(): T}): T { 
    // return new c();
    // }
    CsvBaseManager.prototype.UpdateValues = function (lines) {
        var starID = this.UseNote ? 3 : 2;
        this.mListCsv = [];
        this.mDictionaryCsv = {};
        for (var i = starID, iMax = lines.length; i < iMax; i++) {
            var obj = this.create();
            var strl = lines[i];
            if (StringHelp.IsEmpty(strl)) {
                continue;
            }
            var vs = strl.split(',');
            if (vs.length < obj.ColNum()) {
                egret.error(StringHelp.Format("配置[{0}]数据缺少Line[{1}]--->{2}/{3}", this.ConfigName(), i, vs.length, obj.ColNum()));
                continue;
            }
            obj.SetValues(vs);
            obj.OnInit();
            var kk = this.GetKeyCsv(obj);
            if (!this.mDictionaryCsv[kk]) {
                this.mListCsv.push(obj);
                this.mDictionaryCsv[kk] = obj;
            }
            else {
                egret.error(StringHelp.Format("配置[{0}]重复Line[{1}]Key[{2}]", this.ConfigName(), i, kk.ToString()));
            }
        }
    };
    CsvBaseManager.prototype.GetItem = function (kk) {
        var ret = this.mDictionaryCsv[kk];
        if (!ret) {
            egret.error(StringHelp.Format("[{0}]错误的key={1}", this.ConfigName(), kk));
            ret = this.mListCsv[0];
        }
        return ret;
    };
    CsvBaseManager.prototype.GetAll = function () {
        return this.mListCsv;
    };
    return CsvBaseManager;
}());
__reflect(CsvBaseManager.prototype, "CsvBaseManager");
//# sourceMappingURL=CsvBase.js.map