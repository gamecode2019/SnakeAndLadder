// TypeScript file
interface IUpdateObj {
    Stop();
    Start();
    SetCall(call: IAction, caller?: any);
}
interface IUpdateObjNew {
    _isPlaying: Boolean;
    Stop();
    Start(call: IAction, caller?: any);
    SetSpeed(t: number);
    Invoke(): void;
}
class UpdateSigna {
    private static UpdateObjMgr: Array<UpdateSigna> = new Array<UpdateSigna>();
    private static UpdateObjSpeedMgr: { [key: number]: UpdateSigna } = {};
    static _intervalID: number = 0;
    public static AddUpdateSigna(s: UpdateSigna) {
        UpdateSigna.UpdateObjMgr.push(s);
        if (UpdateSigna.UpdateObjMgr.length == 1) {
            UpdateSigna._intervalID = setInterval(function () {
                UpdateSigna.DoUpdateAll();
            }, 33);
        }

    }
    public static RemoveUpdateSigna(s: UpdateSigna) {
        Help.ArrayRemove(UpdateSigna.UpdateObjMgr,s);
        if (UpdateSigna.UpdateObjMgr.length == 0) {
           clearInterval(UpdateSigna._intervalID);
        }
    }
    public static DoUpdateAll() {
        for (let obj of UpdateSigna.UpdateObjMgr) {
            obj.OnSigna.Send();
        }
    }
    public static GetUpdateObj(s: number) {
        let signa = UpdateSigna.UpdateObjSpeedMgr[s];
        if (!signa) {
            signa = new UpdateSigna();
            UpdateSigna.UpdateObjSpeedMgr[s] = signa;
        }
        return signa;
    }
    public Speed: number = 1;
    OnSigna: Signa<IAction> = new Signa<IAction>();
}
class UpdateObj implements IUpdateObjNew {
    protected _updateSigna: UpdateSigna;
    _clearCall: FunctionArry = new FunctionArry();
    _isPlaying = false;
    private _call: IAction;
    private _caller: any;
    constructor(s: number) {
        this._updateSigna = UpdateSigna.GetUpdateObj(s);
    }
    public Start(call: IAction, caller?: any) {

        this._call = call;
        this._caller = caller;
        if (this._isPlaying) return;
        this._isPlaying = true;
        if (this._updateSigna.OnSigna.mCalls.length == 0) {
            UpdateSigna.AddUpdateSigna(this._updateSigna);
        }
        this._clearCall.Add(this._updateSigna.OnSigna.AddListen(this.Invoke, this));
    }
    public Stop() {
        if (!this._isPlaying) return;
        this._isPlaying = false;
        this._clearCall.InvokeAndClear();
        if (this._updateSigna.OnSigna.mCalls.length == 0) {
            UpdateSigna.AddUpdateSigna(this._updateSigna);
        }
    }
    public SetSpeed(s: number) {
        if (this._isPlaying) {
            this.Stop();
            this._updateSigna = UpdateSigna.GetUpdateObj(s);
            this.Start(this._call, this._caller);
        }
        else {
            this._updateSigna = UpdateSigna.GetUpdateObj(s);
        }

    }
    public Invoke(): void {
        this._call.call(this._caller);
    }
}

class TimerSigna {
    public static TimerSpeedMgr: { [key: number]: TimerSigna } = {};
    public static GetUpdateObj(t: number) {
        let signa = TimerSigna.TimerSpeedMgr[t];
        if (!signa) {
            signa = new TimerSigna(t);
            TimerSigna.TimerSpeedMgr[t] = signa;
        }
        return signa;
    }
    public Timer: egret.Timer;
    public Time: number = 1;
    OnSigna: Signa<IAction> = new Signa<IAction>();
    constructor(t: number) {
        this.Time = t;
        this.Timer = new egret.Timer(t, 0);
        this.Timer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.OnSigna.Send();
        }, this);
    }

}
class TimerObj implements IUpdateObjNew {
    protected _updateSigna: TimerSigna;
    _clearCall: FunctionArry = new FunctionArry();
    _isPlaying = false;
    private _call: IAction;
    private _caller: any;
    public testId: number = 0;
    constructor(t: number) {
        this._updateSigna = TimerSigna.GetUpdateObj(t);
        this.testId = this._updateSigna.OnSigna.mCalls.length + 1;
    }
    public Start(call: IAction, caller?: any) {
        this._call = call;
        this._caller = caller;
        if (this._isPlaying) return;
        this._isPlaying = true;
        this._updateSigna.Timer.start();
        this._clearCall.Add(this._updateSigna.OnSigna.AddListen(this.Invoke, this));

    }
    public Stop() {
        // if(this._updateSigna.OnSigna.mCalls[0].mCaller == this)
        // {
        //     console.log("相等 相等 相等------111111111111111111--------------");
        // }
        if (!this._isPlaying) return;
        this._isPlaying = false;
        this._clearCall.InvokeAndClear();
        if (this._updateSigna.OnSigna.mCalls.length == 0) {
            this._updateSigna.Timer.stop();
        }
    }
    public SetSpeed(t: number) {
        if (this._isPlaying) {
            this.Stop();
            this._updateSigna = TimerSigna.GetUpdateObj(t);
            this.Start(this._call, this._caller);
        }
        else {
            this._updateSigna = TimerSigna.GetUpdateObj(t);
        }
    }
    public Invoke(): void {
        this._call.call(this._caller);
    }
}
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