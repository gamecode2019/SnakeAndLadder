// TypeScript file
class Transform {
    _x: number;
    _y: number;
    _scalex: number = 1;
    _scaley: number = 1;
    public Childs: Array<Transform> = [];
    public Parent: Transform;
    public DisplayobjChilds: Array<IDisplay> = [];
    public SetParent(p: Transform) {
        if (this.Parent) {
            this.Parent.RemoveChild(this);
        }
        this.Parent = p;
        this.Parent.AddChild(this);
    }
    public AddChild(c: Transform) {
        this.RemoveChild(c);
        this.Childs.push(c);
    }
    public RemoveChild(c: Transform) {
        Help.ArrayRemove(this.Childs, c);
    }
    public SetPos(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    public ReSetPos() {
        this.SetPos(this._x,this._y);
    }
}
