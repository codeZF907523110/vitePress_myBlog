import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "甜甜小破站",
  description: "A VitePress Site",
  base: '/vitePress_myBlog',
  themeConfig: {
    logo: '/assets/svg/blogLogo.svg',
    logoLink: '/vitePress_myBlog/pages/home',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: '主页', link: 'pages/home' },
      { text: '前端',  items: [
          { text: 'svg', link: 'pages/FrontEndKnowledge/mySvg/introduction', activeMatch: '/pages/FrontEndKnowledge/mySvg/' }
        ],
        activeMatch: '/pages/FrontEndKnowledge/mySvg/'
      },
      { text: '关于我', link: 'pages/myInfo' }
    ],
    sidebar: {
      'pages/FrontEndKnowledge/mySvg/': [
        {
          text: 'svg',
          collapsed: false,
          items: [
            { text: '什么是svg', link: '/pages/FrontEndKnowledge/mySvg/introduction' },
            { text: '制作svg动画', link: '/pages/FrontEndKnowledge/mySvg/svgAnimation' },
            { text: 'svg动画实战', link: '/pages/FrontEndKnowledge/mySvg/svgAnimationCctualCombat' },
            { text: 'path元素详解', link: '/pages/FrontEndKnowledge/mySvg/svgPath' }
          ]
        }
      ],
      'pages/myInfo': [
        {
          text: '关于我'
        }
      ]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
