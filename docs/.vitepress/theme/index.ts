import DefaultTheme from 'vitepress/theme'
import './custom.less'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './custom.less' // 确保引入了自定义样式
import { useSidebarToggle } from './utils/sidebar-toggle'
import { useHeadingCollapse } from './utils/heading-collapse' // 更新导入路径

export default {
  ...DefaultTheme,
  NotFound: () => '404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
    // 应用已有的增强功能
    if (DefaultTheme.enhanceApp) {
      DefaultTheme.enhanceApp({ app, router, siteData })
    }

    // 路由切换后初始化侧边栏切换功能
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => {
        const { initSidebarToggle } = useSidebarToggle()
        const { setupHeadingCollapse } = useHeadingCollapse() // 获取折叠功能

        // 确保 DOM 已加载
        setTimeout(() => {
          initSidebarToggle()
          // 添加对标题折叠功能的支持
          setupHeadingCollapse()
        }, 100)
      }

      // 首次加载时也初始化
      window.addEventListener('DOMContentLoaded', () => {
        const { initSidebarToggle } = useSidebarToggle()
        const { setupHeadingCollapse } = useHeadingCollapse() // 获取折叠功能

        initSidebarToggle()
        // 添加对标题折叠功能的支持
        setupHeadingCollapse()
      })
    }
  }
}
