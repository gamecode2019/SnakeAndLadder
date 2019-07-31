
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var coordinate = function() {
	this.ID = '';
	this.TYPE = '';
	this.DISAPPEAR = '';
	this.TRAJECTORY = '';
	this.COORDINATEX = '';
	this.COORDINATEY = '';
	this.ENDX = '';
	this.ENDY = '';
	this.RADIAN = '';
	this.INTERVAL = '';
	this.NUMBER = '';
	this.TIME = '';
};

var coordinateTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.coordinate;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new coordinate();
			obj.ID = tmpArr[i].ID;
			obj.TYPE = tmpArr[i].TYPE;
			obj.DISAPPEAR = tmpArr[i].DISAPPEAR;
			obj.TRAJECTORY = tmpArr[i].TRAJECTORY;
			obj.COORDINATEX = tmpArr[i].COORDINATEX;
			obj.COORDINATEY = tmpArr[i].COORDINATEY;
			obj.ENDX = tmpArr[i].ENDX;
			obj.ENDY = tmpArr[i].ENDY;
			obj.RADIAN = tmpArr[i].RADIAN;
			obj.INTERVAL = tmpArr[i].INTERVAL;
			obj.NUMBER = tmpArr[i].NUMBER;
			obj.TIME = tmpArr[i].TIME;

        this._lines[tmpArr[i].ID] = obj;
    }
};

coordinateTable.Instance = function() {
    if (_singleton === null) {_singleton = new coordinateTable();}
    return _singleton;
};

coordinateTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = coordinateTable;
