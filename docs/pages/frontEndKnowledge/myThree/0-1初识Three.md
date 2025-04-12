# 一、初识 three.js

::: warning three.js 官方描述
three.js 是一个基于 WebGL 的 JavaScript 3D 库，它可以在浏览器中创建和显示动画的 3D 图形。这个库提供了许多工具和函数，使得开发者可以更容易地创建复杂的 3D 场景，包括摄像机、光影、材质等各种对象。

three.js 被广泛应用于各种领域，如互动式可视化、游戏开发、虚拟现实和增强现实、在线教育以及影视动画等。其代码托管在 GitHub 上，开发者可以使用 npm 和现代构建工具来安装 three.js，或者只需通过静态主机或 CDN 来使用。
:::

## 1. 创建 Canvas 画布

```html
<canvas style="background: black;" width="800" height="800"></canvas>
```

## 2. 创建三维场景

```js
// 创建3D场景对象Scene
const scence = new THREE.Scene()
```

## 3. 创建一个球体

- `下面用4步，给大家演示在虚拟场景Scene中添加一个球体。`

<image class="common-image" src="http://www.webgl3d.cn/imgthreejs/threejs%E5%9D%90%E6%A0%87%E7%B3%BB%E5%8A%A0%E7%AB%8B%E6%96%B9%E4%BD%93.jpg" />

```js
//1. 球体形状
const geometry = new THREE.SphereGeometry(50)
//2. 球体材质
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff
})
//3. 球体模型Mesh
const mesh = new THREE.Mesh(geometry, material)
//4. 球体添加到虚拟场景中
scene.add(mesh)
```

### 1) 物体形状：几何体`Geometry`{#on-appearance-toggle}

```js
// 创建一个球体
const geometry = new THREE.SphereGeometry(50)
```

> Three.js 提供了各种各样的几何体 API，用来表示三维物体的几何形状。

<image class="common-image" src="http://www.webgl3d.cn/imgthreejs/%E5%87%A0%E4%BD%95%E4%BD%93Geometry.svg" />

### 2) 物体外观：材质`Material`

> 如果你想定义物体的外观效果，比如颜色，就需要通过材质`Material`相关的 API 实现，`threejs`材质不同，渲染效果不同。

<image class="common-image" src="http://www.webgl3d.cn/imgthreejs/%E6%9D%90%E8%B4%A8Material.svg" />

接下来使用一个最基础的网络材质，`MeshBasicMaterial`是 threejs 最简单的网格材质

```js
//创建一个材质对象Material
const material = new THREE.MeshBasicMaterial({
  color: 'pink'
})
```

### 3) 物体：网格模型 `Mesh`

> 实际生活中有各种各样的物体，在`threejs`中可以通过网格模型`Mesh (opens new window)`表示一个虚拟的物体，比如一个箱子、一个鼠标。

```js
const geometry = new THREE.SphereGeometry(50)
const material = new THREE.MeshBasicMaterial({
  color: pink
})
// 两个参数分别为几何体geometry、材质material
const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
```

### 4) .add()方法

> threejs 中你创建了一个表示物体的虚拟对象`Mesh`，需要通过`.add()`方法，把网格模型 mesh 添加到三维场景`scene`中。

```js
scene.add(mesh)
```

### 5) 模型位置`.position`

> 实际生活中，一个物体往往是有位置的，对于 threejs 而言也是一样的，你可以通过位置属性`.position` 定义网格模型 `Mesh` 在三维场景 `Scene` 中的位置。

> 长方体位置默认是在坐标原点` (opens new window)(0,0,0)`。

```js
const geometry = new SphereGeometry(50)
const meterial = new THREE.MeshBasicMaterial({
  color: 'pink'
})
const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 200, 0) //y轴200位置
mesh.position.set(200, 0, 0) //x轴200位置
```

### 6) 相机

> `Threejs`如果想把三维场景`Scene`渲染到 web 网页上，还需要定义一个虚拟相机`Camera`，就像你生活中想获得一张照片，需要一台用来拍照的相机。你可以把上面长方体`Mesh`想象为一个箱子，如果想对箱子拍照，就需要一个虚拟相机了。

##### 透视投影相机`PerspectiveCamera`

> threejs 提供了透视投影相机 PerspectiveCamera 这个 API，透视投影相机 PerspectiveCamera 本质上就是在模拟人眼观察这个世界的规律，或者说模拟生活中的相机。

```js
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera()
```

##### 相机位置`.position`

