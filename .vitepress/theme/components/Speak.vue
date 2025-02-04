<template>
  <span @click="playAudio" class="speak-word">
    🔊
    <slot></slot>
  </span>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  }
});

// 使用动态 URL 处理音频文件路径
const aUrl = new URL(props.src, import.meta.url).href;
const audio = ref(new Audio(aUrl));

const playAudio = () => {
  console.log('准备播放音频:', aUrl);
  
  // 验证音频源的有效性
  if (!props.src) {
    console.error('音频源未定义');
    console.error(props);
    return;
  }

  audio.value.currentTime = 0; // 重置音频时间
  audio.value.play().catch(error => {
    console.error('音频播放失败:', error);
  });
};
</script>

<style scoped>
.speak-word {
  cursor: pointer;
  color: rgb(255, 255, 0);
  background-color: rgba(255, 204, 203, 0.1); /* 背景透明度为0.1 */
  padding: 5px; /* 增加内边距 */
  border-radius: 5px; /* 圆角效果 */
}
</style>