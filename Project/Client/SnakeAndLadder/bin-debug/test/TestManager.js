var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TestManager = (function () {
    function TestManager() {
        this.name = 'word';
    }
    Object.defineProperty(TestManager, "Instance", {
        get: function () {
            if (this.instance == null) {
                this.instance = new TestManager();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestManager.prototype, "name", {
        get: function () {
            return this.name;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return TestManager;
}());
__reflect(TestManager.prototype, "TestManager");
//# sourceMappingURL=TestManager.js.map