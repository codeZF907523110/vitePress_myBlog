<template>
  <div class="mouse-tracker"></div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import * as THREE from 'three'
  import petal0 from '/image/petal0.png'
  import petal1 from '/image/petal1.png'
  import petal2 from '/image/petal2.png'
  import petal3 from '/image/petal3.png'
  import petal4 from '/image/petal4.png'
  import petal5 from '/image/petal5.png'

  // 添加鼠标位置追踪
  const mouse = {
    x: 0,
    y: 0,
    radius: 250, // 鼠标影响半径
    prevX: 0, // 记录前一帧鼠标位置
    prevY: 0,
    speedX: 0, // 鼠标移动速度
    speedY: 0,
    isActive: false, // 添加鼠标活动状态标记
    pulseStrength: 0, // 添加脉冲强度
    pulsePhase: 0 // 脉冲相位
  }

  // 鼠标移动事件处理函数
  function handleMouseMove(event: MouseEvent) {
    // 计算鼠标移动速度
    mouse.speedX = event.clientX - mouse.x
    mouse.speedY = event.clientY - mouse.y

    mouse.prevX = mouse.x
    mouse.prevY = mouse.y
    mouse.x = event.clientX
    mouse.y = event.clientY
    mouse.isActive = true // 鼠标移动时激活
  }

  // 添加鼠标进入离开事件处理
  function handleMouseEnter() {
    mouse.isActive = true
  }

  function handleMouseLeave() {
    mouse.isActive = false
  }

  onMounted(() => {
    // 添加鼠标移动事件监听到document
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    const dom = document.createElement('div')
    dom.classList.add('petal-panel')

    const scene = new THREE.Scene()
    /**
     * 花瓣分组
     */
    const petal = new THREE.Group()

    const width = window.innerWidth
    const height = window.innerHeight
    //窗口宽高比
    const k = width / height
    //三维场景的显示的上下范围
    const s = 250

    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    camera.position.set(0, 200, 500)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer()
    //设置渲染区域尺寸
    renderer.setSize(width, height)
    //设置背景颜色
    renderer.setClearColor(0xffffff, 0)
    //body元素中插入canvas对象
    dom.appendChild(renderer.domElement)
    document.body.appendChild(dom)

    var textureTree0 = new THREE.TextureLoader().load(petal0)
    var textureTree1 = new THREE.TextureLoader().load(petal1)
    var textureTree2 = new THREE.TextureLoader().load(petal2)
    var textureTree3 = new THREE.TextureLoader().load(petal3)
    var textureTree4 = new THREE.TextureLoader().load(petal4)
    var textureTree5 = new THREE.TextureLoader().load(petal5)
    var imageList = [textureTree0, textureTree1, textureTree2, textureTree3, textureTree4, textureTree5]

    for (let i = 0; i < 500; i++) {
      var spriteMaterial = new THREE.SpriteMaterial({
        rotation: Math.PI * Math.random(),
        map: imageList[Math.floor(Math.random() * imageList.length)]
      })
      var sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(Math.floor(Math.random() * (20 - 8 + 1)) + 8, Math.floor(Math.random() * (20 - 8 + 1)) + 8, 1)

      const gridX = 20
      const gridY = 15
      const cellWidth = 2000 / gridX
      const cellHeight = 1600 / gridY

      const gridPosX = (i % gridX) * cellWidth + Math.random() * cellWidth - 1000
      const gridPosY = (Math.floor(i / gridX) % gridY) * cellHeight + Math.random() * cellHeight

      sprite.position.set(gridPosX, gridPosY, 0)

      sprite.Incremental = 0.2 + Math.random() * 0.3
      sprite.rotateSpeed = (Math.random() - 0.5) * 0.015
      sprite.swingSpeed = (Math.random() - 0.5) * 0.008
      sprite.swingAmount = Math.random() * Math.PI
      sprite.timeOffset = Math.random() * Math.PI * 2
      sprite.fallSpeed = 0.2 + Math.random() * 0.15

      petal.add(sprite)
    }
    scene.add(petal)

    function render() {
      const time = Date.now() * 0.001

      // 鼠标速度衰减
      mouse.speedX *= 0.95
      mouse.speedY *= 0.95

      // 更新脉冲效果
      mouse.pulsePhase += 0.05
      mouse.pulseStrength = Math.sin(mouse.pulsePhase) * 0.5 + 0.5

      petal.children.forEach(sprite => {
        // 计算花瓣与鼠标的距离
        const dx = sprite.position.x - (mouse.x - window.innerWidth / 2)
        const dy = sprite.position.y - (window.innerHeight / 2 - mouse.y)
        const distance = Math.sqrt(dx * dx + dy * dy)

        // 如果花瓣在鼠标影响范围内且鼠标处于活动状态
        if (distance < mouse.radius && mouse.isActive) {
          // 计算基于距离的力度，使用平滑的圆形衰减
          const force = Math.pow((mouse.radius - distance) / mouse.radius, 2) * 2.0

          // 添加脉冲效果，即使鼠标不移动也有效果
          const pulseEffect = mouse.pulseStrength * 0.3

          // 计算推力方向（从鼠标指向花瓣）
          const angle = Math.atan2(dy, dx)

          // 应用推力，考虑鼠标移动速度和脉冲效果
          const speedFactor = Math.sqrt(mouse.speedX * mouse.speedX + mouse.speedY * mouse.speedY) * 0.05
          const totalForce = force * (1.0 + speedFactor + pulseEffect)

          sprite.position.x += Math.cos(angle) * totalForce
          sprite.position.y += Math.sin(angle) * totalForce

          // 根据距离中心的远近调整旋转效果
          const rotationEffect = force * (0.02 + speedFactor * 0.01 + pulseEffect * 0.01)
          sprite.material.rotation += rotationEffect
        } else {
          // 正常旋转
          sprite.material.rotation += sprite.rotateSpeed
        }

        sprite.position.x += Math.sin(time + sprite.timeOffset) * sprite.swingSpeed
        sprite.position.y -= sprite.fallSpeed
        sprite.position.x -= sprite.Incremental

        if (sprite.position.y < -400) {
          sprite.position.y = 800
          sprite.position.x = Math.random() * 2400 - 1200
          sprite.Incremental = 0.2 + Math.random() * 0.3
          sprite.fallSpeed = 0.2 + Math.random() * 0.15
        }
        if (sprite.position.x < -1200) {
          sprite.position.x = 1200
          sprite.position.y = Math.random() * 800
        }
      })

      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }

    render()
  })

  onUnmounted(() => {
    const dom = document.getElementsByClassName('petal-panel')[0]
    // 移除事件监听
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseenter', handleMouseEnter)
    document.removeEventListener('mouseleave', handleMouseLeave)
    document.body.removeChild(dom)
  })
</script>

<style lang="less">
  .mouse-tracker {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    pointer-events: none;
  }

  .petal-panel {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 100;
    pointer-events: none;
    canvas {
      background: rgba(255, 255, 255, 0);
      pointer-events: none;
    }
  }
</style>
