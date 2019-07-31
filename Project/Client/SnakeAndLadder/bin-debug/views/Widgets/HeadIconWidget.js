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
var HeadIconWidget = (function (_super) {
    __extends(HeadIconWidget, _super);
    function HeadIconWidget() {
        var _this = _super.call(this) || this;
        //遮罩
        _this.head_shape = null;
        _this.scale = 1;
        _this.scale_img = 1;
        //点击事件
        _this.touchEvent = null;
        //裁剪类型：0 圆角矩形
        _this.type = 0;
        //绑定的用户信息
        _this.playerInfo = new PlayerInfo();
        /**
         * 图片类型，人物小图像、游戏中的形象图
         */
        _this.headType = HeadIconType.headIcon;
        _this.imgTexture = null;
        _this.headIconIndex = null; //当前形象图下标
        _this.skinName = "HeadIconWidgetSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchCallBack, _this);
        //设置遮罩
        _this.head_shape = new egret.Shape();
        _this.addChildAt(_this.head_shape, 0);
        _this.head_img.mask = _this.head_shape;
        return _this;
    }
    /**
     * 设置点击事件
     */
    HeadIconWidget.prototype.setTouchCallBack = function (event) {
        this.touchEvent = event;
    };
    /**
     * 设置名字不可见
     */
    HeadIconWidget.prototype.setNameVisiable = function (vis) {
        this.head_name.alpha = vis ? 1 : 0;
    };
    /**
     * 设置名字颜色
     */
    HeadIconWidget.prototype.setNameColor = function (color) {
        this.head_name.textColor = color;
    };
    HeadIconWidget.prototype.touchCallBack = function (event) {
        if (this.touchEvent) {
            this.touchEvent(this.data);
        }
    };
    HeadIconWidget.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 用户图像数据更新时调用
     */
    HeadIconWidget.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        console.info("HeadIconWidget refresh:", this.data);
        if (this.data.scale) {
            this.setScale(this.data.scale);
        }
        if (this.data.scale_img) {
            this.setScaleImg(this.data.scale_img);
        }
        //设置用户信息
        if (this.data.playerInfo) {
            this.playerInfo = this.data.playerInfo;
            if (this.playerInfo.id == UserManager.instance().getPlayerInfo().id) {
                this.setNameColor(0x445FA4);
            }
        }
        //添加事件
        if (this.data.event) {
            this.setTouchCallBack(this.data.event);
        }
        //显示的图像类型
        if (this.data.headType) {
            this.headType = this.data.headType;
            this.headIconIndex = this.data.headIconIndex;
            this.imgTexture = ShopManager.instance().getShopItemData(this.headIconIndex.toString()).sourceName;
        }
        //
        this.refresh();
        //设置裁剪类型
        if (this.type == 0) {
            this.drawHeadImgRectRound();
        }
    };
    /**
     * 设置大小
     */
    HeadIconWidget.prototype.setScale = function (scale) {
        this.scale = scale;
        this.scaleX = scale;
        this.scaleY = scale;
    };
    /**
     * 游戏下方
     */
    HeadIconWidget.prototype.setScaleImg = function (scale_img) {
        this.scale_img = scale_img;
        this.head_img.scaleX = scale_img;
        this.head_img.scaleY = scale_img;
        // this.head_img.x = (1-scale_img)*this.head_img.width
        // this.head_img.y = (1-scale_img)*this.head_img.height
        this.head_kuang.scaleX = scale_img;
        this.head_kuang.scaleY = scale_img;
        // this.head_kuang.x = (1-scale_img)*this.head_kuang.width
        // this.head_kuang.y = (1-scale_img)*this.head_kuang.height/2
    };
    /**
     * 圆角矩形图像
     */
    HeadIconWidget.prototype.drawHeadImgRectRound = function () {
        if (!this.head_shape) {
            return;
        }
        this.head_shape.graphics.clear();
        this.head_shape.graphics.beginFill(0xD96E66, 1);
        this.head_shape.graphics.lineStyle(1, 0xD96E66, 1);
        this.head_shape.graphics.drawRoundRect(0, 0, (this.head_kuang.width - 3) * this.scale_img, (this.head_kuang.height - 3) * this.scale_img, 20, 20);
        this.head_shape.graphics.endFill();
        this.head_shape.x = 1.5 + (1 - this.scale_img) * this.head_kuang.width / 2;
        this.head_shape.y = (1 - this.scale_img) * this.head_kuang.height / 2;
    };
    /**
     * refresh icon
     */
    HeadIconWidget.prototype.refresh = function () {
        var _this = this;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.head_name.text = this.playerInfo.nickName;
        //图像显示
        switch (this.headType) {
            case HeadIconType.headIcon:
                //this.head_img.source="HeadIconTest_json.head2";
                if (this.playerInfo.avatarUrl) {
                    var that_1 = this;
                    //load 图像
                    this.loadHttpIcon({
                        success: function () {
                            console.info("refresh icon img.", that_1.playerInfo.nickName);
                        }
                    });
                }
                break;
            case HeadIconType.gameIcon://当前选择显示的形象图
                var index = this.playerInfo.selectScan; //当前选择的皮肤形象下标
                this.head_img.source = ShopManager.instance().getShopItemData(index.toString()).sourceName;
                break;
            case HeadIconType.gameIconOne://形象列表显示的皮肤形象
                this.head_img.source = this.imgTexture;
                this.setNameVisiable(false);
                //添加点击选择形象监听事件
                this.head_img.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    //发送改变皮肤消息
                    EventManager.instance().dispatchEvent(GameEvents.CHANGE_PLAYER_SKIN, _this.headIconIndex);
                    console.log(_this.head_img);
                }, this);
                break;
            default: break;
        }
    };
    HeadIconWidget.prototype.loadHttpIcon = function (obj) {
        var that = this;
        var imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous"; // 跨域请求
        imgLoader.load(this.playerInfo.avatarUrl);
        imgLoader.once(egret.Event.COMPLETE, function (evt) {
            if (evt.currentTarget.data) {
                var texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                that.head_img.texture = texture;
                obj.success();
            }
        }, this);
    };
    return HeadIconWidget;
}(eui.ItemRenderer));
__reflect(HeadIconWidget.prototype, "HeadIconWidget");
//# sourceMappingURL=HeadIconWidget.js.map