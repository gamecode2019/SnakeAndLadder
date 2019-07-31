
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var property = function() {
	this.ID = '';
	this.DESC = '';
	this.DESC2 = '';
};

var propertyTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.property;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new property();
			obj.ID = tmpArr[i].ID;
			obj.DESC = tmpArr[i].DESC;
			obj.DESC2 = tmpArr[i].DESC2;

        this._lines[tmpArr[i].ID] = obj;
    }
};

propertyTable.Instance = function() {
    if (_singleton === null) {_singleton = new propertyTable();}
    return _singleton;
};

propertyTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = propertyTable;
