export const useSidebarToggle = () => {
  // 在客户端环境下执行
  if (typeof window !== 'undefined') {
    // 侧边栏折叠状态（从本地存储中获取初始状态，默认展开）
    const getSidebarState = () => {
      return localStorage.getItem('vitepress-sidebar-collapsed') === 'true'
    }

    // 保存侧边栏状态到本地存储
    const saveSidebarState = collapsed => {
      localStorage.setItem('vitepress-sidebar-collapsed', collapsed.toString())
    }

    // 创建切换按钮
    const createToggleButton = () => {
      const VPSidebar = document.querySelector('.VPSidebar')

      // 检查是否已存在按钮，如果存在则直接返回
      const existingButton = document.querySelector('.sidebar-toggle-button')
      if (!VPSidebar && existingButton) {
        document.body.removeChild(existingButton)
      }
      if (existingButton) return existingButton

      const button = document.createElement('div')
      button.className = `sidebar-toggle-button ${getSidebarState() ? 'collapsed' : ''}`
      // 初始箭头根据侧边栏状态设置
      button.innerHTML = `<span class="toggle-icon">${getSidebarState() ? '❯' : '❮'}</span>`
      button.setAttribute('title', '切换侧边栏')
      if (VPSidebar) document.body.appendChild(button)

      return button
    }

    // 应用侧边栏状态
    const applySidebarState = collapsed => {
      const sidebar = document.querySelector('.VPSidebar')
      const content = document.querySelector('.VPContent.has-sidebar')
      const navbarContent = document.querySelector('.VPNavBar.has-sidebar .content')
      const button = document.querySelector('.sidebar-toggle-button')

      if (sidebar) {
        if (collapsed) {
          sidebar.classList.add('collapsed')
        } else {
          sidebar.classList.remove('collapsed')
        }
      }

      if (content) {
        if (collapsed) {
          content.classList.add('sidebar-collapsed')
        } else {
          content.classList.remove('sidebar-collapsed')
        }
      }

      if (navbarContent) {
        if (collapsed) {
          navbarContent.classList.add('sidebar-collapsed')
        } else {
          navbarContent.classList.remove('sidebar-collapsed')
        }
      }

      if (button) {
        if (collapsed) {
          button.classList.add('collapsed')
          // 侧边栏收起状态，箭头指向右侧表示可以展开
          button.querySelector('.toggle-icon').innerHTML = '❯'
        } else {
          button.classList.remove('collapsed')
          // 侧边栏展开状态，箭头指向左侧表示可以收起
          button.querySelector('.toggle-icon').innerHTML = '❮'
        }
      }
    }

    // 页面加载时设置初始状态
    const initSidebarToggle = () => {
      const button = createToggleButton()
      const initialState = getSidebarState()

      applySidebarState(initialState)

      // 添加切换事件（确保只添加一次）
      if (!button.hasAttribute('data-event-attached')) {
        button.addEventListener('click', () => {
          const currentState = getSidebarState()
          const newState = !currentState

          saveSidebarState(newState)
          applySidebarState(newState)
        })
        button.setAttribute('data-event-attached', 'true')
      }
    }

    return { initSidebarToggle }
  }

  return { initSidebarToggle: () => {} }
}
