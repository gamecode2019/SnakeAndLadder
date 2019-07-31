class EventManager {
	//单例
	private static _instance: EventManager = null;

	/**
	 * 获得单例
	 */
	public static instance(): EventManager {
		if (EventManager._instance == null) {
			EventManager._instance = new EventManager();
		}
		return EventManager._instance;
	}

	private _handlers: HashMap = null;

	/**
	 * 添加事件监听
	 */
	public addEventListener(type: any, handler: Function, thisObj: any) {
		if (this._handlers == null) {
			this._handlers = new HashMap();
		}
		let eventHandles: Array<any> = this._handlers.get(type);
		if (eventHandles == null) {
			eventHandles = new Array<any>();
			this._handlers.put(type, eventHandles);
		}
		let index = this.indexOf(handler, eventHandles);
		if (index == -1) {
			eventHandles.push(
				{ func: handler, owner: thisObj }
			);
		} else {
			Logger.log("EventType:" + type + " repeat register !!!!!!!!!!!");
		}
	}

	/**
	 * 元素在数组中的下标
	 */
	private indexOf(handler: Function, handlerAry: Array<any>) {
		for (let i = 0, len = handlerAry.length; i < len; ++i) {
			if (handlerAry[i].func === handler) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * 移除事件监听
	 */
	public removeEventListener(type: any, handler: Function): void {
		if (this._handlers != null && this._handlers.size() > 0) {
			let eventHandles: Array<any> = this._handlers.get(type);
			if (eventHandles != null) {
				let index = this.indexOf(handler, eventHandles);
				if (index == -1) {
					Logger.log("EventType:" + type + " removeEventListener error !!!!!!!!!!!");
				} else {
					eventHandles.splice(index, 1);
				}
				if(eventHandles.length == 0 ){
					this._handlers.remove(type);
				} 
			}
		}
	}

	/**
	 * 分发事件
	 */
	public dispatchEvent(type: any, ...arg: any[]): void {
		if (this._handlers != null && this._handlers.size() > 0) {
			let eventHandles: Array<any> = this._handlers.get(type);
			if (eventHandles != null) {
				eventHandles.forEach((data) => {
					let func = data.func;
					if (func) {
						func.call(data.owner, ...arg);
					}
				})
			}
		}
	}
}