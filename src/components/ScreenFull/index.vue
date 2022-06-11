<!--
 * @Author: your name
 * @Date: 2021-12-08 19:18:26
 * @LastEditTime: 2021-12-08 19:18:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEvbase
 * @FilePath: /vue3-admin/src/components/ScreenFull/index.vue
-->
<template>
  <div @click="onToggle">
    <svg-icon id="guide-full" :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isFullScreen = ref(false)

const onToggle = () => {
  screenfull.toggle()
}

const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}

// 监听screenfull变化
onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped>

</style>
