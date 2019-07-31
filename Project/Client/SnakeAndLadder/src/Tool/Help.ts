class Help {
    public static ArrayRemove(a: Array<any>, c: any): boolean {
        var index = a.indexOf(c);
        if (index > -1) {
            a.splice(index, 1);
            return true;
        }
        return false;
    };
    public static Lerp(a: number, b: number, t: number) {
        return a * (1 - t) + b * t;
    }
    /**范围内获取整数随机数*/
    public static GetRandomInt(min: number, max: number): number {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }
    /**范围内获取整数随机数*/
    public static GetRandom(min: number, max: number): number {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Rand * Range);
    }
}
class StringHelp {
    public static IsEmpty(msg: string): boolean {
        if (msg == undefined) return true;
        if (msg == null) return true;
        if (msg == "") return true;
        return false;
    };
    public static Format(msg: string, ...ps): string {
        for (let i = 0; i < 10; i++) {
            var si = '{' + i + '}';
            if (msg.indexOf(si) == -1) {
                break;
            }
            var rp = String(ps[i]);
            msg = msg.replace(si, rp);
        }
        return msg;
    };
}


class DebugShapeRect {
    public Obj: egret.DisplayObject = null;
    public ShapeRect: egret.Shape = null;
    public constructor(d: egret.DisplayObject) {
        this.Obj = d;
        this.ShapeRect = new egret.Shape();
        d.stage.addChild(this.ShapeRect);
    }
    public Synchronization() {
        this.ShapeRect.anchorOffsetX = this.Obj.anchorOffsetX;
        this.ShapeRect.anchorOffsetY = this.Obj.anchorOffsetY;

        this.ShapeRect.x = this.Obj.x;
        this.ShapeRect.y = this.Obj.y;

        this.ShapeRect.width = this.Obj.width;
        this.ShapeRect.height = this.Obj.height;

        this.ShapeRect.skewX = this.Obj.skewX;
        this.ShapeRect.skewY = this.Obj.skewY;

        this.ShapeRect.scaleX = this.Obj.scaleX;
        this.ShapeRect.scaleY = this.Obj.scaleY;
    }

    public drawCircle(r?: number): void {
        this.Synchronization();
        var shape: egret.Shape = this.ShapeRect;
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawCircle(shape.anchorOffsetX, shape.anchorOffsetY, r);
        shape.graphics.endFill();
    }
    public drawRect(w?: number, h?: number): void {
        this.Synchronization();
        var shape: egret.Shape = this.ShapeRect;
        if (!w) {
            w = shape.width;
        }
        if (!h) {
            h = shape.height;
        }
        shape.graphics.beginFill(0x000066, 1);
        shape.graphics.drawRect(shape.anchorOffsetX, shape.anchorOffsetY, w, h);
        shape.graphics.endFill();
    }
}
class DebugDisplay {
    public ShapeRect: DebugShapeRect = null;
    public ShapeAnchor: DebugShapeRect = null;

    public constructor(d: egret.DisplayObject) {
        this.ShapeRect = new DebugShapeRect(d);
        this.ShapeAnchor = new DebugShapeRect(d);
        this.DrawDebug();
    }
    public DrawDebug() {
        this.ShapeRect.drawRect();
        this.ShapeAnchor.drawCircle(10);
    }
}
class MyDebug {
    static _sUpdate: UpdateObj = new UpdateObj(1);

    static DisplayArray: Array<DebugDisplay> = new Array<DebugDisplay>();
    public static AddDisplayArray(d: egret.DisplayObject) {
        MyDebug.DisplayArray.push(new DebugDisplay(d));
        MyDebug._sUpdate.Start(MyDebug.Update);
    };
    public static Update() {
        for (let dis of MyDebug.DisplayArray) {
            dis.DrawDebug();
        }
    };
}
