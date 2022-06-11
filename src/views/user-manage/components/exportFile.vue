<template>
  <el-dialog
    :title="$t('message.excel.title')"
    :model-value="modelValue"
    @click="closed"
    width="30%"
  >
    <el-input
      :placeholder="$t('message.excel.placeholder')"
      type="text"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{$t('message.excel.close')}}</el-button>
        <el-button :loading="loading" type="primary" @click="confirm">{{$t('message.excel.confirm')}}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { allManage } from '@/api/user'
import { USER_RELATIONS } from './export2Json'
import { dateFilter } from '@/filter'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const loading = ref(false)

const i18n = useI18n()
let exportDefaultName = i18n.t('message.excel.defaultName')
const excelName = ref('')
watchSwitchLang(() => {
  exportDefaultName = i18n.t('message.excel.defaultName')
  excelName.value = exportDefaultName
})

const emits = defineEmits(['update:modelValue'])

const closed = () => {
  emits('update:modelValue', false)
}

const confirm = async () => {
  loading.value = true
  const result = (await allManage()).list

  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, result)
  console.log(data)
  excel.export_json_to_excel({
    headers: Object.keys(USER_RELATIONS),
    data,
    filename: excelName.value || exportDefaultName
  })

  closed()
}

/**
 * 转化为二维数组
 */
const formatJson = (headers, rows) => {
  return rows.map(item => {
    return Object.keys(headers).map(key => {
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map(role => role.title))
      }
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped>

</style>
