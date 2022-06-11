<!--
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 10:38:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/profile/index.vue
-->
<template>
  <div class="my-container">
    <el-row>
      <!-- <el-col :span="6">
        <introduce class="introduce" :features="featureData" />
      </el-col> -->
      <el-col :span="24">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('message.profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('message.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('message.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import Introduce from './components/Introduce'
import Chapter from './components/Chapter'
import Author from './components/Author'
import Feature from './components/Feature'
import { feature as featureApi } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const activeName = ref('feature')

const featureData = ref([])
const getProfile = async () => {
  featureData.value = await featureApi()
}
getProfile()
watchSwitchLang(getProfile)
</script>

<style lang="scss" scoped>
.my-container {
  .introduce {
    margin-right: 20px;
  }
}
</style>
