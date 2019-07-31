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
var TestWindow = (function (_super) {
    __extends(TestWindow, _super);
    function TestWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestWindow.prototype.onInit = function () {
        this.skinName = "resource/eui_skins/TestSkin.exml";
    };
    TestWindow.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TestWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.txt_name.text = "Snow";
        // this.img_dragon.source = RES.getRes("egret_icon_png");
        //this.playDragonEff();
        this.showRoleWing(0);
    };
    /**
           *刷新机器人特效
           */
    TestWindow.prototype.playDragonEff = function () {
        this.loadChibangByResName("backman_json");
    };
    /**
           * 异步Robot动画资源
           */
    TestWindow.prototype.loadChibangByResName = function (name) {
        var self = this;
        RES.getResAsync(name, function (data, key) {
            if (key == "Robot_json") {
                self.loadChibangByResName("texture_json");
            }
            else if (key == "texture_json") {
                self.loadChibangByResName("texture_png");
            }
            else if (key == "texture_png") {
                this.showRoleWing();
            }
        }, this);
    };
    /**
          * 展示Robot特效
          */
    TestWindow.prototype.showRoleWing = function (wingId) {
        this.egretFactory = DragonBoneManager.instance().createDragonByName("backman");
        var eff_robot = this.egretFactory.buildArmatureDisplay("armatureName");
        this.addChild(eff_robot);
        eff_robot.animation.play("animation", 0);
        eff_robot.x = 250;
        eff_robot.y = 300;
    };
    return TestWindow;
}(UIWindow));
__reflect(TestWindow.prototype, "TestWindow");
//# sourceMappingURL=TestWindow.js.map