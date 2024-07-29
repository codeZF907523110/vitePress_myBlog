<template>
  <div id="myCanvas"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'THREE'
onMounted(() => {
  const myCanvas: any = document.getElementById('myCanvas')
  const scence = new THREE.Scene()
  // 创建球体
  const geometry = new THREE.SphereGeometry(50)

  // 球体材质
  const material = new THREE.MeshBasicMaterial({
    color: 'pink'
  })

  // 球体模型
  const mesh = new THREE.Mesh(geometry, material)

  scence.add(mesh)

  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  camera.position.z = 200

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer()

  myCanvas.appendChild(renderer.domElement)

  renderer.setSize(200, 200)
  renderer.setClearColor('#fff')

  renderer.render(scence, camera)
})
</script>

<style lang="less" scoped>
#myCanvas {
  background: #fff;
  :deep(canvas) {
    border: 1px solid pink;
  }
}
</style>