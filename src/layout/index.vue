<!--
 * @Author: your name
 * @Date: 2021-12-02 16:25:57
 * @LastEditTime: 2021-12-10 09:09:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/layout/index.vue
-->
<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sideBarOpened ? 'openSideBar' : 'hideSideBar']"
  >
    <side-bar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{backgroundColor: $store.getters.cssVar.menuBg}"
    ></side-bar>
    <div class="main-container">
      <div
        class="fixed-header"
      >
        <nav-bar />
        <tags-view id="guide-tags"></tags-view>
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/sidebar'
import AppMain from './components/AppMain.vue'
import TagsView from '@/components/TagsView'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSideBar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}

</style>
