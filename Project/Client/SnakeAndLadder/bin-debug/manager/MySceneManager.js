var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var MySceneManagerSingle = (function () {
    function MySceneManagerSingle() {
        /**
         * 鼠标点击
         */
        this.onTouchstart = new Signa();
    }
    MySceneManagerSingle.prototype.Clear = function () {
        this.onTouchstart.Clear();
    };
    return MySceneManagerSingle;
}());
__reflect(MySceneManagerSingle.prototype, "MySceneManagerSingle", ["SignaClear"]);
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(r) {
        var _this = _super.call(this) || this;
        _this.Res = "";
        _this._Map = null;
        _this._mySceneManagerSingle = null;
        if (r) {
            var png = RES.getRes(r);
            var Bitmap = new egret.Bitmap(png);
            _this._Map = new Displayobj(new egret.Bitmap(png));
            _this._Map.SetTransform(_this);
            var v2 = Util.getScreenCenterPos();
            _this.SetPos(v2[0], v2[1]);
            _this._Map.display.scaleX = 1;
            _this._Map.display.scaleY = (egret.MainContext.instance.stage.stageHeight / 1136) * (egret.MainContext.instance.stage.stageWidth / 640);
            LayerManager.Instance.removeForward(0);
            LayerManager.Instance.AddForward(_this._Map.display, 0);
            _this._Map.display.touchEnabled = true;
            _this._Map.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.ontouchstart, _this);
        }
        _this._mySceneManagerSingle = SignaManger.Instance.One(MySceneManagerSingle);
        var SongSheet = SingletonFactory.InstanceT(SongSheetCsvManage).GetItem(0);
        console.log("SongSheet:" + SongSheet.NAME);
        return _this;
    }
    /**
     * 发送世界坐标位置
     */
    Scene.prototype.ontouchstart = function (e) {
        var ws = this._camear.ScreenToWold(e.$stageX, e.$stageY);
        this._mySceneManagerSingle.onTouchstart.Send(ws);
        // console.log("鼠标左键："+ws[0]+"||"+ws[1]);
    };
    Scene.prototype.Destry = function () {
        this._Map.display.touchEnabled = false;
        this._Map.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ontouchstart, null);
    };
    return Scene;
}(Gameobject));
__reflect(Scene.prototype, "Scene");
var MySceneManager = (function () {
    function MySceneManager() {
        this._mySceneManagerSingle = null;
        this.MScene = null;
        this.MCamera = null;
        this._mySceneManagerSingle = SignaManger.Instance.One(MySceneManagerSingle);
    }
    MySceneManager.OnCreate = function () {
        MySceneManager.Instance = new MySceneManager();
        return MySceneManager.Instance;
    };
    MySceneManager.prototype.Create = function (res) {
        if (!this.MCamera) {
            this.MCamera = new GameCamera();
        }
        // this.MCamera.SetPos(0,100);
        if (!this.MScene) {
            this.MScene = new Scene(res);
        }
        return this.MScene;
    };
    MySceneManager.prototype.LoadMainScene = function () {
        UIManager.instance().removeAllWindow();
        var sc = MySceneManager.Instance.Create("bg_03_png");
        //添加大厅
        //     let kb = new KeyBoard();
        //    //添加监听事件
        //    kb.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);
    };
    MySceneManager.prototype.LoadGameScene = function () {
        UIManager.instance().removeAllWindow();
        var sc = MySceneManager.Instance.Create("bg_03_png");
    };
    MySceneManager.prototype.onkeydown = function (event) {
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
    };
    return MySceneManager;
}());
__reflect(MySceneManager.prototype, "MySceneManager");
//# sourceMappingURL=MySceneManager.js.map