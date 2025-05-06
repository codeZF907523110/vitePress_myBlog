# 初识 webgl

::: tip 前言：

<p style="color:red">
  WebGL 全称叫做 Web Graphics Library,它是 JavaScript API。用于在任何兼容的 Web 浏览器中渲染交互式的 3D 图
  形,并且无需使用插件。它基于 OpenGLES2.0(一个用于嵌入式系统的图形库),并与其他 Web 标准完全集成,使
  开发者能够利用 GPU 加速图形处理直接在网页上实现复杂的图形效果。
</p>
:::

## 一、认识着色器：

> GLSL(OpenGL Shading Language)是一种用于编写图形着色色器的编程语言。着色器是用于在图形处理单元
> (GPU)上执行特定图形处理任务的程序。通俗讲,着色器是画点的工具,一个图形是由无数个点组成的,每个点都
> 有其自己的颜色。

### 1. 着色器的类型：

> 一个着色器就是一个绘制东西到屏幕上的函数,着色器有`顶点着色器`和`片段着色器`

- 顶点着色器:处理每个顶点的属性,如位置、法线、纹理今坐标等。它的主要任务是将顶点从对象坐标系转换到屏幕坐标系,并传递其他顶点属性给片段着色器。
- 片段着色器:处理每个片段(像素)的属性,如颜色、透明度、纹理等。它的主要任务是确定每个片段的颜色、透明度、纹理等。

### 2. 着色器语法：

> 在 HTML 中,如果你想把着色器代码直接写在`<script>`标签中,通常会使用自定义的 MIME 类型,以避免浏览器将其作为常规 JavaScript 代码执行。常见的做法是将`type`属性设置为一个非标准类型,例如`x-shader/x-vertex`和`x-shader/x-fragment`,分别用于顶点着色器和片段着色器。这样做的好处是可以通过 JavaScript 获取和解析着色器代码。

```js
  <!-- 顶点着色器源码 -->
  <script id="vertexShader" type="x-shader/x-vertex">
    void main() {
      //给内置变量gl_PointSize赋值像素大小
      gl_PointSize=20.0;
      //顶点位置，位于坐标原点
      gl_Position =vec4(0.0,0.0,0.0,1.0);
    }
  </script>
  <!-- 片元着色器源码 -->
  <script id="fragmentShader" type="x-shader/x-fragment">
    void main() {
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
  </script>
```

- 数据类型：

  - 基本数据类型：`float`, `int`, `bool`
  - 向量类型：`vec2`,`vec3`,`vec4`(浮点型);`ivec2`,`ivec3`,`ivec4`(整数型); `bvec2`,`bvec3`,`bvec4`(布尔型)
  - 矩阵类型：`mat2`,`mat3`,`mat4`
  - 纹理类型：`sampler2D`,`samplerCube`

- 变量修饰符：

  > 用于指定变量的作用域、生命周期和用途。不同的修饰符在顶点着色器和片段着色器中起到不同的作用。

  - `attribute`：顶点着色器输入变量，用于从外部数据流中获取顶点属性数据。
  - `varying`：顶点着色器和片段着色器间传递的变量，用于在顶点着色器和片段着色器之间传递数据。
  - `uniform`：用于在顶点着色器和片段着色器之间传递常量数据，如颜色、纹理坐标等。

- 内置变量：

  - `gl_Position`：顶点着色器输出变量，用于指定顶点的位置。
  - `gl_PointSize`： 顶点着色器输出变量，用于指定点的大小。
  - `gl_FragColor`：片段着色器输出变量，用于指定片段的颜色。

- 函数：

  - 常用数学函数：`sin`,`cos`,`tan`,`pow`,`exp`,`log`,`sqrt`,`abs`,`min`,`max`,`radians`
  - 向量函数：`normalize`,`cross`,`dot`,`reflect`,`refract`,`faceforward`
  - 纹理采样 ling 函数：`texture2D`,`textureCube`

- 定义精度：

  > `precision` 关键字用于声明变量的默认精度。
  > GLSL 支持三种不同的精度修饰符:

  - `lowp`：低精度，通常用于低精度的纹理采样。
  - `mediump`：中精度，通常用于中精度的纹理采样。
  - `highp`：高精度，通常用于高精度的纹理采样。

  ```js
    precision lowp float;
  ```

- 主函数：
  > `main` 函数是 GLSL 着色器程序的入口点，它定义了着色器程序的执行顺序。
  ```js
    void main() {
      //给内置变量gl_PointSize赋值像素大小
      gl_PointSize=20.0;
      //顶点位置，位于坐标原点
      gl_Position =vec4(0.0,0.0,0.0,1.0);
    }
  ```

