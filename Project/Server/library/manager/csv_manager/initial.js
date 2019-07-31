
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var initial = function() {
	this.id = '';
	this.TYPE = '';
	this.CALL = '';
	this.Value = '';
	this.NUMBER = '';
	this.Desc = '';
};

var initialTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.initial;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new initial();
			obj.id = tmpArr[i].id;
			obj.TYPE = tmpArr[i].TYPE;
			obj.CALL = tmpArr[i].CALL;
			obj.Value = tmpArr[i].Value;
			obj.NUMBER = tmpArr[i].NUMBER;
			obj.Desc = tmpArr[i].Desc;

        this._lines[tmpArr[i].id] = obj;
    }
};

initialTable.Instance = function() {
    if (_singleton === null) {_singleton = new initialTable();}
    return _singleton;
};

initialTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = initialTable;
