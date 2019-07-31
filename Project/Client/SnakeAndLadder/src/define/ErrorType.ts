const enum ErrorType {
    COMMON_ERR = 0, // 未知错误
    COMMON_SUCCESS = 1, // 操作成功
    COMMON_NOLOGIN = 2, // 未登录
    COMMON_LOGIN_ERR = 3, // 登录错误
    COMMON_LOGIN_EXPIRED = 4, //登录过期
    COMMON_LOGIN_RELOAD_DATA = 5, //失去连接，重登

    // 用户模块(101-150)
    COMMON_FUNC_CLOSE = 101, // 功能关闭
    COMMON_SAVE_ERR = 102, // 保存失败
    COMMON_LOAD_ERR = 103, // 加载失败
    COMMON_JSON_ERR = 104, // 无效JSON数据
    COMMON_CAPTCHA_ERR = 105, // 无效验证码
    COMMON_WXLOGIN_ERR = 106, // 微信登录失败
}