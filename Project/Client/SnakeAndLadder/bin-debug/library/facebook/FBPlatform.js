var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
/**
 * FaceBookSDK
 */
var FaceBookPlatform = (function () {
    function FaceBookPlatform() {
    }
    FaceBookPlatform.prototype.getContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, FBInstant.context];
            });
        });
    };
    FaceBookPlatform.prototype.initSdk = function (callBack) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof FBInstant === 'undefined')
                    return [2 /*return*/];
                this.initializeAsync(callBack);
                return [2 /*return*/];
            });
        });
    };
    FaceBookPlatform.prototype.getEntryPointData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entryPointData;
            return __generator(this, function (_a) {
                entryPointData = FBInstant.getEntryPointData();
                return [2 /*return*/, entryPointData];
            });
        });
    };
    FaceBookPlatform.prototype.chooseAsync = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (FBInstant.getSupportedAPIs().indexOf("context.chooseAsync") == -1) {
                    obj.fail();
                    return [2 /*return*/];
                }
                FBInstant.context.chooseAsync({
                    filter: ['NEW_CONTEXT_ONLY'],
                    minSize: 2,
                    maxSize: 4
                })
                    .then(function () {
                    obj.success();
                })
                    .catch(function (err) {
                    obj.fail(err);
                });
                return [2 /*return*/];
            });
        });
    };
    //通知 Facebook 在游戏中发生的更新
    FaceBookPlatform.prototype.updateAsync = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                if (FBInstant.getSupportedAPIs().indexOf("updateAsync") == -1) {
                    obj.fail();
                    return [2 /*return*/];
                }
                if (obj.payload && obj.payload.action == 'CUSTOM') {
                    that = this;
                    FBInstant.updateAsync(obj.payload)
                        .then(function () {
                        obj.success();
                    })
                        .catch(function (err) {
                        obj.fail(err);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    FaceBookPlatform.prototype.setLoadingProgress = function (progress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof FBInstant === 'undefined')
                    return [2 /*return*/];
                // console.log("FBInstant setLoadingProgress ：",progress*100);
                FBInstant.setLoadingProgress(progress * 100);
                return [2 /*return*/];
            });
        });
    };
    FaceBookPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof FBInstant === 'undefined')
                    return [2 /*return*/, { nickName: "昵称" }];
                return [2 /*return*/, FBInstant.player];
            });
        });
    };
    FaceBookPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    FaceBookPlatform.prototype.quit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                FBInstant.quit();
                return [2 /*return*/];
            });
        });
    };
    FaceBookPlatform.prototype.share = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                name = FBInstant.player.getName();
                FBInstant.shareAsync({
                    intent: obj.intent,
                    image: obj.imgurl,
                    text: obj.title,
                    data: obj.data //{ myReplayData: '...' }
                }).then(function () {
                    console.log("share success");
                    // 继续游戏
                    obj.complete();
                });
                return [2 /*return*/];
            });
        });
    };
    //必须初始
    FaceBookPlatform.prototype.initializeAsync = function (callBack) {
        if (typeof FBInstant === 'undefined')
            return;
        FBInstant.initializeAsync().then(function () {
            console.log("getLocale:", FBInstant.getLocale());
            console.log("getPlatform:", FBInstant.getPlatform());
            console.log("getSDKVersion", FBInstant.getSDKVersion());
            console.log("getSupportedAPIs", FBInstant.getSupportedAPIs());
            console.log("getEntryPointData", FBInstant.getEntryPointData());
            FBInstant.startGameAsync().then(function () {
                callBack.success();
            }).catch(function (reason) {
                callBack.fail(reason);
            });
        }).catch(function (reason) {
            console.info(reason);
        });
    };
    //-----------------------------------------------ranking--------------------------------------------//
    /**
     * obj = {name:'my_awesome_leaderboard',useApi:'getEntriesAsync',success:function(){}}
     */
    FaceBookPlatform.prototype.getRankInfo = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                FBInstant.getLeaderboardAsync(obj.name)
                    .then(function (leaderboard) {
                    obj.success(leaderboard);
                });
                return [2 /*return*/];
            });
        });
    };
    return FaceBookPlatform;
}());
__reflect(FaceBookPlatform.prototype, "FaceBookPlatform", ["Platform"]);
//# sourceMappingURL=FBPlatform.js.map