let uid = 0
export default class Dep {
    constructor() {
        this.id = uid++
        console.log('我是DEP类的构造器')
        // 创建一个数组存储自己的订阅者
        // 这个数组里存放的是Watcher的实例
        this.subs = []
    }

    // 收集订阅
    addSub(sub) {
        this.subs.push(sub)
    }

    // 添加依赖
    depend() {
        // Dep.target 为全局唯一的变量
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    // 通知更新
    notify() {
        console.log('触发notify')
        // 浅拷贝一份
        const subs = this.subs.slice()

        for (let i = 0, len = subs.length; i < len; i++) {
            const each = subs[i]
            each.update && each.update()
        }
    }
}