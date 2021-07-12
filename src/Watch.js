import Dep from "./Dep"

let uid = 0
export default class Watch {
    constructor(target, expression, callback) {
        this.id = uid++
        this.target = target
        this.getter = parsePath(expression)
        this.callback = callback
        this.value = this.get()
    }
    // 触发更新
    update() {
        this.run()
    }
    // 根据表达式取值，并且进入依赖收集阶段
    get() {
        // 进入依赖收集阶段。让全局的 Dep.target 设置为Watcher本身，就是进入依赖收集阶段
        Dep.target = this
        const obj = this.target
        let value = undefined
        // 寻找真正的目标
        try {
            value = this.getter(obj)
        } finally {
            // 最后将全局目标置位null，意味着当前这个Watcher已经处理完毕
            Dep.target = null
        }

        return value
    }
    run() {
        this.getAndInvoke(this.callback)
    }
    // 得到并且唤起
    getAndInvoke(cb) {
        const value = this.get()

        if (value !== this.value || typeof value === 'object') {
            const oldValue = this.value
            this.value = value
            cb.call(this.target, value, oldValue)
        }
    }
}

// 根据传入的路径，返回一个查找对象里的相应值的函数
function parsePath(expression) {
    if (typeof expression !== 'string') return
    let keys = expression.split('.')
    if (!keys.length) return

    return function (obj) {
        if (!obj) return
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index]
            // 注意！这里不能加判断，否则多触发一次getter
            // if (obj[key]) {
            obj = obj[key]
            // }
        }
        return obj
    }
}
