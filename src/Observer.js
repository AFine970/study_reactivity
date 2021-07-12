/**
 * 定义Observer类，将一个正常的object转换为每一个层级的属性都是响应式的（可被侦测的）object
 */
import {def} from './utils'
import defineReactive from './defineReactive'
import {arrayMethods} from './array'
import observe from './observe'
import Dep from './Dep'
export default class Observer {
    constructor(value) {
        // console.log('进入构造器', value)
        // 每一个Observer实例都有一个Dep实例
        this.dep = new Dep()
        // 给实例（this，一定要注意，构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性，值是这次new的实例
        def(value, '__ob__', this, false)
        // 判断是不是数组
        if (Array.isArray(value)) {
            // 改变value数组的原型, 指向arrayMethods
            Object.setPrototypeOf(value, arrayMethods)
            
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    // 遍历对象的每一个属性
    walk(value) {
        for (const key in value) {
            if (Object.hasOwnProperty.call(value, key)) {
                defineReactive(value, key)
            }
        }
    }
    
    // 遍历数组的每一项进行observe
    observeArray(value) {
        for (let index = 0, len = value.length; index < len; index++) {
            observe(value[index])
        }
    }
}