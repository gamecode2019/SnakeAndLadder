class ClockItem{
	public id:number = 0;
	public time:number = 0;
	public call:Function = null;
	public ext:any = ''||{};

}
//egret暂停 计时器依然继续
class Clock {
	private timers:{[key:number]:ClockItem} = {};
	private isRun:boolean = false;
	public constructor() {
		this.timers = {};
		this.isRun = false;
	}
	public start(){
		this.isRun = true;
	}

	public stop(){
		this.isRun = false;
	}
	/**
	 * 添加时钟
	 * @param time:number 超时时间
	 * @param call:Function 超时回调
	 * @param count:number 时间分段
	 * @param callpre:Function 每段回调
	 */
	public addTimer(name:string,time:number,call:Function) {
		var that = this;
		return new Promise(function(resolve,reject){
			let clockItem = new ClockItem();
			clockItem.call = call;
			clockItem.time = time;
			clockItem.ext = name;
			clockItem.id = setTimeout(function () {
				if(that.isRun){
					resolve(clockItem);
				}else{
					reject(clockItem);
				}
			}, clockItem.time);

			that.timers[name] = clockItem;
		})
		.then(function (item:ClockItem) {
			clearTimeout(item.id);
			item.call(item.ext);
		}).catch(function (item:ClockItem) {
			console.info('Clock is stop');
			clearTimeout(item.id);
		});
		

	}

	/**
	 * removeTimer
	 */
	public removeTimer(name:string):void{
		if(!this.timers[name]){
			return;
		}
		clearTimeout(this.timers[name].id);
		delete this.timers[name];
	}
	/**
	 * removeAllTimer
	 */
	public removeAllTimer():void{
		for(let key in this.timers){
			this.removeTimer(key)
		}
	}

}