var maxAreaOfIsland = function (grid: number[][]) {
  const h = grid.length,
    w = grid[0].length
  let res = 0
  const dfs = (i, j) => {
    if (i < 0 || i >= h) return 0
    if (j < 0 || j >= w) return 0
    if (grid[i][j] === 0) return 0
    grid[i][j] = 0
    return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1)
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      res = Math.max(res, dfs(i, j))
    }
  }
  return res
}
