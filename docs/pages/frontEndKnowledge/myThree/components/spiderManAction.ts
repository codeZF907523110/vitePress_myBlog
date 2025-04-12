// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import type { AnimationAction, AnimationMixer, Clock, WebGLRenderer } from 'three'

// class SpiderManAction {
//   // 渲染器
//   public renderer: WebGLRenderer
//   // 蜘蛛侠动画编号
//   public spiderManAnimationNo: number | undefined
//   // 场景
//   public scene = new THREE.Scene()
//   // 蜘蛛侠gltf模型
//   public spiderManGltf
//   // 地图模型
//   public cityGltf: any
//   // 是否开始跑了
//   public isRun: boolean = false
//   // 动画播放器
//   public mixer: AnimationMixer
//   // 动画播放实例
//   public clipAction: AnimationAction
//   // 动画计时器
//   public clock: Clock
//   //
//   public frameT: number | undefined
//   // 动画id
//   public requestAnimationFrameId: number | undefined
//   // 相机控制器
//   public controls: any
//   // 相机
//   public camera: any

//   private keys: { [key: string]: boolean } = {}

//   // canvasDom
//   private canvasDom: HTMLCanvasElement | any

//   init = (canvasDom: HTMLCanvasElement) => {
//     this.canvasDom = canvasDom
//     // 创建渲染器
//     this.renderer = new THREE.WebGLRenderer({
//       canvas: this.canvasDom
//     })
//     this.renderer.setPixelRatio(window.devicePixelRatio)
//     // 渲染器能够渲染阴影效果
//     this.renderer.setSize(this.canvasDom.width, this.canvasDom.height)
//     this.renderer.setClearColor('#79c4e0')
//     this.renderer.shadowMap.enabled = true

//     // 辅助观察的坐标系
//     const axesHelper = new THREE.AxesHelper(100)
//     this.scene.add(axesHelper)

//     // 创建相机
//     this.camera = new THREE.PerspectiveCamera(75, this.canvasDom.width / this.canvasDom.height, 0.1, 10000)
//     this.camera.position.set(0, 3, -3)
//     // this.camera.rotateX(150.7)

//     // 环境光
//     const ambient = new THREE.AmbientLight(0xffffff, 0.5)
//     this.scene.add(ambient)

//     // 点光源
//     // const spotLight = new THREE.PointLight('#fff', 1, 10000)
//     // spotLight.position.set(200, 100, 0) // 光照位置
//     // spotLight.castShadow = true // 阴影
//     // spotLight.shadow.radius = 10 // 模糊大小
//     // spotLight.shadow.mapSize.set(1024, 1024) // 阴影分辨率
//     // // spotLight.angle = Math.PI / 3
//     // spotLight.decay = 0
//     // // spotLight.distance = 100
//     // this.scene.add(spotLight)

//     // 背面加一个光线
//     const spotLight1 = new THREE.PointLight('#fff', 20, 10000)
//     spotLight1.position.set(-100, 100, 0) // 光照位置
//     spotLight1.castShadow = true // 阴影
//     spotLight1.shadow.radius = 10 // 模糊大小
//     spotLight1.shadow.mapSize.set(1024, 1024) // 阴影分辨率
//     spotLight1.decay = 0
//     this.scene.add(spotLight1)

//     // const pointLightHelper = new THREE.PointLightHelper(spotLight1, 200)
//     // this.scene.add(pointLightHelper)

//     // 3d模型加载器
//     const loader = new GLTFLoader()
//     loader.setPath('../../../../public/3DModule/')

//     // 地图
//     loader.load('ccity_building_set/scene.gltf', (gltf: any) => {
//       gltf.scene.castShadow = true
//       gltf.scene.receiveShadow = true
//       this.cityGltf = gltf
//       gltf.scene.traverse((obj: any) => {
//         obj.castShadow = true
//         obj.receiveShadow = true
//         for (const item of obj.children) {
//           item.castShadow = true
//           item.receiveShadow = true
//         }
//       })
//       // gltf.scene.position.y = 0
//       gltf.scene.scale.set(0.5, 0.5, 0.5)
//       gltf.scene.position.set(0, 0, 8000)
//       this.scene.add(gltf.scene)
//     })

