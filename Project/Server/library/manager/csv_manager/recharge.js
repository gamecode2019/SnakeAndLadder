
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var recharge = function() {
	this.ID = '';
	this.NAME = '';
	this.TYPE = '';
	this.ICON = '';
	this.DIAMOND = '';
	this.COST = '';
	this.FIRST = '';
	this.EXTRA = '';
	this.LIMIT = '';
	this.DAILY = '';
	this.FIRSTDESC = '';
	this.FIRSTICON = '';
	this.DESC = '';
	this.DESCICON = '';
	this.VISIBLE = '';
	this.INDEX = '';
};

var rechargeTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.recharge;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new recharge();
			obj.ID = tmpArr[i].ID;
			obj.NAME = tmpArr[i].NAME;
			obj.TYPE = tmpArr[i].TYPE;
			obj.ICON = tmpArr[i].ICON;
			obj.DIAMOND = tmpArr[i].DIAMOND;
			obj.COST = tmpArr[i].COST;
			obj.FIRST = tmpArr[i].FIRST;
			obj.EXTRA = tmpArr[i].EXTRA;
			obj.LIMIT = tmpArr[i].LIMIT;
			obj.DAILY = tmpArr[i].DAILY;
			obj.FIRSTDESC = tmpArr[i].FIRSTDESC;
			obj.FIRSTICON = tmpArr[i].FIRSTICON;
			obj.DESC = tmpArr[i].DESC;
			obj.DESCICON = tmpArr[i].DESCICON;
			obj.VISIBLE = tmpArr[i].VISIBLE;
			obj.INDEX = tmpArr[i].INDEX;

        this._lines[tmpArr[i].ID] = obj;
    }
};

rechargeTable.Instance = function() {
    if (_singleton === null) {_singleton = new rechargeTable();}
    return _singleton;
};

rechargeTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = rechargeTable;
