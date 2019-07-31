class ConfigManager {
    // 单例
    private static _instance = null;

	/**
	 * 获取单例
	 * @return {object} ConfigManager
	 */
    public static instance(): ConfigManager {
        if (!ConfigManager._instance) {
            ConfigManager._instance = new ConfigManager();
        }
        return ConfigManager._instance;
    }

    /**
	 * 加载所有配置文件
	 */
    public loadAllData(): void { }

    /**
	 * 重载单个配置文件
	 */
    public reloadData(configName: string): ConfigInfo {
        return null;
    }

    /**
	 * 加载单个配置文件
	 */
    public getData(configName: string): ConfigInfo {
        return null;
    }
}