//     // 蜘蛛侠
//     loader.load('spider-man_nwh/scene.gltf', (gltf: any) => {
//       this.spiderManGltf = gltf
//       this.spiderManGltf.scene.scale.set(20, 20, 20)
//       this.spiderManGltf.scene.castShadow = true
//       this.spiderManGltf.scene.receiveShadow = true
//       this.spiderManGltf.scene.add(this.camera)
//       this.spiderManGltf.scene.position.set(0, 20, 0)
//       this.camera.lookAt(gltf.scene.position.x, gltf.scene.position.y + 50, gltf.scene.position.z)
//       this.spiderManGltf.scene.traverse((obj: any) => {
//         obj.castShadow = true
//         obj.receiveShadow = true
//         for (const item of obj.children) {
//           item.castShadow = true
//           item.receiveShadow = true
//         }
//       })

//       // 包含关键帧动画的模型作为参数创建一个播放器，17：站着不动
//       this.mixer = new THREE.AnimationMixer(this.spiderManGltf.scene)
//       this.scene.add(this.spiderManGltf.scene)

//       this.spiderManAnimation(17)
//       // 骨骼辅助线查看器
//       // const skeletonHelper = new THREE.SkeletonHelper(gltf.scene)
//       // scene.add(skeletonHelper)
//     })

//     this.render()
//   }

//   render = () => {
//     this.renderer && this.renderer.render(this.scene, this.camera)
//     requestAnimationFrame(this.render)
//   }

//   // 碰撞检测
//   checkCollision = (position: THREE.Vector3): boolean => {
//     const raycaster = new THREE.Raycaster()
//     const direction = new THREE.Vector3(0, 0, -1) // 向下检测
//     raycaster.set(position, direction)

//     const objectsToCheck = [this.spiderManGltf.scene, this.cityGltf.scene] // 添加需要检测的物体
//     const intersects = raycaster.intersectObjects(objectsToCheck, true)
//     console.log(intersects, 'intersects')

//     return intersects.length > 0
//   }

//   // 设置蜘蛛侠动画
//   spiderManAnimation = (num: number) => {
//     /* animations:
//       0. 拳头攻击
//       1: 飞踢
//       2. 快跑
//       3. 死亡
//       4. 被打到
//       5. 站着不动后倒立悬挂蛛丝后下来
//       6. 蛛丝拖拽后脚踢
//       7. 蛛丝扔井盖
//       8. 蛛丝弹射飞踢
//       9. 潜行，有bug
//       10. 强力射蛛丝
//       11. 蛛丝拖拽旋转扔出
//       12. 自身旋转加蛛丝扔出
//       13. 站着跳舞
//       14. 和13一样
//       15. 弯着腰没状态
//       16. 蛛丝弹射飞过来
//       17. 站着准备战斗
//       18. 慢跑
//     */

//     this.clipAction?.stop()
//     this.mixer?.stopAllAction()

//     this.clipAction = this.mixer && this.mixer.clipAction(this.spiderManGltf.animations[num])
//     this.clipAction && this.clipAction.play() // 播放动画
//     this.clock = new THREE.Clock()

//     this.loop()
//   }

//   // 动作循环
//   loop = () => {
//     // 销毁上一次的动画，避免内存泄漏
//     cancelAnimationFrame(this.requestAnimationFrameId as number)

//     // 请求新的动画帧
//     this.requestAnimationFrameId = requestAnimationFrame(this.loop)

