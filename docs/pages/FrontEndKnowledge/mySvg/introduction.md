# 什么是 svg：

## 一、svg 简介

::: tip 描述
`SVG` 是一种用于描述二维图形的 `XML` 标记语言，与位图图像不同，`SVG` 图像以文本形式存储，并且可以缩放到任意大小而不会失真，因为它们基于数学描述而不是像素。
:::

## 二、svg 用法

- SVG 文档由一个或多个 SVG 元素组成，它们定义了图形的内容和属性
- SVG 文档以 `<svg>` 标签开始，以 `</svg>` 标签结束。
- SVG 元素使用标签来描述不同的图形，例如 `<circle>` 表示圆形，`<rect>` 表示矩形等。
- SVG 元素可以包含属性，用于指定图形的各种特性，如位置、大小、颜色等。

#### 事例：

```html
<svg width="200" <!-- 指定SVG画布的宽度 -->
  height="200"
  <!-- 指定SVG画布的高度 -->
  xmlns="http://www.w3.org/2000/svg">
  <!-- 指定SVG命名空间 -->
  <!-- SVG图形内容 -->
  <rect width="100px" height="100px" fill="red" stroke="#000"   stroke-width="5px" />
</svg>
```

- width 和 height 属性定义了 SVG 画布的宽度和高度。
- xmlns 属性指定 SVG 文档的 XML 命名空间。

## 三、常见基本图形：

- `<rect>`：绘制矩形
- `<circle>`：绘制圆形
- `<ellipse>`：绘制椭圆
- `<line>`：绘制直线
- `<polyline>`：绘制折线
- `<polygon>`：绘制多边形
- `<path>`：绘制路径

## 四、常见标签及属性：

`svg 的属性有两种用法，一种是在标签中直接写，另一种则是通过 css 的方式写，如 style、class 等`

#### 矩形
```html
<rect
  x="x-coordinate"        <!-- 矩形左上角的 x 坐标 -->
  y="y-coordinate"        <!-- 矩形左上角的 y 坐标 -->
  width="width-value"     <!-- 矩形的宽度 -->
  height="height-value"   <!-- 矩形的高度 -->
  rx="rx-value"           <!-- 矩形的圆角半径（水平方向） -->
  ry="ry-value"           <!-- 矩形的圆角半径（垂直方向） -->
  fill="fill-color"       <!-- 矩形的填充颜色 -->
  stroke="stroke-color"   <!-- 矩形的描边颜色 -->
  stroke-width="width-value" <!-- 矩形的描边宽度 -->
/>
```
<showRun>
  <template #svgCode>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)" />
    </svg>
  </template>
</showRun>

#### 圆形
```html
<circle
  cx="x-coordinate"      <!-- 圆心的 x 坐标 -->
  cy="y-coordinate"      <!-- 圆心的 y 坐标 -->
  r="radius"             <!-- 圆的半径 -->
  fill="fill-color"      <!-- 圆的填充颜色 -->
  stroke="stroke-color"  <!-- 圆的描边颜色 -->
  stroke-width="width"   <!-- 圆的描边宽度 -->
/>
```
<showRun>
  <template #svgCode>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
    </svg> 
  </template>
</showRun>

#### 椭圆
```html
<ellipse
  cx="x-coordinate"      <!-- 椭圆中心点的 x 坐标 -->
  cy="y-coordinate"      <!-- 椭圆中心点的 y 坐标 -->
  rx="x-radius"          <!-- 椭圆水平轴的半径 -->
  ry="y-radius"          <!-- 椭圆垂直轴的半径 -->
  fill="fill-color"      <!-- 椭圆的填充颜色 -->
  stroke="stroke-color"  <!-- 椭圆的描边颜色 -->
  stroke-width="width"   <!-- 椭圆的描边宽度 -->
/>
```
<showRun>
  <template #svgCode>
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="80" ry="50" fill="blue" stroke="black" stroke-width="2" />
    </svg>
  </template>
</showRun>

#### 直线
```html
<line
  x1="x1-coordinate"     <!-- 起点的 x 坐标 -->
  y1="y1-coordinate"     <!-- 起点的 y 坐标 -->
  x2="x2-coordinate"     <!-- 终点的 x 坐标 -->
  y2="y2-coordinate"     <!-- 终点的 y 坐标 -->
  stroke="stroke-color"  <!-- 直线的颜色 -->
  stroke-width="width"   <!-- 直线的宽度 -->
/>
```

