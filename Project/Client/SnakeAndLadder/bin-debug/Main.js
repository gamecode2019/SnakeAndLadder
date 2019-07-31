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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 创建子结点
     */
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            // egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            // egret.ticker.resume();
        };
        // 注册协议
        UserProto.instance().registerProtocol();
        // 注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化sdk
        var _InitSdkHandel = new InitSdkHandel();
        _InitSdkHandel.success = function () {
            console.log("start game");
            //进入参数  --该方法必须在 FBInstant.initializeAsync() 调用之后使用
            platform.getEntryPointData()
                .then(function (enterData) {
                console.info(enterData);
                if (enterData) {
                    if (enterData.inviteRomeId) {
                        console.info("我要加入房间：", enterData.inviteRomeId);
                    }
                }
            });
            //当前游戏环境
            platform.getContext()
                .then(function (context) {
                //type POST \THREAD \GROUP \SOLO 
                console.info("当前游戏环境:", context.getID(), context.getType(), context.getPlayersAsync());
            });
        };
        _InitSdkHandel.fail = function (reason) {
            console.log(reason);
        };
        platform.initSdk(_InitSdkHandel);
        //自定义层
        LayerManager.OnCreate();
        this.runGame().catch(function (err) {
            console.log(err);
        });
    };
    /**
     * 运行游戏
     */
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        that = this;
                        if (!(GameDebug == DebugType.OffLine)) return [3 /*break*/, 4];
                        return [4 /*yield*/, platform.getUserInfo().then(function (userInfo) {
                                console.info('platform userInfo:', userInfo);
                                //facebook 平台
                                if (!(typeof FBInstant === 'undefined')) {
                                    GameNetwork.Instance.requestLoginByFaceBook(new CS_UserLogin(), userInfo);
                                }
                                else if (window['wx']) {
                                }
                                else {
                                    GameNetwork.Instance.requestLoginByWeb(new CS_UserLogin());
                                }
                                that.createGameScene();
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, platform.getUserInfo()
                            .then(function (userInfo) {
                            console.info('platform userInfo:', userInfo);
                            //连接服务器
                            GameNetwork.Instance.connect(function () {
                                //facebook 平台
                                if (!(typeof FBInstant === 'undefined')) {
                                    GameNetwork.Instance.requestLoginByFaceBook(new CS_UserLogin(), userInfo);
                                }
                                else if (window['wx']) {
                                }
                                else {
                                    GameNetwork.Instance.requestLoginByWeb(new CS_UserLogin());
                                }
                            });
                            that.createGameScene();
                        })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载资源
     */
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingWindow, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("loading")];
                    case 2:
                        _a.sent();
                        loadingWindow = UIManager.instance().openWindow("LoadingWindow");
                        //await RES.loadConfig(GameConfig.assetUrl + "resource/default.res.json", GameConfig.assetUrl + "resource/");
                        //await RES.loadConfig("resource/default.res.json", "resource/");
                        //
                        //console.info("测试：",RES)
                        // await RES.setConfigURL("","");
                        return [4 /*yield*/, this.loadTheme()];
                    case 3:
                        //await RES.loadConfig(GameConfig.assetUrl + "resource/default.res.json", GameConfig.assetUrl + "resource/");
                        //await RES.loadConfig("resource/default.res.json", "resource/");
                        //
                        //console.info("测试：",RES)
                        // await RES.setConfigURL("","");
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingWindow)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载皮肤主题配置文件,可以手动修改这个文件,替换默认皮肤
     */
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () { resolve(); }, _this);
        });
    };
    /**
     * 创建场景界面
     */
    Main.prototype.createGameScene = function () {
        // MySceneManager.OnCreate().LoadMainScene();
        // UIManager.instance().openWindow("MainWindow");
    };
    /**
     * 根据name关键字创建一个Bitmap对象。
     * name属性请参考resources/resource.json配置文件的内容。
     * @param {string} name 位图名称
     * @return {object} 位图
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * @param {object} result
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this._textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map