var Logger = console;
Logger.warn = function (message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    console.warn(message, optionalParams);
};
//# sourceMappingURL=Logger.js.map