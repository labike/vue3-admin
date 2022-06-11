<template>
  <el-drawer
    v-model="drawer"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
    :model-value="modelValue"
    @click="closed"
  >
    <el-card>
      <el-button :loading="loading" type="primary" v-print="printObj">{{ $t('message.userInfo.print') }}</el-button>
    </el-card>
    <el-card id="userInfoBox">
      <el-descriptions :title="$t('messaage.userInfo.title')">
        <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
        <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </el-drawer>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { detailManage } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['upadte:props.modelValue'])
const closed = () => {
  emits('upadte:props.modelValue', false)
}

const detail = ref({})
const getDetail = async () => {
  detail.value = await detailManage(props.id)
}
getDetail()
watchSwitchLang(getDetail)

const loading = ref(false)
const printObj = {
  id: 'userInfoBox',
  popTitle: 'admin',
  beforeOpenCb() {
    loading.value = true
  },
  openCb() {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>

</style>