//     // 检查是否应该运行动画
//     if (this.isRun) {
//       // 计算组合方向向量
//       const direction = new THREE.Vector3(0, 0, 0)
//       if (this.keys['KeyW'] || this.keys['ArrowUp']) direction.z += 1
//       if (this.keys['KeyS'] || this.keys['ArrowDown']) direction.z -= 1
//       if (this.keys['KeyA'] || this.keys['ArrowLeft']) direction.x += 1
//       if (this.keys['KeyD'] || this.keys['ArrowRight']) direction.x -= 1

//       // 应用模型的旋转
//       direction.applyQuaternion(this.spiderManGltf.scene.quaternion)

//       // 规范化方向向量
//       direction.normalize()

//       // 设定移动速度
//       const speed = 20 // 或者其他你想要的速度值

//       // 沿着计算出的方向移动人物
//       const newPosition = this.spiderManGltf.scene.position.clone().add(direction.multiplyScalar(speed))

//       if (!this.checkCollision(newPosition)) {
//         // 如果没有碰撞，更新位置
//         this.spiderManGltf.scene.position.copy(newPosition)
//       }

//       // 获取时间间隔（如果需要的话）
//       this.frameT = this.clock && this.clock.getDelta()

//       // 更新播放器相关的时间（例如混合器）
//       this.mixer && this.mixer.update(this.frameT as number)
//     }
//   }

//   // 慢跑
//   jog = () => {
//     this.isRun = true
//     this.spiderManAnimation(18)
//   }

//   private resetMousePosition() {
//     const canvasRect = this.canvasDom.getBoundingClientRect()
//     const centerX = canvasRect.left + canvasRect.width / 2

//     // 使用 JavaScript 设置鼠标位置
//     const event = new MouseEvent('mousemove', { clientX: centerX })
//     this.canvasDom.dispatchEvent(event)
//   }

//   // 监听键盘事件
//   onAction = () => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       const keyCode = event.code
//       this.keys[keyCode] = true

//       if (['KeyW', 'ArrowUp', 'KeyS', 'ArrowDown', 'KeyA', 'ArrowLeft', 'KeyD', 'ArrowRight'].includes(keyCode)) {
//         if (!this.isRun) {
//           this.jog()
//         }
//       }
//     }

//     const handleKeyUp = (event: KeyboardEvent) => {
//       const keyCode = event.code
//       this.keys[keyCode] = false

//       if (['KeyW', 'ArrowUp', 'KeyS', 'ArrowDown', 'KeyA', 'ArrowLeft', 'KeyD', 'ArrowRight'].includes(keyCode)) {
//         if (!Object.values(this.keys).some(key => key)) {
//           this.isRun = false
//           this.spiderManAnimation(17)
//         }
//       }
//     }

//     const handleMouseMove = (event: MouseEvent) => {
//       // 检测鼠标是否到达屏幕边缘
//       const canvasRect = document.body.offsetWidth - 2
//       if (event.clientX <= 0) {
//         this.spiderManGltf.scene.rotation.y += 0.09
//       } else if (event.clientX >= canvasRect) {
//         this.spiderManGltf.scene.rotation.y -= 0.09
//       } else {
//         if (event.movementX > 0) {
//           this.spiderManGltf.scene.rotation.y -= 0.09
//         } else {
//           this.spiderManGltf.scene.rotation.y += 0.09
//         }
//       }
//     }

//     // 添加事件监听器
//     window.addEventListener('keydown', handleKeyDown)
//     window.addEventListener('keyup', handleKeyUp)
//     this.canvasDom.addEventListener('mousemove', handleMouseMove)

//     // 可选：在组件卸载时移除事件监听器
//     const removeEventListeners = () => {
//       window.removeEventListener('keydown', handleKeyDown)
//       window.removeEventListener('keyup', handleKeyUp)
//       this.canvasDom.removeEventListener('mousemove', handleMouseMove)
//     }

//     // 如果在 Vue 组件中使用，可以在 beforeUnmount 钩子中调用 removeEventListeners
//     // onBeforeUnmount(removeEventListeners);
//   }
// }

// const spiderManAction = new SpiderManAction()
// export default spiderManAction
