<!--
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 11:28:03
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/profile/components/Feature.vue
-->
<template>
  <el-collapse v-model="activeName" accordion>
    <!-- <el-collapse-item
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item> -->
    <el-empty :image-size="200"></el-empty>
  </el-collapse>
</template>

<script setup>
import { defineProps, ref } from 'vue'

defineProps({
  features: {
    type: Array,
    required: true
  }
})

const activeName = ref(0)
</script>

<style lang="scss" scoped>

</style>
