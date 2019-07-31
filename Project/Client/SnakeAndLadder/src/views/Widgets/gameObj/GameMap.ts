//
// 游戏地图（棋盘）
//
class GameMap extends eui.Component {
    //地图分层
    private g_map: eui.Group;
    private map_bg: eui.Image;
    private snake_layer: eui.Group;
    private tree_layer: eui.Group;
    private ladder_layer: eui.Group;
    private layer_Zoder = { min: 0, snake: 1, tree: 2, ladder: 3, max: 4 }

    //事件格
    private tree_steps: Array<eui.Component> = new Array();

    //玩家对象
    private players: { [key: number]: Player } = {};

    //跳跃移动
    private jumpArr:Array<any> = new Array();

    public constructor() {
        super()
        this.skinName = "resource/eui_skins/widgetSkins/GameMapSkin.exml";
        this.Init();
    }
    protected createChildren(): void {
        super.createChildren();
    }

    private Init() {
        //将地图中格子加入 事件格数组
        for (let index = 0; index < GameMapStepLen; index++) {
            // this['step_' + index].event = GameMapEvent[index].event;
            this.tree_steps.push(this['step_' + index]);
            // GameMapEvent[index].node = this['step_'+index];
        }
        //
    }

    /**
     * 添加玩家到地图
     * @param seatid - 座位号
     */
    public addPlayerToMap(seatid: number) {
        let player = new Player();
        this.g_map.addChildAt(player, this.layer_Zoder.ladder);
        this.players[seatid] = player;
        this.setStep(seatid, 0);

        this.players[seatid].setImg(`HeadIconTest_json.head${seatid + 5}`);
    }

    /**
     * 设置玩家位置
     * @param seatid - 座位号
     * @param step - 步数
     */
    public setStep(seatid: number, step: number) {
        this.players[seatid].x = this.getPosByStep(seatid, step).x;
        this.players[seatid].y = this.getPosByStep(seatid, step).y;
    }

    /**
     * 玩家移动
     */
    public moveToStep(seatid: number, step: number) {
        let dest_x = this.getPosByStep(seatid, step).x;
        let dest_y = this.getPosByStep(seatid, step).y;
        var that = this;
        this.players[seatid].moveTo(dest_x, dest_y, function () {
            that.cashEvent(seatid, step);
            that.setPlayerZoder(seatid, step)
            that.doJumpWithArr()
        })

    }

    /**
     * 跳跃
     */
    public jumpToStep(seatid: number, rollnum: number, endStep: number, out: number) {
        let arr: Array<any> = new Array();
        //超出终点范围 回退out格
        if (out > 0) {
            let maxStep = endStep + out;
            let startStep = endStep + 2 * out - rollnum;
            for (let i = startStep + 1; i <= maxStep; i++) {
                let dest_x = this.getPosByStep(seatid, i).x;
                let dest_y = this.getPosByStep(seatid, i).y;
                arr.push({ x: dest_x, y: dest_y })
            }
            for (let i = maxStep-1; i >= endStep; i--) {
                let dest_x = this.getPosByStep(seatid, i).x;
                let dest_y = this.getPosByStep(seatid, i).y;
                arr.push({ x: dest_x, y: dest_y })
            }
        } else {
            let startStep = endStep - rollnum;
            for (let i = startStep + 1; i <= endStep; i++) {
                let dest_x = this.getPosByStep(seatid, i).x;
                let dest_y = this.getPosByStep(seatid, i).y;
                arr.push({ x: dest_x, y: dest_y })
            }
        }

        
        //按数组移动
        var that = this;
        this.players[seatid].moveWithArr(arr, function () {
            that.cashEvent(seatid, endStep);
            that.setPlayerZoder(seatid, endStep)
            that.doJumpWithArr()
        })
    }

    /**
     * 跳跃
     */
    public jumpWithArr(seatid:number,rollnum:number,moveArr:Array<any>) {
        for(let elem of moveArr){
            elem.seatid = seatid;
            elem.rollnum = rollnum;
        }
        this.jumpArr = new Array()
        this.jumpArr = this.jumpArr.concat(moveArr);
        this.doJumpWithArr();
    }
    /**
     * 定时执行跳跃移动数组
     */
    public doJumpWithArr(){
        let nowTime = Date.now();
        if(this.jumpArr.length<=0){
            return;
        }
        
        let moveEvent = this.jumpArr.shift();
        if(!moveEvent){
            this.doJumpWithArr()
            return;
        }
        
        if(moveEvent.name=='ladder'||moveEvent.name=='snake'){
            this.moveToStep(moveEvent.seatid,moveEvent.step);
        }
        if(moveEvent.name=='tree'){
            this.jumpToStep(moveEvent.seatid,moveEvent.rollnum,moveEvent.step,moveEvent.out);
        }
        if(moveEvent.name=='destination'){
            //终点
            // GameManager.instance().playerFinish(moveEvent.seatid);
        }
        
    }

    /**
     * 
     */
    private setPlayerZoder(seatid: number, step: number) {
        if (step == 25) {
            this.g_map.setChildIndex(this.players[seatid], this.layer_Zoder.tree);
        } else {
            this.g_map.setChildIndex(this.players[seatid], this.g_map.numChildren - 1);
        }

    }

    /**
     * 计算坐标x,y
     */
    private getPosByStep(seatid: number, step: number): any {
        let x = this.tree_steps[step].x + (this.tree_steps[step].width - this.players[seatid].width) / 2 + -10 + seatid * 5;
        // let y = this.tree_steps[step].y - (this.tree_steps[step].height + this.players[seatid].height) / 2 - 30;
        let y = this.tree_steps[step].y - this.players[seatid].height + this.tree_steps[step].height/2;
        return { x: x, y: y }
    }

    /**
     * 触碰到棋子事件
     */
    private cashEvent(seatid: number, step: number) {
        if(GameDebug==DebugType.OnLine){
            return;
        }
        if(GameMapEvents[step]){
            console.info("触碰到棋子事件", GameMapEvents[step])
            //处理事件
            let key = GameMapEvents[step].name;
            switch (key) {
                case "start":
                    break;
                case "tree":
                    {

                    }
                    break;
                case "ladder":
                    {
                        let toIndex = GameMapEvents[step].toIndex;
                        GameManager.instance().playEventStep(key, seatid, toIndex);
                    }
                    break;
                case "snake":
                    {
                        let toIndex = GameMapEvents[step].toIndex;
                        GameManager.instance().playEventStep(key, seatid, toIndex);
                    }
                    break;
                case "destination":
                    {
                        let toIndex = GameMapEvents[step].toIndex;
                        //终点
                        GameManager.instance().playerFinish(seatid);
                    }
                    break;

                default:
                    break;
            }
        }
        

    }

}

