class MacthLoading  extends eui.Component{

	// private jumpFont:egret.tween.TweenGroup;
    //计时按钮
    private loading: TimeButtonSkin;
    private tip:eui.Label;
    /**
     * 
     */
    protected constructor() {
        super();
        this.skinName = MacthLoadingSkin//"resource/eui_skins/Animations/MacthLoadingSkin.exml";
    }
    protected createChildren(): void {
        super.createChildren()
        // this.jumpFont.play(0);
		// this.jumpFont.addEventListener('complete',this.onTweenGroupComplete,this);

        //
        this.loading.setCallBack(function(){
			//
			console.info("匹配结束");
		});
        this.loading.addTouchEvent();
        this.loading.startTime(GameManager.instance().MatchingTime/1000);

        if(GameManager.instance().type==GameType.firendMode){
            this.tip.text = 'Waiting for firends ...';
        }else if(GameManager.instance().type==GameType.matchingMode){
            this.tip.text = 'Matching other players ...';
        }else{
            this.tip.text = 'Matching computers ...';
        }
    }

	private onTweenGroupComplete(): void {
		// this.jumpFont.play(0);
	}


}