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

// 利用 Vite 的 URL 方法确保音频源正确
const audio = ref(new Audio(new URL(props.src, import.meta.url).href));

const playAudio = () => {
  console.log('播放音频');
  audio.value.currentTime = 0; // 重置音频时间
  audio.value.play().catch(error => {
    console.error('音频播放失败:', error);
  });
};
</script>

<style scoped>
.speak-word {
  cursor: pointer;
  color: rgb(0, 0, 0);
  background-color: rgba(255, 204, 203, 0.5); /* 背景透明度为0.1 */
  padding: 5px; /* 增加内边距 */
  border-radius: 5px; /* 圆角效果 */
}
</style>