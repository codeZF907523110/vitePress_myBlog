---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

# hero:
#   name: '甜甜小破站'
#   text: ''
#   tagline: 在小小的代码里面挖呀挖呀挖！！！
#   image:
#     # src: /svg/blogLogo.svg
#     alt: icenet
#   actions:
#     - theme: brand
#       text: 关于我
#       link: /markdown-examples
# - theme: alt
#   text: API Examples
#   link: /api-examples

# features:
#   - title: vue
#     details: 学习vue生态链
#     link: pages/frontEnd
#   - title: react
#     details: 学习react生态链
#   - title: js
#     details: 学习原生js，用原生js实现各种有趣的东西
#   - title: nodejs
#     details: 使用nodejs及框架，express、koa等
#   - title: svg
#     details: 学习svg图标的开发及svg动画的制作
#   - title: canvas
#     details: canva实现前端图形化开发的制作，实现2d及3d页面及图形的开发
#   - title: web3d
#     details: webgl、webgpu、three.js，让我们一起来学习web3d的开发
#   - title: 关于我
#     details: 个人信息、简历
sidebar: false
---

<!-- <girlRobot /> -->
<robot />
<homeFront />
<homePage />

<script lang="ts" setup>
  import homePage from './components/homePage.vue'
  import homeFront from './components/homeFront.vue'
  import robot from './components/robot.vue'
  // import girlRobot from './components/girlRobot.vue'
</script>
<style lang="less">
  .is-home {
    padding-top: 0!important;
    .VPHome{ 
      margin-bottom: 0!important
    }
  }
  
  .VPFooter {
    display: none!important;
  }

  html, body {
    overflow: hidden !important;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .VPContent {
    height: 100vh;
    overflow: hidden;
  }
</style>
