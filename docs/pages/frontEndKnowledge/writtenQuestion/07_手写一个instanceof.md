# 手写一个instanceof
```TypeScript
  const instanceOf = (left, right) => {
    let lp = left.__proto__
    let rp = right.prototype
    while (true) {
      if (lp === null) return false
      if (lp === rp) return true
      lp = lp.__proto__
    }
  }
```