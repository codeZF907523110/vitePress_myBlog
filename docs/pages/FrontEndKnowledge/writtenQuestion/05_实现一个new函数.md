# 实现一个 new 函数

:::tip **new 具体做了什么，实现思路是什么样的呢**

1. 创建一个新对象 obj
2. 利用 Object.create()将 obj 的原型指向构造函数的原型
3. 利用 constructor.apply()将 obj 作用域指向构造函数的作用域 this
4. 执行构造函数，将新的参数添加到构造函数中
5. 如果构造函数有显式返回一个对象，则返回该对象；否则，返回新对象

**实现：**

```ts
function myNew(constructor, ...args) {
  const obj = {}
  obj.__proto__ === constructor.prototype
  const res = constructor.apply(obj, args)
  return typeof res === 'object' ? res : obj
}

function Person(name) {
  this.name = name
}

const person = MyNew(Person, '张三')
console.log(person.name)
```

:::
