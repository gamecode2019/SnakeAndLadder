class HttpHandler {
	// 协议组
	private _protoMap: any = {};

	// 单例
	private static _instance = null;

	/**
	 * 获得单例
	 */
	public static instance(): HttpHandler {
		if (!HttpHandler._instance) {
			HttpHandler._instance = new HttpHandler();
		}
		return HttpHandler._instance;
	}

	/**
	 * 注册协议
	 * @param {string} pt 协议名称
	 * @param {object} hanlder 协议处理
	 * @param void
	 */
	public registerProtocol(pt: string, hanlder: any): void {
		this._protoMap[pt] = hanlder;
	}

	/**
	 * 发送登陆服消息.
	 * @param {object} message 消息
	 * @return void
	 */
	public sendLoginMessage(message: any): void {
		let url = GameConfig.loginUrl + 'api/' + message.pt;
		let request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(url, egret.HttpMethod.POST);
		request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostError, this);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(JSON.stringify(message));
		console.info("http sendLoginMessage:",message);
	}

	/**
	 * 发送游戏服消息.
	 * @param {object} message 消息
	 * @return void
	 */
	public sendGameMessage(message: any): void {
		let url = GameConfig.loginUrl + 'api/' + message.pt;
		let request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(url, egret.HttpMethod.POST);
		request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostError, this);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(JSON.stringify(message));
	}

	/**
	 * 分发消息.
	 * @param {Object} msgArr 消息数组
	 * @return void
	 */
	private dispatch(msgArr: Array<any>): void {
		let that = this;
		msgArr.forEach(msg => {
			if (that._protoMap[msg.pt]) {
				that._protoMap[msg.pt].handleProtocol(msg);
			} else {
				Logger.log('未定义pt ' + msg.pt);
			}
		});
	};

	/**
	 * 发送消息完成.
	 * @param {object} event 事件
	 * @return void
	 */
	private onPostComplete(event: egret.Event): void {
		try {
			let data = <egret.HttpRequest>event.currentTarget;
			this.dispatch(JSON.parse(data.response));
		} catch (err) {
			Logger.log("返回数据必须为数组：", err);
		}
	}

	/**
	 * 发送消息错误.
	 * @param {object} event 事件
	 * @return void
	 */
	public onPostError(event: egret.IOErrorEvent): void {
		Logger.log("发送消息错误: ", event);
	}
}