
.banner-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .banner-title {
    width: 100%;
    height: auto;
    text-align: center;
    font-size: 80px;
    font-weight: bold;
    color: transparent; // 设置文字颜色为透明
    background: url(../../../public/image/BlogBackGround.jpg) no-repeat center/cover; // 背景图片
    -webkit-background-clip: text; // 兼容 Webkit 浏览器
    background-clip: text; // 将背景限制在文字区域内
    -webkit-text-stroke: 1px #fff; // 添加描边以增强可读性
    z-index: 2;
    cursor: pointer;
    padding: 0 20px;

    // 增加行高以优化文本垂直居中效果
    line-height: 1.2;

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


/* 移动端适配 */
@media (max-width: 768px) {
  .home-page {
    .home-banner {
      .banner-text {
        .banner-title {
          font-size: 40px;
          -webkit-text-stroke: 0.5px #fff;

          // 确保在较小屏幕上的文字清晰度
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}

/* 手机端适配 */
@media (max-width: 480px) {
  .home-page {
    .home-banner {
      .banner-text {
        .banner-title {
          font-size: 30px;
          -webkit-text-stroke: 0.5px #fff;
          word-break: break-word;
          white-space: normal;

          // 进一步优化小屏幕上的文字显示
          letter-spacing: 0.5px;
        }
      }
    }
  }
}
