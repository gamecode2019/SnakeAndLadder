// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
////////////////////////////////
/// SongSheetCsv.cs——CSV信息类
////////////////////////////////
var SongSheetCsv = (function () {
    function SongSheetCsv() {
        this.line = new Array();
        //extend_e
    }
    SongSheetCsv.prototype.SetValues = function (values) {
        var i = 0;
        this._INDEX = Number(values[i++]);
        this.line.push(this._INDEX);
        this._NAME = values[i++];
        this.line.push(this._NAME);
        this._RES = values[i++];
        this.line.push(this._RES);
        this._SPEED = Number(values[i++]);
        this.line.push(this._SPEED);
        this._VOLUME = Number(values[i++]);
        this.line.push(this._VOLUME);
    };
    SongSheetCsv.prototype.ColNum = function () { return 5; };
    Object.defineProperty(SongSheetCsv.prototype, "INDEX", {
        get: function () { return this._INDEX; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SongSheetCsv.prototype, "NAME", {
        get: function () { return this._NAME; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SongSheetCsv.prototype, "RES", {
        get: function () { return this._RES; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SongSheetCsv.prototype, "SPEED", {
        get: function () { return this._SPEED; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SongSheetCsv.prototype, "VOLUME", {
        get: function () { return this._VOLUME; },
        enumerable: true,
        configurable: true
    });
    //extend_s
    SongSheetCsv.prototype.OnInit = function () { };
    ;
    return SongSheetCsv;
}());
__reflect(SongSheetCsv.prototype, "SongSheetCsv", ["CsvBase"]);
////////////////////////////////
/// SongSheetCsvManage.cs——CSV信息管理类
////////////////////////////////
var SongSheetCsvManage = (function (_super) {
    __extends(SongSheetCsvManage, _super);
    function SongSheetCsvManage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SongSheetCsvManage.prototype.ConfigName = function () { return "SongSheet_csv"; };
    SongSheetCsvManage.prototype.UseNote = function () { return true; };
    SongSheetCsvManage.prototype.GetKeyCsv = function (cvs) { return cvs.INDEX; };
    SongSheetCsvManage.prototype.create = function () { return new SongSheetCsv(); };
    return SongSheetCsvManage;
}(CsvBaseManager));
__reflect(SongSheetCsvManage.prototype, "SongSheetCsvManage");
//# sourceMappingURL=SongSheetCsv.js.map