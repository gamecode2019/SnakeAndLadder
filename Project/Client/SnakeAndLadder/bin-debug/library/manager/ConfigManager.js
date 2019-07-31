var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConfigManager = (function () {
    function ConfigManager() {
    }
    /**
     * 获取单例
     * @return {object} ConfigManager
     */
    ConfigManager.instance = function () {
        if (!ConfigManager._instance) {
            ConfigManager._instance = new ConfigManager();
        }
        return ConfigManager._instance;
    };
    /**
     * 加载所有配置文件
     */
    ConfigManager.prototype.loadAllData = function () { };
    /**
     * 重载单个配置文件
     */
    ConfigManager.prototype.reloadData = function (configName) {
        return null;
    };
    /**
     * 加载单个配置文件
     */
    ConfigManager.prototype.getData = function (configName) {
        return null;
    };
    // 单例
    ConfigManager._instance = null;
    return ConfigManager;
}());
__reflect(ConfigManager.prototype, "ConfigManager");
//# sourceMappingURL=ConfigManager.js.map