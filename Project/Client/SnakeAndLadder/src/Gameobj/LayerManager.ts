// TypeScript file
enum MyLayerEnum
{
    Low,
    Middle,
    Skill,
    UI,
    Max,
}
class LayerManager
{
    /**
     * 单例
    */
    public static Instance = null;
    public static OnCreate():LayerManager
    {
        LayerManager.Instance = new LayerManager();
        LayerManager.Instance.SetRoot(egret.MainContext.instance.stage);
        return LayerManager.Instance;
    }
    Root:egret.DisplayObjectContainer = null;
    public LayerMgr:Array<Array<egret.DisplayObject>> = [];
    public LayerList:Array<egret.DisplayObjectContainer> = [];
    public constructor()
    {
        for(let i = 0; i < MyLayerEnum.Max;i++)
        {
            this.LayerMgr.push(new Array<egret.DisplayObject>());
            let ds = new egret.DisplayObjectContainer();
            this.LayerList.push(ds);
        }
    }
    public SetRoot(r:egret.DisplayObjectContainer)
    {
        this.Root = r;
        for(let i = 0; i < MyLayerEnum.Max;i++)
        {
            r.addChild(this.LayerList[i]);
        }
    }
    public AddForward(d:egret.DisplayObject,l:MyLayerEnum)
    {
        this.LayerList[l].addChildAt(d,0);
    }
    public AddBackwardd(d:egret.DisplayObject,l:MyLayerEnum)
    {
        this.LayerList[l].addChild(d);
    }
    public removeForward(l:MyLayerEnum)
    {
        if(this.LayerList[l].numChildren>0){
            this.LayerList[l].removeChildAt(0);
        }
    }
    public GetLayer(l:MyLayerEnum = MyLayerEnum.Middle)
    {
        return this.LayerList[l];
    }
    // public ForwardAdd(d:egret.DisplayObject,l:MyLayerEnum)
    // {
    //     let ar = new Array<egret.DisplayObject>(d);
    //     this.LayerMgr[l] = ar.concat(this.LayerMgr[l]);
    //     this.UpdateLayer();
    // }
    // public BackwarddAdd(d:egret.DisplayObject,l:MyLayerEnum)
    // {
    //     this.LayerMgr[l].push(d);
    //     this.UpdateLayer();
    // }
    // UpdateLayer()
    // {
    //     let num = 0;
    //     this.Container.removeChildren();
    //     for(let i = 0; i < MyLayerEnum.Max;i++)
    //     {
    //         let ar =  this.LayerMgr[i];
    //         for(let j = 0,jmax = ar.length; j < jmax;j++ )
    //         {
    //             this.Container.addChild(ar[j]);
    //         }
    //     }
    // }
}