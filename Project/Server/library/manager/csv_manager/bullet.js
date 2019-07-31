
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var bullet = function() {
	this.ID = '';
	this.COORDINATEX = '';
	this.COORDINATEY = '';
	this.RADIAN = '';
	this.MODE = '';
	this.SPEED = '';
};

var bulletTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.bullet;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new bullet();
			obj.ID = tmpArr[i].ID;
			obj.COORDINATEX = tmpArr[i].COORDINATEX;
			obj.COORDINATEY = tmpArr[i].COORDINATEY;
			obj.RADIAN = tmpArr[i].RADIAN;
			obj.MODE = tmpArr[i].MODE;
			obj.SPEED = tmpArr[i].SPEED;

        this._lines[tmpArr[i].ID] = obj;
    }
};

bulletTable.Instance = function() {
    if (_singleton === null) {_singleton = new bulletTable();}
    return _singleton;
};

bulletTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = bulletTable;
