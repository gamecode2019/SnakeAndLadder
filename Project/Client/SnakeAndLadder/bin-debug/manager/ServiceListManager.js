//服务器列表数据
// class ServiceListData {
//     //服务器id
//     public ser_id: number = 0;
//     //大区
//     public ser_name: string = "";
//     //服务器名称
//     public ser_area: string = "";
// }
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//服务器列表数据类
var ServiceListManager = (function () {
    function ServiceListManager() {
        //服务器列表数据
        this.serviceAry = [];
        // /**
        //  * 保存上次服务器信息
        //  */
        // public saveLastServiceData():void{
        //     egret.localStorage.
        // }
        // /**
        //  * 获得上次登陆服务器信息
        //  */
        // public getLastServiceData():void{
        // }
    }
    // //根据大区分类 key：大区id、value：列表
    // private serviceMap: { [key: string]: Array<any> } = {};
    /**
     * 获取单例
     */
    ServiceListManager.instance = function () {
        if (ServiceListManager._instance == null) {
            ServiceListManager._instance = new ServiceListManager();
        }
        return ServiceListManager._instance;
    };
    /**
     * 更新服务器列表
     */
    ServiceListManager.prototype.updateServiceList = function (nodeList) {
        //this.serviceAry = nodeList;
        //Util.safeCopy(this.serviceAry, nodeList);
        this.serviceAry = [];
        if (!nodeList) {
            return;
        }
        for (var _i = 0, nodeList_1 = nodeList; _i < nodeList_1.length; _i++) {
            var node = nodeList_1[_i];
            this.serviceAry.push(JSON.parse(node));
        }
        // this.serviceMap = {};
        // this.classifyService();
        // let t1Arr = [];
        // t1Arr.push(JSON.stringify({ id: 1, name: 't1' }));
        // let t1json = JSON.stringify(t1Arr);
        // let r1 = JSON.parse(t1json);
        // let t2Arr = [];
        // t2Arr.push({ id: 1, name: 't1' });
        // let t2json = JSON.stringify(t2Arr);
        // let r2 = JSON.parse(t2json);
    };
    /**
     * 通过id获得服务器数据
     * @param {number} id:
     */
    ServiceListManager.prototype.getServiceDataByid = function (id) {
        if (this.serviceAry.length > 0) {
            for (var i = 0; this.serviceAry.length; i++) {
                if (this.serviceAry[i].ser_id === id) {
                    return this.serviceAry[i];
                }
            }
        }
        else {
            return null;
        }
    };
    /**
     * 获得默认服务器数据
     * @return {ServiceListData}
     */
    ServiceListManager.prototype.getDefaultServiceListData = function () {
        if (this.serviceAry.length > 0) {
            return this.serviceAry[0];
        }
        else {
            return null;
        }
    };
    /**
     * 分类
     */
    // private classifyService(): void {
    //     this.serviceAry.forEach(data => {
    //         let serArea: Array<any> = this.serviceMap[data.ser_area];
    //         if (!serArea) {
    //             serArea = new Array<any>();
    //             this.serviceMap[data.ser_area] = serArea;
    //         }
    //         serArea.push(data);
    //     })
    //     // let t = new Map<string,string>();
    // }
    /**
     * 获得服务器分好的类
     */
    ServiceListManager.prototype.getServiceAry = function () {
        return this.serviceAry;
    };
    // 单例
    ServiceListManager._instance = null;
    return ServiceListManager;
}());
__reflect(ServiceListManager.prototype, "ServiceListManager");
//# sourceMappingURL=ServiceListManager.js.map