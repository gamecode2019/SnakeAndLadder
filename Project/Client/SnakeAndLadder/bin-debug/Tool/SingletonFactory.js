// TypeScript file
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
/**
 * SingletonFactory
 */
var SingletonFactory = (function () {
    function SingletonFactory() {
    }
    SingletonFactory.InstanceT = function (c) {
        var key = c.toString();
        var ret = SingletonFactory.map[key];
        if (!ret) {
            ret = new c();
            SingletonFactory.map[key] = ret;
        }
        return ret;
    };
    SingletonFactory.Instance = function (c) {
        var key = c.toString();
        var ret = SingletonFactory.map[key];
        if (!ret) {
            ret = new c();
            SingletonFactory.map[key] = ret;
        }
        return ret;
    };
    SingletonFactory.map = {};
    return SingletonFactory;
}());
__reflect(SingletonFactory.prototype, "SingletonFactory");
var CallObj = (function () {
    function CallObj(c, r) {
        this.mCall = c;
        this.mCaller = r;
    }
    CallObj.prototype.Invoke = function () {
        var ps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ps[_i] = arguments[_i];
        }
        return (_a = this.mCall).call.apply(_a, [this.mCaller].concat(ps));
        var _a;
    };
    CallObj.prototype.Clear = function () {
        this.mCall = null;
        this.mCaller = null;
    };
    return CallObj;
}());
__reflect(CallObj.prototype, "CallObj");
var FunctionArry = (function () {
    function FunctionArry() {
        this.mCalls = new Array();
    }
    FunctionArry.prototype.Add = function (call) {
        this.mCalls.push(call);
    };
    FunctionArry.prototype.Invoke = function () {
        var length = this.mCalls.length;
        var cs = this.mCalls;
        for (var i = 0; i < length; i++) {
            cs[i]();
        }
    };
    FunctionArry.prototype.InvokeAndClear = function () {
        this.Invoke();
        this.mCalls = [];
    };
    return FunctionArry;
}());
__reflect(FunctionArry.prototype, "FunctionArry");
var Signa = (function () {
    function Signa() {
        this.mCalls = [];
        this.mWaitToDo = new FunctionArry();
    }
    //注册回调，调用返回函数可以清除注册
    Signa.prototype.AddListen = function (call, caller) {
        var _this = this;
        if (this.mIsSendIng) {
            //箭头函数能保存函数创建时的 this值，而不是调用时的值
            this.mWaitToDo.Add(function () { _this.AddListen(call, caller); });
        }
        else {
            this.callRemove(call, caller);
            this.mCalls.push(new CallObj(call, caller));
        }
        return this.SetRemoveCall(call, caller);
    };
    Signa.prototype.callRemove = function (call, caller) {
        for (var i = this.mCalls.length - 1; i >= 0; i--) {
            var cobj = this.mCalls[i];
            if (cobj.mCaller != caller)
                continue;
            if (cobj.mCall == call) {
                this.mCalls[i].Clear();
                this.mCalls.splice(i, 1);
                break;
            }
        }
    };
    //注册回调，调用返回函数可以清除注册，这种方式注册的回调会被新的注册覆盖
    Signa.prototype.SetCall = function (call, caller) {
        if (this.OnCall != null) {
            this.OnCall.Clear();
        }
        if (call == null) {
            this.OnCall = null;
            return;
        }
        this.OnCall = new CallObj(call, caller);
    };
    //清除注册
    Signa.prototype.SetRemoveCall = function (call, caller) {
        var _this = this;
        var ret = function () { _this.RemoveListen(call, caller); };
        return ret;
    };
    Signa.prototype.RemoveListen = function (call, caller) {
        var _this = this;
        if (this.mIsSendIng) {
            this.mWaitToDo.Add(function () { _this.RemoveListen(call, caller); });
        }
        else {
            this.callRemove(call, caller);
        }
    };
    Signa.prototype.Send = function () {
        var ps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ps[_i] = arguments[_i];
        }
        this.mIsSendIng = true;
        var length = this.mCalls.length;
        var cs = this.mCalls;
        for (var i = 0; i < length; i++) {
            (_a = cs[i]).Invoke.apply(_a, ps);
        }
        if (this.OnCall)
            (_b = this.OnCall).Invoke.apply(_b, ps);
        this.mIsSendIng = false;
        this.WaiToDo();
        var _a, _b;
    };
    Signa.prototype.Get = function () {
        var ps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ps[_i] = arguments[_i];
        }
        this.mIsSendIng = true;
        var ret = null;
        var length = this.mCalls.length;
        var cs = this.mCalls;
        for (var i = 0; i < length; i++) {
            ret = cs[i].Invoke();
        }
        if (this.OnCall)
            ret = (_a = this.OnCall).Invoke.apply(_a, ps);
        this.mIsSendIng = false;
        this.WaiToDo();
        return ret;
        var _a;
    };
    Signa.prototype.WaiToDo = function () {
        //this.mWaitToDo.Invoke();
        this.mWaitToDo.InvokeAndClear();
    };
    Signa.prototype.Clear = function () {
        this.mCalls = [];
        this.OnCall = undefined;
    };
    Signa.prototype.isClear = function () {
        return !this.OnCall && this.mCalls.length == 0;
    };
    return Signa;
}());
__reflect(Signa.prototype, "Signa");
// class A{
// }
// class B{
// }
// type CC= A&B
var SignaManger = (function () {
    function SignaManger() {
        this.mapC = {};
        this.mapID = [];
        this.mapO = {};
        this.AllIDNum = 0;
        this.UseIDnum = 0;
        this.UpdateID();
    }
    SignaManger.prototype.One = function (c) {
        var key = c.toString();
        var ret = this.mapC[key];
        if (!ret) {
            ret = new c();
            this.mapC[key] = ret;
        }
        return ret;
    };
    ;
    SignaManger.prototype.UpdateID = function () {
        if (this.UseIDnum == this.AllIDNum) {
            this.AllIDNum += 10000;
            var mapID = this.mapID;
            for (var i = this.AllIDNum - 1; i >= this.UseIDnum; i--) {
                mapID.push(i);
            }
        }
    };
    SignaManger.prototype.GetID = function () {
        //    var ret = this.mapID[0];
        //    this.mapID.slice(0);
        this.UpdateID();
        this.UseIDnum++;
        return this.mapID.pop();
    };
    SignaManger.prototype.Get = function (c, obj) {
        var key = c.toString();
        var mp = this.mapO[key];
        if (mp === undefined) {
            mp = {};
        }
        if (obj.SID === undefined) {
            obj.SID = this.GetID();
        }
        var ret = mp[obj.SID];
        if (ret === undefined) {
            ret = new c();
            mp[obj.SID] = ret;
        }
        return ret;
    };
    SignaManger.prototype.Clear = function () {
        var mpc = this.mapC;
        for (var k in mpc) {
            mpc[k].Clear();
        }
        this.mapC = {};
        var mpo = this.mapO;
        for (var k in mpo) {
            var mp = mpo[k];
            for (var kk in mp) {
                mp[kk].Clear();
            }
            mpo[k] = {};
        }
        this.mapO = {};
    };
    SignaManger.Instance = new SignaManger();
    return SignaManger;
}());
__reflect(SignaManger.prototype, "SignaManger", ["SignaClear"]);
var GetSigna = (function (_super) {
    __extends(GetSigna, _super);
    function GetSigna() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetSigna.prototype.Call = function () { return this.Get(); };
    ;
    return GetSigna;
}(Signa));
__reflect(GetSigna.prototype, "GetSigna", ["GetFun"]);
var SetSigna = (function (_super) {
    __extends(SetSigna, _super);
    function SetSigna() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetSigna.prototype.Call = function (ps) { return this.Send(ps); };
    ;
    return SetSigna;
}(Signa));
__reflect(SetSigna.prototype, "SetSigna");
var MyUpateObj = (function () {
    function MyUpateObj(value) {
        /**
         * 事实更新数据的回调函数
         */
        this.onUpdata = new Signa();
        this._obj = value;
    }
    // public set:SetSigna<O,IAction1<O>> = new SetSigna<O,IAction1<O>>();
    // public get:GetSigna<O,IActionOut<O>> = new GetSigna<O,IActionOut<O>>();
    MyUpateObj.prototype.set = function (s) {
        this._obj = s;
        this.Send();
    };
    MyUpateObj.prototype.get = function () {
        return this._obj;
    };
    Object.defineProperty(MyUpateObj.prototype, "Obj", {
        get: function () {
            return this._obj;
        },
        set: function (s) {
            this._obj = s;
            this.Send();
        },
        enumerable: true,
        configurable: true
    });
    MyUpateObj.prototype.Send = function () {
        this.onUpdata.Send(this._obj);
    };
    MyUpateObj.prototype.Clear = function () {
        this.onUpdata.Clear();
    };
    return MyUpateObj;
}());
__reflect(MyUpateObj.prototype, "MyUpateObj", ["SignaClear", "IMyUpateObj"]);
// class LoopObj<T extends ILoopChild<T>> implements ILoopObj {
//     mData: Array<T> = [];
//     mDefault: T;
//     mUseNum: number;
//     public Init(c: T) {
//         this.mDefault = c;
//         this.mUseNum = 0;
//         this.Add(c);
//     }
//     public Add(c: T) {
//         this.mData.push(c);
//     }
//     public Get(): T {
//         if (this.mUseNum == this.mData.length) {
//             this.Add(this.mDefault.Clone());
//         }
//         let o = this.mData[this.mUseNum++];
//         if (o.IsUse) {
//             return this.Get();
//         }
//         o.Parent = this;
//         o.Id = this.mUseNum - 1;
//         return o;
//     }
//     public ClearAll() {
//         if (this.mUseNum == 0) return;
//         for (let i = this.mData.length - 1; i > 0; i--) {
//             this.mData[i].IsUse = false;
//             this.mData[i].Recovery();
//         }
//         this.mData = [];
//         this.mUseNum = 0;
//     }
//     public RecoveryOne(c: T) {
//         if (!c.IsUse) return;
//         let lastID = this.mData.length - 1;
//         for (let i = lastID; i > c.Id; i--) {
//             this.mData[i].Id--;
//         }
//         this.mData.slice(c.Id);
//         this.mData.push(c);
//         c.Id = lastID;
//         c.IsUse = false;
//     }
// }
var LoopObjNew = (function () {
    function LoopObjNew() {
        this._data = [];
        this._noUseNum = 0;
        this._length = 0;
    }
    ;
    LoopObjNew.prototype.Init = function (c) {
        this._default = c;
        this.Add(c);
    };
    LoopObjNew.prototype.Add = function (c) {
        this._data.push(c);
        c.Id = this._length;
        this._noUseNum += 1;
        this._length += 1;
    };
    LoopObjNew.prototype.Get = function () {
        if (this._noUseNum == 0) {
            this.Add(this._default.Clone());
            this.change(this._length - 1, 0);
        }
        this._noUseNum--;
        var ret = this._data[this._noUseNum];
        ret.IsUse = true;
        // console.log("_length ====" + this._length);
        return ret;
    };
    LoopObjNew.prototype.change = function (f, t) {
        var df = this._data[f];
        var dt = this._data[t];
        df.Id = t;
        dt.Id = f;
        this._data[f] = dt;
        this._data[t] = df;
    };
    LoopObjNew.prototype.ClearAll = function () {
        if (this._noUseNum == this._length)
            return;
        for (var i = this._data.length - 1; i > 0; i--) {
            this._data[i].IsUse = false;
            this._data[i].Recovery();
        }
        this._noUseNum = this._length;
    };
    LoopObjNew.prototype.RecoveryOne = function (c) {
        if (!c.IsUse)
            return;
        this.change(c.Id, this._noUseNum);
        this._noUseNum++;
        // console.log("_noUseNum ====" + this._noUseNum);
        c.IsUse = false;
    };
    return LoopObjNew;
}());
__reflect(LoopObjNew.prototype, "LoopObjNew", ["ILoopObj"]);
//# sourceMappingURL=SingletonFactory.js.map