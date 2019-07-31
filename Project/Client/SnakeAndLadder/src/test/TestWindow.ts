class TestWindow extends UIWindow {
	public onInit() {
		this.skinName = "resource/eui_skins/TestSkin.exml";
	}

	private com_dragon: eui.Group;
	private img_dragon: eui.Image;
	private txt_name: eui.Label;
	private egretFactory: dragonBones.EgretFactory;


	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		// this.txt_name.text = "Snow";
		// this.img_dragon.source = RES.getRes("egret_icon_png");
		//this.playDragonEff();
		this.showRoleWing(0);
	}

	/**
		   *刷新机器人特效
		   */
	public playDragonEff(): void {
		this.loadChibangByResName("backman_json");
	}

	/**
		   * 异步Robot动画资源
		   */
	private loadChibangByResName(name: string): void {
		var self = this;
		RES.getResAsync(name,
			function (data: any, key: string): void {
				if (key == "Robot_json") {
					self.loadChibangByResName("texture_json");
				}
				else if (key == "texture_json") {
					self.loadChibangByResName("texture_png");
				}
				else if (key == "texture_png") {
					this.showRoleWing();
				}
			},
			this);
	}

	/**
		  * 展示Robot特效
		  */
	private showRoleWing(wingId: number): void {
		this.egretFactory = DragonBoneManager.instance().createDragonByName("backman");
		let eff_robot: dragonBones.EgretArmatureDisplay = this.egretFactory.buildArmatureDisplay("armatureName");
		this.addChild(eff_robot);
		eff_robot.animation.play("animation", 0);
		eff_robot.x = 250;
		eff_robot.y = 300;

	}


}