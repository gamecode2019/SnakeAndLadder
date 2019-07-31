
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var monster = function() {
	this.ID = '';
	this.TYPE = '';
	this.HP = '';
	this.ATTACK = '';
	this.ATTACK_SPEED = '';
	this.DISPLAY = '';
	this.PICTURESIZE = '';
	this.COORDINATE = '';
	this.BULLET = '';
	this.BULLET2 = '';
	this.MAIN1 = '';
	this.MAIN2 = '';
	this.SKILL = '';
};

var monsterTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.monster;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new monster();
			obj.ID = tmpArr[i].ID;
			obj.TYPE = tmpArr[i].TYPE;
			obj.HP = tmpArr[i].HP;
			obj.ATTACK = tmpArr[i].ATTACK;
			obj.ATTACK_SPEED = tmpArr[i].ATTACK_SPEED;
			obj.DISPLAY = tmpArr[i].DISPLAY;
			obj.PICTURESIZE = tmpArr[i].PICTURESIZE;
			obj.COORDINATE = tmpArr[i].COORDINATE;
			obj.BULLET = tmpArr[i].BULLET;
			obj.BULLET2 = tmpArr[i].BULLET2;
			obj.MAIN1 = tmpArr[i].MAIN1;
			obj.MAIN2 = tmpArr[i].MAIN2;
			obj.SKILL = tmpArr[i].SKILL;

        this._lines[tmpArr[i].ID] = obj;
    }
};

monsterTable.Instance = function() {
    if (_singleton === null) {_singleton = new monsterTable();}
    return _singleton;
};

monsterTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = monsterTable;
