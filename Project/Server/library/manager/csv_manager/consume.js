
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var consume = function() {
	this.ID = '';
	this.GROUP = '';
	this.SECTION = '';
	this.CLASS_GROUP = '';
	this.CONSUME = '';
	this.TXT = '';
};

var consumeTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.consume;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new consume();
			obj.ID = tmpArr[i].ID;
			obj.GROUP = tmpArr[i].GROUP;
			obj.SECTION = tmpArr[i].SECTION;
			obj.CLASS_GROUP = tmpArr[i].CLASS_GROUP;
			obj.CONSUME = tmpArr[i].CONSUME;
			obj.TXT = tmpArr[i].TXT;

        this._lines[tmpArr[i].ID] = obj;
    }
};

consumeTable.Instance = function() {
    if (_singleton === null) {_singleton = new consumeTable();}
    return _singleton;
};

consumeTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = consumeTable;
