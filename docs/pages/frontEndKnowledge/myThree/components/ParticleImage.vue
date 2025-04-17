<template>
  <div class="particle-container" ref="container"></div>
</template>

<script setup>
  import * as THREE from 'three'
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import { gsap } from 'gsap'
  import BlogBackGround from '../../../../public/image/BlogBackGround.jpg'

  const container = ref(null)
  let scene, camera, renderer, particles, imageTexture, imageMesh
  let animationFrameId
  let animationPhase = 0 // 0: 完整图片, 1: 图片到粒子过渡, 2: 粒子飘散消失
  let animationProgress = 0
  let particleGroup
  let clock

  onMounted(() => {
    initThree()
    clock = new THREE.Clock()
    animate()
    window.addEventListener('resize', onWindowResize)

    // 5秒后开始动画
    setTimeout(() => {
      startDisintegration()
    }, 2000)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize)
    cancelAnimationFrame(animationFrameId)
    if (renderer) {
      renderer.dispose()
    }
  })

  function initThree() {
    const width = container.value.clientWidth || window.innerWidth
    const height = container.value.clientHeight || window.innerHeight

    // 初始化场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // 初始化相机
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000)
    camera.position.z = 100

    // 初始化渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.value.appendChild(renderer.domElement)

    // 使用纹理加载器加载指定图片
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      BlogBackGround,
      texture => {
        imageTexture = texture
        // 先显示完整图片
        showFullImage()
        // 预先创建粒子系统，但先不显示
        createParticleSystem()

        // 粒子系统初始状态设置为完全透明
        if (particles) {
          const opacityAttr = particles.geometry.attributes.opacity
          for (let i = 0; i < opacityAttr.array.length; i++) {
            opacityAttr.array[i] = 0
          }
          opacityAttr.needsUpdate = true
          particleGroup.visible = true // 可以直接显示，因为初始透明度为0
        }
      },
      undefined,
      error => {
        console.error('图片加载失败:', error)
        // 加载失败时使用备用彩色纹理
        createColorTexture(512, 512).then(texture => {
          imageTexture = texture
          showFullImage()
          createParticleSystem()
        })
      }
    )
  }

  // 创建临时彩色纹理作为备用
  function createColorTexture(width, height) {
    return new Promise(resolve => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      // 创建渐变背景
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#3498db')
      gradient.addColorStop(0.5, '#9b59b6')
      gradient.addColorStop(1, '#e74c3c')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // 添加一些随机形状
      for (let i = 0; i < 50; i++) {
        ctx.beginPath()
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 30 + 10, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
        ctx.fill()
      }

      const texture = new THREE.CanvasTexture(canvas)
      resolve(texture)
    })
  }

  // 显示完整图片
  function showFullImage() {
    const ratio = imageTexture.image.width / imageTexture.image.height
    const width = 80
    const height = width / ratio

    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.MeshBasicMaterial({
      map: imageTexture,
      transparent: true
    })

    imageMesh = new THREE.Mesh(geometry, material)
    scene.add(imageMesh)
  }

  // 创建粒子系统
  function createParticleSystem() {
    particleGroup = new THREE.Group()
    scene.add(particleGroup)
    particleGroup.visible = false

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = imageTexture.image.width
    canvas.height = imageTexture.image.height

    context.drawImage(imageTexture.image, 0, 0)
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    const geometry = new THREE.BufferGeometry()
    const positions = []
    const colors = []
    const sizes = []
    const originalPositions = []
    const randomOffsets = []
    const opacities = []

    // 设置粒子密度
    const particleDensity = 5
    const ratio = canvas.width / canvas.height
    const planeWidth = 80
    const planeHeight = planeWidth / ratio

    for (let y = 0; y < canvas.height; y += particleDensity) {
      for (let x = 0; x < canvas.width; x += particleDensity) {
        const index = (y * canvas.width + x) * 4

        // 跳过透明像素或黑色像素
        if (data[index + 3] < 50 || (data[index] < 20 && data[index + 1] < 20 && data[index + 2] < 20)) continue

        // 映射图像坐标到3D空间
        const u = x / canvas.width
        const v = 1 - y / canvas.height

        const posX = (u - 0.5) * planeWidth
        const posY = (v - 0.5) * planeHeight
        const posZ = 0

        positions.push(posX, posY, posZ)
        originalPositions.push(posX, posY, posZ)

        // 为每个粒子设置随机漂移方向
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI * 2
        const r = 50 + Math.random() * 150

        const offsetX = r * Math.sin(phi) * Math.cos(theta)
        const offsetY = r * Math.sin(phi) * Math.sin(theta)
        const offsetZ = r * Math.cos(phi)

        randomOffsets.push(offsetX, offsetY, offsetZ)

        const r8 = data[index] / 255
        const g8 = data[index + 1] / 255
        const b8 = data[index + 2] / 255

        colors.push(r8, g8, b8)
        sizes.push(Math.random() * 3 + 1)
        opacities.push(1.0)
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    geometry.setAttribute('opacity', new THREE.Float32BufferAttribute(opacities, 1))

    // 存储原始位置和随机偏移
    geometry.userData = {
      originalPositions: originalPositions,
      randomOffsets: randomOffsets
    }

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
      attribute float size;
      attribute vec3 color;
      attribute float opacity;
      varying vec3 vColor;
      varying float vOpacity;
      
      void main() {
        vColor = color;
        vOpacity = opacity;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
      fragmentShader: `
      varying vec3 vColor;
      varying float vOpacity;
      
      void main() {
        float r = distance(gl_PointCoord, vec2(0.5, 0.5));
        if (r > 0.5) discard;
        
        float alpha = smoothstep(0.5, 0.0, r) * vOpacity;
        gl_FragColor = vec4(vColor, alpha);
      }
    `
    })

    particles = new THREE.Points(geometry, material)
    particleGroup.add(particles)
  }

  // 图片开始分解为粒子
  function startDisintegration() {
    if (!imageMesh || !particles) return

    animationPhase = 1

    // 同时处理图片淡出和粒子淡入
    const timeline = gsap.timeline()

    // 第一阶段：粒子逐渐出现，图片保持完全可见
    timeline.to(
      particles.geometry.attributes.opacity.array,
      {
        duration: 3,
        endArray: Array(particles.geometry.attributes.opacity.array.length).fill(1),
        onUpdate: () => {
          particles.geometry.attributes.opacity.needsUpdate = true
        }
      },
      0
    )

    // 延迟执行第二阶段：粒子开始散开，但图片仍然保持可见
    timeline.call(
      () => {
        animationPhase = 2
        // 开始粒子散开动画，但保持图片可见
        animateParticlesWithImageVisible()
      },
      [],
      4
    )

    // 最后阶段：当粒子已经散开到一定程度后，图片开始淡出
    timeline.to(
      imageMesh.material,
      {
        opacity: 0,
        duration: 2,
        ease: 'power1.inOut',
        onComplete: () => {
          scene.remove(imageMesh)
        }
      },
      8 // 在粒子散开一段时间后再淡出图片
    )
  }

  // 修改粒子动画，使其能够在图片可见的情况下散开
  function animateParticlesWithImageVisible() {
    const positionAttr = particles.geometry.attributes.position
    const positions = positionAttr.array
    const originalPositions = particles.geometry.userData.originalPositions
    const randomOffsets = particles.geometry.userData.randomOffsets
    const opacityAttr = particles.geometry.attributes.opacity

    gsap.to(
      { progress: 0 },
      {
        progress: 1,
        duration: 15, // 增加动画时间
        ease: 'power1.inOut',
        onUpdate: function () {
          const progress = this.progress

          for (let i = 0; i < positions.length; i += 3) {
            // 粒子位置变化
            // 使用更平缓的动画曲线
            const positionProgress =
              progress < 0.2
                ? progress * 5 * 0.2 // 前20%时间缓慢开始
                : 0.2 + (progress - 0.2) * 0.8 // 之后80%时间逐渐加速

            positions[i] = originalPositions[i] + randomOffsets[i] * positionProgress
            positions[i + 1] = originalPositions[i + 1] + randomOffsets[i + 1] * positionProgress
            positions[i + 2] = originalPositions[i + 2] + randomOffsets[i + 2] * positionProgress

            // 透明度变化 - 只在最后阶段才开始降低
            const opacityIndex = i / 3
            // 前60%的时间保持完全不透明，后40%的时间开始淡出
            const opacityValue = progress < 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) / 0.4)

            opacityAttr.array[opacityIndex] = opacityValue
          }

          positionAttr.needsUpdate = true
          opacityAttr.needsUpdate = true
        }
      }
    )
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate)
    const delta = clock ? clock.getDelta() : 0

    if (particles) {
      const positions = particles.geometry.attributes.position.array
      const time = Date.now() * 0.0002 // 再降低一点速度

      if (animationPhase >= 1) {
        const opacityAttr = particles.geometry.attributes.opacity

        for (let i = 0; i < positions.length; i += 3) {
          // 微小运动基于动画阶段调整
          let moveFactor = 0

          if (animationPhase === 1) {
            // 第一阶段：最小幅度运动
            moveFactor = 0.0005
          } else if (animationPhase === 2) {
            // 第二阶段：中等幅度运动，与粒子位置变化叠加
            moveFactor = 0.002
          }

          positions[i] += Math.sin(time + i) * moveFactor
          positions[i + 1] += Math.cos(time + i * 0.5) * moveFactor
          positions[i + 2] += Math.sin(time * 0.5 + i * 0.2) * moveFactor
        }

        particles.geometry.attributes.position.needsUpdate = true

        // 粒子组整体旋转
        // 阶段一几乎不旋转，阶段二缓慢旋转
        const rotationSpeed = animationPhase === 1 ? 0.002 : 0.008
        particleGroup.rotation.y += delta * rotationSpeed
        particleGroup.rotation.x += delta * rotationSpeed * 0.5
      }
    }

    renderer.render(scene, camera)
  }

  function onWindowResize() {
    const width = container.value.clientWidth || window.innerWidth
    const height = container.value.clientHeight || window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  }
</script>

<style scoped>
  .particle-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-color: #000;
  }
</style>
