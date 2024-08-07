<template>
  <canvas width="800" height="800" id="myCanvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import world from '/image/world.png'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

onMounted(() => {
  const myCanvas: any = document.getElementById('myCanvas')
  // 创建场景
  const scence = new THREE.Scene()

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    canvas: myCanvas
  })
  // 渲染器能够渲染阴影效果
  renderer.setSize(myCanvas.width, myCanvas.height)
  renderer.setClearColor('#000')
  renderer.shadowMap.enabled = true

  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, myCanvas.width / myCanvas.height, 0.1, 1000)
  camera.position.set(5, 5, 5)
  camera.lookAt(0, 0, 0)

  // // 创建控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  // 加一个光线凸显立体形状
  const light = new THREE.DirectionalLight('0xffffff', 1)
  light.position.set(0, 10, 4) // 光照位置
  light.intensity = 1 // 光照强度
  light.castShadow = true // 阴影
  light.shadow.radius = 15 // 模糊大小
  light.shadow.mapSize.set(1024, 1024) // 阴影分辨率
  scence.add(light)

  // 光源辅助线
  const lightHelper = new THREE.DirectionalLightHelper(light)
  scence.add(lightHelper)

  //辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(100)
  scence.add(axesHelper)

  // 创建平面
  const planeGeometry = new THREE.PlaneGeometry(10, 10) // 生成平面几何
  // 生成材质
  const planeMaterial = new THREE.MeshLambertMaterial({ color: '#fff' })
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial) // 生成平面网格
  planeMesh.receiveShadow = true // 设置平面网格为接受阴影的投影面
  planeMesh.rotation.x = -0.5 * Math.PI
  planeMesh.position.set(0, -3, 0)
  scence.add(planeMesh) // 添加到场景中

  // 加载贴图
  const textureLoader = new THREE.TextureLoader()
  textureLoader.load(world, (texture) => {
    // 创建球体
    const geometry = new THREE.SphereGeometry(1)
    // 球体材质
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: '#fff',
      transparent: true,
      depthTest: false
    })
    // 球体模型
    const mesh = new THREE.Mesh(geometry, material)
    // 可以接收阴影
    mesh.receiveShadow = true
    // 模型可以产生阴影
    mesh.castShadow = true

    scence.add(mesh)
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