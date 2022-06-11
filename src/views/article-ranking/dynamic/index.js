import DynamicData from './dynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

export const dynamicData = ref(DynamicData())
watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initiSelectSynamicLabel()
})

export const selectDynamicLabel = ref([])
const initiSelectSynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map(item => item.label)
}
initiSelectSynamicLabel()

export const tableColumns = ref([])
watch(selectDynamicLabel, val => {
  tableColumns.value = []
  const selectData = dynamicData.value.filter(item => {
    return val.includes(item.label)
  })
  tableColumns.value.push(...selectData)
}, {
  immediate: true
})
