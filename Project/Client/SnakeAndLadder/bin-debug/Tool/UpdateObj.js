var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UpdateSigna = (function () {
    function UpdateSigna() {
        this.Speed = 1;
        this.OnSigna = new Signa();
    }
    UpdateSigna.AddUpdateSigna = function (s) {
        UpdateSigna.UpdateObjMgr.push(s);
        if (UpdateSigna.UpdateObjMgr.length == 1) {
            UpdateSigna._intervalID = setInterval(function () {
                UpdateSigna.DoUpdateAll();
            }, 33);
        }
    };
    UpdateSigna.RemoveUpdateSigna = function (s) {
        Help.ArrayRemove(UpdateSigna.UpdateObjMgr, s);
        if (UpdateSigna.UpdateObjMgr.length == 0) {
            clearInterval(UpdateSigna._intervalID);
        }
    };
    UpdateSigna.DoUpdateAll = function () {
        for (var _i = 0, _a = UpdateSigna.UpdateObjMgr; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.OnSigna.Send();
        }
    };
    UpdateSigna.GetUpdateObj = function (s) {
        var signa = UpdateSigna.UpdateObjSpeedMgr[s];
        if (!signa) {
            signa = new UpdateSigna();
            UpdateSigna.UpdateObjSpeedMgr[s] = signa;
        }
        return signa;
    };
    UpdateSigna.UpdateObjMgr = new Array();
    UpdateSigna.UpdateObjSpeedMgr = {};
    UpdateSigna._intervalID = 0;
    return UpdateSigna;
}());
__reflect(UpdateSigna.prototype, "UpdateSigna");
var UpdateObj = (function () {
    function UpdateObj(s) {
        this._clearCall = new FunctionArry();
        this._isPlaying = false;
        this._updateSigna = UpdateSigna.GetUpdateObj(s);
    }
    UpdateObj.prototype.Start = function (call, caller) {
        this._call = call;
        this._caller = caller;
        if (this._isPlaying)
            return;
        this._isPlaying = true;
        if (this._updateSigna.OnSigna.mCalls.length == 0) {
            UpdateSigna.AddUpdateSigna(this._updateSigna);
        }
        this._clearCall.Add(this._updateSigna.OnSigna.AddListen(this.Invoke, this));
    };
    UpdateObj.prototype.Stop = function () {
        if (!this._isPlaying)
            return;
        this._isPlaying = false;
        this._clearCall.InvokeAndClear();
        if (this._updateSigna.OnSigna.mCalls.length == 0) {
            UpdateSigna.AddUpdateSigna(this._updateSigna);
        }
    };
    UpdateObj.prototype.SetSpeed = function (s) {
        if (this._isPlaying) {
            this.Stop();
            this._updateSigna = UpdateSigna.GetUpdateObj(s);
            this.Start(this._call, this._caller);
        }
        else {
            this._updateSigna = UpdateSigna.GetUpdateObj(s);
        }
    };
    UpdateObj.prototype.Invoke = function () {
        this._call.call(this._caller);
    };
    return UpdateObj;
}());
__reflect(UpdateObj.prototype, "UpdateObj", ["IUpdateObjNew"]);
var TimerSigna = (function () {
    function TimerSigna(t) {
        var _this = this;
        this.Time = 1;
        this.OnSigna = new Signa();
        this.Time = t;
        this.Timer = new egret.Timer(t, 0);
        this.Timer.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.OnSigna.Send();
        }, this);
    }
    TimerSigna.GetUpdateObj = function (t) {
        var signa = TimerSigna.TimerSpeedMgr[t];
        if (!signa) {
            signa = new TimerSigna(t);
            TimerSigna.TimerSpeedMgr[t] = signa;
        }
        return signa;
    };
    TimerSigna.TimerSpeedMgr = {};
    return TimerSigna;
}());
__reflect(TimerSigna.prototype, "TimerSigna");
var TimerObj = (function () {
    function TimerObj(t) {
        this._clearCall = new FunctionArry();
        this._isPlaying = false;
        this.testId = 0;
        this._updateSigna = TimerSigna.GetUpdateObj(t);
        this.testId = this._updateSigna.OnSigna.mCalls.length + 1;
    }
    TimerObj.prototype.Start = function (call, caller) {
        this._call = call;
        this._caller = caller;
        if (this._isPlaying)
            return;
        this._isPlaying = true;
        this._updateSigna.Timer.start();
        this._clearCall.Add(this._updateSigna.OnSigna.AddListen(this.Invoke, this));
    };
    TimerObj.prototype.Stop = function () {
        // if(this._updateSigna.OnSigna.mCalls[0].mCaller == this)
        // {
        //     console.log("相等 相等 相等------111111111111111111--------------");
        // }
        if (!this._isPlaying)
            return;
        this._isPlaying = false;
        this._clearCall.InvokeAndClear();
        if (this._updateSigna.OnSigna.mCalls.length == 0) {
            this._updateSigna.Timer.stop();
        }
    };
    TimerObj.prototype.SetSpeed = function (t) {
        if (this._isPlaying) {
            this.Stop();
            this._updateSigna = TimerSigna.GetUpdateObj(t);
            this.Start(this._call, this._caller);
        }
        else {
            this._updateSigna = TimerSigna.GetUpdateObj(t);
        }
    };
    TimerObj.prototype.Invoke = function () {
        this._call.call(this._caller);
    };
    return TimerObj;
}());
__reflect(TimerObj.prototype, "TimerObj", ["IUpdateObjNew"]);
// class MyTimer implements ILoopObjChild<MyTimer>, IUpdateObj {
//     Parent: LoopObj<MyTimer>;
//     Id: number;
//     public Timer: egret.Timer;
//     public IsUse: Boolean = false;
//     _onUpdate: CallObj<IAction> = new CallObj<IAction>();
//     public Clone(): MyTimer {
//         return new MyTimer(this.Timer.delay);
//     };
//     public Recovery() {
//         this.Parent.RecoveryOne(this);
//     };
//     public Stop() {
//         this.Timer.stop();
//         // this.Recovery();
//     }
//     public Start() {
//         this.Timer.start();
//     }
//     constructor(t: number) {
//         this._onUpdate = new CallObj<IAction>();
//         this.Timer = new egret.Timer(t, 0);
//         this.Timer.addEventListener(egret.TimerEvent.TIMER, () => {
//             this._onUpdate.Invoke();
//         }, this);
//         // this.IsUse = true;
//     }
//     public SetCall(call: IAction, caller?: any) {
//         this._onUpdate.mCall = call;
//         this._onUpdate.mCaller = caller;
//     }
// }
// class TimerManager {
//     static _LoopTimerMap: { [key: number]: LoopObj<MyTimer> } = {};
//     static GetLoopTimer(t: number): MyTimer {
//         let ret = TimerManager._LoopTimerMap[t];
//         if (!ret) {
//             let mt = new MyTimer(t);
//             ret = new LoopObj<MyTimer>();
//             ret.Init(mt);
//             TimerManager._LoopTimerMap[t] = ret;
//         }
//         return ret.Get();
//     }
//     public static Loop(t: number, call: IAction, caller?: any): MyTimer {
//         let mt = TimerManager.GetLoopTimer(t);
//         mt.SetCall(call, caller);
//         mt.Start();
//         return mt;
//     }
//     public static GetLoop(t: number): MyTimer {
//         let mt = TimerManager.GetLoopTimer(t);
//         mt.Stop();
//         return mt;
//     }
// } 
//# sourceMappingURL=UpdateObj.js.map