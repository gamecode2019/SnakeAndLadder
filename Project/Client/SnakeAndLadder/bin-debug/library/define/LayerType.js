var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 层定义
var LayerType;
(function (LayerType) {
    LayerType[LayerType["LAYER_SCENE"] = 0] = "LAYER_SCENE";
    LayerType[LayerType["LAYER_UI"] = 1] = "LAYER_UI";
    LayerType[LayerType["LAYER_FULLSCREEN"] = 2] = "LAYER_FULLSCREEN";
    LayerType[LayerType["LAYER_POPUP"] = 3] = "LAYER_POPUP";
    LayerType[LayerType["LAYER_EFFECT"] = 4] = "LAYER_EFFECT";
    LayerType[LayerType["LAYER_TOOLTIP"] = 5] = "LAYER_TOOLTIP";
    LayerType[LayerType["LAYER_LOADING"] = 6] = "LAYER_LOADING";
})(LayerType || (LayerType = {}));
// 层配置
var LayerConfig = (function () {
    function LayerConfig(_touchEnabled, _touchChildren, _model, _alpha) {
        this.touchEnabled = _touchEnabled;
        this.touchChildren = _touchChildren;
        this.model = _model;
        this.alpha = _alpha;
    }
    return LayerConfig;
}());
__reflect(LayerConfig.prototype, "LayerConfig");
// 设置层响应
var LAYER_CHECK_CONFIGS = (_a = {},
    _a[LayerType.LAYER_SCENE] = new LayerConfig(false, true, false, 0),
    _a[LayerType.LAYER_UI] = new LayerConfig(false, true, false, 0),
    _a[LayerType.LAYER_FULLSCREEN] = new LayerConfig(true, true, true, 1),
    _a[LayerType.LAYER_POPUP] = new LayerConfig(true, true, true, 0.6),
    _a[LayerType.LAYER_EFFECT] = new LayerConfig(false, false, false, 0),
    _a[LayerType.LAYER_TOOLTIP] = new LayerConfig(false, false, false, 0),
    _a[LayerType.LAYER_LOADING] = new LayerConfig(true, false, true, 0),
    _a);
var _a;
//# sourceMappingURL=LayerType.js.map