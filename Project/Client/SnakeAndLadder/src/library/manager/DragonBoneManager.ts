class DragonBoneManager {
    //单例
    private static _instance: DragonBoneManager = null;

    //龙骨资源
    private _assetMap: { [key: string]: any } = {}

    /**
     * 获得单例
     */
    public static instance(): DragonBoneManager {
        if (DragonBoneManager._instance == null) {
            DragonBoneManager._instance = new DragonBoneManager();
        }
        return DragonBoneManager._instance;
    }

    /**
     * 通过文件名创建龙骨动画工厂
     */
    public createDragonByName(name: string): dragonBones.EgretFactory {
        let factory: dragonBones.EgretFactory = this._assetMap[name];
        if (factory) {
            return factory;
        }
        let dataRes = name + "_ske_dbbin";
        let texJson = name + "_tex_json";
        let texPng = name + "_tex_png";
        factory = this.createDragonFactory(dataRes, texJson, texPng);
        this._assetMap[name] = factory;
        return factory;
    }

    /**
     * 构建龙骨 新 不需要绑定时钟
     */
    public createDragonFactory(dataRes: string, texJson: string, texPng: string): dragonBones.EgretFactory {
        var dragonbonesData = RES.getRes(dataRes);
        var textureData = RES.getRes(texJson);
        var texture = RES.getRes(texPng);
        let dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.parseDragonBonesData(dragonbonesData);
        dragonbonesFactory.parseTextureAtlasData(textureData, texture);
        return dragonbonesFactory;
    }
}
