
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var number = function() {
	this.ID = '';
	this.NUMBER = '';
	this.MONSTER = '';
};

var numberTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.number;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new number();
			obj.ID = tmpArr[i].ID;
			obj.NUMBER = tmpArr[i].NUMBER;
			obj.MONSTER = tmpArr[i].MONSTER;

        this._lines[tmpArr[i].ID] = obj;
    }
};

numberTable.Instance = function() {
    if (_singleton === null) {_singleton = new numberTable();}
    return _singleton;
};

numberTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = numberTable;
