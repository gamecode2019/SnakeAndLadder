// TypeScript file
interface IDisplay {
    display: egret.DisplayObject;
    ChildId: number;
    SetPos(x: number, y: number);
    SetScale(x: number, y: number);
    // AddStage();
    // LeaveStage();
    // doDraw():void;
    // // DisplayObject():egret.DisplayObject;
    // Load():void;
    // UnLoad():void;
    // Hide():void;
    // Show():void;
    // // container:egret.DisplayObjectContainer;
}
/**
 * 可视化游戏对象的基类
 */
// class Displayobj<T extends egret.DisplayObject> implements IDraw
class Displayobj<T extends egret.DisplayObject> implements IDisplay {
    _transform: Transform = null;
    public ChildId: number = -1;
    //渲染节点
    public display: T;
    public constructor(c: T) {
        this.display = c;
        // let stage = egret.MainContext.instance.stage;
        // // stage.addChild(this.display);
        // stage.addChildAt(this.display,1);

        LayerManager.Instance.AddForward(this.display, MyLayerEnum.Middle);
        Util.setAnchorMiddle(this.display);
    }
    // AddStage() {
    //     LayerManager.Instance.AddForward(this.display, MyLayerEnum.Middle);
    // }
    // LeaveStage() {
    //     LayerManager.Instance.AddForward(this.display, MyLayerEnum.Middle);
    //     Util.setAnchorMiddle(this.display);
    // }
    public SetPos(x: number, y: number) {
        this.display.x = x;
        this.display.y = y;
    }

    // public set pos(pos: any) {
    //     this.display.x = pos.x;
    //     this.display.y = pos.y;
    // }

    // public get pos(): any {
    //     return this.display;
    // }

    public SetScale(x: number, y: number) {
        this.display.scaleX = x;
        this.display.scaleY = y;
    }
    public SetTransform(t: Transform, d?: IDisplay) {
        if(this._transform == t)
        {
           return;
        }
        if(this._transform)
        {
            Help.ArrayRemove(this._transform.DisplayobjChilds,this);
        }
        this._transform = t;
        if (!d) {
            this.ChildId = t.DisplayobjChilds.push(this) - 1;
        }
        else {
            t.DisplayobjChilds[d.ChildId] = this;
            this.ChildId = d.ChildId;
        }
    }
    public Hide()
    {
        
    }
    // public doDraw():void
    // {

    // }
    // // public DisplayObject():egret.DisplayObject{
    // //     return this.display;
    // // }
    // Load():void{};
    // UnLoad():void{};
    // Hide():void{
    // };
    // Show():void{};
}