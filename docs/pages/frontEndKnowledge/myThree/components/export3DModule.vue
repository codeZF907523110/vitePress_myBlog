<template>
  <div>
    <canvas width="1200" height="600" id="myCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue'
import spiderManAction from './spiderManAction'

onMounted(() => {
  const canvasDom: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement
  spiderManAction.init(canvasDom)
  spiderManAction.onAction()
})
</script>

<style lang="less" scoped>
#myCanvas {
  border: 1px solid pink;
  cursor: none;
  position: fixed;
  width: 100% !important;
  height: 100% !important;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>
