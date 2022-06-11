<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"></el-avatar>
    </div>
    <el-scrollbar>
      <side-bar-menu></side-bar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SideBarMenu from './SideBarMenu.vue'

const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-avatar {
    --el-avatar-background-color: none;
    margin-right: 12px;
  }
}
</style>
