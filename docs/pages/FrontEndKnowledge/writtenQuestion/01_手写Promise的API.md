# 手写 Promise.all()

::: tip Promise.all()
`Promise.all()`接收一个 promise 数组，返回一个 promise，当所有 promise 都成功时，返回一个成功的 promise，当有一个 promise 失败时，返回一个失败的 promise
:::

```ts
Promise.prototype.myAll = (promiseList) => {
  return new Promise((resolve, reject) => {
    const arr = []
    let count = 0
    promiseList.forEach((item, index) => {
      item
        .then((res) => {
          arr.push(res)
          if (++count === promiseList.length) resolve(arr)
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}
```

# 手写 Promise.race()

::: tip Promise.race()
`Promise.race()`接收一个 Promise 数组，返回一个 Promise，这个 Promise 的状态由第一个完成的 Promise 决定，如果第一个 Promise 状态为 fulfilled，则返回第一个 Promise 的值，如果第一个 Promise 状态为 rejected，则返回第一个 Promise 的值。
:::

```ts
Promise.prototype.myRace = (promiseList) => {
  return new Promise((resolve, reject) => {
    promiseList.forEach((item) => {
      item.then((res) => resolve(item)).catch((err) => reject(err))
    })
  })
}
```
