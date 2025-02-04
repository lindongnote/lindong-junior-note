<script setup lang="ts">
import TEST from '@theme/components/Speak.vue';
import Speak from '@theme/components/Speak.vue';
</script>



# Speak 组件示例

这个文档展示了如何使用 `Speak.vue` 组件。

## 安装
<TEST />

确保你已经在项目中包含了 `Speak.vue` 组件。

## 使用方法

在你的父组件中，可以这样使用 `Speak` 组件：
<Speak src="/english/PEP25/G7Vol1/SU1/SectionA/assets/audio/greet-sen1.mp3">点击我</Speak>

```vue
<template>
  <div>
    <h1>欢迎使用 Speak 组件</h1>
    <Speak src="/path/to/your/audio/file.mp3">点击我播放音频</Speak>
  </div>
</template>

<script setup>
import Speak from '../../../../.vitepress/theme/components/Speak.vue';
</script>
```

## 说明

- `src` 属性：你必须传递一个有效的音频文件路径。
- 组件内部会创建一个音频对象，当你点击文本时，会播放音频。

