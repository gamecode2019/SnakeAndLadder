// eventScript file
//地图总格数
const GameMapStepLen = 48;
//地图事件格
var GameMapEvents: { [key: number]: {name:string,toIndex:number} } = {
    0:{name:"start",toIndex:0},
    1:{name:"tree",toIndex:0},
    7:{name:"ladder",toIndex:19},
    17:{name:"ladder",toIndex:29},
    20:{name:"snake",toIndex:1},
    24:{name:"ladder",toIndex:41},
    27:{name:"ladder",toIndex:38},
    30:{name:"snake",toIndex:12},
    36:{name:"snake",toIndex:19},
    46:{name:"snake",toIndex:25},
    47:{name:"destination",toIndex:0}

};
