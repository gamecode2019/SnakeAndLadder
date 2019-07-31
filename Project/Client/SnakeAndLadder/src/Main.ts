//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    // 主界面文本
    private _textfield: egret.TextField;

    /**
     * 创建子结点
     */
    protected createChildren(): void {
        super.createChildren();
        egret.MainContext.instance.stage.scaleMode=egret.StageScaleMode.FIXED_WIDTH
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })
        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }
        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }
        
        // 注册协议
        UserProto.instance().registerProtocol();

        // 注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        //初始化sdk
        let _InitSdkHandel = new InitSdkHandel()
        _InitSdkHandel.success = function(){
            console.log("start game");
            //进入参数  --该方法必须在 FBInstant.initializeAsync() 调用之后使用
            platform.getEntryPointData()
            .then((enterData)=>{
                console.info(enterData);
                if(enterData){
                    if(enterData.inviteRomeId){
                        console.info("我要加入房间：",enterData.inviteRomeId);
                    }
                }
            });
            
            //当前游戏环境
            platform.getContext()
            .then((context)=>{
                //type POST \THREAD \GROUP \SOLO 
                console.info("当前游戏环境:",context.getID(),context.getType(),context.getPlayersAsync())
            });
            
        }
        _InitSdkHandel.fail = function(reason){
            console.log(reason);
        }
        platform.initSdk(_InitSdkHandel);

        //自定义层
        LayerManager.OnCreate();
        this.runGame().catch(err => {
            console.log(err);
        })
    }

    /**
     * 运行游戏
     */
    private async runGame() {
        await this.loadResource();
        await platform.login();

        var that = this;
        if(GameDebug==DebugType.OffLine){
            await platform.getUserInfo().then((userInfo)=>{
                console.info('platform userInfo:',userInfo);
                //facebook 平台
                if (!(typeof FBInstant === 'undefined')){
                    GameNetwork.Instance.requestLoginByFaceBook(new CS_UserLogin(),userInfo);   
                }else if(window['wx']){

                }else{
                    GameNetwork.Instance.requestLoginByWeb(new CS_UserLogin());
                }
                that.createGameScene();
            });
        }else{
            await platform.getUserInfo()
            .then((userInfo)=>{
                console.info('platform userInfo:',userInfo);
                //连接服务器
                GameNetwork.Instance.connect(function(){
                    //facebook 平台
                    if (!(typeof FBInstant === 'undefined')){
                        GameNetwork.Instance.requestLoginByFaceBook(new CS_UserLogin(),userInfo);   
                    }else if(window['wx']){

                    }else{
                        GameNetwork.Instance.requestLoginByWeb(new CS_UserLogin());
                    }
                });
                
                that.createGameScene();
            });
            
        }
        

        
        
    }

    /**
     * 加载资源
     */
    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("loading");
            let loadingWindow = UIManager.instance().openWindow("LoadingWindow") as LoadingWindow;
            //await RES.loadConfig(GameConfig.assetUrl + "resource/default.res.json", GameConfig.assetUrl + "resource/");
            //await RES.loadConfig("resource/default.res.json", "resource/");

            //
            //console.info("测试：",RES)
            // await RES.setConfigURL("","");

            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingWindow);
            //this.stage.removeChild(loadingView);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * 加载皮肤主题配置文件,可以手动修改这个文件,替换默认皮肤
     */
    private loadTheme() {
        return new Promise((resolve, reject) => {
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => { resolve(); }, this);
        })
    }

    /**
     * 创建场景界面
     */
    protected createGameScene(): void {
        // MySceneManager.OnCreate().LoadMainScene();
        // UIManager.instance().openWindow("MainWindow");
        


    }

    /**
     * 根据name关键字创建一个Bitmap对象。
     * name属性请参考resources/resource.json配置文件的内容。
     * @param {string} name 位图名称
     * @return {object} 位图
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * @param {object} result
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();
        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this._textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };
        change();
    }
}
