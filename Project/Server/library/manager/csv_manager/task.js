
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;

var task = function() {
	this.ID = '';
	this.TYPE = '';
	this.REWARD_TYPE1 = '';
	this.REWARD1 = '';
	this.TASK1 = '';
	this.MAIN1 = '';
	this.MAIN_ADDITIONAL1 = '';
	this.REWARD_TYPE2 = '';
	this.REWARD2 = '';
	this.TASK2 = '';
	this.MAIN2 = '';
	this.MAIN_ADDITIONAL2 = '';
	this.REWARD_TYPE3 = '';
	this.REWARD3 = '';
	this.TASK3 = '';
	this.MAIN3 = '';
	this.MAIN_ADDITIONAL3 = '';
	this.TXT = '';
};

var taskTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.task;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new task();
			obj.ID = tmpArr[i].ID;
			obj.TYPE = tmpArr[i].TYPE;
			obj.REWARD_TYPE1 = tmpArr[i].REWARD_TYPE1;
			obj.REWARD1 = tmpArr[i].REWARD1;
			obj.TASK1 = tmpArr[i].TASK1;
			obj.MAIN1 = tmpArr[i].MAIN1;
			obj.MAIN_ADDITIONAL1 = tmpArr[i].MAIN_ADDITIONAL1;
			obj.REWARD_TYPE2 = tmpArr[i].REWARD_TYPE2;
			obj.REWARD2 = tmpArr[i].REWARD2;
			obj.TASK2 = tmpArr[i].TASK2;
			obj.MAIN2 = tmpArr[i].MAIN2;
			obj.MAIN_ADDITIONAL2 = tmpArr[i].MAIN_ADDITIONAL2;
			obj.REWARD_TYPE3 = tmpArr[i].REWARD_TYPE3;
			obj.REWARD3 = tmpArr[i].REWARD3;
			obj.TASK3 = tmpArr[i].TASK3;
			obj.MAIN3 = tmpArr[i].MAIN3;
			obj.MAIN_ADDITIONAL3 = tmpArr[i].MAIN_ADDITIONAL3;
			obj.TXT = tmpArr[i].TXT;

        this._lines[tmpArr[i].ID] = obj;
    }
};

taskTable.Instance = function() {
    if (_singleton === null) {_singleton = new taskTable();}
    return _singleton;
};

taskTable.prototype.GetLines = function() {
    return this._lines;
};

module.exports = taskTable;
