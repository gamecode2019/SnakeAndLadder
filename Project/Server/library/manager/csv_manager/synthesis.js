
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var synthesis = function() {
	this.ID = '';
	this.TYPE = '';
	this.GRADE = '';
	this.NAME = '';
	this.TXT = '';
	this.PURCHASE = '';
	this.REPEAT = '';
	this.SELL = '';
	this.PNG = '';
	this.MAP = '';
	this.BULLET1 = '';
	this.BULLET2 = '';
	this.MAIN = '';
	this.AUXILIARY = '';
	this.ATTRIBUTE1 = '';
	this.NUME1 = '';
	this.ATTRIBUTE2 = '';
	this.NUME2 = '';
	this.ATTRIBUTE3 = '';
	this.NUME3 = '';
	this.UNLOCK = '';
	this.DIAMONDS = '';
};

var synthesisTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.synthesis;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new synthesis();
			obj.ID = tmpArr[i].ID;
			obj.TYPE = tmpArr[i].TYPE;
			obj.GRADE = tmpArr[i].GRADE;
			obj.NAME = tmpArr[i].NAME;
			obj.TXT = tmpArr[i].TXT;
			obj.PURCHASE = tmpArr[i].PURCHASE;
			obj.REPEAT = tmpArr[i].REPEAT;
			obj.SELL = tmpArr[i].SELL;
			obj.PNG = tmpArr[i].PNG;
			obj.MAP = tmpArr[i].MAP;
			obj.BULLET1 = tmpArr[i].BULLET1;
			obj.BULLET2 = tmpArr[i].BULLET2;
			obj.MAIN = tmpArr[i].MAIN;
			obj.AUXILIARY = tmpArr[i].AUXILIARY;
			obj.ATTRIBUTE1 = tmpArr[i].ATTRIBUTE1;
			obj.NUME1 = tmpArr[i].NUME1;
			obj.ATTRIBUTE2 = tmpArr[i].ATTRIBUTE2;
			obj.NUME2 = tmpArr[i].NUME2;
			obj.ATTRIBUTE3 = tmpArr[i].ATTRIBUTE3;
			obj.NUME3 = tmpArr[i].NUME3;
			obj.UNLOCK = tmpArr[i].UNLOCK;
			obj.DIAMONDS = tmpArr[i].DIAMONDS;

        this._lines[tmpArr[i].ID] = obj;
    }
};

synthesisTable.Instance = function() {
    if (_singleton === null) {_singleton = new synthesisTable();}
    return _singleton;
};

synthesisTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = synthesisTable;
