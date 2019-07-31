
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvGOLDSHOP = require('./csv_manager/goldshop');
var csvHEROSHOP = require('./csv_manager/heroshop');
var csvRECHARGE = require('./csv_manager/recharge');
var _singleton = null;

var CSVManager = function() {
	this._goldshop = csvGOLDSHOP.Instance;
	this._heroshop = csvHEROSHOP.Instance;
	this._recharge = csvRECHARGE.Instance;
};

CSVManager.Instance = function() {
    if (_singleton === null) { _singleton = new CSVManager(); }
    return _singleton;
};

CSVManager.prototype.goldshop = function() {
	return this._goldshop().GetLines();
};

CSVManager.prototype.heroshop = function() {
	return this._heroshop().GetLines();
};

CSVManager.prototype.recharge = function() {
	return this._recharge().GetLines();
};


exports.Instance = CSVManager.Instance;
