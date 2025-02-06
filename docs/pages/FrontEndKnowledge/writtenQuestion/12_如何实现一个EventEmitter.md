# 如何实现一个 EventEmitter

::: tip EventEmitter

- EventEmitter 是一个类，它具有 on 方法，用于注册事件，emit 方法，用于触发事件，removeListener 方法，用于移除事件监听器。

```js
class EventEmitter {
  constructor() {
    this.events = {}
  }
  // 注册事件
  on(name, callback) {
    if (this.events[name]) {
      this.events[name].push(callback)
    } else {
      this.events[name] = [callback]
    }
  }
  // 执行事件
  emit(name, ...args) {
    if (this.events[name]) {
      this.events[name].forEach((fn) => {
        fn.apply(this, args)
      })
    }
  }
  // 删除事件
  off(name, callback) {
    if (this.events[name]) {
      const index = this.events[name].findIndex((item) => item === callback)
      if (index !== -1) this.events[name].splice(index, 1)
    }
  }
  // 注册一次性方法
  once(name, callback) {
    const fn = (...args) => {
      callback.apply(this, args)
      this.off(name, fn)
    }
    this.on(name, fn)
  }
}
```

:::
