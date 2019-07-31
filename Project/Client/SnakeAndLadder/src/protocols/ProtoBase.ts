class ProtoBase {
    /**
 * 处理服务器消息
 * @param {string} message 消息
 */
    public handleProtocol(message: SC_Packet): void {
        if (message.ret !== ErrorType.COMMON_SUCCESS) {
            Logger.warn(ErrorLang[message.ret]);
            let func: any = this['fail' + message.pt];
            if (func) {
                func.call(this, message);
            } else {
                Logger.warn('失败消息解析错误');
            }
            return;
        }

        // 分发消息
        let func: any = this['handle' + message.pt];
        if (func) {
            func.call(this, message);
        } else {
            Logger.warn('成功消息解析错误');
        }
    }
}