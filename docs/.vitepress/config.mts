import { defineConfig } from 'vitepress'
import svgSidebar from './sidebars/svg'
import threeJs from './sidebars/threeJs'

export default defineConfig({
  lang: 'zh-Hans',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: "甜甜小破站",
  description: "A VitePress Site",
  base: '/vitePress_myBlog',
  cleanUrls: true,
  metaChunk: true,
  vite: {
    // Vite 配置选项，告诉rollup是外部引入的
    build: {
      rollupOptions: {
        external: ['THREE']
      },
    },
    server: {
      https: false,
    },
  },
  markdown: {
    theme: 'synthwave-84',
    lineNumbers: true
  },
  themeConfig: {
    lastUpdatedText: '最后更新时间：',
    outline: {
      label: '页面导航',
      level: 'deep'
    },
    logo: '/svg/blogLogo.svg',
    logoLink: '/vitePress_myBlog/pages/home',
    lastUpdated: true,
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
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
          { text: 'svg', link: 'pages/FrontEndKnowledge/mySvg/introduction', activeMatch: '/pages/FrontEndKnowledge/mySvg/' },
          { text: 'three.js', link: 'pages/FrontEndKnowledge/myThree/0-1初识Three', activeMatch: '/pages/FrontEndKnowledge/myThree/' }
        ],
        activeMatch: '/pages/FrontEndKnowledge/mySvg/'
      },
      { text: '关于我', link: 'pages/myInfo' }
    ],
    sidebar: {
      ...svgSidebar,
      ...threeJs,
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
