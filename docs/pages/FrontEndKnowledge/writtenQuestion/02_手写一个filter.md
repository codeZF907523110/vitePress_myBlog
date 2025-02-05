# 手写一个 filter

```ts
Array.prototype.myFilter = (fn) => {
  const arr = []
  for (const i in this) {
    if (fn(this[i], i)) arr.push(this[i])
  }
  return arr
}
```
