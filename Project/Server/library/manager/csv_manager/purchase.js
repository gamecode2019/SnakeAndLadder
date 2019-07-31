
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var purchase = function() {
	this.ID = '';
	this.GROUP = '';
	this.FREQUENCY = '';
	this.MONEY = '';
	this.TOTAL = '';
};

var purchaseTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.purchase;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new purchase();
			obj.ID = tmpArr[i].ID;
			obj.GROUP = tmpArr[i].GROUP;
			obj.FREQUENCY = tmpArr[i].FREQUENCY;
			obj.MONEY = tmpArr[i].MONEY;
			obj.TOTAL = tmpArr[i].TOTAL;

        this._lines[tmpArr[i].ID] = obj;
    }
};

purchaseTable.Instance = function() {
    if (_singleton === null) {_singleton = new purchaseTable();}
    return _singleton;
};

purchaseTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = purchaseTable;
