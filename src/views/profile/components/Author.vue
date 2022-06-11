<!--
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 11:26:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/profile/components/Author.vue
-->
<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="用户名">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="phone"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
console.log(store.getters.userinfo)
const username = ref(store.getters.userinfo.username)
const phone = ref(store.getters.userinfo.phone)
</script>

<style lang="scss" scoped>

</style>
