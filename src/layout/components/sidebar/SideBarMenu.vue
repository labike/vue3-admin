<!--
 * @Author: your name
 * @Date: 2021-12-03 21:48:22
 * @LastEditTime: 2021-12-18 10:15:29
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/layout/components/sidebar/SideBarMenu.vue
-->
<template>
  <el-menu
    :collapse="!$store.getters.sideBarOpened"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
    :default-active="activeMenu"
  >
    <side-bar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></side-bar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenu } from '@/utils/routes'
import SideBarItem from './SideBarItem'

const router = useRouter()
const routes = computed(() => {
  const filterAllRoutes = filterRoutes(router.getRoutes())
  return generateMenu(filterAllRoutes)
})
const route = useRoute()
const activeMenu = computed(() => {
  const { path, meta } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss" scoped>

</style>
