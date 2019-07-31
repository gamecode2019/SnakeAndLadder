// TypeScript file
class ConnectTipWindow extends UIWindow {
    private g_panel:eui.Panel
    //
    private reconnectBn:MyButton;
    private closeBn:MyButton;

    private tip:eui.Label;

    /**
     * 初始化主界面
     */
    protected onInit() {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/NetConnectTip.exml";
        this.registerBtnEvent();
        this.initWindow();
    }

    /**
     * 组件第一次添加到舞台时回调
     */
    public createChildren(): void {
        super.createChildren();

    }

    /**
     * 初始化窗口
     */
    private initWindow(): void {
        UserManager.instance().isLogin = false;
        
        this.reconnectBn.setImgScore('Common_json.button_blue_l');
        this.reconnectBn.getLabel().text = 'Reconnect';
        this.reconnectBn.getLabel().size = 32;
        this.closeBn.setImgScore('Common_json.button_green_l');
        this.closeBn.getLabel().text = 'Close';
        this.closeBn.getLabel().size = 32;
       

    }

    /**
     * 注册按钮事件
     */
    private registerBtnEvent(): void {
        this.reconnectBn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchReconnect, this);
        this.closeBn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchcloseBn, this);
    }
    /**
     * 设置提示语
     */
    public setTipMsg(msg:string): void {
        this.tip.text = msg;
    }

    /**
     * 点击重连
     */

    private touchReconnect(){
        platform.getUserInfo()
        .then((userInfo)=>{
            console.info('platform userInfo:',userInfo);
            //连接服务器
            GameNetwork.Instance.connect(function(){
                //facebook 平台
                if (!(typeof FBInstant === 'undefined')){
                    GameNetwork.Instance.requestLoginByFaceBook(new CS_UserLogin(),userInfo);   
                }else if(window['wx']){

                }else{
                    GameNetwork.Instance.requestLoginByWeb(new CS_UserLogin());
                }
            });
            
        });
    }

    /**
     * 点击关闭
     */
    private touchcloseBn(){
       
        
    }
    
    /**
     * 关闭主界面
     */
    public closeMe(): void {
        this.close();
    }

    /**
     * 释放窗口
     */
    public release() {
        // this.union.onRelease();
        // this.task.onRelease();
    }
}

