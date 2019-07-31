class ClassifyCellWidget extends eui.RadioButton implements UIWidget {
	//图标
	private type_icon: eui.Image;
	//是否选择图标
	private select_icon: eui.Image;
	//名称
	private cell_name: eui.Image;
	//数据
	private data: any;

	/**
	 * 构造
	 */
	public constructor() {
		super();
		this.onInit();
	}

	/**
	 * 初始化
	 */
	public onInit() {
		this.skinName = "resource/eui_skins/widgetSkins/ClassifyCellWidget.exml";
	}

	/**
	 * 设置数据
	 */
	public setData(data: any) {
		this.data = data;
		this.cell_name.source = UIManager.instance().getSourceNameByAtlasAndName("FontIcon", data.nameSource);
		this.type_icon.source = UIManager.instance().getSourceNameByAtlasAndName("Item", data.iconSource);
	}

	/**
	 * 获得按钮数据
	 */
	public getData(): any {
		return this.data;
	}
}