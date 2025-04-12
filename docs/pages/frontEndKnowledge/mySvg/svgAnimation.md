# 制作 svg 动画

## 一、svg 动画标签/属性介绍

1. **在 svg 提供了三种常用的动画标记**

- animate：基础动画
- animateTransform：形变动画
- animateMotion：路径动画

2. **svg 动画属性**

- attributeName: 规定元素的哪个属性会产生动画效果
- from/to: 从哪到哪
- dur: 动画时长
- fill: 动画结束之后的状态 保持 freeze 结束状态/remove 恢复初始状态（默认值）

- repeatCount：动画重复执行次数
- repeatDur：动画重复执行总时间
- begin：规定动画开始的时间/什么时间触发了再执行动画
- begin=“1s”：1s 后开始执行动画
- begin=“click”：click 触发事件执行了再执行动画
- begin=“click + 1s”：点击之后，等两秒再执行动画
- restart: 规定元素开始动画之后，是否可以被重新开始执行
- always：动画可以在任何时候被重置。这是默认值。
- whenNotActive：只有在动画没有被激活的时候才能被重置，例如在动画结束之后，才能再执行。
- never：在整个 SVG 执行的过程中，元素动画不能被重置。
- calcMode: 规定每一个动画片段的动画表现
- linear：默认属性值, 匀速动画
- discrete: 非连续动画, 没有动画效果瞬间完成
- paced: 规定整个动画效果始终以相同的速度进行，设置 keyTimes 属性无效
- spline: 配合 keySplines 属性来定义各个动画过渡效, 自定义动画
- keyTimes: 划分动画时间片段, 取值 0-1
- values: 划分对应取值片段的值

3. **使用 css 实现 svg 动画实现**

## 二.、动画的创建/使用方式

`svg动画有两种创建方式`

1. **使用`id`+`xlink:href:`**

```js
<svg>
  <circle id="myCircle" cx="100" cy="100" r="50" fill="red" />
  <animate attributeName="r" from="0" to="50" dur="1s" xlink:href="myCircle" />
</svg>
```

<showRun>
  <template #svgCode>
    <svg>
      <circle id="myCircle" cx="100" cy="100" r="50" fill="red" />
      <animate attributeName="r" from="0" to="50" dur="1s" xlink:href="#myCircle" />
    </svg>
  </template>
</showRun>

2. **在标签内部使用**

```js
<svg>
  <ellipse id="myCircle" cx="100" rx="50" ry="30" fill="red">
    <animate attributeName="ry" from="30" to="50" dur="1s" />
  </ellipse>
</svg>
```

## 三、复合动画介绍

`一个元素可以绑定多个动画，并且可以同时执行多个动画`

```js
<svg width="500" height="500">
  <circle cx="100" cy="100" r="50" fill="#7fd">
    <animate attributeName="r" from="50" to="100" dur="2s" fill="freeze" begin="click+0.3s" />
    <animate attributeName="fill" from="#afe" to="#f3c" dur="2s" fill="freeze" begin="click+0.3s" />
  </circle>
</svg>
```

<showRun>
  <template #svgCode>
    <div>点一下👇</div>
    <svg width="500" height="500">    
      <circle cx="100" cy="100" r="50" fill="#7fd">
          <animate
            attributeName="r"
            from="50"
            to="100"
            dur="2s"
            fill="freeze"
            begin="click+0.3s"
          />
          <animate
            attributeName="fill"
            from="#afe"
            to="#f3c"
            dur="2s"
            fill="freeze"
            begin="click+0.3s"
          />
      </circle>
    </svg>
  </template>
</showRun>

## 四、三种动画实现效果

1. **基础动画(animate)**

`用基础动画做一个常见的往返动画`

```js
//沿直线来回走
// 开始时，添加begin=“0;toLeft.end”：0表示第一次直接执行，toLeft.end表示之后的每一次toLeft这个动画执行完毕后再执行。
// 返回时，添加begin=“toRight.end”：表示toRight这个动画执行完毕后再执行。
<svg width="500" height="500">
  <circle cx="100" cy="100" r="50" fill="#7fd">
    <animate id="toRight" attributeName="cx" from="100" to="300" dur="2s" begin="0;toLeft.end" fill="freeze" />
    <animate id="toLeft" attributeName="cx" from="300" to="100" dur="2s" begin="toRight.end + 1s" fill="freeze" />
  </circle>
</svg>
```

<showRun>
  <template #svgCode>
    <svg width="500" height="500">
      <circle cx="100" cy="100" r="50" fill="#7fd">
        <animate
          id="toRight"
          attributeName="cx"
          from="100"
          to="300"
          dur="2s"
          begin="0;toLeft.end"
          fill="freeze"
        />
        <animate
          id="toLeft"
          attributeName="cx"
          from="300"
          to="100"
          dur="2s"
          begin="toRight.end"
          fill="freeze"
        />
      </circle>
    </svg>
  </template>
</showRun>

2. **形变动画(animateTransform)**
   形变动画注意的点：

- `attributeName`的值永远是`transform`
- `type`的取值为`(traslate(平移)、rotate(旋转)、scale(缩放))`
- 如果同一个元素上有多个动画，且其 `attributeName` 一致，且在同一时间执行时，后面的动画会将前面的覆盖，因为 `animateTransform` 的值永远是`transform`，所以导致同一时间无法执行多个 `animateTransform`，如下：

```js
<svg>
  <rect width="100" height="50" fill="blue" stroke="red" stroke-width="4">
    <animateTransform
      id="rotateId"
      attributeName="transform"
      type="rotate"
      to="0"
      from="360"
      dur="1s"
      begin="click+0.2s"
    />
    <animateTransform attributeName="transform" type="scale" to="0" from="1" dur="1s" begin="rotateId.end" />
  </rect>
</svg>
```

<showRun>
  <template #svgCode>
    <svg>
      <rect width="100" height="50" fill="blue" stroke="red" stroke-width="4">
        <animateTransform
          id="scaleId"
          attributeName="transform"
          type="scale"
          from="0"
          to="1"
          dur="1s"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="1s"
          begin="scaleId.end"
        />
      </rect>
    </svg>
  </template>
</showRun>

3. **路径动画**
   `路径动画：可以让某一元素沿着某一路径运动，使用animateMotion标签`
   注意点：

- `path`属性：指定元素按照哪一路径执行。path 中的 M 起点是相对于矩形位置的。
- `rotate="auto"`:是动画沿着路径自动旋转

```js
<svg width="500" height="500" viewBox="-100 -100 500 500">
  <path d="M 0 0 C 0 300 300 300 300 0" stroke="#4a6" stroke-width="2" fill="none"></path>
  <rect x="0" y="0" width="40" height="40" fill="rgba(255,0,0,0.5)">
    <animateMotion path="M 0 0 C 0 300 300 300 300 0" dur="5s" begin="1s" fill="freeze" rotate="auto" />
  </rect>
</svg>
```

<showRun>
  <template #svgCode>
    <svg width="500" height="500" viewBox="-100 -100 500 500">
      <path d="M 0 0 C 0 300 300 300 300 0" stroke="#4a6" stroke-width="2" fill="none"></path>
      <rect x="0" y="0" width="40" height="40" fill="rgba(255,0,0,0.5)">
        <animateMotion
          path="M 0 0 C 0 300 300 300 300 0"
          dur="1s"
          begin="1s"
          fill="freeze"
          rotate="auto"
          restart
        />
      </rect>
    </svg>
  </template>
</showRun>

<script setup>
import showRun from '../../components/showRun.vue'
</script>
