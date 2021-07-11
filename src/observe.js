/**
 * 数据响应式执行函数
 */

import Observer from './Observer'

export default function observe(value) {
    // 只处理对象
    if (typeof value !== 'object') return
    // 定义ob
    let ob = undefined
    if (typeof value.__ob__ !== 'undefined') {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}