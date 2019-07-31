
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var heroshop = function() {
	this.ID = '';
	this.NAME = '';
	this.MODEL = '';
	this.DESC = '';
	this.COST = '';
	this.VISIBLE = '';
	this.INDEX = '';
};

var heroshopTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.heroshop;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new heroshop();
			obj.ID = tmpArr[i].ID;
			obj.NAME = tmpArr[i].NAME;
			obj.MODEL = tmpArr[i].MODEL;
			obj.DESC = tmpArr[i].DESC;
			obj.COST = tmpArr[i].COST;
			obj.VISIBLE = tmpArr[i].VISIBLE;
			obj.INDEX = tmpArr[i].INDEX;

        this._lines[tmpArr[i].ID] = obj;
    }
};

heroshopTable.Instance = function() {
    if (_singleton === null) {_singleton = new heroshopTable();}
    return _singleton;
};

heroshopTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = heroshopTable;
