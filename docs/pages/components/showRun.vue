<template>
  <el-button v-if="!isRun" style="margin-bottom: 20px" type="success" @click="changeRunStatus">运行一下</el-button>
  <el-button v-else style="margin-bottom: 20px" type="success" @click="changeRunStatus">收起</el-button>
  <slot v-if="isRun" name="svgCode"></slot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isRun = ref<boolean>(false)
const emits = defineEmits(['changeRunStatus'])
const changeRunStatus = () => {
  isRun.value = !isRun.value
  emits('changeRunStatus', isRun.value)
}
</script>