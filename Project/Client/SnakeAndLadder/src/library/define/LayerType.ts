// 层定义
enum LayerType {
    LAYER_SCENE, // 场景底层
    LAYER_UI, // 界面层
    LAYER_FULLSCREEN, // 全屏层
    LAYER_POPUP, // 弹出层
    LAYER_EFFECT, // 非场景特效层
    LAYER_TOOLTIP, // 提示层
    LAYER_LOADING, // 加载层
}

// 层配置
class LayerConfig {
    public touchEnabled: boolean; // 相应操作当前元素
    public touchChildren: boolean; // 相应操作子元素
    public model: boolean; // 此层有显示对象时是否屏蔽下层交互
    public alpha: number; // 透明度
    constructor(_touchEnabled: boolean, _touchChildren: boolean, _model: boolean, _alpha: number) {
        this.touchEnabled = _touchEnabled;
        this.touchChildren = _touchChildren;
        this.model = _model;
        this.alpha = _alpha;
    }
}

// 设置层响应
const LAYER_CHECK_CONFIGS = {
    [LayerType.LAYER_SCENE]: new LayerConfig(false, true, false, 0),
    [LayerType.LAYER_UI]: new LayerConfig(false, true, false, 0),
    [LayerType.LAYER_FULLSCREEN]: new LayerConfig(true, true, true, 1),
    [LayerType.LAYER_POPUP]: new LayerConfig(true, true, true, 0.6),
    [LayerType.LAYER_EFFECT]: new LayerConfig(false, false, false, 0),
    [LayerType.LAYER_TOOLTIP]: new LayerConfig(false, false, false, 0),
    [LayerType.LAYER_LOADING]: new LayerConfig(true, false, true, 0),
}