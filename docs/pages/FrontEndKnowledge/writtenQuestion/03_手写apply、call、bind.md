# 手写 apply、call、bind

::: tip
作用：这三个函数的主要作用是改变当前函数的 this 指向，区别在于

1. apply 的第二个参数是一个数组
2. call 的第二个参数是一个参数序列，可以用...arg,或者 arguments 进行接收
3. bind 比较复杂，bind 会返回一个新的函数 fn，fn 可以传入参数，执行 fn 时会将调用 bind 时传的参数和 fn 传的参数一起执行，如：(bind 与 call 入参一致，都是参数序列)

```ts
// 注意：func有四个参数
function func(a, b, c, d) {
  console.log(this.name)
  console.log(a, b, c, d)
}
let obj = { name: '哈哈哈' }
// 这里只传了三个参数
let fn = func.bind(obj, 1, 2, 3)
// 这里传了第四个参数
fn(4) // 输出  哈哈哈  1 2 3 4
```

:::

::: code-group

```ts [apply]
Function.prototype.myApply = function (thisArg, args = []) {
  thisArg = thisArg || window
  thisArg.fn = this
  const res = thisArg.fn(...args)
  delete thisArg.fn
  return res
}
```

```ts [call]
Function.prototype.myCall = function (thisArg, ...args) {
  args = args || []
  thisArg = thisArg || window
  thisArg.fn = this
  const res = thisArg.fn(...args)
  delete thisArg.fn
  return res
}
```

```ts [bind]
Function.prototype.myBind = function (thisArg, ...args1) {
  thisArg = thisArg || window
  args1 = args1 || []
  const that = this
  return (...args2) => {
    thisArg.fn = that
    const res = thisArg.fn(...args1, ...args2)
    return res
  }
}
```

:::
