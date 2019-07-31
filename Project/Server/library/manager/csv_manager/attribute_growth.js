
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var attribute_growth = function() {
	this.ID = '';
	this.GROUP = '';
	this.FREQUENCY = '';
	this.ATTRIBUTE = '';
};

var attribute_growthTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.attribute_growth;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new attribute_growth();
			obj.ID = tmpArr[i].ID;
			obj.GROUP = tmpArr[i].GROUP;
			obj.FREQUENCY = tmpArr[i].FREQUENCY;
			obj.ATTRIBUTE = tmpArr[i].ATTRIBUTE;

        this._lines[tmpArr[i].ID] = obj;
    }
};

attribute_growthTable.Instance = function() {
    if (_singleton === null) {_singleton = new attribute_growthTable();}
    return _singleton;
};

attribute_growthTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = attribute_growthTable;
