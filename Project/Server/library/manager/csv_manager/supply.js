
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var supply = function() {
	this.ID = '';
	this.TYPE = '';
	this.CALL = '';
	this.NUMBER = '';
	this.TIME = '';
	this.DESC = '';
};

var supplyTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.supply;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new supply();
			obj.ID = tmpArr[i].ID;
			obj.TYPE = tmpArr[i].TYPE;
			obj.CALL = tmpArr[i].CALL;
			obj.NUMBER = tmpArr[i].NUMBER;
			obj.TIME = tmpArr[i].TIME;
			obj.DESC = tmpArr[i].DESC;

        this._lines[tmpArr[i].ID] = obj;
    }
};

supplyTable.Instance = function() {
    if (_singleton === null) {_singleton = new supplyTable();}
    return _singleton;
};

supplyTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = supplyTable;
