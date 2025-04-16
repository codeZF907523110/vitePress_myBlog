<template>
  <div class="robot-container">
    <div ref="robotCanvas" class="robot-canvas"></div>
    <div v-if="showDialog" class="robot-dialog">
      <div class="dialog-content">
        <p>{{ dialogMessage }}</p>
      </div>
      <div class="dialog-arrow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

  // 引用和响应式变量
  const robotCanvas = ref<HTMLElement | null>(null)
  const showDialog = ref(false)
  const dialogMessage = ref('你好！我是你的3D机器人助手！')

  // Three.js 变量
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let robot: THREE.Object3D | null = null
  let mixer: THREE.AnimationMixer | null = null
  let animations: THREE.AnimationClip[] = []
  let clock = new THREE.Clock()
  let controls: OrbitControls
  let animationFrameId: number
  let isInteracting = false // 添加交互状态标记

  // 初始化Three.js场景
  const initThree = () => {
    if (!robotCanvas.value) return

    // 创建场景
    scene = new THREE.Scene()
    scene.background = null

    // 创建相机
    camera = new THREE.PerspectiveCamera(45, robotCanvas.value.clientWidth / robotCanvas.value.clientHeight, 0.1, 1000)
    // 调整相机位置，确保机器人完全可见
    camera.position.set(0, 0.2, 4) // 调整相机位置，拉远一些
    camera.lookAt(0, 0, 0) // 确保相机看向场景中心

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(robotCanvas.value.clientWidth, robotCanvas.value.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    robotCanvas.value.appendChild(renderer.domElement)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0)
    directionalLight.position.set(5, 10, 7.5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // 添加额外的前方光源，使机器人正面更亮
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.8)
    frontLight.position.set(0, 0, 5)
    scene.add(frontLight)

    // 添加彩色补光，使用更丰富的色调
    const blueLight = new THREE.DirectionalLight(0x4488ff, 0.7)
    blueLight.position.set(-3, 2, 3)
    scene.add(blueLight)

    // 添加紫色调补光
    const purpleLight = new THREE.DirectionalLight(0xaa44ff, 0.4)
    purpleLight.position.set(3, 1, 2)
    scene.add(purpleLight)

    // 添加暖色调补光
    const bottomLight = new THREE.DirectionalLight(0xff9966, 0.6)
    bottomLight.position.set(0, -5, 2)
    scene.add(bottomLight)

    // 添加控制器
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 5
    // 禁用控制器，我们将使用自定义的旋转逻辑
    controls.enabled = false

    // 加载机器人模型
    loadRobotModel()

    // 添加事件监听器
    window.addEventListener('resize', onWindowResize)

    // 使用document级别的事件监听，扩大交互范围
    document.addEventListener('click', onDocumentClick)
    document.addEventListener('mousemove', onDocumentMouseMove)

    // 添加拖动状态监听
    robotCanvas.value.addEventListener('mousedown', onDragStart)
    document.addEventListener('mouseup', onDragEnd)

    // 开始动画循环
    animate()
  }

  // 加载机器人模型
  const loadRobotModel = () => {
    const loader = new GLTFLoader()

    loader.load(
      'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
      gltf => {
        robot = gltf.scene
        // 调整机器人大小和位置，确保完全可见
        robot.scale.set(0.4, 0.4, 0.4) // 进一步缩小机器人尺寸
        robot.position.y = -1.2 // 大幅降低机器人位置
        robot.position.z = 0.3 // 稍微向前调整

        // 确保机器人面向用户
        robot.rotation.y = 0 // 修改为0，让机器人面向用户

        // 增强机器人的金属质感
        robot.traverse(child => {
          if (child instanceof THREE.Mesh && child.material) {
            // 处理单个材质
            if (child.material instanceof THREE.Material) {
              enhanceMaterial(child.material)
            }
            // 处理材质数组
            else if (Array.isArray(child.material)) {
              child.material.forEach(mat => enhanceMaterial(mat))
            }
          }
        })

        robot.castShadow = true
        robot.receiveShadow = true
        scene.add(robot)

        // 找到机器人的头部
        robot.traverse(child => {
          if (child.name && child.name.toLowerCase().includes('head')) {
            // 标记头部组件，以便后续只旋转头部
            child.userData.isHead = true
          }
        })

        // 设置动画
        mixer = new THREE.AnimationMixer(robot)
        animations = gltf.animations

        // 播放默认动画（空闲状态）
        if (animations.length > 0) {
          const idleAnim = animations.find(anim => anim.name === 'Idle') || animations[0]
          const action = mixer.clipAction(idleAnim)
          action.play()
        }
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      error => {
        console.error('加载模型时出错:', error)
      }
    )
  }

  // 增强材质的金属质感
  const enhanceMaterial = material => {
    if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
      // 保持适中的金属度
      material.metalness = Math.min(material.metalness + 0.3, 0.85)

      // 适当的粗糙度
      material.roughness = Math.max(material.roughness - 0.2, 0.15)

      // 适中的反射强度
      material.envMapIntensity = 1.2

      // 更加丰富多彩的配色方案
      if (material.color) {
        const color = material.color.getHSL({ h: 0, s: 0, l: 0 })

        // 根据材质名称和原始颜色分配不同的颜色
        if (material.name && material.name.includes('eye')) {
          // 眼睛使用明亮的蓝色并添加发光效果
          material.color.setHSL(0.6, 1.0, 0.7)
          material.emissive = new THREE.Color(0x3366ff)
          material.emissiveIntensity = 0.7
        } else if (material.name && material.name.includes('joint')) {
          // 关节部分使用橙色
          material.color.setHSL(0.08, 0.8, 0.5)
        } else if (material.name && material.name.includes('head')) {
          // 头部使用亮银色
          material.color.setHSL(0.1, 0.05, 0.85)
          material.metalness = 0.9
        } else if (
          material.name &&
          (material.name.includes('hand') || material.name.includes('Hand') || material.name.includes('glove'))
        ) {
          // 手套部分使用鲜红色
          material.color.setHSL(0.0, 0.85, 0.5)
          material.metalness = 0.4
          material.roughness = 0.3
        } else if (
          material.name &&
          (material.name.includes('foot') ||
            material.name.includes('Foot') ||
            material.name.includes('shoe') ||
            material.name.includes('boot'))
        ) {
          // 鞋子部分使用深蓝色
          material.color.setHSL(0.6, 0.8, 0.3)
          material.metalness = 0.6
        } else if (
          material.name &&
          (material.name.includes('body') || material.name.includes('torso') || material.name.includes('chest'))
        ) {
          // 身体主体使用亮蓝色
          material.color.setHSL(0.55, 0.7, 0.6)
        } else if (color.l < 0.2) {
          // 深色部分使用深紫色
          material.color.setHSL(0.75, 0.7, 0.25)
        } else if (color.l < 0.4) {
          // 中低亮度部分使用蓝绿色
          material.color.setHSL(0.5, 0.65, 0.45)
        } else if (color.l < 0.6) {
          // 中高亮度部分使用淡紫色
          material.color.setHSL(0.7, 0.4, 0.65)
        } else if (color.l < 0.8) {
          // 较亮部分使用金色
          material.color.setHSL(0.12, 0.8, 0.75)
        } else {
          // 最亮部分使用珍珠白
          material.color.setHSL(0.1, 0.05, 0.95)
        }

        // 为手臂和腿部添加渐变色效果
        if (material.name) {
          if (material.name.includes('arm') && !material.name.includes('hand')) {
            // 手臂使用蓝紫色调
            material.color.setHSL(0.65, 0.6, 0.5)
          } else if (material.name.includes('leg') && !material.name.includes('foot')) {
            // 腿部使用绿色调
            material.color.setHSL(0.35, 0.6, 0.4)
          } else if (material.name.includes('shoulder')) {
            // 肩部使用金色
            material.color.setHSL(0.15, 0.8, 0.6)
          } else if (material.name.includes('antenna') || material.name.includes('ear')) {
            // 天线或耳朵使用亮紫色
            material.color.setHSL(0.8, 0.7, 0.6)
            material.emissive = new THREE.Color(0x9933ff)
            material.emissiveIntensity = 0.3
          }
        }
      }
    }
  }

  // 窗口大小调整处理
  const onWindowResize = () => {
    if (!robotCanvas.value) return

    camera.aspect = robotCanvas.value.clientWidth / robotCanvas.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(robotCanvas.value.clientWidth, robotCanvas.value.clientHeight)
  }

  // 检查鼠标是否在机器人容器内
  const isMouseInRobotContainer = (event: MouseEvent): boolean => {
    if (!robotCanvas.value) return false

    const rect = robotCanvas.value.getBoundingClientRect()
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    )
  }

  // 文档鼠标移动事件处理
  const onDocumentMouseMove = (event: MouseEvent) => {
    if (!robot || isInteracting) return // 如果正在交互中，不处理鼠标移动

    // 计算鼠标在屏幕上的归一化坐标
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // 检查鼠标是否在机器人容器内
    const isInContainer = isMouseInRobotContainer(event)

    // 计算屏幕中心和鼠标偏移
    const screenCenterX = windowWidth / 2

    // 计算机器人容器的位置
    const containerRect = robotCanvas.value?.getBoundingClientRect()
    const containerCenterX = containerRect ? containerRect.left + containerRect.width / 2 : screenCenterX

    if (robot) {
      // 查找头部组件
      let headPart: THREE.Object3D | null = null
      robot.traverse(child => {
        if (child.userData && child.userData.isHead) {
          headPart = child
        }
      })

      // 计算目标旋转角度
      let targetRotationY = 0

      if (!isInContainer) {
        // 计算鼠标相对于容器中心的位置
        const relativeX = event.clientX - containerCenterX

        // 根据鼠标与容器中心的相对位置计算旋转角度
        // 添加最大旋转角度限制
        const maxRotationY = Math.PI * 0.2 // 限制最大旋转角度为36度
        const rawRotation = (relativeX / screenCenterX) * Math.PI * 0.3
        targetRotationY = Math.max(-maxRotationY, Math.min(maxRotationY, rawRotation))
      }

      // 平滑旋转整个机器人身体
      robot.rotation.y += (targetRotationY - robot.rotation.y) * 0.2

      if (headPart) {
        // 保存原始旋转
        const originalRotation = {
          x: headPart.rotation.x,
          y: headPart.rotation.y,
          z: headPart.rotation.z
        }

        // 计算头部应该看向的方向
        const maxRotation = 0.5 // 最大旋转角度（弧度）

        // 计算垂直旋转
        let rotationX = 0

        if (!isInContainer) {
          // 计算鼠标相对于容器中心的垂直位置
          const containerCenterY = containerRect ? containerRect.top + containerRect.height / 2 : windowHeight / 2
          const relativeY = containerCenterY - event.clientY

          // 根据鼠标与容器中心的垂直相对位置计算旋转角度
          rotationX = Math.max(-maxRotation, Math.min(maxRotation, (relativeY / windowHeight) * 2))
        }

        // 应用旋转 - 使用线性插值实现平滑过渡
        headPart.rotation.x += (originalRotation.x + rotationX - headPart.rotation.x) * 0.2
      }
    }
  }

  // 文档点击事件处理
  const onDocumentClick = (event: MouseEvent) => {
    // 只处理机器人容器内的点击
    if (!isMouseInRobotContainer(event)) return

    if (!robot) return

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // 计算鼠标在画布中的归一化坐标
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(robot, true)

    // 放宽点击判定，只要点击在容器内就触发交互
    if (intersects.length > 0 || isMouseInRobotContainer(event)) {
      // 点击到了机器人，显示对话框
      dialogMessage.value = '你好！有什么我可以帮助你的吗？'
      showDialog.value = true

      // 播放Wave动画
      if (mixer && animations.length > 0 && !isInteracting) {
        isInteracting = true // 设置交互状态

        // 停止当前动画
        mixer.stopAllAction()

        // 播放Wave动画
        const waveAnim =
          animations.find(anim => anim.name === 'Wave') ||
          animations.find(anim => anim.name.includes('Wave')) ||
          animations[0]
        const action = mixer.clipAction(waveAnim)
        action.setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true
        action.play()

        // 动画结束后恢复Idle动画
        setTimeout(() => {
          mixer.stopAllAction()
          const idleAnim = animations.find(anim => anim.name === 'Idle') || animations[0]
          const idleAction = mixer.clipAction(idleAnim)
          idleAction.play()
          isInteracting = false // 重置交互状态
        }, 2000)
      }

      // 3秒后隐藏对话框
      setTimeout(() => {
        showDialog.value = false
      }, 3000)
    }
  }

  // 拖动开始处理
  const onDragStart = (event: MouseEvent) => {
    if (!isMouseInRobotContainer(event)) return
    isDragging = true
    // 拖动时暂时禁用头部跟随鼠标
  }

  // 拖动结束处理
  const onDragEnd = () => {
    isDragging = false
  }

  // 动画循环
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)

    // 更新控制器
    controls.update()

    // 更新动画混合器
    if (mixer) {
      const delta = clock.getDelta()
      mixer.update(delta)
    }

    // 渲染场景
    renderer.render(scene, camera)
  }

  // 组件挂载时初始化
  onMounted(() => {
    initThree()
  })

  // 组件卸载前清理
  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }

    window.removeEventListener('resize', onWindowResize)
    document.removeEventListener('click', onDocumentClick)
    document.removeEventListener('mousemove', onDocumentMouseMove)

    // 移除拖动事件监听器
    if (robotCanvas.value) {
      robotCanvas.value.removeEventListener('mousedown', onDragStart)
    }
    document.removeEventListener('mouseup', onDragEnd)

    if (renderer && robotCanvas.value) {
      robotCanvas.value.removeChild(renderer.domElement)
      renderer.dispose()
    }
  })
</script>

<style scoped>
  .robot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 200px; /* 进一步增加宽度 */
    height: 260px; /* 进一步增加高度 */
    z-index: 100;
    /* 添加调试边框，可以在完成后移除 */
    /* border: 1px solid rgba(0, 0, 0, 0.1); */
    cursor: grab; /* 添加抓取光标，表示可拖动 */
  }

  .robot-container:active {
    cursor: grabbing; /* 拖动时改变光标样式 */
  }

  .robot-canvas {
    width: 100%;
    height: 100%;
    overflow: visible; /* 保持visible，防止机器人被截断 */
  }

  .robot-dialog {
    position: absolute;
    top: -70px;
    right: 10px;
    transform: none;
    background-color: white;
    border-radius: 8px;
    padding: 10px 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 200px;
    z-index: 10;
  }

  .dialog-content {
    font-size: 14px;
    color: #333;
  }

  .dialog-arrow {
    position: absolute;
    bottom: -10px;
    right: 20px;
    left: auto;
    transform: none;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
  }
</style>
