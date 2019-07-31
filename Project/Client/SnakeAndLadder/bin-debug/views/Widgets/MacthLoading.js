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
var MacthLoading = (function (_super) {
    __extends(MacthLoading, _super);
    /**
     *
     */
    function MacthLoading() {
        var _this = _super.call(this) || this;
        _this.skinName = MacthLoadingSkin; //"resource/eui_skins/Animations/MacthLoadingSkin.exml";
        return _this;
    }
    MacthLoading.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // this.jumpFont.play(0);
        // this.jumpFont.addEventListener('complete',this.onTweenGroupComplete,this);
        //
        this.loading.setCallBack(function () {
            //
            console.info("匹配结束");
        });
        this.loading.addTouchEvent();
        this.loading.startTime(GameManager.instance().MatchingTime / 1000);
        if (GameManager.instance().type == GameType.firendMode) {
            this.tip.text = 'Waiting for firends ...';
        }
        else if (GameManager.instance().type == GameType.matchingMode) {
            this.tip.text = 'Matching other players ...';
        }
        else {
            this.tip.text = 'Matching computers ...';
        }
    };
    MacthLoading.prototype.onTweenGroupComplete = function () {
        // this.jumpFont.play(0);
    };
    return MacthLoading;
}(eui.Component));
__reflect(MacthLoading.prototype, "MacthLoading");
//# sourceMappingURL=MacthLoading.js.map