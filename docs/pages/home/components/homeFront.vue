<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import * as THREE111 from 'three'
import petal0 from '/image/petal0.png'
import petal1 from '/image/petal1.png'
import petal2 from '/image/petal2.png'
import petal3 from '/image/petal3.png'
import petal4 from '/image/petal4.png'
import petal5 from '/image/petal5.png'

onMounted(() => {
  const dom = document.createElement('div')
  dom.classList.add('petal-panel')

  const scene = new THREE111.Scene()
  /**
   * 花瓣分组
   */
  const petal = new THREE111.Group()

  const width = window.innerWidth
  const height = window.innerHeight
  //窗口宽高比
  const k = width / height
  //三维场景的显示的上下范围
  const s = 200

  const camera = new THREE111.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  camera.position.set(0, 200, 500)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE111.WebGLRenderer()
  //设置渲染区域尺寸
  renderer.setSize(width, height)
  //设置背景颜色
  renderer.setClearColor(0xffffff, 0)
  //body元素中插入canvas对象
  dom.appendChild(renderer.domElement)
  document.body.appendChild(dom)

  var textureTree0 = new THREE111.TextureLoader().load(petal0)
  var textureTree1 = new THREE111.TextureLoader().load(petal1)
  var textureTree2 = new THREE111.TextureLoader().load(petal2)
  var textureTree3 = new THREE111.TextureLoader().load(petal3)
  var textureTree4 = new THREE111.TextureLoader().load(petal4)
  var textureTree5 = new THREE111.TextureLoader().load(petal5)
  var imageList = [textureTree0, textureTree1, textureTree2, textureTree3, textureTree4, textureTree5]

  for (let i = 0; i < 400; i++) {
    var spriteMaterial = new THREE111.SpriteMaterial({
      rotation: Math.PI / 4,
      map: imageList[Math.floor(Math.random() * imageList.length)] //设置精灵纹理贴图
    })
    var sprite = new THREE111.Sprite(spriteMaterial)
    sprite.scale.set(Math.floor(Math.random() * (40 - 15 + 1)) + 15, Math.floor(Math.random() * (40 - 15 + 1)) + 15, 1)
    sprite.position.set(Math.random() * 2000, Math.random() * 2000, 0)
    sprite.Incremental = 0.5 + Math.random() * 0.5 //自定义随机x轴速度
    petal.add(sprite)
  }
  scene.add(petal)

  function render() {
    petal.children.forEach((sprite) => {
      sprite.material.rotation -= 0.01
      sprite.rotation.x += 0.1
      sprite.position.y -= 0.5
      sprite.position.x -= sprite.Incremental

      // if (sprite.position.y < -400) {
      //   sprite.position.y = 800
      // }
      // if (sprite.position.x > 1000) {
      //   sprite.position.x = -1000
      // }
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  render()
})

onUnmounted(() => {
  const dom = document.getElementsByClassName('petal-panel')[0]
  document.body.removeChild(dom)
})
</script>

<style lang="less">
.petal-panel {
  width: 100%;
  height: 100%;
  // overflow: hidden;
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