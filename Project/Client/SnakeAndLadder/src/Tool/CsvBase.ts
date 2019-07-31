// TypeScript file

interface CsvBase
{
    OnInit():void;
    SetValues(values:string[]):void;
    ColNum():number;
}
//type IKey = (number & string);
abstract class CsvBaseManager<T extends CsvBase,S>
{
    //T : {new():CsvBase};
    protected mListCsv:Array<T> = new Array<T>();

    protected mDictionaryCsv:{[key:number] : T} = {};
    //配置名字//
    public abstract ConfigName():string;
    //是否使用注释//
    public abstract UseNote():boolean;
    //获取key//
    public abstract GetKeyCsv(c:T):any;

    protected abstract create(): T;

    public constructor()
    {
        this.onLoad();
    }
    protected onLoad():void
    {
        this.DoLoad(this.ConfigName());
    }
    public DoLoad(name:string):void
    {
        const result = RES.getRes(name);//SingletonFactory.Instance(ResourcesManger).getRes(name)
        var lines:string[] = result.split('\r\n');
        this.UpdateValues(lines);
    }
    // create(c: {new(): T}): T { 
    // return new c();
    // }
    public UpdateValues(lines:string[]):void
    {
        var starID = this.UseNote ? 3 : 2;
        this.mListCsv = [];
        this.mDictionaryCsv = {};
        for (let i = starID, iMax = lines.length; i < iMax; i++)
        {
            let obj  = this.create();
            var strl = lines[i];
            if(StringHelp.IsEmpty(strl))
            {
                continue;
            }
            var vs:string[] = strl.split(',');

            if (vs.length < obj.ColNum())
            {
                egret.error(StringHelp.Format("配置[{0}]数据缺少Line[{1}]--->{2}/{3}",this.ConfigName(), i, vs.length, obj.ColNum()));
                continue;
            }

            obj.SetValues(vs);
            obj.OnInit();
            var kk = this.GetKeyCsv(obj);
            if (!this.mDictionaryCsv[kk])
            {
                this.mListCsv.push(obj);
                this.mDictionaryCsv[kk] = obj;
            }
            else
            {
                egret.error(StringHelp.Format("配置[{0}]重复Line[{1}]Key[{2}]",this.ConfigName(), i, kk.ToString()));
            }
        }

    }

    public GetItem(kk:any):T
    {
        var ret = this.mDictionaryCsv[kk];
        if (!ret)
        {
            egret.error(StringHelp.Format("[{0}]错误的key={1}",this.ConfigName(),kk));
            ret = this.mListCsv[0];
        }
        return ret;
    }

    public GetAll():T[]
    {
        return this.mListCsv;
    }

}