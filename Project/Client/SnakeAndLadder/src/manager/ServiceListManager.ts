//服务器列表数据
// class ServiceListData {
//     //服务器id
//     public ser_id: number = 0;
//     //大区
//     public ser_name: string = "";
//     //服务器名称
//     public ser_area: string = "";
// }

//服务器列表数据类
class ServiceListManager {
    // 单例
    private static _instance: ServiceListManager = null;

    //服务器列表数据
    private serviceAry: Array<any> = [];

    // //根据大区分类 key：大区id、value：列表
    // private serviceMap: { [key: string]: Array<any> } = {};



    /**
     * 获取单例
     */
    public static instance(): ServiceListManager {
        if (ServiceListManager._instance == null) {
            ServiceListManager._instance = new ServiceListManager();
        }
        return ServiceListManager._instance;
    }

    /**
     * 更新服务器列表
     */
    public updateServiceList(nodeList: any): void {
        //this.serviceAry = nodeList;
        //Util.safeCopy(this.serviceAry, nodeList);
        this.serviceAry = [];
        if(!nodeList){
            return;
        }
        for (var node of nodeList) {
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
    }

    /**
     * 通过id获得服务器数据
     * @param {number} id: 
     */
    public getServiceDataByid(id: number): any {
        if (this.serviceAry.length > 0) {
            for (let i = 0; this.serviceAry.length; i++) {
                if (this.serviceAry[i].ser_id === id) {
                    return this.serviceAry[i];
                }
            }
        } else {
            return null;
        }
    }

    /**
     * 获得默认服务器数据
     * @return {ServiceListData}
     */
    public getDefaultServiceListData(): any {
        if (this.serviceAry.length > 0) {
            return this.serviceAry[0];
        } else {
            return null;
        }

    }

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
    public getServiceAry(): Array<any> {
        return this.serviceAry;
    }
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