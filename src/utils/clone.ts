/**
 * @type 克隆类实现
 */

class Clone {
    private data: any;

    protected constructor(options:any) {
        this.data = options;
    }

    /**
     * 浅拷贝
     * @param value
     * @returns {any}
     */
    clone(value:any):any {
        return (value || this.data);
    }

    /**
     * 深拷贝
     * @param value
     * @returns {any}
     */
    cloneDeep(value:any):any {
        const obj = value || this.data;
        const protoObj = Object.getPrototypeOf(obj);
        const cloneObj = Object.create(protoObj);

        Object.getOwnPropertyNames(obj).forEach(name => {
            let item = obj(name);
            const isArray = Object.prototype.toString.call(item) === '[object Array]';
            const isObject = Object.prototype.toString.call(item) === '[object Object]';

            if (isArray || isObject) {
                cloneObj[name] = this.cloneDeep(item);
            } else {
                const propDesc = Object.getOwnPropertyDescriptor(obj, name);
                Object.defineProperty(cloneObj, name, propDesc);
            }
        }

        return cloneObj;
    }
}

export default clone;