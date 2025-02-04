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

const audio = ref(new Audio(props.src));

const playAudio = () => {
  console.log('播放音频');
  audio.value.currentTime = 0; // 重置音频时间
  audio.value.play();
};
</script>

<style scoped>
.speak-word {
  cursor: pointer;
  color: rgb(255,255, 0);
  padding: 5px; /* 增加内边距 */
  border-radius: 5px; /* 圆角效果 */
}
</style>