// 创建标题折叠功能的工具函数
export const useHeadingCollapse = () => {
  // 初始化标题折叠功能
  const setupHeadingCollapse = () => {
    // 查找所有标题元素
    const headings = document.querySelectorAll('.vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4, .vp-doc h5, .vp-doc h6')

    headings.forEach(heading => {
      // 避免重复处理
      if (heading.classList.contains('heading-processed')) {
        return
      }

      // 添加处理标记
      heading.classList.add('heading-processed')

      // 创建折叠图标
      const toggleIcon = document.createElement('span')
      toggleIcon.className = 'heading-toggle-icon'

      // 保证不破坏标题的结构，特别是#符号
      heading.appendChild(toggleIcon)

      // 查找需要折叠的内容（到下一个相同或更高级别的标题之前的所有内容）
      const level = parseInt(heading.tagName.substring(1))
      const elementsToCollapse: Element[] = [] // 明确指定元素类型
      let sibling = heading.nextElementSibling

      while (sibling && !(sibling.tagName.match(/^H\d$/) && parseInt(sibling.tagName.substring(1)) <= level)) {
        elementsToCollapse.push(sibling)
        sibling = sibling.nextElementSibling
      }

      // 创建一个容器包裹要折叠的内容
      if (elementsToCollapse.length > 0) {
        const contentContainer = document.createElement('div')
        contentContainer.className = 'heading-content'

        elementsToCollapse.forEach(el => {
          // 确保el.parentNode不为null
          if (el.parentNode) {
            el.parentNode.removeChild(el)
            contentContainer.appendChild(el)
          }
        })

        // 插入容器 - 添加空值检查
        if (heading.parentNode) {
          if (heading.nextSibling) {
            heading.parentNode.insertBefore(contentContainer, heading.nextSibling)
          } else {
            heading.parentNode.appendChild(contentContainer)
          }
        }

        // 添加点击事件
        heading.addEventListener('click', e => {
          // 避免点击锚点链接时触发折叠
          const target = e.target as HTMLElement
          if (target.tagName === 'A' && target.classList.contains('header-anchor')) {
            return
          }

          heading.classList.toggle('collapsed')
          contentContainer.classList.toggle('collapsed')
        })
      }
    })
  }

  return {
    setupHeadingCollapse
  }
}