> 生活中用相机拍照，你相机位置不同，拍照结果也不同，threejs 中虚拟相机同样如此。
> threejs 相机对象 `Camera` 具有位置属性`.position`，通过位置属性`.position` 可以设置相机的位置。

```js
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(200, 200, 200)
```

- 详情可见：[相机位置可视化](http://www.webgl3d.cn/kejm3D/4.%E9%80%8F%E8%A7%86%E6%8A%95%E5%BD%B1%E7%9B%B8%E6%9C%BA/index.html)

##### 相机观察目标`.lookAt()`

> 你用相机拍照你需要控制相机的拍照目标，具体说相机镜头对准哪个物体或说哪个坐标。对于 threejs 相机而言，就是设置`.lookAt()`方法的参数，指定一个 3D 坐标。

```js
//相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0, 0, 0) //坐标原点

camera.lookAt(0, 10, 0) //y轴上位置10

camera.lookAt(mesh.position) //指向mesh对应的位置
```

<image class="common-image" src="http://www.webgl3d.cn/imgthreejs/%E7%9B%B8%E6%9C%BA%E4%BD%8D%E7%BD%AE%E5%92%8C%E7%9B%AE%E6%A0%87.png" />

##### 透视投影相机 PerspectiveCamera：`视锥体`

> 透视投影相机的四个参数`fov, aspect, near, far`构成一个四棱台 3D 空间，被称为视锥体，只有视锥体之内的物体，才会渲染出来，视锥体范围之外的物体不会显示在 Canvas 画布上。

<image class="common-image" src="http://www.webgl3d.cn/imgthreejs/%E8%A7%86%E9%94%A5%E4%BD%93.png" />

- 详情可见：[相机位置可视化](http://www.webgl3d.cn/kejm3D/4.%E9%80%8F%E8%A7%86%E6%8A%95%E5%BD%B1%E7%9B%B8%E6%9C%BA/index.html)

```js
// PerspectiveCamera( fov, aspect, near, far )
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, canvas.width / canvas.height, 1, 3000)
```

- `PerspectiveCamera`参数介绍：
  参数|含义|默认值
  -|-|-|
  fov|相机视锥体竖直方向视野角度|50
  aspect|相机视锥体水平方向和竖直方向长度比，一般设置为 Canvas 画布宽高比 width / height|1
  near|相机视锥体近裁截面相对相机距离|0.1
  far|相机视锥体远裁截面相对相机距离，far-near 构成了视锥体高度方向|2000

### 7) 渲染器

> WebGL 渲染器的功能字面意思就是渲染三维场景，再具体点就是控制相机`Camera`对 3D 场景`Scene`进行"拍照","拍照"结果呈现到`Canvas`画布上面。

##### WebGL 渲染器`WebGLRenderer`

> 通过 WebGL 渲染器 WebGLRenderer (opens new window)可以实例化一个 WebGL 渲染器对象。

> 关联 Canvas 画布，这样就能把 WebGL 渲染器渲染的三维场景呈现到 Canvas 画布上

```js
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer()
// 获取canvas
const canvas = document.getElementById('myCanvas')
// 创建渲染器对象并关联canvas
const render = new THREE.WebGLRenderer({
  canvas: canvas
})
```

##### 渲染方法`.render()`

```js
renderer.render(scene, camera) //执行渲染操作
```

##### 设置 Canvas 画布尺寸`.setSize()`

```js
// 定义threejs输出画布的尺寸(单位:像素px)
const width = 800 //宽度
const height = 800 //高度
renderer.setSize(width, height) //设置three.js渲染区域的尺寸(像素px)
```

##### 渲染器 Canvas 画布属性`.domElement`

> 渲染器 `WebGLRenderer` 通过属性`.domElement`可以获得渲染方法`.render()`生成的`Canvas`画布，`.domElement`本质上就是一个`HTML`元素：`Canvas`画布。

```js
document.body.appendChild(renderer.domElement)
```

##### 设置背景颜色`.setClearColor()`

> 可以设置 WebGL 渲染器渲染的 Canvas 画布背景颜色，如果不设置默认黑色

```js
renderer.setClearColor(0x999999)
```

### 小结

> 看完以上基础知识我们来做一个小球吧

> 运行以下代码后我们可以看到一个转动的地球😊

<showRun>
  <template #svgCode>
    <rotatingBall />
  </template>
</showRun>

<script lang="ts" setup>
import showRun from '../../components/showRun.vue'
import rotatingBall from './components/rotatingBall.vue'
</script>
