
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var itemsconfig = function() {
	this.ID = '';
	this.NAME = '';
	this.ITEMDESCRIPTION = '';
	this.ITEMTYPE = '';
	this.ITEMICON = '';
	this.OVERLAPNUM = '';
	this.MAX = '';
};

var itemsconfigTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.itemsconfig;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new itemsconfig();
			obj.ID = tmpArr[i].ID;
			obj.NAME = tmpArr[i].NAME;
			obj.ITEMDESCRIPTION = tmpArr[i].ITEMDESCRIPTION;
			obj.ITEMTYPE = tmpArr[i].ITEMTYPE;
			obj.ITEMICON = tmpArr[i].ITEMICON;
			obj.OVERLAPNUM = tmpArr[i].OVERLAPNUM;
			obj.MAX = tmpArr[i].MAX;

        this._lines[tmpArr[i].ID] = obj;
    }
};

itemsconfigTable.Instance = function() {
    if (_singleton === null) {_singleton = new itemsconfigTable();}
    return _singleton;
};

itemsconfigTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = itemsconfigTable;
