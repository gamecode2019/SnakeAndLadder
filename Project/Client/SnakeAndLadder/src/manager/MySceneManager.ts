// TypeScript file
class MySceneManagerSingle implements SignaClear {
    /**
     * 鼠标点击
     */
    public onTouchstart: Signa<IAction1<[number,number]>> = new Signa<IAction1<[number,number]>>();
    public Clear() {
        this.onTouchstart.Clear();
    }
}
class Scene extends Gameobject {
    public Res:string = "";
    _Map:Displayobj<egret.Bitmap> = null;
    private _mySceneManagerSingle:MySceneManagerSingle = null;
    public constructor(r?:string)
    {
        super();
        if(r)
        {
            var png = RES.getRes(r);
            let Bitmap = new egret.Bitmap(png)
            this._Map = new Displayobj<egret.Bitmap>(new egret.Bitmap(png));
            this._Map.SetTransform(this);
            var v2 = Util.getScreenCenterPos();
            this.SetPos(v2[0],v2[1]);
            this._Map.display.scaleX = 1;
            this._Map.display.scaleY = (egret.MainContext.instance.stage.stageHeight/1136)*(egret.MainContext.instance.stage.stageWidth/640);
            LayerManager.Instance.removeForward(0);
            LayerManager.Instance.AddForward(this._Map.display,0);

            this._Map.display.touchEnabled = true;
            this._Map.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.ontouchstart, this);
        }
        this._mySceneManagerSingle = SignaManger.Instance.One(MySceneManagerSingle);
        let SongSheet = SingletonFactory.InstanceT<SongSheetCsvManage>(SongSheetCsvManage).GetItem(0);
         console.log("SongSheet:"+SongSheet.NAME);
    }
    /**
     * 发送世界坐标位置
     */
    private ontouchstart(e:egret.TouchEvent)
    {
        let ws = this._camear.ScreenToWold(e.$stageX,e.$stageY);
        this._mySceneManagerSingle.onTouchstart.Send(ws);
        // console.log("鼠标左键："+ws[0]+"||"+ws[1]);
    }
    public Destry()
    {
        this._Map.display.touchEnabled = false;
        this._Map.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.ontouchstart,null);
    }
}
class MySceneManager
{
    /**
     * 单例
    */
    private static Instance:MySceneManager;


    public static OnCreate():MySceneManager
    {
        MySceneManager.Instance = new MySceneManager();
        return MySceneManager.Instance;
    }

    private _mySceneManagerSingle:MySceneManagerSingle = null;
    public MScene:Scene = null;
    public MCamera:GameCamera = null;
    constructor()
    {
        this._mySceneManagerSingle = SignaManger.Instance.One(MySceneManagerSingle);
    }
    public Create(res:string):Scene
    {
        if(!this.MCamera){
            this.MCamera = new GameCamera();
        }
        
        // this.MCamera.SetPos(0,100);
        if(!this.MScene){
           this.MScene = new Scene(res);
        }
        
        return this.MScene;
    }
    public LoadMainScene()
    {
        UIManager.instance().removeAllWindow();
        var sc = MySceneManager.Instance.Create("bg_03_png");

        //添加大厅

    //     let kb = new KeyBoard();
    //    //添加监听事件
    //    kb.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);
    }
    public LoadGameScene()
    {
        UIManager.instance().removeAllWindow();
        var sc = MySceneManager.Instance.Create("bg_03_png");
    }
     private onkeydown(event){
         //获取的按键数据为一个数组
         console.log(event.data);
        // //监听Esc键被按下事件
        // if(this.kb.isContain(event.data,KeyBoard.Esc)){
        //     console.log(event.data);
        // }
        // //监听F1键被按下事件
        // if(this.kb.isContain(event.data,KeyBoard.F1)){
        //     console.log(event.data);
        // }
        // //监听Esc和F1键同时被按下事件
        // if(this.kb.isContain(event.data,KeyBoard.Esc) && this.kb.isContain(event.data,KeyBoard.F1)){
        //     console.log(event.data);
        // }
    }
}