<showRun>
  <template #svgCode>
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="50" x2="150" y2="150" stroke="black" stroke-width="2" />
    </svg>
  </template>
</showRun>

#### 多边形

```html
<polygon
  points="x1,y1 x2,y2 x3,y3 ..."   <!-- 多边形各个顶点的坐标 -->
  fill="fill-color"                <!-- 多边形的填充颜色 -->
  stroke="stroke-color"            <!-- 多边形的边框颜色 -->
  stroke-width="width"             <!-- 多边形的边框宽度 -->
/>
```

<showRun>
  <template #svgCode>
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,10 150,190 50,190" fill="orange" stroke="black" stroke-width="2" />
    </svg>
  </template>
</showRun>

#### 多段线

```html
<polyline
  points="x1,y1 x2,y2 x3,y3 ..."   <!-- 多段线各个顶点的坐标 -->
  fill="none"                      <!-- 多段线的填充颜色，使用 "none" 表示不填充 -->
  stroke="stroke-color"            <!-- 多段线的边框颜色 -->
  stroke-width="width"             <!-- 多段线的边框宽度 -->
/>
```

<showRun>
  <template #svgCode>
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <polyline points="50,50 100,150 150,100 200,200" fill="none" stroke="black" stroke-width="2" />
    </svg>
  </template>
</showRun>

#### 路径

- `使用 <path> 元素可以绘制直线、曲线、弧线等各种复杂的图形，并且可以通过设置路径命令来控制路径的形状和样式。`
- `path是所有元素中最复杂的图形，后续会进行详细的介绍`
```html
<path
  d="path-data"            <!-- 定义路径的路径数据 -->
  fill="fill-color"        <!-- 路径的填充颜色 -->
  stroke="stroke-color"    <!-- 路径的描边颜色 -->
  stroke-width="width"     <!-- 路径的描边宽度 -->
/>
```

<showRun>
  <template #svgCode>
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 50 L 150 50 L 100 150 Z" fill="orange" stroke="black" stroke-width="2" />
    </svg>
  </template>
</showRun>

#### 文本
```html
<text
  x="x-coordinate"          <!-- 文本左上角的 x 坐标 -->
  y="y-coordinate"          <!-- 文本左上角的 y 坐标 -->
  font-family="font"        <!-- 字体名称 -->
  font-size="size"          <!-- 字体大小 -->
  fill="fill-color"         <!-- 文本颜色 -->
  text-anchor="anchor"      <!-- 文本锚点 -->
>
  Text content              <!-- 文本内容 -->
</text>
```

<showRun>
  <template #svgCode>
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="100" font-family="Arial" font-size="20" fill="blue" text-anchor="middle">Hello, SVG!</text>
    </svg>
  </template>
</showRun>

#### 滤镜
```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 定义模糊滤镜 -->
  <filter id="blur_filter">
    <!-- feGaussianBlur高斯模糊 -->
    <!-- in：指定输入图像，通常为 SourceGraphic，表示应用滤镜效果的目标元素本身。 -->
    <feGaussianBlur in="SourceGraphic" stdDeviation="5" /> 
  </filter>
  
  <!-- 应用模糊滤镜的矩形 -->
  <rect x="50" y="50" width="100" height="80" fill="red" filter="url(#blur_filter)" />
</svg>
```
<showRun>
  <template #svgCode>
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <!-- 定义模糊滤镜 -->
      <filter id="blur_filter">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      <!-- 应用模糊滤镜的矩形 -->
      <rect x="50" y="50" width="100" height="80" fill="red" filter="url(#blur_filter)" />
    </svg>
  </template>
</showRun>

#### 线性渐变
```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 定义线性渐变 -->
  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="red" />
    <stop offset="100%" stop-color="blue" />
  </linearGradient>
  
  <!-- 应用线性渐变的矩形 -->
  <rect x="50" y="50" width="100" height="80" fill="url(#gradient)" />
</svg>
```

<showRun>
  <template #svgCode>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
    </svg>
  </template>
</showRun>



#### 放射性渐变
```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 定义径向渐变 -->
  <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
    <stop offset="0%" stop-color="red" />
    <stop offset="100%" stop-color="blue" />
  </radialGradient>
  
  <!-- 应用径向渐变的圆形 -->
  <circle cx="100" cy="100" r="80" fill="url(#gradient)" />
</svg>
```

<showRun>
  <template #svgCode>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0" />
          <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
    </svg>
  </template>
</showRun>



<script setup>
import showRun from '../../components/showRun.vue'
</script>