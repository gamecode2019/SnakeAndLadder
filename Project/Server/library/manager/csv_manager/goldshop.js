
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var goldshop = function() {
	this.ID = '';
	this.TYPE = '';
	this.NAME = '';
	this.ICON = '';
	this.GOLD = '';
	this.COST = '';
	this.FIRST = '';
	this.EXTRA = '';
	this.LIMIT = '';
	this.FIRSTDESC = '';
	this.FIRSTICON = '';
	this.DESC = '';
	this.DESCICON = '';
	this.VISIBLE = '';
	this.INDEX = '';
};

var goldshopTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.goldshop;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new goldshop();
			obj.ID = tmpArr[i].ID;
			obj.TYPE = tmpArr[i].TYPE;
			obj.NAME = tmpArr[i].NAME;
			obj.ICON = tmpArr[i].ICON;
			obj.GOLD = tmpArr[i].GOLD;
			obj.COST = tmpArr[i].COST;
			obj.FIRST = tmpArr[i].FIRST;
			obj.EXTRA = tmpArr[i].EXTRA;
			obj.LIMIT = tmpArr[i].LIMIT;
			obj.FIRSTDESC = tmpArr[i].FIRSTDESC;
			obj.FIRSTICON = tmpArr[i].FIRSTICON;
			obj.DESC = tmpArr[i].DESC;
			obj.DESCICON = tmpArr[i].DESCICON;
			obj.VISIBLE = tmpArr[i].VISIBLE;
			obj.INDEX = tmpArr[i].INDEX;

        this._lines[tmpArr[i].ID] = obj;
    }
};

goldshopTable.Instance = function() {
    if (_singleton === null) {_singleton = new goldshopTable();}
    return _singleton;
};

goldshopTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = goldshopTable;
