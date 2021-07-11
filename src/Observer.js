/**
 * 定义Observer类，将一个正常的object转换为每一个层级的属性都是响应式的（可被侦测的）object
 */
import {def} from './utils'
import defineReactive from './defineReactive'
import {arrayMethods} from './array'
import observe from './observe'

export default class Observer {
    constructor(value) {
        def(value, '__ob__', this, false)
        console.log('进入构造器', value)
        
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