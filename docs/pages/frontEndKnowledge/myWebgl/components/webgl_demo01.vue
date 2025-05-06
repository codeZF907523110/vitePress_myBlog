<template>
  <!-- canvas标签创建一个宽高均为500像素，背景为蓝色的矩形画布 -->
  <canvas ref="canvasRef" width="500" height="500" style="border: 1px solid #ccc"></canvas>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  // 创建canvas引用
  const canvasRef = ref<HTMLCanvasElement | null>(null)

  // 顶点着色器源码
  const vertexShaderSource = `
  void main() {
    //给内置变量gl_PointSize赋值像素大小
    gl_PointSize=20.0;
    //顶点位置，位于坐标原点
    gl_Position =vec4(0.0,0.0,0.0,1.0);
  }
`

  // 片元着色器源码
  const fragmentShaderSource = `
  void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
`

  /**
   * 初始化着色器函数
   * @param gl WebGL上下文
   * @param vertexSource 顶点着色器源码
   * @param fragmentSource 片元着色器源码
   * @returns program 程序对象
   */
  const initShader = (gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram => {
    // 创建顶点着色器对象
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    // 创建片元着色器对象
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) {
      throw new Error('创建着色器对象失败')
    }

    // 引入顶点、片元着色器源代码
    gl.shaderSource(vertexShader, vertexSource)
    gl.shaderSource(fragmentShader, fragmentSource)

    // 编译顶点、片元着色器
    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    // 检查着色器编译状态
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(vertexShader)
      throw new Error(`顶点着色器编译失败: ${info}`)
    }

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(fragmentShader)
      throw new Error(`片元着色器编译失败: ${info}`)
    }

    // 创建程序对象program
    const program = gl.createProgram()

    if (!program) {
      throw new Error('创建程序对象失败')
    }

    // 附着顶点着色器和片元着色器到program
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    // 链接program
    gl.linkProgram(program)

    // 检查链接状态
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program)
      throw new Error(`程序链接失败: ${info}`)
    }

    // 使用program
    gl.useProgram(program)

    // 返回程序program对象
    return program
  }

  // 组件挂载后执行WebGL初始化
  onMounted(() => {
    if (!canvasRef.value) return

    // 获取WebGL上下文
    const gl = canvasRef.value.getContext('webgl')

    if (!gl) {
      console.error('无法初始化WebGL，你的浏览器可能不支持')
      return
    }

    // 初始化着色器
    initShader(gl, vertexShaderSource, fragmentShaderSource)

    // 开始绘制，显示器显示结果
    gl.drawArrays(gl.POINTS, 0, 1)
  })
</script>
