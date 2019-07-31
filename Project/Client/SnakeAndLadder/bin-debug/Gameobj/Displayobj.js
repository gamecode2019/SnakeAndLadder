var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 可视化游戏对象的基类
 */
// class Displayobj<T extends egret.DisplayObject> implements IDraw
var Displayobj = (function () {
    function Displayobj(c) {
        this._transform = null;
        this.ChildId = -1;
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
    Displayobj.prototype.SetPos = function (x, y) {
        this.display.x = x;
        this.display.y = y;
    };
    // public set pos(pos: any) {
    //     this.display.x = pos.x;
    //     this.display.y = pos.y;
    // }
    // public get pos(): any {
    //     return this.display;
    // }
    Displayobj.prototype.SetScale = function (x, y) {
        this.display.scaleX = x;
        this.display.scaleY = y;
    };
    Displayobj.prototype.SetTransform = function (t, d) {
        if (this._transform == t) {
            return;
        }
        if (this._transform) {
            Help.ArrayRemove(this._transform.DisplayobjChilds, this);
        }
        this._transform = t;
        if (!d) {
            this.ChildId = t.DisplayobjChilds.push(this) - 1;
        }
        else {
            t.DisplayobjChilds[d.ChildId] = this;
            this.ChildId = d.ChildId;
        }
    };
    Displayobj.prototype.Hide = function () {
    };
    return Displayobj;
}());
__reflect(Displayobj.prototype, "Displayobj", ["IDisplay"]);
//# sourceMappingURL=Displayobj.js.map