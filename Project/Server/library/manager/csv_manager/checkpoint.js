
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var checkpoint = function() {
	this.ID = '';
	this.LEVE = '';
	this.TIME = '';
	this.GOLD_TIME = '';
	this.TRIGGER = '';
	this.GOLD_1 = '';
	this.GOLD_UP1 = '';
	this.GOLD_2 = '';
	this.GOLD_UP2 = '';
	this.BOSS_CALL = '';
	this.BOSS_HP = '';
	this.BOSS_DISPLAY = '';
	this.BOSS_ADD = '';
	this.BOSS_HURT = '';
	this.NUMBER = '';
	this.NUMBER_HP = '';
	this.NUMBER_ADD = '';
	this.BOSS_TIEM = '';
	this.PNG = '';
};

var checkpointTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.checkpoint;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new checkpoint();
			obj.ID = tmpArr[i].ID;
			obj.LEVE = tmpArr[i].LEVE;
			obj.TIME = tmpArr[i].TIME;
			obj.GOLD_TIME = tmpArr[i].GOLD_TIME;
			obj.TRIGGER = tmpArr[i].TRIGGER;
			obj.GOLD_1 = tmpArr[i].GOLD_1;
			obj.GOLD_UP1 = tmpArr[i].GOLD_UP1;
			obj.GOLD_2 = tmpArr[i].GOLD_2;
			obj.GOLD_UP2 = tmpArr[i].GOLD_UP2;
			obj.BOSS_CALL = tmpArr[i].BOSS_CALL;
			obj.BOSS_HP = tmpArr[i].BOSS_HP;
			obj.BOSS_DISPLAY = tmpArr[i].BOSS_DISPLAY;
			obj.BOSS_ADD = tmpArr[i].BOSS_ADD;
			obj.BOSS_HURT = tmpArr[i].BOSS_HURT;
			obj.NUMBER = tmpArr[i].NUMBER;
			obj.NUMBER_HP = tmpArr[i].NUMBER_HP;
			obj.NUMBER_ADD = tmpArr[i].NUMBER_ADD;
			obj.BOSS_TIEM = tmpArr[i].BOSS_TIEM;
			obj.PNG = tmpArr[i].PNG;

        this._lines[tmpArr[i].ID] = obj;
    }
};

checkpointTable.Instance = function() {
    if (_singleton === null) {_singleton = new checkpointTable();}
    return _singleton;
};

checkpointTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = checkpointTable;
