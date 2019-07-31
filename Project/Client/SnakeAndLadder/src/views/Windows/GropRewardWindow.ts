class GropRewardWindow extends UIWindow{
    private gro_reward:eui.Group;
    private gro_list:eui.Group;//奖励列表
    private re_rect:eui.Rect;   //遮罩
    private isShowReward:boolean=true;//是否显示奖励列表
    private btn_drop:eui.Button;      //倒三角形
    private lab_reward1:eui.Label;
    private lab_reward2:eui.Label;
    private lab_reward3:eui.Label;
    private lab_reward4:eui.Label;

    /**
     * 界面初始化
     */
    protected onInit(): void {
        super.onInit();
        this.skinName = "resource/eui_skins/windowSkins/GropReward.exml";
        EventManager.instance().addEventListener(GameEvents.ShowReward,this.clickShowRewardBtn,this)
        this.btn_drop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShowRewardBtn,this);
        this.lab_reward1.text='2000';
        this.lab_reward2.text='1000';
        this.lab_reward3.text='500';
        this.lab_reward4.text='250';
    }

    /**
     * 创建子结点
     */
    protected createChildren() {
        super.createChildren();
        console.log("createChildren");
    }

        /**
     * 显示设置面板
     */
    private clickToSettingBtn()
    {
        UIManager.instance().openWindow("SettingWindow")
    }
    /**
     * 显示奖励列表
     */
    private clickShowRewardBtn(_isShow:boolean)
    {
        if(this.isShowReward)
        {
            this.isShowReward=null;
            this.gro_reward.visible=true;
            this.re_rect.visible=true;
            this.gro_list.mask=this.re_rect;

            let tw=egret.Tween.get(this.gro_list).
            to({y:this.gro_list.y+this.gro_list.height},500).call(()=>
            {
                this.isShowReward=false;
            })
        }
        else if(this.isShowReward==false)
        {
            this.isShowReward=null;
            this.gro_reward.visible=true;
            let tw=egret.Tween.get(this.gro_list).
            to({y:this.gro_list.y-this.gro_list.height},500).call(()=>
            {
                this.isShowReward=true;
                this.gro_reward.visible=false;
            })
        }
    }
}