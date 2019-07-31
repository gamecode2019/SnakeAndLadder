
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var spell = function() {
	this.ID = '';
	this.NAME = '';
	this.TYPE = '';
	this.FLAG = '';
	this.CONTINUED = '';
	this.CD = '';
	this.COOL = '';
	this.DURATION = '';
	this.COST = '';
	this.CARD = '';
	this.ICON = '';
	this.MAIN1 = '';
	this.PNG1 = '';
	this.TXT = '';
};

var spellTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.spell;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new spell();
			obj.ID = tmpArr[i].ID;
			obj.NAME = tmpArr[i].NAME;
			obj.TYPE = tmpArr[i].TYPE;
			obj.FLAG = tmpArr[i].FLAG;
			obj.CONTINUED = tmpArr[i].CONTINUED;
			obj.CD = tmpArr[i].CD;
			obj.COOL = tmpArr[i].COOL;
			obj.DURATION = tmpArr[i].DURATION;
			obj.COST = tmpArr[i].COST;
			obj.CARD = tmpArr[i].CARD;
			obj.ICON = tmpArr[i].ICON;
			obj.MAIN1 = tmpArr[i].MAIN1;
			obj.PNG1 = tmpArr[i].PNG1;
			obj.TXT = tmpArr[i].TXT;

        this._lines[tmpArr[i].ID] = obj;
    }
};

spellTable.Instance = function() {
    if (_singleton === null) {_singleton = new spellTable();}
    return _singleton;
};

spellTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = spellTable;
