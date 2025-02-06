# 用 setTimeout 实现 setInterval

```js
const mySetInterval = (fn, delay) => {
  let id
  const interval = () => {
    id = setTimeout(() => {
      fn()
      interval()
    }, delay)
  }
  interval()
  return {
    clear: () => clearTimeout(id)
  }
}

// 示例用法
const intervalId = mySetInterval(() => {
  console.log('This will run every 1000 milliseconds')
}, 1000)

// 如果你想在某个时刻停止这个定时器，可以调用 clear 方法
// 例如，5秒后停止定时器
setTimeout(() => {
  intervalId.clear()
  console.log('Interval cleared')
}, 5000)
```
