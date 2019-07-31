// 初始化
class InitSdkHandel{
    public success:Function = null;
    public fail:Function = null;
    public constructor(success?:Function,fail?:Function) {
       this.success = success;
       this.fail = fail;
    }
}

/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
    initSdk(handel:InitSdkHandel): Promise<any>;
    getUserInfo(): Promise<any>;
    login(): Promise<any>;
    setLoadingProgress(process:number): Promise<any>;
    /**
     * 分享带参数
     * @param obj:any -> {title:string,imgurl:string,complete:Function}
     */
    share(obj:any): Promise<any>;
    /**
     * 退出
     */
    quit():Promise<any>
    /**
     * 获取环境参数
     * @return .then(context){}
     */
    getContext():Promise<any>
    /**
     * 游戏启动参数
     */
    getEntryPointData():Promise<any>
    /**
     * 选择游戏环境
     * @param success:Function
     * @param fail:Function
     */
    chooseAsync(obj:any):Promise<any>
    /**
     * 更新游戏数据
     * @param payload:FBInstant.CustomUpdatePayload
     * @param success:Function
     * @param fail:Function
     */
    updateAsync(obj:any):Promise<any>

    /**
     * 获取好友排行
     * @param name 排行名字
     * @param useApi 需要使用的api
     * @param success 成功返回
     * @returns useApi:'xxxx'.then(=>function(){})
     * 譬如:
     * 
     * platform.getRankInfo({
            name:'my_awesome_leaderboard',
            success:function(leaderboard:FBInstant.Leaderboard){
                console.info('leaderboard:',leaderboard); 
                //存一条
                leaderboard.setScoreAsync(42, '{race: "elf", level: 3}')
                .then(function(entry) {
                        console.log('save entry:',entry.getScore()); // 42
                        console.log('save entry:',entry.getExtraData()); // '{race: "elf", level: 3}'
                    }
                );

                //取
                leaderboard.getEntriesAsync(15,0)
                .then(function(entries) {
                        console.info('entries:',entries);
                    }
                );
            }
        })
     */
    getRankInfo(obj:any):Promise<any>
}

/**
 * 调试平台
 */
class DebugPlatform implements Platform {
    async initSdk(handel:InitSdkHandel) { }

    async getUserInfo() {
        return { nickName: "what name?",
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUbNicL4RicqD50sFfian0CRH9AkMbicN5q8YhaTeC4df8aG8MPkiaNwK8vM36f7OTppH2SdZOlpkTUvA/132"}
    }
    async login() { }

    async setLoadingProgress(process:number) { 
        // console.info(process);
    }

    async share(obj:any){
        
    }

    async quit(){
        
    }

    async getContext(){
        
        return {}
    }

    async getEntryPointData(){
        return { roomid: "123456" }
    }

    async chooseAsync(obj:any){
        
    }

    async updateAsync(obj:any){
        
    }

    /**
     * 获取好友排行
     */
    async getRankInfo(obj:any){
        return {};
    }
}

/**
 * 界面
 */
declare let platform: Platform;
declare interface Window {
    platform: Platform
}
if (!window.platform) {
    //
    if (!(typeof FBInstant === 'undefined')){
        window.platform = new FaceBookPlatform();
    }else{
        window.platform = new DebugPlatform();
    }
    
}