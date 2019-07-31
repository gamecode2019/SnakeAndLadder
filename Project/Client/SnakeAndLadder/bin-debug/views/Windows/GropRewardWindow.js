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
var GropRewardWindow = (function (_super) {
    __extends(GropRewardWindow, _super);
    function GropRewardWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isShowReward = true; //是否显示奖励列表
        return _this;
    }
    /**
     * 界面初始化
     */
    GropRewardWindow.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.skinName = "resource/eui_skins/windowSkins/GropReward.exml";
        EventManager.instance().addEventListener(GameEvents.ShowReward, this.clickShowRewardBtn, this);
        this.btn_drop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShowRewardBtn, this);
        this.lab_reward1.text = '2000';
        this.lab_reward2.text = '1000';
        this.lab_reward3.text = '500';
        this.lab_reward4.text = '250';
    };
    /**
     * 创建子结点
     */
    GropRewardWindow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.log("createChildren");
    };
    /**
 * 显示设置面板
 */
    GropRewardWindow.prototype.clickToSettingBtn = function () {
        UIManager.instance().openWindow("SettingWindow");
    };
    /**
     * 显示奖励列表
     */
    GropRewardWindow.prototype.clickShowRewardBtn = function (_isShow) {
        var _this = this;
        if (this.isShowReward) {
            this.isShowReward = null;
            this.gro_reward.visible = true;
            this.re_rect.visible = true;
            this.gro_list.mask = this.re_rect;
            var tw = egret.Tween.get(this.gro_list).
                to({ y: this.gro_list.y + this.gro_list.height }, 500).call(function () {
                _this.isShowReward = false;
            });
        }
        else if (this.isShowReward == false) {
            this.isShowReward = null;
            this.gro_reward.visible = true;
            var tw = egret.Tween.get(this.gro_list).
                to({ y: this.gro_list.y - this.gro_list.height }, 500).call(function () {
                _this.isShowReward = true;
                _this.gro_reward.visible = false;
            });
        }
    };
    return GropRewardWindow;
}(UIWindow));
__reflect(GropRewardWindow.prototype, "GropRewardWindow");
//# sourceMappingURL=GropRewardWindow.js.map