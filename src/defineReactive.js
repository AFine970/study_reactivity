/**
 * 定义响应式方法，采用闭包传递value
 * @param {object} data 
 * @param {string} key 
 * @param {*} value 
 */
import observe from './observe'
import Dep from './Dep'

export default function (data, key, value) {
    const dep = new Dep()

    if (arguments.length === 2) {
        value = data[key]
    }

    // 子元素的值要进行observe, 至此形成了一个递归
    let childOb = observe(value)

    Object.defineProperty(data, key, {
        // 可枚举的
        enumerable: true,
        // 可配置的，可以删除键
        configurable: true,
        // getter
        get() {
            console.log('你试图访问' + key + '属性');
            // getter里收集依赖，判断现在是否处于依赖收集阶段
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return value
        },
        // setter
        set(newValue) {
            console.log('你试图修改' + key + '属性', newValue);
            // 相同，则不处理
            if (value === newValue) return

            value = newValue
            // 当设置了新值的时候，新值也需要observe响应式
            childOb = observe(newValue)
            // 发布订阅模式，通知dep
            // setter里更新依赖
            dep.notify()
        }
    })
}