
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var lordattribute = function() {
	this.ID = '';
	this.TYPE = '';
	this.NAME = '';
	this.TXT = '';
	this.MAX = '';
	this.TXT_1 = '';
	this.ICON = '';
	this.PNG = '';
	this.CLASS = '';
	this.BASICS = '';
	this.ATTRIBUTE1 = '';
	this.NUME_UP1 = '';
	this.DISPLAY = '';
	this.BUBBLE = '';
};

var lordattributeTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.lordattribute;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new lordattribute();
			obj.ID = tmpArr[i].ID;
			obj.TYPE = tmpArr[i].TYPE;
			obj.NAME = tmpArr[i].NAME;
			obj.TXT = tmpArr[i].TXT;
			obj.MAX = tmpArr[i].MAX;
			obj.TXT_1 = tmpArr[i].TXT_1;
			obj.ICON = tmpArr[i].ICON;
			obj.PNG = tmpArr[i].PNG;
			obj.CLASS = tmpArr[i].CLASS;
			obj.BASICS = tmpArr[i].BASICS;
			obj.ATTRIBUTE1 = tmpArr[i].ATTRIBUTE1;
			obj.NUME_UP1 = tmpArr[i].NUME_UP1;
			obj.DISPLAY = tmpArr[i].DISPLAY;
			obj.BUBBLE = tmpArr[i].BUBBLE;

        this._lines[tmpArr[i].ID] = obj;
    }
};

lordattributeTable.Instance = function() {
    if (_singleton === null) {_singleton = new lordattributeTable();}
    return _singleton;
};

lordattributeTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = lordattributeTable;