## 二、第一个 webgl 程序：

> 让我们用创建一个简单的 webgl 程序，这个程序会绘制一个红色的点。

- 创建一个 canvas 元素，用来承载 webgl 程序。
  ```html
  <!--canvas标签创建一个宽高均为500像素，背景为蓝色的矩形画布-->
  <canvas id="webgl" width="500" height="500" style="border: 1px solid #ccc"></canvas>
  ```
- 创建顶点着色器和片段着色器。
  ```html
  <!-- 顶点着色器源码 -->
  <script id="vertexShader" type="x-shader/x-vertex">
    void main() {
      //给内置变量gl_PointSize赋值像素大小
      gl_PointSize=20.0;
      //顶点位置，位于坐标原点
      gl_Position =vec4(0.0,0.0,0.0,1.0);
    }
  </script>
  <!-- 片元着色器源码 -->
  <script id="fragmentShader" type="x-shader/x-fragment">
    void main() {
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
  </script>
  ```
- 获取 canvas 的上下文，获取着色器程序。

  ```js
  //通过getElementById()方法获取canvas画布
  var canvas = document.getElementById('webgl')
  //通过方法getContext()获取WebGL上下文
  var gl = canvas.getContext('webgl')
  //顶点着色器源码
  var vertexShaderSource = document.getElementById('vertexShader').innerText

  //片元着色器源码
  var fragShaderSource = document.getElementById('fragmentShader').innerText
  ```

- 初始化着色器函数。

  ```js
  //声明初始化着色器函数
  const initShader = (gl, vertexShaderSource, fragmentShaderSource) => {
    //创建顶点着色器对象
    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    //创建片元着色器对象
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    //引入顶点、片元着色器源代码
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.shaderSource(fragmentShader, fragmentShaderSource)

    //编译顶点、片元着色器
    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    //创建程序对象program
    var program = gl.createProgram()
    //附着顶点着色器和片元着色器到program
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    //链接program
    gl.linkProgram(program)
    //使用program
    gl.useProgram(program)
    //返回程序program对象
    return program
  }
  ```

- 绘制。
  ```js
  gl.drawArrays(gl.POINTS, 0, 1)
  ```

> 完整代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>使用WebGL绘制一个点</title>
  </head>
  <body>
    <!--canvas标签创建一个宽高均为500像素，背景为蓝色的矩形画布-->
    <canvas id="webgl" width="500" height="500" style="border: 1px solid #ccc"></canvas>
    <!-- 写法一（推荐） -->
    <!-- 顶点着色器源码 -->
    <script id="vertexShader" type="x-shader/x-vertex">
      void main() {
        //给内置变量gl_PointSize赋值像素大小
        gl_PointSize=20.0;
        //顶点位置，位于坐标原点
        gl_Position =vec4(0.0,0.0,0.0,1.0);
      }
    </script>
    <!-- 片元着色器源码 -->
    <script id="fragmentShader" type="x-shader/x-fragment">
      void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
      }
    </script>

    <script>
      //通过getElementById()方法获取canvas画布
      var canvas = document.getElementById('webgl')
      //通过方法getContext()获取WebGL上下文
      var gl = canvas.getContext('webgl')
      //顶点着色器源码
      var vertexShaderSource = document.getElementById('vertexShader').innerText

      //片元着色器源码
      var fragShaderSource = document.getElementById('fragmentShader').innerText

      //初始化着色器
      var program = initShader(gl, vertexShaderSource, fragShaderSource)

      //开始绘制，显示器显示结果
      gl.drawArrays(gl.POINTS, 0, 1)

      //声明初始化着色器函数
      const initShader = (gl, vertexShaderSource, fragmentShaderSource) => {
        //创建顶点着色器对象
        var vertexShader = gl.createShader(gl.VERTEX_SHADER)
        //创建片元着色器对象
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

        //引入顶点、片元着色器源代码
        gl.shaderSource(vertexShader, vertexShaderSource)
        gl.shaderSource(fragmentShader, fragmentShaderSource)

        //编译顶点、片元着色器
        gl.compileShader(vertexShader)
        gl.compileShader(fragmentShader)

        //创建程序对象program
        var program = gl.createProgram()
        //附着顶点着色器和片元着色器到program
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        //链接program
        gl.linkProgram(program)
        //使用program
        gl.useProgram(program)
        //返回程序program对象
        return program
      }
    </script>
  </body>
</html>
```

<showRun>
  <template #svgCode>
    <webglDemo01 />
  </template>
</showRun>

<script lang="ts" setup>
  import showRun from '../../components/showRun.vue'
import webglDemo01 from './components/webgl_demo01.vue'
</script>
