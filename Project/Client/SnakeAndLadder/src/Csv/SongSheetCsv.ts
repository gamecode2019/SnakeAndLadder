// TypeScript file

////////////////////////////////
/// SongSheetCsv.cs——CSV信息类
////////////////////////////////
class SongSheetCsv implements CsvBase{

	public line:Array<any>  = new Array<any>();
	public SetValues(values:string[]):void
	{
		let i = 0;
		this._INDEX = Number(values[i++]);
		this.line.push(this._INDEX);
		this._NAME = values[i++];
		this.line.push(this._NAME);
		this._RES = values[i++];
		this.line.push(this._RES);
		this._SPEED = Number(values[i++]);
		this.line.push(this._SPEED);
		this._VOLUME = Number(values[i++]);
		this.line.push(this._VOLUME);
	}

	public   ColNum():number{return 5;}

	/**
	* 0
	*/
	protected  _INDEX:number;
	public get INDEX():number { return this._INDEX}

	/**
	* 规则名字
	*/
	protected  _NAME:string;
	public get NAME():string { return this._NAME}

	/**
	* 音频文件名
	*/
	protected  _RES:string;
	public get RES():string { return this._RES}

	/**
	* 播放速度(除以10000)
	*/
	protected  _SPEED:number;
	public get SPEED():number { return this._SPEED}

	/**
	* 声音大小(除以10000)
	*/
	protected  _VOLUME:number;
	public get VOLUME():number { return this._VOLUME}

//extend_s

public OnInit():void{};

//extend_e

}

////////////////////////////////
/// SongSheetCsvManage.cs——CSV信息管理类
////////////////////////////////
class SongSheetCsvManage extends CsvBaseManager<SongSheetCsv,SongSheetCsvManage>{ 

	public ConfigName():string{ return "SongSheet_csv";}

	public UseNote():boolean{ return true;}

	public GetKeyCsv(cvs:SongSheetCsv):any{ return cvs.INDEX;}

	protected create():SongSheetCsv{ return new SongSheetCsv();}

//extend_s



//extend_e

}
