var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var MyLayerEnum;
(function (MyLayerEnum) {
    MyLayerEnum[MyLayerEnum["Low"] = 0] = "Low";
    MyLayerEnum[MyLayerEnum["Middle"] = 1] = "Middle";
    MyLayerEnum[MyLayerEnum["Skill"] = 2] = "Skill";
    MyLayerEnum[MyLayerEnum["UI"] = 3] = "UI";
    MyLayerEnum[MyLayerEnum["Max"] = 4] = "Max";
})(MyLayerEnum || (MyLayerEnum = {}));
var LayerManager = (function () {
    function LayerManager() {
        this.Root = null;
        this.LayerMgr = [];
        this.LayerList = [];
        for (var i = 0; i < MyLayerEnum.Max; i++) {
            this.LayerMgr.push(new Array());
            var ds = new egret.DisplayObjectContainer();
            this.LayerList.push(ds);
        }
    }
    LayerManager.OnCreate = function () {
        LayerManager.Instance = new LayerManager();
        LayerManager.Instance.SetRoot(egret.MainContext.instance.stage);
        return LayerManager.Instance;
    };
    LayerManager.prototype.SetRoot = function (r) {
        this.Root = r;
        for (var i = 0; i < MyLayerEnum.Max; i++) {
            r.addChild(this.LayerList[i]);
        }
    };
    LayerManager.prototype.AddForward = function (d, l) {
        this.LayerList[l].addChildAt(d, 0);
    };
    LayerManager.prototype.AddBackwardd = function (d, l) {
        this.LayerList[l].addChild(d);
    };
    LayerManager.prototype.removeForward = function (l) {
        if (this.LayerList[l].numChildren > 0) {
            this.LayerList[l].removeChildAt(0);
        }
    };
    LayerManager.prototype.GetLayer = function (l) {
        if (l === void 0) { l = MyLayerEnum.Middle; }
        return this.LayerList[l];
    };
    /**
     * 单例
    */
    LayerManager.Instance = null;
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map