
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"mytestUI":"resource/eui_skins/mytestUI.exml"};generateEUI.paths['resource/eui_skins/TestSkin.exml'] = window.TestSkin = (function (_super) {
	__extends(TestSkin, _super);
	function TestSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = TestSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "resource/assets/Texture/WindowBg/bg_ty_01.png";
		t.top = 0;
		return t;
	};
	return TestSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/TimeButtonSkin.exml'] = window.TimeButtonView = (function (_super) {
	__extends(TimeButtonView, _super);
	var TimeButtonView$Skin1 = 	(function (_super) {
		__extends(TimeButtonView$Skin1, _super);
		function TimeButtonView$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Common_json.frame_06")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","Common_json.frame_06")
					])
			];
		}
		var _proto = TimeButtonView$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "Common_json.frame_06";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return TimeButtonView$Skin1;
	})(eui.Skin);

	function TimeButtonView() {
		_super.call(this);
		this.skinParts = ["Btn","Prog","TimeText"];
		
		this.height = 130;
		this.width = 130;
		this.elementsContent = [this.Btn_i(),this.Prog_i(),this.TimeText_i()];
	}
	var _proto = TimeButtonView.prototype;

	_proto.Btn_i = function () {
		var t = new eui.Button();
		this.Btn = t;
		t.height = 126;
		t.horizontalCenter = 0;
		t.label = "";
		t.verticalCenter = 0;
		t.width = 126;
		t.skinName = TimeButtonView$Skin1;
		return t;
	};
	_proto.Prog_i = function () {
		var t = new eui.Image();
		this.Prog = t;
		t.horizontalCenter = 0;
		t.source = "Common_json.frame_05";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.TimeText_i = function () {
		var t = new eui.Label();
		this.TimeText = t;
		t.alpha = 0.7;
		t.blendMode = "add";
		t.borderColor = 0x020202;
		t.horizontalCenter = 0;
		t.text = "10s";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return TimeButtonView;
})(eui.Skin);generateEUI.paths['resource/eui_skins/animations/MacthLoadingSkin.exml'] = window.MacthLoadingSkin = (function (_super) {
	__extends(MacthLoadingSkin, _super);
	function MacthLoadingSkin() {
		_super.call(this);
		this.skinParts = ["tip","loading"];
		
		this.height = 392;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.tip_i(),this.loading_i()];
	}
	var _proto = MacthLoadingSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "Common_json.font_wait";
		t.x = 187;
		t.y = 143;
		return t;
	};
	_proto.tip_i = function () {
		var t = new eui.Label();
		this.tip = t;
		t.fontFamily = "hydsf";
		t.horizontalCenter = 0;
		t.size = 40;
		t.strokeColor = 0x000000;
		t.text = "Waiting for firends ...";
		t.textColor = 0x884526;
		t.verticalCenter = 44;
		return t;
	};
	_proto.loading_i = function () {
		var t = new TimeButtonSkin();
		this.loading = t;
		t.bottom = 1;
		t.height = 130;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "TimeButtonView";
		t.width = 130;
		return t;
	};
	return MacthLoadingSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/DiceSkin.exml'] = window.DiceSkin = (function (_super) {
	__extends(DiceSkin, _super);
	function DiceSkin() {
		_super.call(this);
		this.skinParts = ["light","roll_1","image","img_dice","g_dice"];
		
		this.height = 219;
		this.width = 149;
		this.light_i();
		this.roll_1_i();
		this.elementsContent = [this.g_dice_i()];
		
		eui.Binding.$bindProperties(this, ["image"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"alpha");
		eui.Binding.$bindProperties(this, ["img_dice"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [30],[],this._Object3,"rotation");
		eui.Binding.$bindProperties(this, [60],[],this._Object4,"rotation");
		eui.Binding.$bindProperties(this, [90],[],this._Object5,"rotation");
		eui.Binding.$bindProperties(this, [120],[],this._Object6,"rotation");
		eui.Binding.$bindProperties(this, [150],[],this._Object7,"rotation");
		eui.Binding.$bindProperties(this, [180],[],this._Object8,"rotation");
		eui.Binding.$bindProperties(this, [210],[],this._Object9,"rotation");
		eui.Binding.$bindProperties(this, [240],[],this._Object10,"rotation");
		eui.Binding.$bindProperties(this, [270],[],this._Object11,"rotation");
		eui.Binding.$bindProperties(this, [0],[],this._Object12,"rotation");
	}
	var _proto = DiceSkin.prototype;

	_proto.light_i = function () {
		var t = new egret.tween.TweenGroup();
		this.light = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.ease = "sineIn";
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.roll_1_i = function () {
		var t = new egret.tween.TweenGroup();
		this.roll_1 = t;
		t.items = [this._TweenItem2_i()];
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._Wait1_i(),this._Set3_i(),this._Wait2_i(),this._Set4_i(),this._Wait3_i(),this._Set5_i(),this._Wait4_i(),this._Set6_i(),this._Wait5_i(),this._Set7_i(),this._Wait6_i(),this._Set8_i(),this._Wait7_i(),this._Set9_i(),this._Wait8_i(),this._Set10_i(),this._Wait9_i(),this._Set11_i(),this._Wait10_i(),this._Set12_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._Wait1_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._Wait2_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set4_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._Wait3_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set5_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._Wait4_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set6_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object6_i();
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto._Wait5_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set7_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object7_i();
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		this._Object7 = t;
		return t;
	};
	_proto._Wait6_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set8_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object8_i();
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		this._Object8 = t;
		return t;
	};
	_proto._Wait7_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set9_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object9_i();
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		this._Object9 = t;
		return t;
	};
	_proto._Wait8_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set10_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object10_i();
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		this._Object10 = t;
		return t;
	};
	_proto._Wait9_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set11_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object11_i();
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		this._Object11 = t;
		return t;
	};
	_proto._Wait10_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 250;
		return t;
	};
	_proto._Set12_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object12_i();
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		this._Object12 = t;
		return t;
	};
	_proto.g_dice_i = function () {
		var t = new eui.Group();
		this.g_dice = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.height = 219;
		t.width = 149;
		t.x = 50;
		t.y = 50;
		t.elementsContent = [this.image_i(),this.img_dice_i()];
		return t;
	};
	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.height = 219;
		t.horizontalCenter = 0;
		t.source = "tx_1_png";
		t.verticalCenter = 0;
		t.width = 149;
		return t;
	};
	_proto.img_dice_i = function () {
		var t = new eui.Image();
		this.img_dice = t;
		t.anchorOffsetX = 32.5;
		t.anchorOffsetY = 33.5;
		t.height = 77;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.icon_sezi";
		t.width = 75;
		t.y = 167;
		return t;
	};
	return DiceSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/GameMapSkin.exml'] = window.GameMapSkin = (function (_super) {
	__extends(GameMapSkin, _super);
	function GameMapSkin() {
		_super.call(this);
		this.skinParts = ["map_bg","snake_layer","step_0","step_1","step_2","step_3","step_4","step_5","step_6","step_7","step_8","step_9","step_10","step_11","step_12","step_13","step_14","step_15","step_16","step_17","step_18","step_19","step_20","step_21","step_22","step_23","step_24","step_25","step_26","step_27","step_28","step_29","step_30","step_31","step_32","step_33","step_34","step_35","step_36","step_37","step_38","step_39","step_40","step_41","step_42","step_43","step_44","step_45","step_46","step_47","tree_layer","ladder_layer","g_map"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.g_map_i()];
	}
	var _proto = GameMapSkin.prototype;

	_proto.g_map_i = function () {
		var t = new eui.Group();
		this.g_map = t;
		t.height = 1085;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 640;
		t.elementsContent = [this.map_bg_i(),this.snake_layer_i(),this.tree_layer_i(),this.ladder_layer_i()];
		return t;
	};
	_proto.map_bg_i = function () {
		var t = new eui.Image();
		this.map_bg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "map_01_png";
		t.verticalCenter = 0;
		t.x = -165.69;
		t.y = -442;
		return t;
	};
	_proto.snake_layer_i = function () {
		var t = new eui.Group();
		this.snake_layer = t;
		t.height = 1136;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 640;
		return t;
	};
	_proto.tree_layer_i = function () {
		var t = new eui.Group();
		this.tree_layer = t;
		t.height = 1136;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 640;
		t.elementsContent = [this.step_0_i(),this.step_1_i(),this.step_2_i(),this.step_3_i(),this.step_4_i(),this.step_5_i(),this.step_6_i(),this.step_7_i(),this.step_8_i(),this.step_9_i(),this.step_10_i(),this.step_11_i(),this.step_12_i(),this.step_13_i(),this.step_14_i(),this.step_15_i(),this.step_16_i(),this.step_17_i(),this.step_18_i(),this.step_19_i(),this.step_20_i(),this.step_21_i(),this.step_22_i(),this.step_23_i(),this.step_24_i(),this.step_25_i(),this.step_26_i(),this.step_27_i(),this.step_28_i(),this.step_29_i(),this.step_30_i(),this.step_31_i(),this.step_32_i(),this.step_33_i(),this.step_34_i(),this.step_35_i(),this.step_36_i(),this.step_37_i(),this.step_38_i(),this.step_39_i(),this.step_40_i(),this.step_41_i(),this.step_42_i(),this.step_43_i(),this.step_44_i(),this.step_45_i(),this.step_46_i(),this.step_47_i()];
		return t;
	};
	_proto.step_0_i = function () {
		var t = new eui.Component();
		this.step_0 = t;
		t.height = 30;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 120;
		t.x = 294.11;
		t.y = 857.35;
		return t;
	};
	_proto.step_1_i = function () {
		var t = new eui.Component();
		this.step_1 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 185.17;
		t.y = 847.8599999999999;
		return t;
	};
	_proto.step_2_i = function () {
		var t = new eui.Component();
		this.step_2 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 103.68;
		t.y = 819.3399999999999;
		return t;
	};
	_proto.step_3_i = function () {
		var t = new eui.Component();
		this.step_3 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 80;
		t.x = 38.989999999999995;
		t.y = 775.3599999999999;
		return t;
	};
	_proto.step_4_i = function () {
		var t = new eui.Component();
		this.step_4 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 80;
		t.x = 35.019999999999996;
		t.y = 744.71;
		return t;
	};
	_proto.step_5_i = function () {
		var t = new eui.Component();
		this.step_5 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 48.989999999999995;
		t.y = 708.69;
		return t;
	};
	_proto.step_6_i = function () {
		var t = new eui.Component();
		this.step_6 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 90.48999999999998;
		t.y = 681.69;
		return t;
	};
	_proto.step_7_i = function () {
		var t = new eui.Component();
		this.step_7 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 172.9;
		t.y = 665.69;
		return t;
	};
	_proto.step_8_i = function () {
		var t = new eui.Component();
		this.step_8 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 269.3;
		t.y = 669.19;
		return t;
	};
	_proto.step_9_i = function () {
		var t = new eui.Component();
		this.step_9 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 363.5;
		t.y = 668.69;
		return t;
	};
	_proto.step_10_i = function () {
		var t = new eui.Component();
		this.step_10 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 443.3;
		t.y = 687.69;
		return t;
	};
	_proto.step_11_i = function () {
		var t = new eui.Component();
		this.step_11 = t;
		t.height = 16;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 504.8;
		t.y = 712.19;
		return t;
	};
	_proto.step_12_i = function () {
		var t = new eui.Component();
		this.step_12 = t;
		t.height = 16;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 549.3;
		t.y = 693.69;
		return t;
	};
	_proto.step_13_i = function () {
		var t = new eui.Component();
		this.step_13 = t;
		t.height = 16;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 50;
		t.x = 575.8;
		t.y = 671.19;
		return t;
	};
	_proto.step_14_i = function () {
		var t = new eui.Component();
		this.step_14 = t;
		t.height = 16;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 560.5;
		t.y = 644.19;
		return t;
	};
	_proto.step_15_i = function () {
		var t = new eui.Component();
		this.step_15 = t;
		t.height = 16;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 50;
		t.x = 560.5;
		t.y = 624.19;
		return t;
	};
	_proto.step_16_i = function () {
		var t = new eui.Component();
		this.step_16 = t;
		t.height = 16;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 492.8;
		t.y = 613.19;
		return t;
	};
	_proto.step_17_i = function () {
		var t = new eui.Component();
		this.step_17 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 416.5;
		t.y = 584.19;
		return t;
	};
	_proto.step_18_i = function () {
		var t = new eui.Component();
		this.step_18 = t;
		t.height = 26;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 80;
		t.x = 308.51;
		t.y = 568.69;
		return t;
	};
	_proto.step_19_i = function () {
		var t = new eui.Component();
		this.step_19 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 50;
		t.x = 240.5;
		t.y = 553.19;
		return t;
	};
	_proto.step_20_i = function () {
		var t = new eui.Component();
		this.step_20 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 153.5;
		t.y = 538.68;
		return t;
	};
	_proto.step_21_i = function () {
		var t = new eui.Component();
		this.step_21 = t;
		t.height = 26;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 80;
		t.x = 62.5;
		t.y = 507.67999999999995;
		return t;
	};
	_proto.step_22_i = function () {
		var t = new eui.Component();
		this.step_22 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 25.5;
		t.y = 476.17999999999995;
		return t;
	};
	_proto.step_23_i = function () {
		var t = new eui.Component();
		this.step_23 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 13.52;
		t.y = 447.17999999999995;
		return t;
	};
	_proto.step_24_i = function () {
		var t = new eui.Component();
		this.step_24 = t;
		t.height = 26;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 80;
		t.x = 16.99;
		t.y = 415.17999999999995;
		return t;
	};
	_proto.step_25_i = function () {
		var t = new eui.Component();
		this.step_25 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 63.489999999999995;
		t.y = 384.67999999999995;
		return t;
	};
	_proto.step_26_i = function () {
		var t = new eui.Component();
		this.step_26 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 167.17;
		t.y = 383.67999999999995;
		return t;
	};
	_proto.step_27_i = function () {
		var t = new eui.Component();
		this.step_27 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 249.11;
		t.y = 389.17999999999995;
		return t;
	};
	_proto.step_28_i = function () {
		var t = new eui.Component();
		this.step_28 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 322.3;
		t.y = 408.17999999999995;
		return t;
	};
	_proto.step_29_i = function () {
		var t = new eui.Component();
		this.step_29 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 395.5;
		t.y = 429.67999999999995;
		return t;
	};
	_proto.step_30_i = function () {
		var t = new eui.Component();
		this.step_30 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 477;
		t.y = 443.83;
		return t;
	};
	_proto.step_31_i = function () {
		var t = new eui.Component();
		this.step_31 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 58;
		t.x = 540;
		t.y = 432.66999999999996;
		return t;
	};
	_proto.step_32_i = function () {
		var t = new eui.Component();
		this.step_32 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 570;
		t.y = 411.67999999999995;
		return t;
	};
	_proto.step_33_i = function () {
		var t = new eui.Component();
		this.step_33 = t;
		t.height = 16;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 50;
		t.x = 575.8199999999999;
		t.y = 383.66999999999996;
		return t;
	};
	_proto.step_34_i = function () {
		var t = new eui.Component();
		this.step_34 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 554.83;
		t.y = 356.03;
		return t;
	};
	_proto.step_35_i = function () {
		var t = new eui.Component();
		this.step_35 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 527.02;
		t.y = 329.03;
		return t;
	};
	_proto.step_36_i = function () {
		var t = new eui.Component();
		this.step_36 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 462.62;
		t.y = 311.02;
		return t;
	};
	_proto.step_37_i = function () {
		var t = new eui.Component();
		this.step_37 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 398.62999999999994;
		t.y = 299.34;
		return t;
	};
	_proto.step_38_i = function () {
		var t = new eui.Component();
		this.step_38 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 334.65999999999997;
		t.y = 285.36;
		return t;
	};
	_proto.step_39_i = function () {
		var t = new eui.Component();
		this.step_39 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 249.95999999999998;
		t.y = 274.03;
		return t;
	};
	_proto.step_40_i = function () {
		var t = new eui.Component();
		this.step_40 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 172.22999999999996;
		t.y = 260.36;
		return t;
	};
	_proto.step_41_i = function () {
		var t = new eui.Component();
		this.step_41 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 107.03;
		t.y = 245.02;
		return t;
	};
	_proto.step_42_i = function () {
		var t = new eui.Component();
		this.step_42 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 40.489999999999995;
		t.y = 232;
		return t;
	};
	_proto.step_43_i = function () {
		var t = new eui.Component();
		this.step_43 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 20.96;
		t.y = 203.33999999999997;
		return t;
	};
	_proto.step_44_i = function () {
		var t = new eui.Component();
		this.step_44 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 39.66;
		t.y = 175.99;
		return t;
	};
	_proto.step_45_i = function () {
		var t = new eui.Component();
		this.step_45 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 60;
		t.x = 73.01;
		t.y = 148.01;
		return t;
	};
	_proto.step_46_i = function () {
		var t = new eui.Component();
		this.step_46 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 70;
		t.x = 137.54;
		t.y = 137.34999999999997;
		return t;
	};
	_proto.step_47_i = function () {
		var t = new eui.Component();
		this.step_47 = t;
		t.height = 18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 80;
		t.x = 236;
		t.y = 122.7;
		return t;
	};
	_proto.ladder_layer_i = function () {
		var t = new eui.Group();
		this.ladder_layer = t;
		t.height = 1136;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 640;
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.icon_SET";
		t.x = 48;
		t.y = 303.33;
		return t;
	};
	return GameMapSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/HeadIconWidget.exml'] = window.HeadIconWidgetSkin = (function (_super) {
	__extends(HeadIconWidgetSkin, _super);
	function HeadIconWidgetSkin() {
		_super.call(this);
		this.skinParts = ["head_kuang","head_img","head_name"];
		
		this.height = 135;
		this.width = 110;
		this.elementsContent = [this.head_kuang_i(),this.head_img_i(),this.head_name_i()];
	}
	var _proto = HeadIconWidgetSkin.prototype;

	_proto.head_kuang_i = function () {
		var t = new eui.Image();
		this.head_kuang = t;
		t.anchorOffsetX = 55;
		t.anchorOffsetY = 55;
		t.height = 110;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(13,14,8,86);
		t.source = "Common_json.frame_07";
		t.verticalCenter = -12.5;
		t.width = 110;
		return t;
	};
	_proto.head_img_i = function () {
		var t = new eui.Image();
		this.head_img = t;
		t.anchorOffsetX = 54;
		t.anchorOffsetY = 54;
		t.height = 108;
		t.horizontalCenter = 0;
		t.source = "Emojis_json.emojis_01";
		t.verticalCenter = -13.5;
		t.width = 108;
		return t;
	};
	_proto.head_name_i = function () {
		var t = new eui.Label();
		this.head_name = t;
		t.bottom = 2;
		t.fontFamily = "hydsf";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "我的名字";
		t.textColor = 0x884526;
		return t;
	};
	return HeadIconWidgetSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/MyButton.exml'] = window.myButtonSkin = (function (_super) {
	__extends(myButtonSkin, _super);
	var myButtonSkin$Skin2 = 	(function (_super) {
		__extends(myButtonSkin$Skin2, _super);
		function myButtonSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Common_json.button_blue")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","Common_json.button_blue")
					])
			];
		}
		var _proto = myButtonSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "Common_json.button_blue";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "hydsf";
			t.horizontalCenter = 0;
			t.size = 40;
			t.verticalCenter = 0;
			return t;
		};
		return myButtonSkin$Skin2;
	})(eui.Skin);

	function myButtonSkin() {
		_super.call(this);
		this.skinParts = ["scaleTo","scaleBack","btn","group"];
		
		this.height = 105;
		this.width = 349;
		this.scaleTo_i();
		this.scaleBack_i();
		this.elementsContent = [this.group_i()];
		
		eui.Binding.$bindProperties(this, ["group"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [1],[],this._Object1,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object1,"scaleY");
		eui.Binding.$bindProperties(this, [1.1],[],this._Object2,"scaleX");
		eui.Binding.$bindProperties(this, [1.1],[],this._Object2,"scaleY");
		eui.Binding.$bindProperties(this, ["group"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [1.1],[],this._Object3,"scaleX");
		eui.Binding.$bindProperties(this, [1.1],[],this._Object3,"scaleY");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"scaleY");
	}
	var _proto = myButtonSkin.prototype;

	_proto.scaleTo_i = function () {
		var t = new egret.tween.TweenGroup();
		this.scaleTo = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.ease = "sineIn";
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.scaleBack_i = function () {
		var t = new egret.tween.TweenGroup();
		this.scaleBack = t;
		t.items = [this._TweenItem2_i()];
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To2_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.ease = "sineIn";
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.anchorOffsetX = 174.5;
		t.anchorOffsetY = 52.5;
		t.height = 105;
		t.horizontalCenter = 0;
		t.scrollEnabled = false;
		t.verticalCenter = 0;
		t.width = 349;
		t.elementsContent = [this.btn_i()];
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.anchorOffsetX = 174.5;
		t.anchorOffsetY = 52.5;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 0;
		t.skinName = myButtonSkin$Skin2;
		return t;
	};
	return myButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/PlayerSkin.exml'] = window.PlayerSkin = (function (_super) {
	__extends(PlayerSkin, _super);
	function PlayerSkin() {
		_super.call(this);
		this.skinParts = ["img_me","g_me"];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this.g_me_i()];
	}
	var _proto = PlayerSkin.prototype;

	_proto.g_me_i = function () {
		var t = new eui.Group();
		this.g_me = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.height = 100;
		t.width = 100;
		t.x = 50;
		t.y = 50;
		t.elementsContent = [this.img_me_i()];
		return t;
	};
	_proto.img_me_i = function () {
		var t = new eui.Image();
		this.img_me = t;
		t.height = 60;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Emojis_json.emojis_01";
		t.width = 60;
		t.x = 20;
		t.y = 20;
		return t;
	};
	return PlayerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/RoleTopInfo.exml'] = window.RoleTopInfo = (function (_super) {
	__extends(RoleTopInfo, _super);
	function RoleTopInfo() {
		_super.call(this);
		this.skinParts = ["head_icon","lab_nickName","lab_gold","btn_setting","btn_shop"];
		
		this.height = 167;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.head_icon_i(),this.lab_nickName_i(),this.lab_gold_i(),this._Image2_i(),this.btn_setting_i(),this.btn_shop_i()];
	}
	var _proto = RoleTopInfo.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 167;
		t.left = 0;
		t.source = "Common_json.bg_02";
		t.top = 0;
		t.width = 343;
		return t;
	};
	_proto.head_icon_i = function () {
		var t = new HeadIconWidget();
		this.head_icon = t;
		t.height = 135;
		t.left = 10;
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "HeadIconWidgetSkin";
		t.top = 15;
		t.width = 110;
		return t;
	};
	_proto.lab_nickName_i = function () {
		var t = new eui.Label();
		this.lab_nickName = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.height = 18;
		t.size = 20;
		t.text = "MYG_Player";
		t.textAlign = "left";
		t.textColor = 0x445fa4;
		t.verticalAlign = "middle";
		t.width = 129;
		t.x = 112;
		t.y = 20;
		return t;
	};
	_proto.lab_gold_i = function () {
		var t = new eui.Label();
		this.lab_gold = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.height = 20;
		t.size = 20;
		t.text = "1999";
		t.textAlign = "left";
		t.textColor = 0xffffff;
		t.width = 60;
		t.x = 184;
		t.y = 63;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 51;
		t.source = "Common_json.icon_apple";
		t.width = 42;
		t.x = 106;
		t.y = 41;
		return t;
	};
	_proto.btn_setting_i = function () {
		var t = new MyButton();
		this.btn_setting = t;
		t.height = 115;
		t.label = "";
		t.right = 0;
		t.top = 0;
		t.width = 92;
		return t;
	};
	_proto.btn_shop_i = function () {
		var t = new MyButton();
		this.btn_shop = t;
		t.height = 50;
		t.label = "";
		t.left = 254;
		t.top = 47;
		t.width = 50;
		return t;
	};
	return RoleTopInfo;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/SettingWidget.exml'] = window.SettingWidget = (function (_super) {
	__extends(SettingWidget, _super);
	function SettingWidget() {
		_super.call(this);
		this.skinParts = ["setting_btn"];
		
		this.height = 115;
		this.width = 92;
		this.elementsContent = [this.setting_btn_i()];
	}
	var _proto = SettingWidget.prototype;

	_proto.setting_btn_i = function () {
		var t = new eui.Image();
		this.setting_btn = t;
		t.height = 115;
		t.source = "Common_json.icon_SET";
		t.width = 92;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return SettingWidget;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/ShopItemEmojis.exml'] = window.ShopItemEmojis = (function (_super) {
	__extends(ShopItemEmojis, _super);
	function ShopItemEmojis() {
		_super.call(this);
		this.skinParts = ["img_itemIco"];
		
		this.height = 118;
		this.width = 116;
		this.elementsContent = [this.img_itemIco_i()];
	}
	var _proto = ShopItemEmojis.prototype;

	_proto.img_itemIco_i = function () {
		var t = new eui.Image();
		this.img_itemIco = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "";
		t.top = 0;
		return t;
	};
	return ShopItemEmojis;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/ShopItemGoldWidget.exml'] = window.ShopItemGoldWidget = (function (_super) {
	__extends(ShopItemGoldWidget, _super);
	var ShopItemGoldWidget$Skin3 = 	(function (_super) {
		__extends(ShopItemGoldWidget$Skin3, _super);
		function ShopItemGoldWidget$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShopItemGoldWidget$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "black_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ShopItemGoldWidget$Skin3;
	})(eui.Skin);

	function ShopItemGoldWidget() {
		_super.call(this);
		this.skinParts = ["goldCount","itemIco","buy_btn","buy_money","buy_btn1","gro_buy"];
		
		this.height = 275;
		this.width = 307;
		this.elementsContent = [this._Image1_i(),this.goldCount_i(),this.itemIco_i(),this.gro_buy_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.goldCount"],[0],this.goldCount,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.id"],[0],this.buy_btn,"label");
		eui.Binding.$bindProperties(this, ["hostComponent.data.money"],[0],this.buy_money,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.id"],[0],this.buy_btn1,"label");
	}
	var _proto = ShopItemGoldWidget.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 243;
		t.scale9Grid = new egret.Rectangle(18,15,59,39);
		t.source = "Common_json.frame_02";
		t.width = 307;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.goldCount_i = function () {
		var t = new eui.Label();
		this.goldCount = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.height = 25;
		t.horizontalCenter = 6;
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 141;
		t.y = 20;
		return t;
	};
	_proto.itemIco_i = function () {
		var t = new eui.Image();
		this.itemIco = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 140;
		t.source = "";
		t.width = 198;
		t.x = 55;
		t.y = 51;
		return t;
	};
	_proto.gro_buy_i = function () {
		var t = new eui.Group();
		this.gro_buy = t;
		t.height = 63;
		t.width = 209;
		t.x = 55;
		t.y = 197;
		t.elementsContent = [this.buy_btn_i(),this._Image2_i(),this.buy_money_i(),this.buy_btn1_i()];
		return t;
	};
	_proto.buy_btn_i = function () {
		var t = new MyButton();
		this.buy_btn = t;
		t.height = 63;
		t.left = 0;
		t.top = 0;
		t.width = 209;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 34;
		t.source = "Common_json.money";
		t.width = 34;
		t.x = 41;
		t.y = 14;
		return t;
	};
	_proto.buy_money_i = function () {
		var t = new eui.Label();
		this.buy_money = t;
		t.anchorOffsetX = 0;
		t.height = 23;
		t.width = 80;
		t.x = 85;
		t.y = 19;
		return t;
	};
	_proto.buy_btn1_i = function () {
		var t = new eui.Button();
		this.buy_btn1 = t;
		t.alpha = 0;
		t.height = 63;
		t.visible = false;
		t.width = 209;
		t.x = 0;
		t.y = 0;
		t.skinName = ShopItemGoldWidget$Skin3;
		return t;
	};
	return ShopItemGoldWidget;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/ShopItemIco.exml'] = window.ShopItemIco = (function (_super) {
	__extends(ShopItemIco, _super);
	function ShopItemIco() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 90;
		this.width = 90;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = ShopItemIco.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "HeadIcons_json.icon_head_main_01";
		t.top = 0;
		return t;
	};
	return ShopItemIco;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/ShopItemWidget.exml'] = window.ShopItemWidget = (function (_super) {
	__extends(ShopItemWidget, _super);
	function ShopItemWidget() {
		_super.call(this);
		this.skinParts = ["shopItemIcoList","buy_btn","buy_goldcount","gro_buy","itemName","itemId"];
		
		this.height = 233;
		this.width = 628;
		this.elementsContent = [this._Image1_i(),this._Scroller1_i(),this.gro_buy_i(),this.itemName_i(),this.itemId_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.id"],[0],this.buy_btn,"label");
		eui.Binding.$bindProperties(this, ["hostComponent.data.gold"],[0],this.buy_goldcount,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.itemName"],[0],this.itemName,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.id"],[0],this.itemId,"text");
	}
	var _proto = ShopItemWidget.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 213;
		t.scale9Grid = new egret.Rectangle(18,14,59,40);
		t.source = "Common_json.frame_02";
		t.width = 628;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 118;
		t.width = 563;
		t.x = 33;
		t.y = 49;
		t.viewport = this.shopItemIcoList_i();
		return t;
	};
	_proto.shopItemIcoList_i = function () {
		var t = new eui.List();
		this.shopItemIcoList = t;
		t.height = 118;
		t.itemRendererSkinName = ShopItemEmojis;
		t.width = 563;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 33;
		return t;
	};
	_proto.gro_buy_i = function () {
		var t = new eui.Group();
		this.gro_buy = t;
		t.horizontalCenter = 0.5;
		t.y = 171;
		t.elementsContent = [this.buy_btn_i(),this._Image2_i(),this.buy_goldcount_i()];
		return t;
	};
	_proto.buy_btn_i = function () {
		var t = new MyButton();
		this.buy_btn = t;
		t.height = 63;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 209;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 37;
		t.source = "Common_json.icon_apple";
		t.width = 31;
		t.x = 45;
		t.y = 8;
		return t;
	};
	_proto.buy_goldcount_i = function () {
		var t = new eui.Label();
		this.buy_goldcount = t;
		t.anchorOffsetX = 0;
		t.height = 23;
		t.width = 83;
		t.x = 85;
		t.y = 19;
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.fontFamily = "hydsf";
		t.height = 25;
		t.horizontalCenter = 0;
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 230;
		t.y = 20;
		return t;
	};
	_proto.itemId_i = function () {
		var t = new eui.Label();
		this.itemId = t;
		t.alpha = 0;
		t.x = 415;
		t.y = 10;
		return t;
	};
	return ShopItemWidget;
})(eui.Skin);generateEUI.paths['resource/eui_skins/widgetSkins/ShoppinInfo.exml'] = window.ShoppinInfo = (function (_super) {
	__extends(ShoppinInfo, _super);
	var ShoppinInfo$Skin4 = 	(function (_super) {
		__extends(ShoppinInfo$Skin4, _super);
		function ShoppinInfo$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShoppinInfo$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.icon_x";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ShoppinInfo$Skin4;
	})(eui.Skin);

	var ShoppinInfo$Skin5 = 	(function (_super) {
		__extends(ShoppinInfo$Skin5, _super);
		function ShoppinInfo$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ShoppinInfo$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_green_l";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ShoppinInfo$Skin5;
	})(eui.Skin);

	function ShoppinInfo() {
		_super.call(this);
		this.skinParts = ["img_bgRect","img_title","lab_content","btn_close1","btn_confirm1","im_image","btn_confirm","btn_close"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.img_bgRect_i(),this._Image1_i(),this.img_title_i(),this.lab_content_i(),this.btn_close1_i(),this.btn_confirm1_i(),this.im_image_i(),this.btn_confirm_i(),this.btn_close_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.image"],[0],this.im_image,"source");
	}
	var _proto = ShoppinInfo.prototype;

	_proto.img_bgRect_i = function () {
		var t = new eui.Image();
		this.img_bgRect = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "black_png";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 450;
		t.scale9Grid = new egret.Rectangle(23,214,535,12);
		t.source = "Common_json.bg_05";
		t.width = 582;
		t.x = 31;
		t.y = 277;
		return t;
	};
	_proto.img_title_i = function () {
		var t = new eui.Image();
		this.img_title = t;
		t.height = 56;
		t.source = "Common_json.font_succ";
		t.width = 270;
		t.x = 183;
		t.y = 405;
		return t;
	};
	_proto.lab_content_i = function () {
		var t = new eui.Label();
		this.lab_content = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "hydsf";
		t.height = 131;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 500;
		t.x = 70;
		t.y = 503;
		return t;
	};
	_proto.btn_close1_i = function () {
		var t = new eui.Button();
		this.btn_close1 = t;
		t.anchorOffsetX = 0;
		t.height = 71;
		t.label = "";
		t.visible = false;
		t.width = 71;
		t.x = 541;
		t.y = 372;
		t.skinName = ShoppinInfo$Skin4;
		return t;
	};
	_proto.btn_confirm1_i = function () {
		var t = new eui.Button();
		this.btn_confirm1 = t;
		t.anchorOffsetX = 0;
		t.height = 63;
		t.label = "confirm";
		t.visible = false;
		t.width = 209;
		t.x = 214;
		t.y = 650;
		t.skinName = ShoppinInfo$Skin5;
		return t;
	};
	_proto.im_image_i = function () {
		var t = new eui.Image();
		this.im_image = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 33;
		t.visible = false;
		t.width = 33;
		t.x = 427;
		t.y = 354;
		return t;
	};
	_proto.btn_confirm_i = function () {
		var t = new MyButton();
		this.btn_confirm = t;
		t.height = 63;
		t.label = "";
		t.left = 214;
		t.top = 650;
		t.width = 209;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new MyButton();
		this.btn_close = t;
		t.height = 71;
		t.label = "";
		t.right = 28;
		t.top = 372;
		t.width = 71;
		return t;
	};
	return ShoppinInfo;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/ChatSkin.exml'] = window.ChatSkin = (function (_super) {
	__extends(ChatSkin, _super);
	var ChatSkin$Skin6 = 	(function (_super) {
		__extends(ChatSkin$Skin6, _super);
		function ChatSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.icon_jiantou1";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatSkin$Skin6;
	})(eui.Skin);

	function ChatSkin() {
		_super.call(this);
		this.skinParts = ["chatBg","sendImg","listImg","srcListImg","chatText","bg","textInput","chatBtn","listText","srcListText","group"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.group_i()];
	}
	var _proto = ChatSkin.prototype;

	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 203.03;
		t.height = 200;
		t.width = 306.06;
		t.x = 109.03;
		t.y = 1008.58;
		t.elementsContent = [this.chatBg_i(),this.sendImg_i(),this.srcListImg_i(),this.chatText_i(),this.bg_i(),this._Image1_i(),this.textInput_i(),this.chatBtn_i(),this.srcListText_i()];
		return t;
	};
	_proto.chatBg_i = function () {
		var t = new eui.Image();
		this.chatBg = t;
		t.anchorOffsetX = 188.64;
		t.anchorOffsetY = 80;
		t.height = 160;
		t.rotation = 359.63;
		t.scale9Grid = new egret.Rectangle(78,9,12,48);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 377.27;
		t.x = 148.93;
		t.y = 113.55;
		return t;
	};
	_proto.sendImg_i = function () {
		var t = new eui.Image();
		this.sendImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 41.33;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.icon_huiche";
		t.width = 62;
		t.x = 269.16;
		t.y = 121.33;
		return t;
	};
	_proto.srcListImg_i = function () {
		var t = new eui.Scroller();
		this.srcListImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 85.39;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 350.43;
		t.x = -23.21;
		t.y = 34.06;
		t.viewport = this.listImg_i();
		return t;
	};
	_proto.listImg_i = function () {
		var t = new eui.List();
		this.listImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83.39;
		t.width = 606;
		t.x = 26;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.chatText_i = function () {
		var t = new eui.Label();
		this.chatText = t;
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 25;
		t.text = "我等的花儿都快谢了";
		t.textColor = 0x070707;
		t.touchEnabled = false;
		t.width = 352.79;
		t.x = 38.68;
		t.y = 128.02;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 188;
		t.scale9Grid = new egret.Rectangle(8,7,17,15);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_16";
		t.visible = false;
		t.width = 281;
		t.x = -17.25;
		t.y = 128.64;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 33.64;
		t.scale9Grid = new egret.Rectangle(8,7,17,15);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_16";
		t.width = 281;
		t.x = -16.65;
		t.y = 124.7;
		return t;
	};
	_proto.textInput_i = function () {
		var t = new eui.EditableText();
		this.textInput = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 24.06;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "Input ....";
		t.textColor = 0x884526;
		t.width = 268.48;
		t.x = -8.67;
		t.y = 130.07;
		return t;
	};
	_proto.chatBtn_i = function () {
		var t = new eui.Button();
		this.chatBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 19.33;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 26;
		t.x = 234.43;
		t.y = 132.87;
		t.skinName = ChatSkin$Skin6;
		return t;
	};
	_proto.srcListText_i = function () {
		var t = new eui.Scroller();
		this.srcListText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 288.18;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 600;
		t.x = -18.22;
		t.y = 158.91;
		t.viewport = this.listText_i();
		return t;
	};
	_proto.listText_i = function () {
		var t = new eui.List();
		this.listText = t;
		t.anchorOffsetY = 0;
		t.height = 288.18;
		t.y = -95.45;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 9;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.text = "afasdfasdf";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.text = "fasdfasdfa";
		return t;
	};
	return ChatSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/GameEndSkin.exml'] = window.GameEndSkin = (function (_super) {
	__extends(GameEndSkin, _super);
	function GameEndSkin() {
		_super.call(this);
		this.skinParts = ["bg","back","next","g_panel"];
		
		this.height = 1600;
		this.width = 640;
		this.elementsContent = [this.g_panel_i()];
	}
	var _proto = GameEndSkin.prototype;

	_proto.g_panel_i = function () {
		var t = new eui.Panel();
		this.g_panel = t;
		t.height = 1600;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 640;
		t.elementsContent = [this._Image1_i(),this.bg_i(),this.back_i(),this.next_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 1;
		t.fillMode = "scale";
		t.height = 1600;
		t.horizontalCenter = 0;
		t.source = "black_png";
		t.verticalCenter = 0;
		t.width = 640;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.height = 718;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(100,223,500,30);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.bg_04";
		t.verticalCenter = -82;
		t.width = 640;
		t.x = 0;
		return t;
	};
	_proto.back_i = function () {
		var t = new MyButton();
		this.back = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 63;
		t.horizontalCenter = -149.5;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 209;
		t.y = 976;
		return t;
	};
	_proto.next_i = function () {
		var t = new MyButton();
		this.next = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 63;
		t.horizontalCenter = 150.5;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 209;
		t.y = 976;
		return t;
	};
	return GameEndSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/GameEnterSkin.exml'] = window.$exmlClass7 = (function (_super) {
	__extends($exmlClass7, _super);
	function $exmlClass7() {
		_super.call(this);
		this.skinParts = ["start_1","start_2","start_3"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = $exmlClass7.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 370;
		t.horizontalCenter = 0;
		t.top = 197;
		t.width = 350;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.start_1_i(),this.start_2_i(),this.start_3_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.start_1_i = function () {
		var t = new MyButton();
		this.start_1 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.skinName = "myButtonSkin";
		t.y = 4;
		return t;
	};
	_proto.start_2_i = function () {
		var t = new MyButton();
		this.start_2 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.skinName = "myButtonSkin";
		t.y = 131;
		return t;
	};
	_proto.start_3_i = function () {
		var t = new MyButton();
		this.start_3 = t;
		t.horizontalCenter = 0;
		t.label = "Training";
		t.skinName = "myButtonSkin";
		t.y = 258;
		return t;
	};
	return $exmlClass7;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/GameSkin.exml'] = window.GameSkin = (function (_super) {
	__extends(GameSkin, _super);
	var GameSkin$Skin8 = 	(function (_super) {
		__extends(GameSkin$Skin8, _super);
		function GameSkin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Common_json.icon_jiantou")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","Common_json.icon_jiantou")
					])
			];
		}
		var _proto = GameSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "Common_json.icon_jiantou";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GameSkin$Skin8;
	})(eui.Skin);

	function GameSkin() {
		_super.call(this);
		this.skinParts = ["map","players_bg","player0Img","player1Img","player2Img","player3Img","player_list","players_group","setting_btn","bg_image","lab_maxGold","btn_drop"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.map_i(),this.players_group_i(),this.setting_btn_i(),this._Group1_i()];
	}
	var _proto = GameSkin.prototype;

	_proto.map_i = function () {
		var t = new GameMap();
		this.map = t;
		t.height = 1136;
		t.horizontalCenter = 0;
		t.skinName = "GameMapSkin";
		t.verticalCenter = 0;
		t.width = 640;
		return t;
	};
	_proto.players_group_i = function () {
		var t = new eui.Group();
		this.players_group = t;
		t.bottom = 0;
		t.height = 210;
		t.horizontalCenter = 0;
		t.width = 640;
		t.elementsContent = [this.players_bg_i(),this.player0Img_i(),this.player1Img_i(),this.player2Img_i(),this.player3Img_i(),this.player_list_i()];
		return t;
	};
	_proto.players_bg_i = function () {
		var t = new eui.Image();
		this.players_bg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.bg_01";
		t.verticalCenter = 0;
		return t;
	};
	_proto.player0Img_i = function () {
		var t = new eui.Image();
		this.player0Img = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 0;
		t.height = 112;
		t.scale9Grid = new egret.Rectangle(14,13,27,26);
		t.source = "Common_json.frame_08";
		t.width = 112;
		t.x = 87;
		t.y = 72;
		return t;
	};
	_proto.player1Img_i = function () {
		var t = new eui.Image();
		this.player1Img = t;
		t.anchorOffsetX = 26;
		t.anchorOffsetY = 0;
		t.height = 112;
		t.scale9Grid = new egret.Rectangle(14,13,27,26);
		t.source = "Common_json.frame_08";
		t.width = 112;
		t.x = 223;
		t.y = 72;
		return t;
	};
	_proto.player2Img_i = function () {
		var t = new eui.Image();
		this.player2Img = t;
		t.anchorOffsetX = 83.58;
		t.anchorOffsetY = 0;
		t.height = 112;
		t.scale9Grid = new egret.Rectangle(14,13,27,26);
		t.source = "Common_json.frame_08";
		t.width = 112;
		t.x = 420.58;
		t.y = 72;
		return t;
	};
	_proto.player3Img_i = function () {
		var t = new eui.Image();
		this.player3Img = t;
		t.anchorOffsetX = 86.61;
		t.anchorOffsetY = 0;
		t.height = 112;
		t.scale9Grid = new egret.Rectangle(14,13,27,26);
		t.source = "Common_json.frame_08";
		t.width = 112;
		t.x = 563.61;
		t.y = 72;
		return t;
	};
	_proto.player_list_i = function () {
		var t = new eui.List();
		this.player_list = t;
		t.bottom = 3;
		t.height = 135;
		t.horizontalCenter = 0;
		t.scrollEnabled = false;
		t.width = 640;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 30;
		t.horizontalAlign = "center";
		t.paddingLeft = 57;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.setting_btn_i = function () {
		var t = new eui.Button();
		this.setting_btn = t;
		t.height = 115;
		t.label = "";
		t.right = 0;
		t.skinName = "SettingWidget";
		t.top = 0;
		t.width = 92;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.top = 0;
		t.visible = false;
		t.elementsContent = [this.bg_image_i(),this._Image1_i(),this.lab_maxGold_i(),this.btn_drop_i()];
		return t;
	};
	_proto.bg_image_i = function () {
		var t = new eui.Image();
		this.bg_image = t;
		t.height = 66;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(21,16,13,32);
		t.source = "Common_json.frame_04";
		t.top = 0;
		t.width = 212;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 51;
		t.source = "Common_json.icon_apple";
		t.top = 0;
		t.width = 42;
		t.x = 21.4;
		return t;
	};
	_proto.lab_maxGold_i = function () {
		var t = new eui.BitmapLabel();
		this.lab_maxGold = t;
		t.font = "BmpFonts_fnt";
		t.height = 40;
		t.text = "99999999999";
		t.width = 120;
		t.x = 69.01;
		t.y = 10;
		return t;
	};
	_proto.btn_drop_i = function () {
		var t = new eui.Button();
		this.btn_drop = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35;
		t.label = "";
		t.width = 61;
		t.x = 152.69;
		t.y = 60.15;
		t.skinName = GameSkin$Skin8;
		return t;
	};
	return GameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/GropReward.exml'] = window.GropReward = (function (_super) {
	__extends(GropReward, _super);
	var GropReward$Skin9 = 	(function (_super) {
		__extends(GropReward$Skin9, _super);
		function GropReward$Skin9() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Common_json.icon_jiantou")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","Common_json.icon_jiantou")
					])
			];
		}
		var _proto = GropReward$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "Common_json.icon_jiantou";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return GropReward$Skin9;
	})(eui.Skin);

	function GropReward() {
		_super.call(this);
		this.skinParts = ["re_rect","lab_reward1","lab_reward2","lab_reward3","lab_reward4","gro_list","gro_reward","bg_image3","lab_maxGold0","btn_drop"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.gro_reward_i(),this._Group5_i()];
	}
	var _proto = GropReward.prototype;

	_proto.gro_reward_i = function () {
		var t = new eui.Group();
		this.gro_reward = t;
		t.height = 180;
		t.visible = false;
		t.x = 213;
		t.y = 66;
		t.elementsContent = [this.re_rect_i(),this.gro_list_i()];
		return t;
	};
	_proto.re_rect_i = function () {
		var t = new eui.Rect();
		this.re_rect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 180;
		t.visible = false;
		t.width = 212;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gro_list_i = function () {
		var t = new eui.Group();
		this.gro_list = t;
		t.height = 180;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 212;
		t.x = 0;
		t.y = -180;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 180;
		t.scale9Grid = new egret.Rectangle(8,7,15,17);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_16";
		t.width = 212;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 6;
		t.y = 6;
		t.elementsContent = [this._Image2_i(),this.lab_reward1_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 38;
		t.source = "Common_json.icon_apple";
		t.width = 31;
		t.x = 8;
		t.y = 0;
		return t;
	};
	_proto.lab_reward1_i = function () {
		var t = new eui.Label();
		this.lab_reward1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.text = "2000";
		t.textColor = 0x884526;
		t.width = 80;
		t.x = 71;
		t.y = 6;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 200;
		t.x = 0;
		t.y = 40;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 6;
		t.y = 50;
		t.elementsContent = [this._Image4_i(),this.lab_reward2_i(),this._Image5_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 38;
		t.source = "Common_json.icon_apple";
		t.width = 31;
		t.x = 8;
		t.y = 0;
		return t;
	};
	_proto.lab_reward2_i = function () {
		var t = new eui.Label();
		this.lab_reward2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.text = "2000";
		t.textColor = 0x884526;
		t.width = 80;
		t.x = 71;
		t.y = 6;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 200;
		t.x = 0;
		t.y = 40;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 6;
		t.y = 94;
		t.elementsContent = [this._Image6_i(),this.lab_reward3_i(),this._Image7_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 38;
		t.source = "Common_json.icon_apple";
		t.width = 31;
		t.x = 8;
		t.y = 0;
		return t;
	};
	_proto.lab_reward3_i = function () {
		var t = new eui.Label();
		this.lab_reward3 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.text = "2000";
		t.textColor = 0x884526;
		t.width = 80;
		t.x = 71;
		t.y = 6;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 200;
		t.x = 0;
		t.y = 40;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 6;
		t.y = 138;
		t.elementsContent = [this._Image8_i(),this.lab_reward4_i(),this._Image9_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 38;
		t.source = "Common_json.icon_apple";
		t.width = 31;
		t.x = 8;
		t.y = 0;
		return t;
	};
	_proto.lab_reward4_i = function () {
		var t = new eui.Label();
		this.lab_reward4 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.text = "2000";
		t.textColor = 0x884526;
		t.width = 80;
		t.x = 71;
		t.y = 6;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 200;
		t.x = 0;
		t.y = 40;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.top = 0;
		t.elementsContent = [this.bg_image3_i(),this._Image10_i(),this.lab_maxGold0_i(),this.btn_drop_i()];
		return t;
	};
	_proto.bg_image3_i = function () {
		var t = new eui.Image();
		this.bg_image3 = t;
		t.height = 66;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(21,16,13,32);
		t.source = "Common_json.frame_04";
		t.top = 0;
		t.width = 212;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.height = 51;
		t.source = "Common_json.icon_apple";
		t.top = 0;
		t.width = 42;
		t.x = 21.4;
		return t;
	};
	_proto.lab_maxGold0_i = function () {
		var t = new eui.BitmapLabel();
		this.lab_maxGold0 = t;
		t.font = "BmpFonts_fnt";
		t.height = 40;
		t.text = "2000";
		t.width = 120;
		t.x = 69.01;
		t.y = 10;
		return t;
	};
	_proto.btn_drop_i = function () {
		var t = new eui.Button();
		this.btn_drop = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35;
		t.label = "";
		t.width = 61;
		t.x = 152.69;
		t.y = 60.15;
		t.skinName = GropReward$Skin9;
		return t;
	};
	return GropReward;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/LabelSkin.exml'] = window.LabelSkin = (function (_super) {
	__extends(LabelSkin, _super);
	function LabelSkin() {
		_super.call(this);
		this.skinParts = ["text","img"];
		
		this.height = 30;
		this.width = 281;
		this.elementsContent = [this.text_i(),this.img_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.text"],[0],this.text,"text");
	}
	var _proto = LabelSkin.prototype;

	_proto.text_i = function () {
		var t = new eui.Label();
		this.text = t;
		t.anchorOffsetX = 0;
		t.height = 21;
		t.size = 24;
		t.textColor = 0x884526;
		t.width = 280;
		t.x = 10;
		t.y = 8;
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 270;
		t.x = 5;
		t.y = 3;
		return t;
	};
	return LabelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/LoginUISkin.exml'] = window.LoginUISkin = (function (_super) {
	__extends(LoginUISkin, _super);
	var LoginUISkin$Skin10 = 	(function (_super) {
		__extends(LoginUISkin$Skin10, _super);
		function LoginUISkin$Skin10() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","Common_json.button_green_l")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","Common_json.button_green_l")
					])
			];
		}
		var _proto = LoginUISkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "Common_json.button_green_l";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginUISkin$Skin10;
	})(eui.Skin);

	function LoginUISkin() {
		_super.call(this);
		this.skinParts = ["bg","enter_btn","tip"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.bg_i(),this.enter_btn_i(),this.tip_i()];
	}
	var _proto = LoginUISkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.height = 1136;
		t.horizontalCenter = 0;
		t.source = "bg_03_png";
		t.width = 640;
		t.y = 0;
		return t;
	};
	_proto.enter_btn_i = function () {
		var t = new eui.Button();
		this.enter_btn = t;
		t.height = 80;
		t.horizontalCenter = 0;
		t.label = "进入游戏";
		t.verticalCenter = 0;
		t.width = 250;
		t.skinName = LoginUISkin$Skin10;
		return t;
	};
	_proto.tip_i = function () {
		var t = new eui.Label();
		this.tip = t;
		t.fontFamily = "hydsf";
		t.horizontalCenter = 0;
		t.size = 32;
		t.text = "真式版可能没有这个页面，先保留";
		t.y = 716.7;
		return t;
	};
	return LoginUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/MainSkin.exml'] = window.$exmlClass11 = (function (_super) {
	__extends($exmlClass11, _super);
	function $exmlClass11() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1136;
		this.width = 640;
	}
	var _proto = $exmlClass11.prototype;

	return $exmlClass11;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/MatchingSkin.exml'] = window.MatchingSkin = (function (_super) {
	__extends(MatchingSkin, _super);
	function MatchingSkin() {
		_super.call(this);
		this.skinParts = ["bg","math_loading","match_list","start","invite","close_bn","g_panel"];
		
		this.height = 1600;
		this.width = 640;
		this.elementsContent = [this.g_panel_i()];
	}
	var _proto = MatchingSkin.prototype;

	_proto.g_panel_i = function () {
		var t = new eui.Panel();
		this.g_panel = t;
		t.height = 1600;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 640;
		t.elementsContent = [this._Image1_i(),this.bg_i(),this.math_loading_i(),this._Image2_i(),this.match_list_i(),this.start_i(),this.invite_i(),this.close_bn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 1;
		t.fillMode = "scale";
		t.height = 1600;
		t.horizontalCenter = 0;
		t.source = "Common_json.mask";
		t.verticalCenter = 0;
		t.width = 640;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.height = 718;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(100,223,500,30);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.bg_04";
		t.verticalCenter = -82;
		t.width = 640;
		t.x = 0;
		return t;
	};
	_proto.math_loading_i = function () {
		var t = new MacthLoading();
		this.math_loading = t;
		t.height = 392;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MacthLoadingSkin";
		t.verticalCenter = -248;
		t.width = 640;
		t.x = 0;
		t.y = 124;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 184;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(80,10,480,7);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_01";
		t.verticalCenter = 46;
		t.x = 0;
		t.y = 522;
		return t;
	};
	_proto.match_list_i = function () {
		var t = new eui.List();
		this.match_list = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollEnabled = false;
		t.verticalCenter = 46;
		t.width = 640;
		t.x = 0;
		t.y = 522;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 40;
		t.horizontalAlign = "center";
		t.paddingLeft = 35;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.start_i = function () {
		var t = new MyButton();
		this.start = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 63;
		t.horizontalCenter = -149.5;
		t.label = "Start";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 209;
		t.y = 976;
		return t;
	};
	_proto.invite_i = function () {
		var t = new MyButton();
		this.invite = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 63;
		t.horizontalCenter = 150.5;
		t.label = "Invite more";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 209;
		t.y = 976;
		return t;
	};
	_proto.close_bn_i = function () {
		var t = new MyButton();
		this.close_bn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 71;
		t.label = "Invite more";
		t.right = 3;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 71;
		t.y = 485.32;
		return t;
	};
	return MatchingSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/MatchTipSkin.exml'] = window.MatchTip = (function (_super) {
	__extends(MatchTip, _super);
	var MatchTip$Skin12 = 	(function (_super) {
		__extends(MatchTip$Skin12, _super);
		function MatchTip$Skin12() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MatchTip$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_blue";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return MatchTip$Skin12;
	})(eui.Skin);

	var MatchTip$Skin13 = 	(function (_super) {
		__extends(MatchTip$Skin13, _super);
		function MatchTip$Skin13() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = MatchTip$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_green_l";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return MatchTip$Skin13;
	})(eui.Skin);

	function MatchTip() {
		_super.call(this);
		this.skinParts = ["quit","determine","back"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.quit_i(),this._Image4_i(),this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this.determine_i(),this.back_i()];
	}
	var _proto = MatchTip.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 432;
		t.scale9Grid = new egret.Rectangle(10,10,10,10);
		t.source = "Common_json.frame_01";
		t.width = 717;
		t.x = -24;
		t.y = 376.5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 298;
		t.source = "Common_json.bg_04";
		t.width = 637;
		t.x = 3;
		t.y = 110.5;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 52;
		t.source = "Common_json.font_exit";
		t.width = 357;
		t.x = 142;
		t.y = 250;
		return t;
	};
	_proto.quit_i = function () {
		var t = new eui.Image();
		this.quit = t;
		t.anchorOffsetX = 46.97;
		t.anchorOffsetY = 31.82;
		t.height = 71;
		t.source = "Common_json.icon_x";
		t.width = 71;
		t.x = 594.47;
		t.y = 267.82;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 266;
		t.scale9Grid = new egret.Rectangle(10,10,10,10);
		t.source = "Common_json.frame_09";
		t.width = 709;
		t.x = -34;
		t.y = 416.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116.67;
		t.text = "Are   you   sure   you   want   to   leave";
		t.textColor = 0xC83160;
		t.width = 623.67;
		t.x = 60.01;
		t.y = 333.66;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116.67;
		t.text = "the   game?";
		t.textColor = 0xC83160;
		t.width = 623.67;
		t.x = 252.62;
		t.y = 381.99;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116.67;
		t.text = "You paid xx Apples  to join this game.";
		t.textColor = 0x884526;
		t.width = 637.67;
		t.x = 60.01;
		t.y = 469.67;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116.67;
		t.text = "you wont get any as a reward if you";
		t.textColor = 0x884526;
		t.width = 665.67;
		t.x = 62.01;
		t.y = 522.01;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116.67;
		t.text = "quit!";
		t.textColor = 0x884526;
		t.width = 665.67;
		t.x = 62.01;
		t.y = 570;
		return t;
	};
	_proto.determine_i = function () {
		var t = new eui.Button();
		this.determine = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 31.82;
		t.height = 62.67;
		t.label = "Yes";
		t.width = 204;
		t.x = 166.01;
		t.y = 721.49;
		t.skinName = MatchTip$Skin12;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Button();
		this.back = t;
		t.anchorOffsetX = 104.55;
		t.anchorOffsetY = 34.85;
		t.height = 64.01;
		t.label = "No";
		t.width = 210.67;
		t.x = 462.39;
		t.y = 724.52;
		t.skinName = MatchTip$Skin13;
		return t;
	};
	return MatchTip;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/MuteSkin.exml'] = window.MuteSkin = (function (_super) {
	__extends(MuteSkin, _super);
	function MuteSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 42;
		this.width = 140;
		this.elementsContent = [this._Image1_i(),this._Label1_i()];
	}
	var _proto = MuteSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 42;
		t.source = "bar_jiazai_02_png";
		t.width = 140;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "静音";
		t.x = 33;
		t.y = 6;
		return t;
	};
	return MuteSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/PlayersSkin.exml'] = window.ChatSkin = (function (_super) {
	__extends(ChatSkin, _super);
	var ChatSkin$Skin14 = 	(function (_super) {
		__extends(ChatSkin$Skin14, _super);
		function ChatSkin$Skin14() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatSkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "HeadIcons_json.icon_head_main_01";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatSkin$Skin14;
	})(eui.Skin);

	var ChatSkin$Skin15 = 	(function (_super) {
		__extends(ChatSkin$Skin15, _super);
		function ChatSkin$Skin15() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatSkin$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "HeadIcons_json.icon_head_main_01";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatSkin$Skin15;
	})(eui.Skin);

	var ChatSkin$Skin16 = 	(function (_super) {
		__extends(ChatSkin$Skin16, _super);
		function ChatSkin$Skin16() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatSkin$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "HeadIcons_json.icon_head_main_01";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatSkin$Skin16;
	})(eui.Skin);

	var ChatSkin$Skin17 = 	(function (_super) {
		__extends(ChatSkin$Skin17, _super);
		function ChatSkin$Skin17() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ChatSkin$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "HeadIcons_json.icon_head_main_01";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ChatSkin$Skin17;
	})(eui.Skin);

	function ChatSkin() {
		_super.call(this);
		this.skinParts = ["_player1Btn","_player2Btn","_player3Btn","_player4Btn","_player1Name","_player2Name","_player3Name","_player4Name","_player1Img","_player2Img","_player3Img","_player4Img"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._player1Btn_i(),this._player2Btn_i(),this._player3Btn_i(),this._player4Btn_i(),this._player1Name_i(),this._player2Name_i(),this._player3Name_i(),this._player4Name_i(),this._player1Img_i(),this._player2Img_i(),this._player3Img_i(),this._player4Img_i()];
	}
	var _proto = ChatSkin.prototype;

	_proto._player1Btn_i = function () {
		var t = new eui.Button();
		this._player1Btn = t;
		t.label = "";
		t.x = 53.5;
		t.y = 918;
		t.skinName = ChatSkin$Skin14;
		return t;
	};
	_proto._player2Btn_i = function () {
		var t = new eui.Button();
		this._player2Btn = t;
		t.label = "";
		t.x = 206.5;
		t.y = 918;
		t.skinName = ChatSkin$Skin15;
		return t;
	};
	_proto._player3Btn_i = function () {
		var t = new eui.Button();
		this._player3Btn = t;
		t.label = "";
		t.x = 343.5;
		t.y = 918;
		t.skinName = ChatSkin$Skin16;
		return t;
	};
	_proto._player4Btn_i = function () {
		var t = new eui.Button();
		this._player4Btn = t;
		t.label = "";
		t.x = 497.5;
		t.y = 918;
		t.skinName = ChatSkin$Skin17;
		return t;
	};
	_proto._player1Name_i = function () {
		var t = new eui.Label();
		this._player1Name = t;
		t.text = "name";
		t.x = 53.5;
		t.y = 1023;
		return t;
	};
	_proto._player2Name_i = function () {
		var t = new eui.Label();
		this._player2Name = t;
		t.text = "name";
		t.x = 218;
		t.y = 1023;
		return t;
	};
	_proto._player3Name_i = function () {
		var t = new eui.Label();
		this._player3Name = t;
		t.text = "name";
		t.x = 355;
		t.y = 1023;
		return t;
	};
	_proto._player4Name_i = function () {
		var t = new eui.Label();
		this._player4Name = t;
		t.text = "name";
		t.x = 509;
		t.y = 1023;
		return t;
	};
	_proto._player1Img_i = function () {
		var t = new eui.Image();
		this._player1Img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.source = "Common_json.bg_1";
		t.width = 102;
		t.x = 53.5;
		t.y = 820;
		return t;
	};
	_proto._player2Img_i = function () {
		var t = new eui.Image();
		this._player2Img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.source = "Common_json.bg_1";
		t.width = 102;
		t.x = 355;
		t.y = 820;
		return t;
	};
	_proto._player3Img_i = function () {
		var t = new eui.Image();
		this._player3Img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.source = "Common_json.bg_1";
		t.width = 102;
		t.x = 218;
		t.y = 820;
		return t;
	};
	_proto._player4Img_i = function () {
		var t = new eui.Image();
		this._player4Img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.source = "Common_json.bg_1";
		t.width = 102;
		t.x = 509;
		t.y = 820;
		return t;
	};
	return ChatSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/RankingSkin.exml'] = window.RankingSkin = (function (_super) {
	__extends(RankingSkin, _super);
	function RankingSkin() {
		_super.call(this);
		this.skinParts = ["itemList","srcItemList","selfRank","selfHead","selfName","selfWon"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Image2_i(),this.srcItemList_i(),this._Image3_i(),this._Image4_i(),this.selfRank_i(),this.selfHead_i(),this.selfName_i(),this.selfWon_i()];
	}
	var _proto = RankingSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1021.09;
		t.scale9Grid = new egret.Rectangle(10,10,10,10);
		t.source = "Common_json.frame_09";
		t.visible = false;
		t.width = 832.49;
		t.x = -84.85;
		t.y = 572.73;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.height = 17;
		t.size = 24;
		t.text = "Rank";
		t.textColor = 0x884526;
		t.width = 63;
		t.x = 30;
		t.y = 689;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.height = 17;
		t.size = 24;
		t.text = "Name";
		t.textColor = 0x884526;
		t.width = 83;
		t.x = 184;
		t.y = 689;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.size = 24;
		t.text = "Games won";
		t.textColor = 0x884526;
		t.width = 199;
		t.x = 487;
		t.y = 689;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1238.67;
		t.scale9Grid = new egret.Rectangle(30,10,10,10);
		t.source = "Common_json.frame_10";
		t.width = 621.33;
		t.x = 10;
		t.y = 718;
		return t;
	};
	_proto.srcItemList_i = function () {
		var t = new eui.Scroller();
		this.srcItemList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 610;
		t.width = 608;
		t.x = 19.03;
		t.y = 732;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetX = 0;
		t.width = 608;
		t.y = -2;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 101;
		t.scale9Grid = new egret.Rectangle(5,4,20,21);
		t.source = "Common_json.frame_16";
		t.width = 700;
		t.x = -21.65;
		t.y = 1036.36;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.scale9Grid = new egret.Rectangle(4,5,32,31);
		t.source = "Common_json.frame_17";
		t.width = 607;
		t.x = 18.35;
		t.y = 1055.36;
		return t;
	};
	_proto.selfRank_i = function () {
		var t = new eui.Label();
		this.selfRank = t;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.size = 36;
		t.text = "12";
		t.textColor = 0xc8315f;
		t.width = 63;
		t.x = 45;
		t.y = 1071;
		return t;
	};
	_proto.selfHead_i = function () {
		var t = new eui.Image();
		this.selfHead = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 61;
		t.scale9Grid = new egret.Rectangle(13,7,50,17);
		t.source = "Common_json.frame_12";
		t.width = 61;
		t.x = 136.35;
		t.y = 1057.36;
		return t;
	};
	_proto.selfName_i = function () {
		var t = new eui.Label();
		this.selfName = t;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.size = 24;
		t.text = "Arial";
		t.textColor = 0xC8315F;
		t.width = 63;
		t.x = 235;
		t.y = 1076;
		return t;
	};
	_proto.selfWon_i = function () {
		var t = new eui.Label();
		this.selfWon = t;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.size = 30;
		t.text = "100";
		t.textColor = 0xC8315F;
		t.width = 63;
		t.x = 543;
		t.y = 1071;
		return t;
	};
	return RankingSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/RankItem.exml'] = window.RankItem = (function (_super) {
	__extends(RankItem, _super);
	function RankItem() {
		_super.call(this);
		this.skinParts = ["head","rank","rankImg"];
		
		this.height = 81;
		this.width = 608;
		this.elementsContent = [this._Image1_i(),this.head_i(),this.rank_i(),this._Label1_i(),this._Label2_i(),this.rankImg_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.bg"],[0],this._Image1,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this.head,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.rank"],[0],this.rank,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.name"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.won"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.rankImg"],[0],this.rankImg,"source");
	}
	var _proto = RankItem.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 81;
		t.scale9Grid = new egret.Rectangle(10,10,10,30);
		t.width = 605;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.head_i = function () {
		var t = new eui.Image();
		this.head = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 61;
		t.width = 61;
		t.x = 115;
		t.y = 10;
		return t;
	};
	_proto.rank_i = function () {
		var t = new eui.Label();
		this.rank = t;
		t.size = 40;
		t.textColor = 0x884526;
		t.x = 40;
		t.y = 17.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.textColor = 0x884526;
		t.x = 209;
		t.y = 25.5;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.textColor = 0x884526;
		t.x = 522;
		t.y = 25.5;
		return t;
	};
	_proto.rankImg_i = function () {
		var t = new eui.Image();
		this.rankImg = t;
		t.anchorOffsetX = 31.5;
		t.anchorOffsetY = 52;
		t.height = 52;
		t.width = 62;
		t.x = 52;
		t.y = 66.5;
		return t;
	};
	return RankItem;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/RankSkin.exml'] = window.RankSkin = (function (_super) {
	__extends(RankSkin, _super);
	var RankSkin$Skin18 = 	(function (_super) {
		__extends(RankSkin$Skin18, _super);
		function RankSkin$Skin18() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankSkin$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_blue";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RankSkin$Skin18;
	})(eui.Skin);

	var RankSkin$Skin19 = 	(function (_super) {
		__extends(RankSkin$Skin19, _super);
		function RankSkin$Skin19() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RankSkin$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_green_l";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RankSkin$Skin19;
	})(eui.Skin);

	function RankSkin() {
		_super.call(this);
		this.skinParts = ["gobalBtn","globalText","friendBtn","friendText"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.gobalBtn_i(),this.globalText_i(),this.friendBtn_i(),this.friendText_i(),this._Label1_i(),this._Image3_i()];
	}
	var _proto = RankSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 958.98;
		t.scale9Grid = new egret.Rectangle(10,10,10,10);
		t.source = "Common_json.frame_09";
		t.width = 936;
		t.x = -123.98;
		t.y = 646.24;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 250.98;
		t.source = "Common_json.bg_04";
		t.width = 642;
		t.x = 0.02;
		t.y = 410.27;
		return t;
	};
	_proto.gobalBtn_i = function () {
		var t = new eui.ToggleButton();
		this.gobalBtn = t;
		t.anchorOffsetX = 104.54;
		t.anchorOffsetY = 31.82;
		t.height = 63;
		t.label = "";
		t.width = 209;
		t.x = 165.54;
		t.y = 657.64;
		t.skinName = RankSkin$Skin18;
		return t;
	};
	_proto.globalText_i = function () {
		var t = new eui.Label();
		this.globalText = t;
		t.anchorOffsetX = 37.5;
		t.anchorOffsetY = 12;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Global";
		t.touchEnabled = false;
		t.x = 165.5;
		t.y = 654.84;
		return t;
	};
	_proto.friendBtn_i = function () {
		var t = new eui.ToggleButton();
		this.friendBtn = t;
		t.anchorOffsetX = 105.05;
		t.anchorOffsetY = 33.83;
		t.height = 63;
		t.label = "";
		t.width = 209;
		t.x = 466.55;
		t.y = 655.65;
		t.skinName = RankSkin$Skin19;
		return t;
	};
	_proto.friendText_i = function () {
		var t = new eui.Label();
		this.friendText = t;
		t.anchorOffsetX = 36.5;
		t.anchorOffsetY = 12;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "Friend";
		t.touchEnabled = false;
		t.x = 466;
		t.y = 651.56;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 36.5;
		t.anchorOffsetY = 12;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "The list resets at 6 every Monday";
		t.textColor = 0xc8315f;
		t.touchEnabled = false;
		t.x = 178.66;
		t.y = 609.59;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 56;
		t.source = "Common_json.font_lead";
		t.width = 341;
		t.x = 153.54;
		t.y = 539.62;
		return t;
	};
	return RankSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/RoleHeadInfoSkin.exml'] = window.RoleHeadInfo = (function (_super) {
	__extends(RoleHeadInfo, _super);
	function RoleHeadInfo() {
		_super.call(this);
		this.skinParts = ["bgImage1","img_title","lab_total","lab_one","lab_two","lab_three","lab_four","head_icon","btn_close"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.bgImage1_i(),this.img_title_i(),this._Image2_i(),this._Group6_i(),this.head_icon_i(),this.btn_close_i()];
	}
	var _proto = RoleHeadInfo.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "Common_json.mask";
		t.top = 0;
		t.visible = false;
		return t;
	};
	_proto.bgImage1_i = function () {
		var t = new eui.Image();
		this.bgImage1 = t;
		t.height = 482;
		t.scale9Grid = new egret.Rectangle(0,212,582,10);
		t.source = "Common_json.bg_05";
		t.width = 582;
		t.x = 31;
		t.y = 277;
		return t;
	};
	_proto.img_title_i = function () {
		var t = new eui.Image();
		this.img_title = t;
		t.height = 56;
		t.source = "Common_json.font_info";
		t.width = 270;
		t.x = 183;
		t.y = 405;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 248;
		t.scale9Grid = new egret.Rectangle(12,11,17,18);
		t.source = "Common_json.frame_15";
		t.width = 298;
		t.x = 261;
		t.y = 491;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.x = 278;
		t.y = 502;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 12;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label1_i(),this.lab_total_i(),this._Image3_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "rounds";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 95;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto.lab_total_i = function () {
		var t = new eui.Label();
		this.lab_total = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "190";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 172;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 261;
		t.x = 0;
		t.y = 35;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 36;
		t.elementsContent = [this._Label2_i(),this.lab_one_i(),this._Image4_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "1st";
		t.textAlign = "center";
		t.textColor = 0xc8315f;
		t.verticalAlign = "middle";
		t.width = 95;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto.lab_one_i = function () {
		var t = new eui.Label();
		this.lab_one = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "15";
		t.textAlign = "center";
		t.textColor = 0xc8315f;
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 172;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 261;
		t.x = 0;
		t.y = 35;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 10;
		t.y = 46;
		t.elementsContent = [this._Label3_i(),this.lab_two_i(),this._Image5_i()];
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "2st";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 95;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto.lab_two_i = function () {
		var t = new eui.Label();
		this.lab_two = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "15";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 172;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 261;
		t.x = 0;
		t.y = 35;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 20;
		t.y = 56;
		t.elementsContent = [this._Label4_i(),this.lab_three_i(),this._Image6_i()];
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "3st";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 95;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto.lab_three_i = function () {
		var t = new eui.Label();
		this.lab_three = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "15";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 172;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 261;
		t.x = 0;
		t.y = 35;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 30;
		t.y = 66;
		t.elementsContent = [this._Label5_i(),this.lab_four_i(),this._Image7_i()];
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "4st";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 95;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto.lab_four_i = function () {
		var t = new eui.Label();
		this.lab_four = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "hydsf";
		t.height = 30;
		t.size = 30;
		t.text = "15";
		t.textAlign = "center";
		t.textColor = 0x884526;
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 172;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 1;
		t.source = "Common_json.frame_14";
		t.width = 261;
		t.x = 0;
		t.y = 35;
		return t;
	};
	_proto.head_icon_i = function () {
		var t = new HeadIconWidget();
		this.head_icon = t;
		t.height = 135;
		t.left = 99;
		t.skinName = "HeadIconWidgetSkin";
		t.top = 551;
		t.width = 110;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new MyButton();
		this.btn_close = t;
		t.height = 71;
		t.label = "";
		t.right = 28;
		t.top = 372;
		t.width = 71;
		return t;
	};
	return RoleHeadInfo;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/SelectSkin.exml'] = window.PlayersSkin = (function (_super) {
	__extends(PlayersSkin, _super);
	var PlayersSkin$Skin20 = 	(function (_super) {
		__extends(PlayersSkin$Skin20, _super);
		function PlayersSkin$Skin20() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PlayersSkin$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.icon_x";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PlayersSkin$Skin20;
	})(eui.Skin);

	var PlayersSkin$Skin21 = 	(function (_super) {
		__extends(PlayersSkin$Skin21, _super);
		function PlayersSkin$Skin21() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PlayersSkin$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PlayersSkin$Skin21;
	})(eui.Skin);

	var PlayersSkin$Skin22 = 	(function (_super) {
		__extends(PlayersSkin$Skin22, _super);
		function PlayersSkin$Skin22() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PlayersSkin$Skin22.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_blue_l";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PlayersSkin$Skin22;
	})(eui.Skin);

	function PlayersSkin() {
		_super.call(this);
		this.skinParts = ["btn_close","head_icon","listPlayers","srcListPlayers","btn_exit","btn_share"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.btn_close_i(),this._Label1_i(),this.head_icon_i(),this._Image3_i(),this.srcListPlayers_i(),this.btn_exit_i(),this.btn_share_i()];
	}
	var _proto = PlayersSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 502;
		t.scale9Grid = new egret.Rectangle(0,212,582,10);
		t.source = "Common_json.bg_05";
		t.visible = false;
		t.width = 582;
		t.x = 31;
		t.y = 277;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 56;
		t.source = "Common_json.font_sett";
		t.visible = false;
		t.width = 270;
		t.x = 183;
		t.y = 405;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new eui.Button();
		this.btn_close = t;
		t.height = 71;
		t.label = "";
		t.visible = false;
		t.width = 71;
		t.x = 541;
		t.y = 372;
		t.skinName = PlayersSkin$Skin20;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.height = 22;
		t.size = 24;
		t.text = "Image";
		t.textColor = 0x884526;
		t.visible = false;
		t.width = 67;
		t.x = 139;
		t.y = 502;
		return t;
	};
	_proto.head_icon_i = function () {
		var t = new HeadIconWidget();
		this.head_icon = t;
		t.height = 135;
		t.left = 117;
		t.scaleX = 1;
		t.skinName = "HeadIconWidgetSkin";
		t.top = 531;
		t.visible = false;
		t.width = 110;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 138;
		t.scale9Grid = new egret.Rectangle(29,46,22,36);
		t.source = "Common_json.frame_13";
		t.width = 365;
		t.x = 230;
		t.y = 511;
		return t;
	};
	_proto.srcListPlayers_i = function () {
		var t = new eui.Scroller();
		this.srcListPlayers = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 138;
		t.scrollPolicyH = "on";
		t.scrollPolicyV = "off";
		t.width = 342;
		t.x = 251;
		t.y = 511;
		t.viewport = this.listPlayers_i();
		return t;
	};
	_proto.listPlayers_i = function () {
		var t = new eui.List();
		this.listPlayers = t;
		t.anchorOffsetX = 0;
		t.height = 138;
		t.width = 342;
		t.x = 19;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 15;
		t.paddingBottom = 12;
		t.paddingLeft = 12;
		t.paddingTop = 12;
		return t;
	};
	_proto.btn_exit_i = function () {
		var t = new eui.Button();
		this.btn_exit = t;
		t.label = "Exit a game";
		t.left = 78;
		t.top = 703;
		t.visible = false;
		t.skinName = PlayersSkin$Skin21;
		return t;
	};
	_proto.btn_share_i = function () {
		var t = new eui.Button();
		this.btn_share = t;
		t.height = 63;
		t.label = "share";
		t.left = 358;
		t.top = 703;
		t.visible = false;
		t.width = 209;
		t.skinName = PlayersSkin$Skin22;
		return t;
	};
	return PlayersSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/SettingSkin.exml'] = window.SettingSkin = (function (_super) {
	__extends(SettingSkin, _super);
	var SettingSkin$Skin23 = 	(function (_super) {
		__extends(SettingSkin$Skin23, _super);
		function SettingSkin$Skin23() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingSkin$Skin23.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.icon_x";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingSkin$Skin23;
	})(eui.Skin);

	var SettingSkin$Skin24 = 	(function (_super) {
		__extends(SettingSkin$Skin24, _super);
		function SettingSkin$Skin24() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingSkin$Skin24.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_green_l";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingSkin$Skin24;
	})(eui.Skin);

	var SettingSkin$Skin25 = 	(function (_super) {
		__extends(SettingSkin$Skin25, _super);
		function SettingSkin$Skin25() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingSkin$Skin25.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingSkin$Skin25;
	})(eui.Skin);

	var SettingSkin$Skin26 = 	(function (_super) {
		__extends(SettingSkin$Skin26, _super);
		function SettingSkin$Skin26() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingSkin$Skin26.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingSkin$Skin26;
	})(eui.Skin);

	var SettingSkin$Skin27 = 	(function (_super) {
		__extends(SettingSkin$Skin27, _super);
		function SettingSkin$Skin27() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingSkin$Skin27.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.frame_12";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingSkin$Skin27;
	})(eui.Skin);

	var SettingSkin$Skin28 = 	(function (_super) {
		__extends(SettingSkin$Skin28, _super);
		function SettingSkin$Skin28() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettingSkin$Skin28.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.frame_12";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettingSkin$Skin28;
	})(eui.Skin);

	function SettingSkin() {
		_super.call(this);
		this.skinParts = ["bg","effectImg","musicImg","closeBtn","playerImg","shareBtn","quitBtn","quitRoom","effectBtn","effectOnImg","effectOffImg","musicBtn","musicOnImg","musicOffImg"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this.effectImg_i(),this.musicImg_i(),this.closeBtn_i(),this.playerImg_i(),this.shareBtn_i(),this.quitBtn_i(),this.quitRoom_i(),this.effectBtn_i(),this.effectOnImg_i(),this.effectOffImg_i(),this.musicBtn_i(),this.musicOnImg_i(),this.musicOffImg_i(),this._Label1_i(),this._Label2_i(),this._Label3_i()];
	}
	var _proto = SettingSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 2277.67;
		t.scale9Grid = new egret.Rectangle(1,1,6,6);
		t.source = "Common_json.mask";
		t.width = 723.34;
		t.x = -41.67;
		t.y = -41.67;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 326;
		t.scale9Grid = new egret.Rectangle(3,9,16,18);
		t.source = "Common_json.frame_01";
		t.width = 552;
		t.x = 50;
		t.y = 448;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 268;
		t.source = "Common_json.bg_05";
		t.width = 582;
		t.x = 36;
		t.y = 252;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64;
		t.source = "Common_json.font_sett";
		t.width = 262;
		t.x = 190;
		t.y = 402;
		return t;
	};
	_proto.effectImg_i = function () {
		var t = new eui.Image();
		this.effectImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 52;
		t.source = "Common_json.iconsound";
		t.width = 28;
		t.x = 318;
		t.y = 510;
		return t;
	};
	_proto.musicImg_i = function () {
		var t = new eui.Image();
		this.musicImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 52;
		t.source = "Common_json.icon_music";
		t.width = 28;
		t.x = 316;
		t.y = 592;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.anchorOffsetX = 38.56;
		t.anchorOffsetY = 30.99;
		t.height = 71;
		t.label = "";
		t.rotation = 1.24;
		t.width = 71;
		t.x = 578.13;
		t.y = 406.07;
		t.skinName = SettingSkin$Skin23;
		return t;
	};
	_proto.playerImg_i = function () {
		var t = new eui.Image();
		this.playerImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116;
		t.source = "";
		t.width = 104;
		t.x = 120.91;
		t.y = 530.61;
		return t;
	};
	_proto.shareBtn_i = function () {
		var t = new eui.Button();
		this.shareBtn = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 30.3;
		t.height = 56;
		t.label = "Share";
		t.width = 204;
		t.x = 462;
		t.y = 736.3;
		t.skinName = SettingSkin$Skin24;
		return t;
	};
	_proto.quitBtn_i = function () {
		var t = new eui.Button();
		this.quitBtn = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 31.82;
		t.height = 58;
		t.label = "Exit a game";
		t.width = 206;
		t.x = 184;
		t.y = 735.82;
		t.skinName = SettingSkin$Skin25;
		return t;
	};
	_proto.quitRoom_i = function () {
		var t = new eui.Button();
		this.quitRoom = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 31.82;
		t.height = 58;
		t.label = "Exit room";
		t.width = 206;
		t.x = 336.42;
		t.y = 739.74;
		t.skinName = SettingSkin$Skin26;
		return t;
	};
	_proto.effectBtn_i = function () {
		var t = new eui.Button();
		this.effectBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.label = "";
		t.width = 70;
		t.x = 482;
		t.y = 520;
		t.skinName = SettingSkin$Skin27;
		return t;
	};
	_proto.effectOnImg_i = function () {
		var t = new eui.Image();
		this.effectOnImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.source = "Common_json.icon_landian";
		t.touchEnabled = false;
		t.width = 38;
		t.x = 514.91;
		t.y = 516.61;
		return t;
	};
	_proto.effectOffImg_i = function () {
		var t = new eui.Image();
		this.effectOffImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.source = "Common_json.icon_heidian";
		t.touchEnabled = false;
		t.width = 38;
		t.x = 476.91;
		t.y = 516.61;
		return t;
	};
	_proto.musicBtn_i = function () {
		var t = new eui.Button();
		this.musicBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26;
		t.label = "";
		t.width = 74;
		t.x = 477.74;
		t.y = 598;
		t.skinName = SettingSkin$Skin28;
		return t;
	};
	_proto.musicOnImg_i = function () {
		var t = new eui.Image();
		this.musicOnImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.source = "Common_json.icon_landian";
		t.touchEnabled = false;
		t.width = 38;
		t.x = 517.39;
		t.y = 594.61;
		return t;
	};
	_proto.musicOffImg_i = function () {
		var t = new eui.Image();
		this.musicOffImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.source = "Common_json.icon_heidian";
		t.touchEnabled = false;
		t.width = 38;
		t.x = 476.91;
		t.y = 594.61;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 30;
		t.text = "Image";
		t.textColor = 0x884526;
		t.x = 134;
		t.y = 494;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 30;
		t.text = "music";
		t.textColor = 0x884526;
		t.x = 364;
		t.y = 598;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 30;
		t.text = "sound";
		t.textColor = 0x884526;
		t.x = 364;
		t.y = 516;
		return t;
	};
	return SettingSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/ShopSkin.exml'] = window.ShopSkin = (function (_super) {
	__extends(ShopSkin, _super);
	function ShopSkin() {
		_super.call(this);
		this.skinParts = ["emojis_btn","gameGold_btn","close_btn","shopItmeList","shop_Scroller"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.emojis_btn_i(),this.gameGold_btn_i(),this.close_btn_i(),this.shop_Scroller_i(),this._Image5_i()];
	}
	var _proto = ShopSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 0.2;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "bg_03_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 276;
		t.source = "Common_json.bg_04";
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 22;
		t.source = "Common_json.frame_01";
		t.width = 640;
		t.x = 0;
		t.y = 276;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 841;
		t.source = "Common_json.frame_01";
		t.width = 640;
		t.x = 0;
		t.y = 296;
		return t;
	};
	_proto.emojis_btn_i = function () {
		var t = new MyButton();
		this.emojis_btn = t;
		t.height = 63;
		t.label = "";
		t.left = 62;
		t.top = 206;
		t.width = 209;
		return t;
	};
	_proto.gameGold_btn_i = function () {
		var t = new MyButton();
		this.gameGold_btn = t;
		t.height = 63;
		t.label = "";
		t.right = 73;
		t.top = 206;
		t.width = 209;
		return t;
	};
	_proto.close_btn_i = function () {
		var t = new MyButton();
		this.close_btn = t;
		t.height = 71;
		t.label = "";
		t.right = 3;
		t.top = 111;
		t.width = 71;
		return t;
	};
	_proto.shop_Scroller_i = function () {
		var t = new eui.Scroller();
		this.shop_Scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 837;
		t.width = 628;
		t.x = 6;
		t.y = 290;
		t.viewport = this.shopItmeList_i();
		return t;
	};
	_proto.shopItmeList_i = function () {
		var t = new eui.List();
		this.shopItmeList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 837;
		t.itemRendererSkinName = ShopItemWidget;
		t.scrollEnabled = true;
		t.width = 628;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 6;
		t.verticalGap = 20;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 56;
		t.source = "Common_json.font_shop";
		t.width = 160;
		t.x = 241.5;
		t.y = 139;
		return t;
	};
	return ShopSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/ShowChatSkin.exml'] = window.ShowChatSkin = (function (_super) {
	__extends(ShowChatSkin, _super);
	function ShowChatSkin() {
		_super.call(this);
		this.skinParts = ["emojis0","emojis_group0","emojis1","emojis_group1","emojis2","emojis_group2","emojis3","emojis_group3","chat0","emojis_group4","chat1","emojis_group5","chat2","emojis_group6","chat3","emojis_group7"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this.emojis_group0_i(),this.emojis_group1_i(),this.emojis_group2_i(),this.emojis_group3_i(),this.emojis_group4_i(),this.emojis_group5_i(),this.emojis_group6_i(),this.emojis_group7_i()];
	}
	var _proto = ShowChatSkin.prototype;

	_proto.emojis_group0_i = function () {
		var t = new eui.Group();
		this.emojis_group0 = t;
		t.anchorOffsetX = 27;
		t.anchorOffsetY = 108;
		t.bottom = 146;
		t.height = 110;
		t.visible = false;
		t.width = 99;
		t.x = 94;
		t.elementsContent = [this._Image1_i(),this.emojis0_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 96.85;
		t.x = 2.0900000000000034;
		t.y = 32.860000000000014;
		return t;
	};
	_proto.emojis0_i = function () {
		var t = new eui.Image();
		this.emojis0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Emojis_json.emojis_04";
		t.width = 79.85;
		t.x = 10.090000000000003;
		t.y = 6.860000000000014;
		return t;
	};
	_proto.emojis_group1_i = function () {
		var t = new eui.Group();
		this.emojis_group1 = t;
		t.anchorOffsetX = 27;
		t.anchorOffsetY = 108;
		t.bottom = 146;
		t.height = 110;
		t.visible = false;
		t.width = 99;
		t.x = 230;
		t.elementsContent = [this._Image2_i(),this.emojis1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 96.85;
		t.x = 2.0900000000000034;
		t.y = 32.860000000000014;
		return t;
	};
	_proto.emojis1_i = function () {
		var t = new eui.Image();
		this.emojis1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Emojis_json.emojis_04";
		t.width = 79.85;
		t.x = 10.090000000000003;
		t.y = 6.860000000000014;
		return t;
	};
	_proto.emojis_group2_i = function () {
		var t = new eui.Group();
		this.emojis_group2 = t;
		t.anchorOffsetX = 27;
		t.anchorOffsetY = 108;
		t.bottom = 147;
		t.height = 110;
		t.visible = false;
		t.width = 99;
		t.x = 371;
		t.elementsContent = [this._Image3_i(),this.emojis2_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 96.85;
		t.x = 2.0900000000000034;
		t.y = 32.860000000000014;
		return t;
	};
	_proto.emojis2_i = function () {
		var t = new eui.Image();
		this.emojis2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Emojis_json.emojis_04";
		t.width = 79.85;
		t.x = 10.090000000000003;
		t.y = 6.860000000000014;
		return t;
	};
	_proto.emojis_group3_i = function () {
		var t = new eui.Group();
		this.emojis_group3 = t;
		t.anchorOffsetX = 27;
		t.anchorOffsetY = 108;
		t.bottom = 147;
		t.height = 110;
		t.visible = false;
		t.width = 99;
		t.x = 508;
		t.elementsContent = [this._Image4_i(),this.emojis3_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 96.85;
		t.x = 2.0900000000000034;
		t.y = 32.860000000000014;
		return t;
	};
	_proto.emojis3_i = function () {
		var t = new eui.Image();
		this.emojis3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Emojis_json.emojis_04";
		t.width = 79.85;
		t.x = 10.090000000000003;
		t.y = 6.860000000000014;
		return t;
	};
	_proto.emojis_group4_i = function () {
		var t = new eui.Group();
		this.emojis_group4 = t;
		t.anchorOffsetX = 27;
		t.anchorOffsetY = 108;
		t.bottom = 146;
		t.height = 110;
		t.visible = false;
		t.width = 99;
		t.x = 93;
		t.elementsContent = [this._Image5_i(),this.chat0_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scale9Grid = new egret.Rectangle(12,9,74,46);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 223.85;
		t.x = 2.0900000000000034;
		t.y = 32.860000000000014;
		return t;
	};
	_proto.chat0_i = function () {
		var t = new eui.Label();
		this.chat0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 48;
		t.size = 24;
		t.text = "You eyes beauty aaaaaa";
		t.textColor = 0x111010;
		t.width = 212;
		t.x = 12;
		t.y = 38;
		return t;
	};
	_proto.emojis_group5_i = function () {
		var t = new eui.Group();
		this.emojis_group5 = t;
		t.anchorOffsetX = 27;
		t.anchorOffsetY = 108;
		t.bottom = 147;
		t.height = 110;
		t.visible = false;
		t.width = 99;
		t.x = 230;
		t.elementsContent = [this._Image6_i(),this.chat1_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scale9Grid = new egret.Rectangle(12,9,74,46);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 223.85;
		t.x = 2.0900000000000034;
		t.y = 32.860000000000014;
		return t;
	};
	_proto.chat1_i = function () {
		var t = new eui.Label();
		this.chat1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 48;
		t.size = 24;
		t.text = "You eyes beauty aaaaaa";
		t.textColor = 0x111010;
		t.width = 212;
		t.x = 12;
		t.y = 38;
		return t;
	};
	_proto.emojis_group6_i = function () {
		var t = new eui.Group();
		this.emojis_group6 = t;
		t.anchorOffsetX = 27;
		t.anchorOffsetY = 108;
		t.bottom = 149;
		t.height = 110;
		t.visible = false;
		t.width = 99;
		t.x = 260;
		t.elementsContent = [this._Image7_i(),this.chat2_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scale9Grid = new egret.Rectangle(12,9,74,46);
		t.scaleX = -1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 223.85;
		t.x = 222.09;
		t.y = 33.86;
		return t;
	};
	_proto.chat2_i = function () {
		var t = new eui.Label();
		this.chat2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 48;
		t.size = 24;
		t.text = "You eyes beauty aaaaaa";
		t.textColor = 0x111010;
		t.width = 212;
		t.x = 12;
		t.y = 38;
		return t;
	};
	_proto.emojis_group7_i = function () {
		var t = new eui.Group();
		this.emojis_group7 = t;
		t.anchorOffsetX = 27;
		t.anchorOffsetY = 108;
		t.bottom = 148;
		t.height = 110;
		t.visible = false;
		t.width = 99;
		t.x = 400;
		t.elementsContent = [this._Image8_i(),this.chat3_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.6;
		t.scale9Grid = new egret.Rectangle(12,9,74,46);
		t.scaleX = -1;
		t.scaleY = 1;
		t.source = "Common_json.frame_03";
		t.width = 223.85;
		t.x = 222.09;
		t.y = 33.86;
		return t;
	};
	_proto.chat3_i = function () {
		var t = new eui.Label();
		this.chat3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 48;
		t.size = 24;
		t.text = "You eyes beauty aaaaaa";
		t.textColor = 0x111010;
		t.width = 212;
		t.x = 12;
		t.y = 38;
		return t;
	};
	return ShowChatSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/SigleSkin.exml'] = window.SigleSkin = (function (_super) {
	__extends(SigleSkin, _super);
	function SigleSkin() {
		_super.call(this);
		this.skinParts = ["playerSkin"];
		
		this.height = 114;
		this.width = 114;
		this.elementsContent = [this.playerSkin_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this.playerSkin,"source");
	}
	var _proto = SigleSkin.prototype;

	_proto.playerSkin_i = function () {
		var t = new eui.Image();
		this.playerSkin = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 114;
		t.width = 114;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return SigleSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/UnMatchTipSkin.exml'] = window.UnMatchTipSkin = (function (_super) {
	__extends(UnMatchTipSkin, _super);
	var UnMatchTipSkin$Skin29 = 	(function (_super) {
		__extends(UnMatchTipSkin$Skin29, _super);
		function UnMatchTipSkin$Skin29() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = UnMatchTipSkin$Skin29.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_blue";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return UnMatchTipSkin$Skin29;
	})(eui.Skin);

	var UnMatchTipSkin$Skin30 = 	(function (_super) {
		__extends(UnMatchTipSkin$Skin30, _super);
		function UnMatchTipSkin$Skin30() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = UnMatchTipSkin$Skin30.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "Common_json.button_green_l";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return UnMatchTipSkin$Skin30;
	})(eui.Skin);

	function UnMatchTipSkin() {
		_super.call(this);
		this.skinParts = ["quit","determine","back"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.quit_i(),this._Label1_i(),this._Label2_i(),this.determine_i(),this.back_i()];
	}
	var _proto = UnMatchTipSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 319.32;
		t.scale9Grid = new egret.Rectangle(10,10,10,10);
		t.source = "Common_json.frame_01";
		t.width = 776;
		t.x = -65.34;
		t.y = 303.35;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 247.33;
		t.source = "Common_json.bg_04";
		t.width = 640;
		t.x = 0;
		t.y = 121.88;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 48.66;
		t.source = "Common_json.font_exit";
		t.width = 357.33;
		t.x = 143.33;
		t.y = 251.99;
		return t;
	};
	_proto.quit_i = function () {
		var t = new eui.Image();
		this.quit = t;
		t.anchorOffsetX = 36;
		t.anchorOffsetY = 32;
		t.height = 69.99;
		t.source = "Common_json.icon_x";
		t.width = 74.67;
		t.x = 594.44;
		t.y = 264;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116.67;
		t.text = "Are   you   sure   you   want   to   leave";
		t.textColor = 0xc83160;
		t.width = 623.67;
		t.x = 60.01;
		t.y = 333.66;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116.67;
		t.text = "the   game?";
		t.textColor = 0xC83160;
		t.width = 623.67;
		t.x = 252.62;
		t.y = 381.99;
		return t;
	};
	_proto.determine_i = function () {
		var t = new eui.Button();
		this.determine = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 31;
		t.height = 62.67;
		t.label = "Yes";
		t.width = 204;
		t.x = 169.35;
		t.y = 510.67;
		t.skinName = UnMatchTipSkin$Skin29;
		return t;
	};
	_proto.back_i = function () {
		var t = new eui.Button();
		this.back = t;
		t.anchorOffsetX = 105;
		t.anchorOffsetY = 32;
		t.height = 64.01;
		t.label = "No";
		t.width = 210.67;
		t.x = 476.85;
		t.y = 511.67;
		t.skinName = UnMatchTipSkin$Skin30;
		return t;
	};
	return UnMatchTipSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/windowSkins/UnMuteSkin.exml'] = window.UnMuteSkin = (function (_super) {
	__extends(UnMuteSkin, _super);
	function UnMuteSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 42;
		this.width = 140;
		this.elementsContent = [this._Image1_i(),this._Label1_i()];
	}
	var _proto = UnMuteSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 42;
		t.source = "bg_jiazai_png";
		t.width = 140;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "不静音";
		t.x = 33;
		t.y = 6;
		return t;
	};
	return UnMuteSkin;
})(eui.Skin);