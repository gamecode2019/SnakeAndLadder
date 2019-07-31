/**
 * 图像使用范例:
 * var that = this;
 * let HeadIconWidget head;
 * head.data = {playerInfo:this.playerInfo,scale:1.0,...,event:function(data){
 *      //
 *      that.OnClick(data);
 *          
 * }};
 * head.setNameColor...
 */

class HeadIconWidget extends eui.ItemRenderer {
    private head_img:eui.Image;
    private head_kuang:eui.Image;
    //遮罩
    private head_shape:egret.Shape = null;
    private head_name:eui.Label
    private scale:number = 1;
    private scale_img:number = 1;
    //点击事件
    private touchEvent:Function = null;
    //裁剪类型：0 圆角矩形
    private type:number = 0;
    //绑定的用户信息
    private playerInfo:PlayerInfo = new PlayerInfo();

    /**
     * 图片类型，人物小图像、游戏中的形象图
     */
    public headType:HeadIconType=HeadIconType.headIcon;
    private imgTexture:egret.Texture=null;
    private headIconIndex:number=null;      //当前形象图下标

    public constructor() {
        super()
        this.skinName = "HeadIconWidgetSkin"
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCallBack, this);

        //设置遮罩
        this.head_shape = new egret.Shape();
        this.addChildAt(this.head_shape,0);
        this.head_img.mask = this.head_shape;
    }
    /**
     * 设置点击事件
     */
    public setTouchCallBack(event:Function){
        this.touchEvent = event;
    }
    /**
     * 设置名字不可见
     */
    public setNameVisiable(vis:boolean){
        this.head_name.alpha = vis?1:0;
    }

    /**
     * 设置名字颜色
     */
    public setNameColor(color){
        this.head_name.textColor = color;
    }


    private touchCallBack(event: egret.TouchEvent){
        if(this.touchEvent){
            this.touchEvent(this.data);
        }
    }

    protected createChildren(): void {
        super.createChildren();
    }
    /**
     * 用户图像数据更新时调用
     */
    protected dataChanged(): void {
        super.dataChanged();
        console.info("HeadIconWidget refresh:",this.data);
        if(this.data.scale){
            this.setScale(this.data.scale);
        }
        if(this.data.scale_img){
            this.setScaleImg(this.data.scale_img);
        }
        //设置用户信息
        if(this.data.playerInfo){
            this.playerInfo = this.data.playerInfo;
            if(this.playerInfo.id==UserManager.instance().getPlayerInfo().id){
                this.setNameColor(0x445FA4);
            }
        }
        //添加事件
        if(this.data.event){
            this.setTouchCallBack(this.data.event);
        }
        //显示的图像类型
        if(this.data.headType)
        {
            this.headType=this.data.headType;
            this.headIconIndex=this.data.headIconIndex;
            this.imgTexture=ShopManager.instance().getShopItemData(
                this.headIconIndex.toString()).sourceName;
        }
        //
        this.refresh(); 
   

        //设置裁剪类型
        if(this.type==0){
            this.drawHeadImgRectRound();
        }  

    }

    /**
     * 设置大小
     */
    private setScale(scale:number){
        this.scale = scale;
        this.scaleX = scale;
        this.scaleY = scale;
    }
    /**
     * 游戏下方
     */
    private setScaleImg(scale_img:number){
        this.scale_img = scale_img;
        this.head_img.scaleX = scale_img;
        this.head_img.scaleY = scale_img;
        // this.head_img.x = (1-scale_img)*this.head_img.width
        // this.head_img.y = (1-scale_img)*this.head_img.height
        this.head_kuang.scaleX = scale_img;
        this.head_kuang.scaleY = scale_img;
        // this.head_kuang.x = (1-scale_img)*this.head_kuang.width
        // this.head_kuang.y = (1-scale_img)*this.head_kuang.height/2
    }

    /**
     * 圆角矩形图像
     */
    private drawHeadImgRectRound(){
        if(!this.head_shape){
            return;
        }
        this.head_shape.graphics.clear();
       
        this.head_shape.graphics.beginFill(0xD96E66, 1);
        this.head_shape.graphics.lineStyle(1,0xD96E66,1);
        this.head_shape.graphics.drawRoundRect(0,0,(this.head_kuang.width-3)*this.scale_img,
        (this.head_kuang.height-3)*this.scale_img,20,20);
        this.head_shape.graphics.endFill();
        this.head_shape.x = 1.5+(1-this.scale_img)*this.head_kuang.width/2;
        this.head_shape.y = (1-this.scale_img)*this.head_kuang.height/2;
    }

    /**
     * refresh icon
     */
    private refresh():void{
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2

        this.head_name.text = this.playerInfo.nickName;
        
        
        //图像显示
        switch(this.headType)
        {
            case HeadIconType.headIcon:
                //this.head_img.source="HeadIconTest_json.head2";
                if(this.playerInfo.avatarUrl){
                    
                    let that = this;
                    //load 图像
                    this.loadHttpIcon({
                        success:function(){
                            console.info("refresh icon img.",that.playerInfo.nickName);
                        }           
                    });        
                }
                break;
            case HeadIconType.gameIcon://当前选择显示的形象图
                let index=this.playerInfo.selectScan;//当前选择的皮肤形象下标
                this.head_img.source=ShopManager.instance().getShopItemData(index.toString()).sourceName;
                break;
            case HeadIconType.gameIconOne://形象列表显示的皮肤形象
                this.head_img.source=this.imgTexture;
                
                this.setNameVisiable(false);
                //添加点击选择形象监听事件
                this.head_img.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                //发送改变皮肤消息
                EventManager.instance().dispatchEvent(GameEvents.CHANGE_PLAYER_SKIN,this.headIconIndex)
                console.log(this.head_img)
                },this)
                break
            default:break;
        }
    }

    private loadHttpIcon(obj){
        let that = this;
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";// 跨域请求
        imgLoader.load(this.playerInfo.avatarUrl);    
        imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
            if (evt.currentTarget.data) {
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                
                that.head_img.texture = texture;
                obj.success();
            }
        }, this);
    }

    

}
