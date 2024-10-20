<template>
  <div class="home-page">
    <div class="home-banner">
      <img :src="bannerBackImg" alt="" />
      <div class="banner-mask"></div>
      <div class="banner-text">
        <div class="banner-title">
          {{ bannerText }}
          <span class="cursor-span">_</span>
        </div>
      </div>
      <div></div>
    </div>
    <div class="home-content">哈哈哈哈</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import bannerBackImg from '/image/bannerBackImg1.jpg'
const bannerText = ref<string>('')

const typewriter = (str: string) => {
  const strList = str.split('')
  setInterval(() => {
    strList.length && (bannerText.value += strList.shift())
  }, 200)
}
typewriter('欢迎来到阿峰的小破站')
</script>

<style lang="less" scoped>
.home-page {
  .home-banner {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .banner-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #000;
      opacity: 0.5;
    }
    .banner-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: url(../../../public/image/bannerBackImg1.jpg) no-repeat center/cover;
      background-size: auto 100vh;
      background-clip: text;
      .banner-title {
        width: 100%;
        height: 100%;
        text-align: center;
        align-content: center;
        font-size: 80px;
        font-weight: bold;
        color: transparent;
        -webkit-text-stroke: 1px #fff;
        z-index: 2;
        cursor: pointer;
        .cursor-span {
          color: #fff;
          animation: cursorSpanAnimation 1s forwards infinite;
          opacity: 0;
        }
        @keyframes cursorSpanAnimation {
          0% {
            opacity: 0;
          }
          1% {
            opacity: 1;
          }
          49% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          99% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
