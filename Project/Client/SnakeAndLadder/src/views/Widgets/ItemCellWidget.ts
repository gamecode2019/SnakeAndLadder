class ItemCellWidget extends eui.ItemRenderer implements UIWidget {
	//品质框
	private item_frame: eui.Image;
	//物品icon 
	private item_icon: eui.Image;
	//物品名称 
	private item_name: eui.Label;

	public onInit() {
		this.skinName = "resource/eui_skins/widgetSkins/ItemCellWidget.exml";
		this.dataChanged();
	}

	/**
	 * 数据改变时候调用
	 */
	public dataChanged(){

	}

	
}