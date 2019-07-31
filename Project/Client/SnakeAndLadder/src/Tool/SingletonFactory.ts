// TypeScript file

/**
 * SingletonFactory
 */
class SingletonFactory 
{
    static map:{[key:string] : any} = {};
    public static InstanceT<T>(c: {new(): T; }):T {
        var key:string = c.toString();
        var ret:any = SingletonFactory.map[key];
        if(!ret)
        {
            ret = new c();
            SingletonFactory.map[key] = ret;
        }
        return ret;
    }
    public static Instance(c: {new(): any; }):any {
        var key:string = c.toString();
        var ret:any = SingletonFactory.map[key];
        if(!ret)
        {
            ret = new c();
            SingletonFactory.map[key] = ret;
        }
        return ret;
    }
}
declare interface SignaClear
{
    Clear():void;
}
declare interface SignaID
{
    SID:number;
}
declare interface SignaSend
{
    Send(...ps):void;
}
declare interface IAction
{
    ():void;
}
declare interface IAction1<T>
{
    (c1:T):void;
}
declare interface IAction2<T,U>
{
    (c1:T,c2:U):void;
}
declare interface IAction3<T,U,K>
{
    (c1:T,c2:U,c3:K):void;
}
declare interface IActionOut<R>
{
    ():R;
}
declare interface IActionOut1<U,R>
{
    (c1:U):R;
}
declare interface IActionOut2<T,U,R>
{
    (c1:T,c2:U):R;
}
class CallObj<T extends Function>
{
    public mCall:Function;
    public mCaller:any;
    public Invoke(...ps):any
    {
        return this.mCall.call(this.mCaller,...ps);
    }
    public constructor(c?:T,r?:any)
    {
        this.mCall = c;
        this.mCaller = r;
    }
    public Clear()
    {
        this.mCall = null;
        this.mCaller = null;
    }
}
class FunctionArry 
{
    mCalls:Array<Function> = new Array<Function>();
    public Add(call:Function):void
    {
        this.mCalls.push(call);
    }
    public Invoke():void
    {
       let length = this.mCalls.length;
       let cs = this.mCalls;
        for (let i = 0; i < length; i++) {
            cs[i]();
        }
    }
    public InvokeAndClear():void
    {
        this.Invoke();
        this.mCalls = [];
    }
}
class Signa<T extends Function>
{
    public OnCall:CallObj<T>;
    mCalls:Array<CallObj<T>> = [];
    mWaitToDo:FunctionArry = new FunctionArry();
    mIsSendIng:boolean;

    //注册回调，调用返回函数可以清除注册
    public AddListen(call:T,caller?:any):Function
    {
        if (this.mIsSendIng)
        {
            //箭头函数能保存函数创建时的 this值，而不是调用时的值
            this.mWaitToDo.Add(() => { this.AddListen(call,caller); });
        }
        else
        {
            this.callRemove(call,caller);
            this.mCalls.push(new CallObj<T>(call,caller));
        }
        return this.SetRemoveCall(call,caller);
    }
    callRemove(call:T,caller:any):void
    {
        for(let i = this.mCalls.length -1; i >= 0; i--)
        {
            let cobj = this.mCalls[i];
            if(cobj.mCaller != caller)
                continue;
            if(cobj.mCall == call)
            {
                this.mCalls[i].Clear();
                this.mCalls.splice(i,1);
                break;
            }
        }
    }
    //注册回调，调用返回函数可以清除注册，这种方式注册的回调会被新的注册覆盖
    public SetCall(call:T,caller?:any):void
    {
        if(this.OnCall != null)
        {
            this.OnCall.Clear();
        }
        if(call == null)
        {
            this.OnCall = null;
            return;
        }
        this.OnCall = new CallObj<T>(call,caller);
    }
    //清除注册
    public SetRemoveCall(call:T,caller?:any):Function
    {
        var ret = () => { this.RemoveListen(call,caller); };
        return ret;
    }
    public RemoveListen(call:T,caller?:any)
    {
        if (this.mIsSendIng)
        {
            this.mWaitToDo.Add(() => { this.RemoveListen(call,caller); });
        }
        else
        {
            this.callRemove(call,caller);
        }
    }

    public Send(...ps)
    {
        this.mIsSendIng = true;
        let length = this.mCalls.length;
        let cs = this.mCalls;
        for (let i = 0; i < length; i++) {
             cs[i].Invoke(...ps);
        }
        if(this.OnCall)
        this.OnCall.Invoke(...ps);
        this.mIsSendIng = false;
        this.WaiToDo();
    }
    public Get(...ps):any
    {
        this.mIsSendIng = true;
        var ret = null;
        let length = this.mCalls.length;
        let cs = this.mCalls;
        for (let i = 0; i < length; i++) {
            ret = cs[i].Invoke();
        }
        if(this.OnCall)
          ret = this.OnCall.Invoke(...ps);
        this.mIsSendIng = false;
        this.WaiToDo();
        return ret;
    }
    WaiToDo():void
    {
        //this.mWaitToDo.Invoke();
        this.mWaitToDo.InvokeAndClear();
    }
    public Clear():void
    {
        this.mCalls = [];
        this.OnCall = undefined;
    }

    public isClear()
    {
        return !this.OnCall && this.mCalls.length == 0;
    }
}
type Nullable<T> = {[P in keyof T]: T[P] | null };
type Partable<T> = {[P in keyof T]?: T[P]};
// class A{

