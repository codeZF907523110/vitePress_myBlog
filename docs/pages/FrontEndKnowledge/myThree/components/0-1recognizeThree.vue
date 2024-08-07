<template>
  <div id="myCanvas"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
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
  camera.position.z = 200
  camera.lookAt(0, 0, 0)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  // 加一个光线凸显立体形状
  const directionalLight = new THREE.DirectionalLight('0xffffff', 1)
  directionalLight.position.set(0, 10, 4)
  directionalLight.intensity = 1
  directionalLight.castShadow = true
  scence.add(directionalLight)

  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
  scence.add(directionalLightHelper)

  // 创建平面
  const planeGeometry = new THREE.PlaneGeometry(300, 300) // 生成平面几何
  const planeMaterial = new THREE.MeshLambertMaterial({
    // 生成材质
    color: '#fff'
  })
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial) // 生成平面网格
  planeMesh.receiveShadow = true // 设置平面网格为接受阴影的投影面
  planeMesh.rotation.x = -0.5 * Math.PI
  planeMesh.position.set(0, -40, 0)
  scence.add(planeMesh) // 添加到场景中

  // 加载贴图
  const textureLoader = new THREE.TextureLoader()
  textureLoader.load(jtt, (texture) => {
    // 创建球体
    const geometry = new THREE.SphereGeometry(30)
    // 球体材质
    const material = new THREE.MeshPhongMaterial({
      // map: texture
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
  background: #fff;
  :deep(canvas) {
    border: 1px solid pink;
  }
}
</style>