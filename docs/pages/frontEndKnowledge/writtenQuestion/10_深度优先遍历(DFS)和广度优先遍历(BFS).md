# 深度优先遍历(DFS)和广度优先遍历(BFS)

::: tip **深度优先遍历（DFS）**

- **方法一：递归**

```TypeScript
  const dfs = (root) => {
    if (!root) return
    for(let item of root.children) {
      dfs(item)
    }
  }
```

- **方法二：迭代**

```TypeScript
  const dfs = (root) => {
    const stack = [root]
    while (stack.length) {
      const node = stack.pop()
      for (let  item of node.children) {
        stack.push(item)
      }
    }
  }
```

:::

::: tip **广度优先遍历（BFS）**

- **方法一：迭代**

```TypeScript
  const bfs = (root) => {
    const stack = [root]
    while (stack.length) {
      const node = stack.shift()
      for (let item of node.children) {
        stack.push(item)
      }
    }
  }
```

:::
