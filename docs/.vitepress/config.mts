import { defineConfig } from 'vitepress'
import svgSidebar from './sidebars/frontEndKnowledge/svg'
import threeJs from './sidebars/frontEndKnowledge/threeJs'
import learningRecord from './sidebars/frontEndKnowledge/learningRecord'
import writtenQuestion from './sidebars/frontEndKnowledge/writtenQuestion.ts'
import viteConfig from './vite.config.js'
import { reactSidebar } from './sidebars/faceClassic'

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
    lastUpdated: {
      text: '最后更新时间'
    },
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
            link: 'pages/FrontEndKnowledge/learningRecord/learningRecordHome',
            activeMatch: '/pages/FrontEndKnowledge/learningRecord/'
          },
          {
            text: '前端常见手写题',
            link: 'pages/FrontEndKnowledge/writtenQuestion/01_手写Promise的API',
            activeMatch: '/pages/FrontEndKnowledge/writtenQuestion/'
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
      ...writtenQuestion,
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
