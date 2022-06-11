<!--
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 11:48:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/App.vue
-->
<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'

const store = useStore()
generateNewStyle(store.getters.mainColor).then(newStyle => {
  writeNewStyle(newStyle)
})

watchSwitchLang(() => {
  if (store.getters.access_token) {
    // store.dispatch('user/getUserMenu')
  }
})
</script>

<style>
</style>
