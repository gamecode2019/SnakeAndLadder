var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DragonBoneManager = (function () {
    function DragonBoneManager() {
        //龙骨资源
        this._assetMap = {};
    }
    /**
     * 获得单例
     */
    DragonBoneManager.instance = function () {
        if (DragonBoneManager._instance == null) {
            DragonBoneManager._instance = new DragonBoneManager();
        }
        return DragonBoneManager._instance;
    };
    /**
     * 通过文件名创建龙骨动画工厂
     */
    DragonBoneManager.prototype.createDragonByName = function (name) {
        var factory = this._assetMap[name];
        if (factory) {
            return factory;
        }
        var dataRes = name + "_ske_dbbin";
        var texJson = name + "_tex_json";
        var texPng = name + "_tex_png";
        factory = this.createDragonFactory(dataRes, texJson, texPng);
        this._assetMap[name] = factory;
        return factory;
    };
    /**
     * 构建龙骨 新 不需要绑定时钟
     */
    DragonBoneManager.prototype.createDragonFactory = function (dataRes, texJson, texPng) {
        var dragonbonesData = RES.getRes(dataRes);
        var textureData = RES.getRes(texJson);
        var texture = RES.getRes(texPng);
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.parseDragonBonesData(dragonbonesData);
        dragonbonesFactory.parseTextureAtlasData(textureData, texture);
        return dragonbonesFactory;
    };
    //单例
    DragonBoneManager._instance = null;
    return DragonBoneManager;
}());
__reflect(DragonBoneManager.prototype, "DragonBoneManager");
//# sourceMappingURL=DragonBoneManager.js.map