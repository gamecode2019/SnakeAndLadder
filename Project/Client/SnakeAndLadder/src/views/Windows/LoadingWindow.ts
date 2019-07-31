//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingWindow extends UIWindow implements RES.PromiseTaskReporter {
    private Bg: egret.Bitmap;//背景
    private logo: egret.Bitmap;//logo 
    private text1: egret.TextField;//对话1
    private text2: egret.TextField;//对话2
    private progressBg: egret.Bitmap;//进度条背景  
    private progressFront: egret.Bitmap;//进度条前面
    private frontMask: egret.Rectangle;//进度条遮罩
    private warnText: egret.TextField;//警告
    private bottom1: egret.TextField;
    private bottom2: egret.TextField;
    private w: number = 0;
    private h: number = 0;

    /**
     * 初始化函数
     */
    public onInit() {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }

    /**
     * 创建视图
     */
    private createView(): void {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        this.Bg = new egret.Bitmap();
        Util.setAnchorMiddle(this.Bg);
        this.Bg.texture = RES.getRes("bg_03_png");
        this.Bg.width = this.w;
        this.Bg.height = this.h;
        // this.Bg.y = UIManager.instance().heightOffset();
        this.addChild(this.Bg);

        // this.logo = new egret.Bitmap();
        // this.logo.texture = RES.getRes("logo2_png");
        // this.setAnchorMiddle(this.logo);
        // this.logo.x = this.w / 2;
        // this.logo.y = this.logo.height / 2 + 100;
        // this.addChild(this.logo);

        this.text1 = new egret.TextField();
        this.addChild(this.text1);
        this.text1.width = this.w * 0.5;
        this.text1.height = 18;
        this.setAnchorMiddle(this.text1);
        this.text1.x = this.w / 2;
        this.text1.y = this.h - 220;
        this.text1.textAlign = "center";
        this.text1.size = 18;
        this.text1.textColor = 0xFFFFFF;
        this.text1.fontFamily = "Microsoft YaHei";
        this.text1.text = "首次加载时间较长，请耐心等待";

        this.text2 = new egret.TextField();
        this.text2.width = this.w * 0.5;
        this.text2.height = 15;
        this.setAnchorMiddle(this.text2);
        this.text2.fontFamily = "Microsoft YaHei";
        this.text2.textAlign = "center";
        this.text2.size = 14;
        this.text2.textFlow =
            new Array<egret.ITextElement>(
                { text: "无法进入游戏请", style: { "textColor": 0xffffff, } },
                { text: "刷新", style: { "href": "event:text event triggered", "textColor": 0xFF905A, underline: true } },
                { text: "正在下载sdk", style: { "textColor": 0xffffff, } }
            );
        this.text2.touchEnabled = true;
        this.text2.addEventListener(egret.TextEvent.LINK, this.referesh, this);
        this.addChild(this.text2);
        this.text2.x = this.text1.x;
        this.text2.y = this.text1.y + 28;

        this.progressBg = new egret.Bitmap();
        this.progressBg.texture = RES.getRes("bar_jiazai_01_png");
        this.progressBg.scale9Grid = new egret.Rectangle(2, 2, 6, 5);
        this.progressBg.width = this.w * 0.8;
        this.progressBg.height = 9;
        this.setAnchorMiddle(this.progressBg);
        this.progressBg.x = this.w / 2;
        this.progressBg.y = this.text2.y + 28;
        this.addChild(this.progressBg);

        this.progressFront = new egret.Bitmap();
        this.progressFront.texture = RES.getRes("bar_jiazai_02_png");
        this.progressFront.scale9Grid = new egret.Rectangle(2, 2, 6, 5);
        this.progressFront.width = this.w * 0.8;
        this.progressFront.height = 9;
        this.setAnchorMiddle(this.progressFront);
        this.progressFront.x = this.progressBg.x;
        this.progressFront.y = this.progressBg.y;
        this.addChild(this.progressFront);

        this.warnText = new egret.TextField();
        this.warnText.width = this.w * 0.8;
        this.warnText.height = 39;
        this.setAnchorMiddle(this.warnText);
        this.warnText.text = "抵 制 不 良 游 戏   拒 绝 盗 版 游 戏   注 意 自 我 保 护   谨 防 上 当 受 骗\n" +
            "适 度 游 戏 益 脑   沉 默 游 戏 伤 身   合 理 安 排 时 间   享 受 健 康 生 活";
        this.warnText.lineSpacing = 10;
        this.warnText.textColor = 0x848A96;
        this.warnText.size = 14;
        this.warnText.textAlign = "center";
        this.warnText.x = this.w / 2;
        this.warnText.y = this.progressFront.y + 35;
        this.addChild(this.warnText);

        this.bottom1 = new egret.TextField();
        this.bottom1.width = this.w * 0.8;
        this.bottom1.height = 15;
        this.setAnchorMiddle(this.bottom1);
        this.bottom1.text = "网络游戏初版物号（ISBN） ISBN 978-7-7979-3652-0";
        this.bottom1.lineSpacing = 10;
        this.bottom1.textColor = 0x848A96;
        this.bottom1.size = 14;
        this.bottom1.textAlign = "center";
        this.bottom1.x = this.w / 2;
        this.bottom1.y = this.warnText.y + 40;
        this.addChild(this.bottom1);

        this.bottom2 = new egret.TextField();
        this.bottom2.width = this.w * 0.8;
        this.bottom2.height = 15;
        this.setAnchorMiddle(this.bottom2);
        this.bottom2.text = "本应用由’武汉小脑斧信息科技有限公司’提供";
        this.bottom2.lineSpacing = 10;
        this.bottom2.textColor = 0x848A96;
        this.bottom2.size = 14;
        this.bottom2.textAlign = "center";
        this.bottom2.x = this.w / 2;
        this.bottom2.y = this.bottom1.y + 27;
        this.addChild(this.bottom2)
    }

    /**
     * 进度回调
     * @param {number} current 当前进度
     * @param {number} total 总进度
     */
    public onProgress(current: number, total: number): void {
        //this.textField.text = `Loading...${current}/${total}`;
        let percent = current / total;
        if (percent < 0.9) {
            this.setProgress(percent);
        } else {
            this.setProgress(0.9);
        }
        if (percent > 0.999999) {
            let timer: egret.Timer = new egret.Timer(50, 1);  //加载完资源延迟
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            //timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            timer.start();
        }
    }

    /**
     * 刷新
     * @param {egret.TextEvent} evt 文本超链接
     */
    private referesh(evt: egret.TextEvent): void {
        console.log("referesh");
    }

    /**
     * 设置进度条进度
     * @param {number} percent 进度条值
     */
    private setProgress(percent: number): void {
        if (percent > 1) {
            percent = 1;
        } else if (percent < 0) {
            percent = 0
        }
        platform.setLoadingProgress(percent);
        this.frontMask = new egret.Rectangle(0, 0, this.progressFront.width * percent, this.progressFront.height);
        this.progressFront.mask = this.frontMask;
    }

    /**
     * 将锚点设置为正中心
     * @param {egret.DisplayObject} obj
     */
    private setAnchorMiddle(obj: egret.DisplayObject): void {
        obj.$anchorOffsetX = obj.width / 2;
        obj.$anchorOffsetY = obj.height / 2;
    }

    /**
     * 加载资源结束延迟倒计时结束
     */
    private timerComFunc(): void {
        this.setProgress(1);
    }
}
