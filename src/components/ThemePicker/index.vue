<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip :content="$t('message.navBar.themeChange')">
        <svg-icon id="guide-theme" icon="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('message.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

const selectColorVisible = ref(false)

const handleSetTheme = command => {
  selectColorVisible.value = true
}

</script>

<style lang="scss" scoped>
::v-deep .content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
