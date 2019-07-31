// TypeScript file
class GameCameraSingle implements SignaClear {
    public static Interest: GameCameraSingle = SignaManger.Instance.One(GameCameraSingle);
    /**
     * 场景中的相机，所有可视化对象的根节点
     */
    public SceneCamera: MyUpateObj<GameCamera> = new MyUpateObj<GameCamera>(null);

    public Clear() {
        this.SceneCamera.Clear();
    }
}
class GameCamera extends Transform {
    public Sprite: egret.Sprite;
    public EgretX: number;
    public EgretY: number;
    public constructor() {
        super();
        GameCameraSingle.Interest.SceneCamera.set(this);
        this.Sprite = new egret.Sprite();
        Util.setAnchorMiddle(this.Sprite);
        // let stage = egret.MainContext.instance.stage;
        // stage.addChildAt(this.Sprite,9999);
        LayerManager.Instance.AddForward(this.Sprite, MyLayerEnum.UI);
        // stage.setChildIndex(this.Sprite,999);
        var v2 = Util.getScreenCenterPos();
        this.EgretX = v2[0];
        this.EgretY = v2[1];
        this.SetPos(v2[0], v2[1]);
        // MyDebug.AddDisplayArray(this.Sprite);

    }
    public SetPos(x: number, y: number) {
        super.SetPos(x, y);
        // this.debugPos();
        for (let c of this.Childs) {
            c.ReSetPos();
        }
    }
    /**
     * 屏幕坐标坐标转世界坐标
     */
    public ScreenToWold(x: number, y: number) {
        let wx = x - this.EgretX + this._x;
        let wy = y - this.EgretY + this._y;
        return [wx,wy];
    }
    /**
     * 世界坐标转为屏幕坐标
     */
    public WoldScreenTo(wx: number, wy: number) {
        let x = wx + this.EgretX - this._x;
        let y = wy + this.EgretY - this._y;
        return [x,y];
    }
    debugPos() {
        var sprite = this.Sprite;
        sprite.x = this.EgretX;
        sprite.y = this.EgretY;
        sprite.graphics.beginFill(0xff0000);
        sprite.graphics.drawRect(1, 1, 2, 2);
        sprite.graphics.endFill();


    }
}
