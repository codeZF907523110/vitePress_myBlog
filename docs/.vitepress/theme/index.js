import DefaultTheme from 'vitepress/theme'
import './custom.less' // 确保引入了自定义样式
import { useSidebarToggle } from './sidebar-toggle'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 应用已有的增强功能
    if (DefaultTheme.enhanceApp) {
      DefaultTheme.enhanceApp({ app, router })
    }

    // 路由切换后初始化侧边栏切换功能
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => {
        const { initSidebarToggle } = useSidebarToggle()
        // 确保 DOM 已加载
        setTimeout(() => {
          initSidebarToggle()
        }, 100)
      }

      // 首次加载时也初始化
      window.addEventListener('DOMContentLoaded', () => {
        const { initSidebarToggle } = useSidebarToggle()
        initSidebarToggle()
      })
    }
  }
}