// }
// class B{

// }
// type CC= A&B
class SignaManger implements SignaClear
{
    static Instance:SignaManger = new SignaManger();
    
    mapC:{[key:string] : SignaClear} = {};
    public One(c: {new(): SignaClear; }):any {
        var key = c.toString();
        var ret = this.mapC[key];
        if(!ret)
        {
            ret = new c();
            this.mapC[key] = ret;
        }
        return ret;
    }
    AllIDNum:number;
    mapID:Array<number> = [];
    UseIDnum:number;
    constructor(){
        this.AllIDNum = 0;
        this.UseIDnum = 0;
        this.UpdateID();
    };
    UpdateID()
    {
       if(this.UseIDnum == this.AllIDNum)
       {
           this.AllIDNum += 10000;
           let mapID = this.mapID;
           for(let i = this.AllIDNum - 1; i >= this.UseIDnum;i--)
            {
                mapID.push(i);
            }
       }
    }
    GetID():number
    {
    //    var ret = this.mapID[0];
    //    this.mapID.slice(0);
       this.UpdateID();
       this.UseIDnum++;
       return this.mapID.pop();
    }
    mapO:{[key:string] : {[key:number] : SignaClear}} = {};
    public Get(c: {new(): SignaClear;},obj:SignaID):any {
        var key:string = c.toString();
        var mp = this.mapO[key];
        if(mp === undefined)
        {
            mp = {};
        }
        if(obj.SID === undefined)
        {
           obj.SID = this.GetID();
        }

       var ret = mp[obj.SID];
        if(ret === undefined)
        {
            ret = new c();
            mp[obj.SID] = ret;
        }
        return ret;
    }
    public Clear():void
    {
        let mpc = this.mapC;
        for(let k in mpc){
           mpc[k].Clear();
        }
        this.mapC = {};
        let mpo = this.mapO;
        for(let k in mpo){
            let mp = mpo[k]
            for(let kk in mp){
                mp[kk].Clear();
            }
            mpo[k] = {};
        }
        this.mapO = {};
    }
}
interface SetFun<T>{
    Call(value:T);
}
interface GetFun<T>{
    Call():T;
}
class GetSigna<R,T extends IActionOut<R>> extends Signa<T> implements GetFun<R>
{
    public Call():R{ return this.Get()};
}
class SetSigna<O,T extends IAction1<O>> extends Signa<T>
{
    public Call(ps){ return this.Send(ps)};
}
/**
 * 提供set，get方法，提供数据刷新的onUpdata方法
 */
interface IMyUpateObj<O>
{
    _obj:any;
    onUpdata:Signa<IAction1<O>>;
    set (s:any);
    get ():any;
}
class MyUpateObj<O> implements  SignaClear,IMyUpateObj<O>
{
    _obj:O;
    // public set:SetSigna<O,IAction1<O>> = new SetSigna<O,IAction1<O>>();
    // public get:GetSigna<O,IActionOut<O>> = new GetSigna<O,IActionOut<O>>();

    public set (s:O){
        this._obj = s;
        this.Send();
    }
    public get ():O{
        return this._obj;
    }

    public set Obj(s:O){
        this._obj = s;
        this.Send();
    }
    public get Obj():O{
        return this._obj;
    }

    public Send()
    {
        this.onUpdata.Send(this._obj);
    }
    /**
     * 事实更新数据的回调函数
     */
    public onUpdata:Signa<IAction1<O>> = new Signa<IAction1<O>>();
    public constructor(value:O)
    {
        this._obj = value;
    }
    
    public Clear()
    {
        this.onUpdata.Clear();
    }
}

/**
 * 对象池
 */
// TypeScript file
interface ILoopObj {
    ClearAll();
    RecoveryOne(c: any);
    Get(): any;
}
interface ILoopChild<T> {
    Parent: ILoopObj;
    Id: number;
    IsUse: Boolean;
    Clone(): T;
    Recovery();

}

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
class LoopObjNew<T extends ILoopChild<T>> implements ILoopObj {
    _data: Array<T> = [];
    _default: T;
    _noUseNum: number = 0;
    _length: number = 0;;
    public Init(c: T) {
        this._default = c;
        this.Add(c);
    }
    public Add(c: T) {
        this._data.push(c);
        c.Id = this._length;
        this._noUseNum += 1;
        this._length += 1;
    }
    public Get(): T {
        if (this._noUseNum == 0) {
            this.Add(this._default.Clone());
            this.change(this._length - 1,0);
        }
        this._noUseNum--;
        let ret = this._data[this._noUseNum];
        ret.IsUse = true;
        // console.log("_length ====" + this._length);
        return ret;
    }
    change(f: number, t: number) {
        let df = this._data[f];
        let dt = this._data[t];
        df.Id = t;
        dt.Id = f;
        this._data[f] = dt;
        this._data[t] = df;
    }
    public ClearAll() {
        if (this._noUseNum == this._length) return;
        for (let i = this._data.length - 1; i > 0; i--) {
            this._data[i].IsUse = false;
            this._data[i].Recovery();
        }
        this._noUseNum = this._length;
    }
    public RecoveryOne(c: T) {
        if (!c.IsUse) return;
        this.change(c.Id, this._noUseNum)
        this._noUseNum++;
        // console.log("_noUseNum ====" + this._noUseNum);
        c.IsUse = false;
    }
}