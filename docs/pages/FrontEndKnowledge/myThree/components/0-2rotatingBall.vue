<template>
  <canvas width="500" height="500" id="myCanvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'THREE'
import jtt from '../../../../assets/image/jtt.jpg'

onMounted(() => {
  const myCanvas: any = document.getElementById('myCanvas')
  const scence = new THREE.Scene()
  // 创建球体
  const geometry = new THREE.SphereGeometry(100)

  // 加一个光线凸显立体形状
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0)
  // directionalLight.position.set(80, 100, 50)
  // scence.add(directionalLight)
  // directionalLight.intensity = 5

  // 加载贴图
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(jtt, () => {
    // 球体材质

    const material = new THREE.MeshBasicMaterial({
      map: texture
    })

    // 球体模型
    const mesh = new THREE.Mesh(geometry, material)

    scence.add(mesh)

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, myCanvas.width / myCanvas.height, 0.1, 1000)
    camera.position.z = 200

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      canvas: myCanvas
    })
    renderer.setSize(myCanvas.width, myCanvas.height)
    renderer.setClearColor('#fff')

    const render = () => {
      renderer.render(scence, camera)
      mesh.rotateY(0.01)
      requestAnimationFrame(render)
    }
    render()
  })
})
</script>

<style lang="less" scoped>
#myCanvas {
  border: 1px solid pink;
}
</style>