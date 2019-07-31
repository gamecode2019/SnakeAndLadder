
class HashMap {
    // 元素长度
    private _length: number = 0;

    // 容器
    public _content: any;

    // 专用缓存对象
    private static _keyArray: Array<any> = [];

    /**
     * 构造函数
     */
    public constructor() {
        this._length = 0;
        this._content = {};
    }

    /**
     * 返回HashMap元素长度
     * @return {number} 元素长度
     */
    public size(): number {
        return this._length;
    }

    /**
     * HashMap是否为空
     * @return {boolean} 长度是否为空
     */
    public isEmpty(): boolean {
        return (this._length == 0);
    }

    /**
     * HashMap键值转为数组
     * @return {Array} 键值数组
     */
    public keys(): Array<any> {
        let temp: Array<any> = new Array<any>(this._length);
        let index: number = 0;
        for (let i in this._content) {
            temp[index] = i;
            index++;
        }
        return temp;
    }

    /**
     * Call func(key) for each key.
     * @param func the function to call
     */
    public eachKey(func: Function, thisObj: any): void {
        for (let i in this._content) {
            func.apply(thisObj, [i]);
        }
    }

    /**
     * Call func(value) for each value.
     * @param func the function to call
     */
    public eachValue(func: Function, thisObj: any): void {
        for (let i in this._content) {
            func.apply(thisObj, [this._content[i]]);
        }
    }

    /**
     * HashMap值转为数组
     * @return {Array} 值数组
     */
    public values(): Array<any> {
        let temp: Array<any> = new Array<any>(this._length);
        let index: number = 0;
        for (let i in this._content) {
            temp[index] = this._content[i];
            index++;
        }
        return temp;
    }

    /**
     * Tests if some key maps into the specified value in this HashMap. 
     * This operation is more expensive than the containsKey method.
     */
    public containsValue(value: any): boolean {
        for (let i in this._content) {
            if (this._content[i] === value) {
                return true;
            }
        }
        return false;
    }

    /**
     * Tests if the specified object is a key in this HashMap.
     * This operation is very fast if it is a string.
     * @param   key   The key whose presence in this map is to be tested
     * @return <tt>true</tt> if this map contains a mapping for the specified
     */
    public containsKey(key: any): boolean {
        if (this._content[key] != undefined) {
            return true;
        }
        return false;
    }

    /**
     * Returns the value to which the specified key is mapped in this HashMap.
     * Return null if the key is not mapped to any value in this HashMap.
     * This operation is very fast if the key is a string.
     * @param   key the key whose associated value is to be returned.
     * @return  the value to which this map maps the specified key, or
     *          <tt>null</tt> if the map contains no mapping for this key
     *           or it is null value originally.
     */
    public get(key: any): any {
        let value: any = this._content[key];
        if (value !== undefined) {
            return value;
        }
        return null;
    }

    /**
     * Same functionity method with different name to <code>get</code>.
     * 
     * @param   key the key whose associated value is to be returned.
     * @return  the value to which this map maps the specified key, or
     *          <tt>null</tt> if the map contains no mapping for this key
     *           or it is null value originally.
     */
    public getValue(key: any): any {
        return this.get(key);
    }

    /**
     * Associates the specified value with the specified key in this map. 
     * If the map previously contained a mapping for this key, the old value is replaced. 
     * If value is null, means remove the key from the map.
     * @param key key with which the specified value is to be associated.
     * @param value value to be associated with the specified key. null to remove the key.
     * @return previous value associated with specified key, or <tt>null</tt>
     *	       if there was no mapping for key.  A <tt>null</tt> return can
     *	       also indicate that the HashMap previously associated
     *	       <tt>null</tt> with the specified key.
     */
    public put(key: any, value: any): any {
        if (key === null) {
            throw new Error("cannot put a value with undefined or null key!");
        }
        if (value === null) {
            return this.remove(key);
        }
        if (typeof (key) !== "string" && typeof (key) !== "number") {
            throw new Error("JS不支持对象作为Key");
        }

        let oldValue: any = this._content[key];
        if (!oldValue) {
            this._length += 1;
        }
        this._content[key] = value;
        return oldValue;
    }

    /**
     * Removes the mapping for this key from this map if present.
     *
     * @param  key key whose mapping is to be removed from the map.
     * @return previous value associated with specified key, or <tt>null</tt>
     *	       if there was no mapping for key.  A <tt>null</tt> return can
     *	       also indicate that the map previously associated <tt>null</tt>
     *	       with the specified key.
     */
    public remove(key: any): any {
        let item = this._content[key];
        if (item) {
            delete this._content[key];
            this._length--;
        }
        return item;
    }

    /**
     * Clears this HashMap so that it contains no keys no values.
     */
    public clear(): void {
        for (let idx in this._content) {
            delete this._content[idx];
        }
        this._length = 0;
    }

    /**
     * Return a same copy of HashMap object
     */
    public clone(): HashMap {
        let temp: HashMap = new HashMap();
        for (let i in this._content) {
            temp.put(i, this._content[i]);
        }
        return temp;
    }

    /**
     * 转字符串
     */
    public toString(): string {
        let ks: Array<any> = this.keys();
        let vs: Array<any> = this.values();
        let temp: string = "HashMap Content:\n";
        for (let i: number = 0; i < ks.length; i++) {
            temp += ks[i] + " -> " + vs[i] + "\n";
        }
        return temp;
    }
}