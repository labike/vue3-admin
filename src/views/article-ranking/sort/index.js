import Sortable from 'sortablejs'
import { ref } from 'vue'
import { dropArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelector(
    '.el-table__body-wrapper > table > tbody'
  )
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      await dropArticle({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success(i18n.global.t('message.article.sortSuccess'))
      tableData.value = []
      cb && cb()
    }
  })
}
