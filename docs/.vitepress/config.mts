import { defineConfig } from 'vitepress'
import svgSidebar from './sidebars/svg'
import threeJs from './sidebars/threeJs'
import learningRecord from './sidebars/learningRecord'
import writtenQuestion from './sidebars/writtenQuestion'
import viteConfig from './vite.config.js'

export default defineConfig({
  lang: 'zh-Hans',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: '甜甜小破站',
  description: 'A VitePress Site',
  base: '/vitePress_myBlog',
  cleanUrls: true,
  metaChunk: true,
  vite: viteConfig,
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
      {
        text: '前端学习笔记',
        items: [
          {
            text: 'svg',
            link: 'pages/FrontEndKnowledge/mySvg/introduction',
            activeMatch: '/pages/FrontEndKnowledge/mySvg/'
          },
          {
            text: 'three.js',
            link: 'pages/FrontEndKnowledge/myThree/0-1初识Three',
            activeMatch: '/pages/FrontEndKnowledge/myThree/'
          },
          {
            text: '每日记录',
            link: 'pages/FrontEndKnowledge/learningRecord/learningRecordHome',
            activeMatch: '/pages/FrontEndKnowledge/learningRecord/'
          },
          {
            text: '前端常见手写题',
            link: 'pages/FrontEndKnowledge/writtenQuestion/01_手写Promise的API',
            activeMatch: '/pages/FrontEndKnowledge/writtenQuestion/'
          }
        ],
        activeMatch: '/pages/FrontEndKnowledge/mySvg/'
      },
      { text: '关于我', link: 'pages/myInfo' }
    ],
    sidebar: {
      ...svgSidebar,
      ...threeJs,
      ...learningRecord,
      ...writtenQuestion,
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
