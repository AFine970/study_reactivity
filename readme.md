# 数据响应式原理

## 快速开始

```bash
npm install

npm run serve
```

## 项目结构

```txt
|-- study_reactivity
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- readme.md
    |-- webpack.config.js
    |-- src
    |   |-- array.js
    |   |-- defineReactive.js // 数据响应式的主要实现
    |   |-- Dep.js // Dep类
    |   |-- index.js // 主入口
    |   |-- observe.js
    |   |-- Observer.js // Observer类
    |   |-- utils.js
    |   |-- Watch.js // Watch类型
    |-- www
        |-- index.html
```

## 实现原理

- Vue2.x 中使用的是`Object.defineProperty()`方法中的 `get` 和 `set` 这两个方法对数据进行劫持
- Vue3.x 中使用的是`Object.proxy()`来代理整个对象，来实现数据劫持
- 两者的区别：
  - `Object.defineProperty()`一次只能劫持目标对象中的一个属性
  - `Object.proxy()`可以劫持整个目标对象，`Object.defineProperty()`要劫持整个目标对象，需要循环遍历整个对象才能实现
  - `Object.defineProperty()`无法检测到对象属性的添加和删除，数组的 API 方法也无法监听
  - `Object.proxy()`在性能上更优秀，配合`Reflect`使用，能让我们快速地执行`this`绑定

### 侵入式和非侵入式响应式

vue (非侵入式)

```js
this.vm.a++;
```

react (侵入式)

```js
this.setState({
  a: this.state.a + 1,
});
```

### Observer 类--实现响应式的关键

![Observer类.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe1927672a7248a9b6c5451b0a63ba5e~tplv-k3u1fbpfcp-watermark.image)

### 数组响应式--重写 7 个数组操作方法

![重写数组的7个方法.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bf63b0399fe474d967b8a7aede05346~tplv-k3u1fbpfcp-watermark.image)

## 依赖收集

### 什么是依赖？

数据响应式原理中的依赖，不是我们平常使用的 npm 包的依赖，而指的是 Vue 中需要用到数据的地方

- Vue1.x，**细粒度**依赖，用到数据的**DOM**都是依赖
- Vue2.x，**中等粒度**依赖，用到数据的组件是依赖
- 在 **getter** 中收集依赖，在 **setter** 中触发依赖

### Dep 类和 Watch 类

- 把依赖收集的代码封装成一个 Dep 类，它专门用来管理用来，**每个 Observer 类的实例，都内置了一个 Dep 类的实例**
- Watch 是一个中介，数据发生变化时，通过 Watch 中转，通知组件
- 工作过程简单描述
  - 有一个已经被响应式处理的 A 对象（也就是 Observe 类的实例）
  - 使用 Watch 类的实例 B 去监测数据变化，对 A 对象添加监测的那一刻触发了 getter
  - 触发了 getter，A 对象中 Dep 类实例就会进行依赖收集工作，把当前的实例 B 收集起来
  - 当 A 对象的数据变化时，触发 setter
  - 触发 setter，这时候 A 对象中 Dep 类实例通知实例 B，实例 B 就触发响应回调

![数据监测工作原理.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/146c6de9c4d943b1a6b37db924f3c43d~tplv-k3u1fbpfcp-watermark.image)
