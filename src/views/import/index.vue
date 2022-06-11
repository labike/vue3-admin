<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
import { batchFiles } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()

const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await batchFiles(updateData)
  ElMessage.success({
    type: 'success',
    message: results.length + i18n.t('message.excel.importSuccess')
  })
  router.push('/user/manage')
}

const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userinfo = {}
    Object.keys(item).forEach(key => {
      if (USER_RELATIONS[key] === 'openTime') {
        userinfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userinfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userinfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
