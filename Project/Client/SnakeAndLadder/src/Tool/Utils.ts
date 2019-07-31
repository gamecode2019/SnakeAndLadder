class Utils {
    private static _instance: Utils
    public static getInstance() {
        if (this._instance == null) {
            this._instance = new Utils
        }
        return this._instance
    }

    public constructor() {

    }

    public buttonEffect(button: (eui.Button|eui.Image), callback: Function, listener: any, child?: any) {
        button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            let tw = egret.Tween.get(button)
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 100)
            if (child) {
                let tw1 = egret.Tween.get(child)
                tw1.to({ scaleX: 1.1, scaleY: 1.1}, 100)
            }
        }, listener)
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            let tw = egret.Tween.get(button)
            tw.to({ scaleX: 1, scaleY: 1 }, 100)
            if (child) {
                let tw1 = egret.Tween.get(child)
                tw1.to({ scaleX: 1, scaleY: 1 }, 100)
            }
            callback.apply(listener)
        }, listener)
        button.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
            let tw = egret.Tween.get(button)
            tw.to({ scaleX: 1, scaleY: 1 }, 100)
            if (child) {
                let tw1 = egret.Tween.get(child)
                tw1.to({ scaleX: 1, scaleY: 1 }, 100)
            }
        }, this)
    }
}