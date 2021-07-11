/**
 * 工具函数：定义不可枚举的对象
 * @param {object} obj 
 * @param {s} key 
 * @param {*} value 
 * @param {boolean} enumerable 
 */

export function def (obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        configurable: true,
        writable: true,
        enumerable,
        value
    })
}