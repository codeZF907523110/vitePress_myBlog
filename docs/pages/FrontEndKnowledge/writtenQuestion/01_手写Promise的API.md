# 简单实现一个promise
```js
class MyPromise {
  constructor(executor) {
    this.status = 'pending'; // 初始状态
    this.value = undefined; // 成功时的值
    this.reason = undefined; // 失败时的原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = []; // 失败回调队列

    // 成功回调
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        // 执行所有成功回调
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    // 失败回调
    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        // 执行所有失败回调
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 执行 executor
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error); // 捕获 executor 中的错误
    }
  }

  // then 方法
  then(onFulfilled, onRejected) {
    // 因为then可以链式调用，所以这里需要返回一个promise
    return new MyPromise((resolve, reject) => {
      // 成功回调
      const fulfilledHandler = () => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(this.value);
            // 如果返回值是 Promise，则等待其完成
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            resolve(this.value); // 透传值
          }
        } catch (error) {
          reject(error); // 捕获错误
        }
      };

      // 失败回调
      const rejectedHandler = () => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(this.reason);
            // 如果返回值是 Promise，则等待其完成
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result); // 错误被处理，返回成功状态
            }
          } else {
            reject(this.reason); // 透传错误
          }
        } catch (error) {
          reject(error); // 捕获错误
        }
      };

      // 根据当前状态执行回调
      if (this.status === 'fulfilled') {
        setTimeout(fulfilledHandler, 0); // 异步执行
      } else if (this.status === 'rejected') {
        setTimeout(rejectedHandler, 0); // 异步执行
      } else if (this.status === 'pending') {
        // 如果状态未确定，将回调加入队列
        this.onFulfilledCallbacks.push(() => setTimeout(fulfilledHandler, 0));
        this.onRejectedCallbacks.push(() => setTimeout(rejectedHandler, 0));
      }
    });
  }

  // catch 方法
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // 静态方法：resolve
  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  // 静态方法：reject
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

// 测试
new MyPromise((resolve, reject) => {
  console.log('111')
  resolve('222')
})
  .then((res) => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
      resolve(333)
    })
  })
  .then((res) => {
    console.log(res)
  })
```

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
