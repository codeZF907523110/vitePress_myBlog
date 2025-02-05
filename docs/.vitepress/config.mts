import { defineConfig } from 'vitepress'
import { svgSidebar, threeJs, learningRecord } from './sidebars/frontEndKnowledge'
import { reactSidebar } from './sidebars/faceClassic'
import viteConfig from './vite.config.js'

export default defineConfig({
  lang: 'zh-Hans',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: '甜甜小破站',
  description: 'A VitePress Site',
  base: '/',
  cleanUrls: true,
  metaChunk: true,
  vite: viteConfig,
  markdown: {
    theme: 'dark-plus', // markdown代码主题
    lineNumbers: true // 代码是否展示行序号
  },
  themeConfig: {
    lastUpdatedText: '最后更新时间：',
    outline: {
      label: '页面导航',
      level: 'deep'
    },
    logo: '/svg/blogLogo.svg',
    logoLink: '/pages/home',
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
        text: '学习笔记',
        items: [
          {
            text: 'svg',
            link: 'pages/frontEndKnowledge/mySvg/introduction',
            activeMatch: '/pages/frontEndKnowledge/mySvg/'
          },
          {
            text: 'three.js',
            link: 'pages/frontEndKnowledge/myThree/0-1初识Three',
            activeMatch: '/pages/frontEndKnowledge/myThree/'
          },
          {
            text: '每日记录',
            link: 'pages/frontEndKnowledge/learningRecord/learningRecordHome',
            activeMatch: '/pages/frontEndKnowledge/learningRecord/'
          }
        ],
        activeMatch: '/pages/frontEndKnowledge'
      },
      {
        text: '前端面经记录',
        items: [
          {
            text: 'React',
            link: 'pages/faceClassic/react/index',
            activeMatch: '/pages/faceClassic/react'
          }
        ],
        activeMatch: '/pages/faceClassic/'
      },
      { text: '关于我', link: 'pages/myInfo' }
    ],
    sidebar: {
      ...svgSidebar,
      ...threeJs,
      ...learningRecord,
      ...reactSidebar,
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
