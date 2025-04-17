export default {
  // Vite 配置选项，告诉rollup是外部引入的
  build: {
    rollupOptions: {
      external: ['THREE']
    }
  },
  server: {
    port: 5000
  }
}
