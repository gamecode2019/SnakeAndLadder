
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var srtoy = function() {
	this.ID = '';
	this.NAME = '';
	this.TRIGGER = '';
	this.CONDITION = '';
	this.PNG = '';
	this.TXT = '';
	this.MUSIC = '';
};

var srtoyTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.srtoy;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new srtoy();
			obj.ID = tmpArr[i].ID;
			obj.NAME = tmpArr[i].NAME;
			obj.TRIGGER = tmpArr[i].TRIGGER;
			obj.CONDITION = tmpArr[i].CONDITION;
			obj.PNG = tmpArr[i].PNG;
			obj.TXT = tmpArr[i].TXT;
			obj.MUSIC = tmpArr[i].MUSIC;

        this._lines[tmpArr[i].ID] = obj;
    }
};

srtoyTable.Instance = function() {
    if (_singleton === null) {_singleton = new srtoyTable();}
    return _singleton;
};

srtoyTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = srtoyTable;
