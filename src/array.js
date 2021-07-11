/**
 * 封装数组的7个方法
 */
import {def} from './utils'

const arrayPrototype = Array.prototype
export const arrayMethods = Object.create(arrayPrototype)

// 需要改写的7个方法
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methodsNeedChange.forEach(method => {
    // 备份原来的方法
    const original = arrayPrototype[method]

    // 定义新方法
    def(arrayMethods, method, function() {
        // 执行原来的方法
        const result = original.apply(this, arguments)
        const args = [...arguments]

        // 将数组身上的__ob__取出, 也就是拿到了数组身上的 Observer类 的实例
        const ob = this.__ob__
        
        // 有三种方法 push/unshift/splice 可以插入新的项，新的项也需要进行数据响应式处理
        let inserted = undefined

        switch(method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
            default:
                break
        }

        // 判断有没有插入的项
        if (inserted) {
            ob.observeArray(inserted)
        }
        
        console.log('啦啦啦')
        
        return result
    }, false)
})