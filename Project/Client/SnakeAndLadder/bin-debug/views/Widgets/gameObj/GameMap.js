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
//
// 游戏地图（棋盘）
//
var GameMap = (function (_super) {
    __extends(GameMap, _super);
    function GameMap() {
        var _this = _super.call(this) || this;
        _this.layer_Zoder = { min: 0, snake: 1, tree: 2, ladder: 3, max: 4 };
        //事件格
        _this.tree_steps = new Array();
        //玩家对象
        _this.players = {};
        //跳跃移动
        _this.jumpArr = new Array();
        _this.skinName = "resource/eui_skins/widgetSkins/GameMapSkin.exml";
        _this.Init();
        return _this;
    }
    GameMap.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    GameMap.prototype.Init = function () {
        //将地图中格子加入 事件格数组
        for (var index = 0; index < GameMapStepLen; index++) {
            // this['step_' + index].event = GameMapEvent[index].event;
            this.tree_steps.push(this['step_' + index]);
            // GameMapEvent[index].node = this['step_'+index];
        }
        //
    };
    /**
     * 添加玩家到地图
     * @param seatid - 座位号
     */
    GameMap.prototype.addPlayerToMap = function (seatid) {
        var player = new Player();
        this.g_map.addChildAt(player, this.layer_Zoder.ladder);
        this.players[seatid] = player;
        this.setStep(seatid, 0);
        this.players[seatid].setImg("HeadIconTest_json.head" + (seatid + 5));
    };
    /**
     * 设置玩家位置
     * @param seatid - 座位号
     * @param step - 步数
     */
    GameMap.prototype.setStep = function (seatid, step) {
        this.players[seatid].x = this.getPosByStep(seatid, step).x;
        this.players[seatid].y = this.getPosByStep(seatid, step).y;
    };
    /**
     * 玩家移动
     */
    GameMap.prototype.moveToStep = function (seatid, step) {
        var dest_x = this.getPosByStep(seatid, step).x;
        var dest_y = this.getPosByStep(seatid, step).y;
        var that = this;
        this.players[seatid].moveTo(dest_x, dest_y, function () {
            that.cashEvent(seatid, step);
            that.setPlayerZoder(seatid, step);
            that.doJumpWithArr();
        });
    };
    /**
     * 跳跃
     */
    GameMap.prototype.jumpToStep = function (seatid, rollnum, endStep, out) {
        var arr = new Array();
        //超出终点范围 回退out格
        if (out > 0) {
            var maxStep = endStep + out;
            var startStep = endStep + 2 * out - rollnum;
            for (var i = startStep + 1; i <= maxStep; i++) {
                var dest_x = this.getPosByStep(seatid, i).x;
                var dest_y = this.getPosByStep(seatid, i).y;
                arr.push({ x: dest_x, y: dest_y });
            }
            for (var i = maxStep - 1; i >= endStep; i--) {
                var dest_x = this.getPosByStep(seatid, i).x;
                var dest_y = this.getPosByStep(seatid, i).y;
                arr.push({ x: dest_x, y: dest_y });
            }
        }
        else {
            var startStep = endStep - rollnum;
            for (var i = startStep + 1; i <= endStep; i++) {
                var dest_x = this.getPosByStep(seatid, i).x;
                var dest_y = this.getPosByStep(seatid, i).y;
                arr.push({ x: dest_x, y: dest_y });
            }
        }
        //按数组移动
        var that = this;
        this.players[seatid].moveWithArr(arr, function () {
            that.cashEvent(seatid, endStep);
            that.setPlayerZoder(seatid, endStep);
            that.doJumpWithArr();
        });
    };
    /**
     * 跳跃
     */
    GameMap.prototype.jumpWithArr = function (seatid, rollnum, moveArr) {
        for (var _i = 0, moveArr_1 = moveArr; _i < moveArr_1.length; _i++) {
            var elem = moveArr_1[_i];
            elem.seatid = seatid;
            elem.rollnum = rollnum;
        }
        this.jumpArr = new Array();
        this.jumpArr = this.jumpArr.concat(moveArr);
        this.doJumpWithArr();
    };
    /**
     * 定时执行跳跃移动数组
     */
    GameMap.prototype.doJumpWithArr = function () {
        var nowTime = Date.now();
        if (this.jumpArr.length <= 0) {
            return;
        }
        var moveEvent = this.jumpArr.shift();
        if (!moveEvent) {
            this.doJumpWithArr();
            return;
        }
        if (moveEvent.name == 'ladder' || moveEvent.name == 'snake') {
            this.moveToStep(moveEvent.seatid, moveEvent.step);
        }
        if (moveEvent.name == 'tree') {
            this.jumpToStep(moveEvent.seatid, moveEvent.rollnum, moveEvent.step, moveEvent.out);
        }
        if (moveEvent.name == 'destination') {
            //终点
            // GameManager.instance().playerFinish(moveEvent.seatid);
        }
    };
    /**
     *
     */
    GameMap.prototype.setPlayerZoder = function (seatid, step) {
        if (step == 25) {
            this.g_map.setChildIndex(this.players[seatid], this.layer_Zoder.tree);
        }
        else {
            this.g_map.setChildIndex(this.players[seatid], this.g_map.numChildren - 1);
        }
    };
    /**
     * 计算坐标x,y
     */
    GameMap.prototype.getPosByStep = function (seatid, step) {
        var x = this.tree_steps[step].x + (this.tree_steps[step].width - this.players[seatid].width) / 2 + -10 + seatid * 5;
        // let y = this.tree_steps[step].y - (this.tree_steps[step].height + this.players[seatid].height) / 2 - 30;
        var y = this.tree_steps[step].y - this.players[seatid].height + this.tree_steps[step].height / 2;
        return { x: x, y: y };
    };
    /**
     * 触碰到棋子事件
     */
    GameMap.prototype.cashEvent = function (seatid, step) {
        if (GameDebug == DebugType.OnLine) {
            return;
        }
        if (GameMapEvents[step]) {
            console.info("触碰到棋子事件", GameMapEvents[step]);
            //处理事件
            var key = GameMapEvents[step].name;
            switch (key) {
                case "start":
                    break;
                case "tree":
                    {
                    }
                    break;
                case "ladder":
                    {
                        var toIndex = GameMapEvents[step].toIndex;
                        GameManager.instance().playEventStep(key, seatid, toIndex);
                    }
                    break;
                case "snake":
                    {
                        var toIndex = GameMapEvents[step].toIndex;
                        GameManager.instance().playEventStep(key, seatid, toIndex);
                    }
                    break;
                case "destination":
                    {
                        var toIndex = GameMapEvents[step].toIndex;
                        //终点
                        GameManager.instance().playerFinish(seatid);
                    }
                    break;
                default:
                    break;
            }
        }
    };
    return GameMap;
}(eui.Component));
__reflect(GameMap.prototype, "GameMap");
//# sourceMappingURL=GameMap.js.map