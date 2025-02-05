# svg动画实战
`前面我们已经能掌握svg以及svg的基本知识了，接下来我们来利用svg做一些实用性的动画`
## 一、描边动画!
`我们在日常开发中经常会见到这种的描边图标，下面我们用svg来实现一下`
<image class="svg-animation" src="./assets/svgAnimation.gif" />

1. **原理**
- `stroke-dasharray`：将描边线变成虚线、其中实线和虚线部分的长度就是它的值，当`stroke-dasharray`与`path`长度一致时就变成了实线。
- `stroke-dashoffset`：描边线的偏移量。为正数时往左偏移。
- 由此我们可以想到：如果将`stroke-dasharray`设置为和`path`长度，变为实线后再通过`stroke-dashoffset`的偏移就可以实现描边动画
- 实现如下：
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .p {
        /* --l 为变量，通过 js 动态获取 */
        stroke-dasharray: var(--l);
        stroke-dashoffset: var(--l);
        /* forwards当动画完成后，保持最后一帧的状态 */
        animation: stroke 2s forwards;
      }
      @keyframes stroke {
        to {
          stroke-dashoffset: 0;
        }
      }
    </style>
  </head>
  <body>
    <svg class="icon" viewBox="0 0 1024 1024" width="200" height="200">
      <path
        class="myPathAnimation"
        d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0zM213.333 832A298.667 298.667 0 0 1 512 533.333a170.667 170.667 0 1 1 170.667-170.666A170.667 170.667 0 0 1 512 533.333 298.667 298.667 0 0 1 810.667 832z"
        fill="none"
        stroke="red"
        stroke-width="10"
        stroke-linecap="round"
      />
    </svg>
  </body>

  <script>
    const path = document.getElementsByClassName('myPathAnimation')[0]
    // getTotalLength可以获取path的总长度
    const len = path.getTotalLength() + 1;
    path.style.setProperty("--l", len);
  </script>
</html>
```


<showRun @changeRunStatus="changeRunStatus">
  <template #svgCode>
    <svg class="icon" viewBox="0 0 1024 1024" width="200" height="200">
      <path
        class="myPathAnimation"
        d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0zM213.333 832A298.667 298.667 0 0 1 512 533.333a170.667 170.667 0 1 1 170.667-170.666A170.667 170.667 0 0 1 512 533.333 298.667 298.667 0 0 1 810.667 832z"
        fill="none"
        stroke="red"
        stroke-width="10"
        stroke-linecap="round"
      />
    </svg>
  </template>
</showRun>

<script setup>
  import { onMounted, nextTick } from 'vue'
  import showRun from '../../components/showRun.vue'
  const changeRunStatus = (status) => {
    if (status) {
      setTimeout(() => {
        const path = document.getElementsByClassName('myPathAnimation')[0]
        // getTotalLength可以获取path的总长度
        const len = path.getTotalLength() + 1;
        path.style.setProperty("--l", len);
      });
    }
  }
</script>

<style>
  .svg-animation {
    width: 50px;
  }
  .myPathAnimation {
    /* --l 为变量，通过 js 动态获取 */
    stroke-dasharray: var(--l);
    stroke-dashoffset: var(--l);
    /* forwards当动画完成后，保持最后一帧的状态 */
    animation: stroke 2s forwards;
  }
  @keyframes stroke {
    to {
      stroke-dashoffset: 0
    }
  }
</style>