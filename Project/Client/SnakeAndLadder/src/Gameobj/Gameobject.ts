// TypeScript file
class Gameobject extends Transform
{
    public cx:number = 0;
    public cy:number = 0;
    _camear:GameCamera = null;

    public constructor()
    {
        super();
        this._camear = GameCameraSingle.Interest.SceneCamera.get();
        if(!this._camear)
        {
            GameCameraSingle.Interest.SceneCamera.onUpdata.AddListen((c:GameCamera)=>{
                this._camear = c;
                this.SetParent(this._camear);
            },this);
        }
        else
        {
            this.SetParent(this._camear);
        }
    }
    public SetPos(x:number,y:number)
    {
        this._x = x;
        this._y = y;
        this.cx = x - this._camear._x + this._camear.EgretX;
        this.cy = y - this._camear._y + this._camear.EgretY;
        for (let dis of this.DisplayobjChilds) {
            dis.SetPos(this.cx, this.cy);
        }
    }
    public SetScale(x: number, y: number) {
        this._scalex = x;
        this._scaley = y;
        for (let dis of this.DisplayobjChilds) {
            dis.SetScale(x, y);
        }
    }
}