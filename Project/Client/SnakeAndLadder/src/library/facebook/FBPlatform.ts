/**
 * FaceBookSDK 
 */
class FaceBookPlatform implements Platform {

	async getContext() {
		return FBInstant.context
	}

	async initSdk(callBack: InitSdkHandel) {
		if (typeof FBInstant === 'undefined')
			return;

		this.initializeAsync(callBack);
	}

	async getEntryPointData() {
		const entryPointData = FBInstant.getEntryPointData();
		return entryPointData;
	}

	async chooseAsync(obj: any) {
		if (FBInstant.getSupportedAPIs().indexOf("context.chooseAsync") == -1) {
			obj.fail();
			return;
		}
		FBInstant.context.chooseAsync(
			{
				filter: ['NEW_CONTEXT_ONLY'],//NEW_CONTEXT_ONLY，INCLUDE_EXISTING_CHALLENGES，NEW_PLAYERS_ONLY
				minSize: 2,
				maxSize: 4
			}
		)
			.then(() => {
				obj.success();
			})
			.catch((err) => {
				obj.fail(err);
			})

	}

	//通知 Facebook 在游戏中发生的更新
	async updateAsync(obj: any) {
		if (FBInstant.getSupportedAPIs().indexOf("updateAsync") == -1) {
			obj.fail();
			return;
		}
		if (obj.payload && obj.payload.action == 'CUSTOM') {

			var that = this;
			FBInstant.updateAsync(obj.payload)
				.then(() => {
					obj.success();
				})
				.catch((err) => {
					obj.fail(err);
				})

		}


	}

	async setLoadingProgress(progress) {
		if (typeof FBInstant === 'undefined')
			return;
		// console.log("FBInstant setLoadingProgress ：",progress*100);
		FBInstant.setLoadingProgress(progress * 100);
	}

	async getUserInfo() {
		if (typeof FBInstant === 'undefined')
			return { nickName: "昵称" }
		return FBInstant.player;
	}
	async login() { }

	async quit() {
		FBInstant.quit()
	}


	async share(obj: any) {
		let name = FBInstant.player.getName()

		FBInstant.shareAsync({
			intent: obj.intent,
			image: obj.imgurl,
			text: obj.title,
			data: obj.data//{ myReplayData: '...' }
		}).then(function () {
			console.log("share success")
			// 继续游戏
			obj.complete();
		});

	}


	//必须初始
	private initializeAsync(callBack: InitSdkHandel): void {
		if (typeof FBInstant === 'undefined')
			return;
		FBInstant.initializeAsync().then(function () {
			console.log("getLocale:", FBInstant.getLocale());
			console.log("getPlatform:", FBInstant.getPlatform());
			console.log("getSDKVersion", FBInstant.getSDKVersion());
			console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
			console.log("getEntryPointData", FBInstant.getEntryPointData());
			FBInstant.startGameAsync().then(() => {
				callBack.success();
			}).catch((reason) => {
				callBack.fail(reason);
			});
		}).catch((reason) => {
			console.info(reason);
		});

	}

	//-----------------------------------------------ranking--------------------------------------------//
	/**
	 * obj = {name:'my_awesome_leaderboard',useApi:'getEntriesAsync',success:function(){}}
	 */
	async getRankInfo(obj:any){
		
		FBInstant.getLeaderboardAsync(obj.name)
		.then(leaderboard => {
			obj.success(leaderboard);
		});


	}

	/**
	public getRankData(rankName: string, isFriendRank: boolean): any {
		var data: Array<any> = []
		if (!isFriendRank) {
			FBInstant.getLeaderboardAsync(rankName).then((leaderBoard) => {
				leaderBoard.getEntriesAsync(15, 0).then((entries) => {
					for (let i = 0; i < entries.length; i++) {
						data[i].rank = entries[i].getRank()
						data[i].score = entries[i].getScore()
						let player = entries[i].getPlayer()
						data[i].name = player.getName()
						data[i].icon = player.getPhoto()
					}
				}
				)
			})
			return data
		} else {
			FBInstant.getLeaderboardAsync(rankName)
				.then(function (leaderboard) {
					return leaderboard.getConnectedPlayerEntriesAsync(15, 0);
				})
				.then(function (entries) {
					for (let i = 0; i < 10; i++) {
						data[i].rank = entries[i].getRank()
						data[i].score = entries[i].getScore()
						let player = entries[i].getPlayer()
						data[i].name = player.getName()
						data[i].icon = player.getPhoto()
					}
					return data
				});
		}
	}

	public saveScore(rankName: string) {
		let currentScore = this.getScore(rankName)
		let newScore = currentScore + 1
		FBInstant.getLeaderboardAsync(rankName)
			.then(function (leaderboard) {
				return leaderboard.setScoreAsync(newScore,"");
			})
			.then(function (entry) {
				console.log(entry.getScore())
				console.log(entry.getExtraData()) 
			});
	}

	private getScore(rankName: string): number {
		let score: number = 0
		FBInstant.getLeaderboardAsync(rankName)
			.then(function (leaderboard) {
				return leaderboard.getPlayerEntryAsync();
			})
			.then(function (entry) {
				console.log(entry.getScore())
				score = entry.getScore()
			});
		return score
	}
	*/
}

