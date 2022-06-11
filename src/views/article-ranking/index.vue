<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span>{{$t('message.article.dynamicTitle')}}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
          >
            {{item.label}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table
        ref="tableRef"
        :data="articleListData"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.prop === 'publicDate'" #default="{row}">
            {{$filters.relativeTime(row.publicDate)}}
          </template>
          <template v-else-if="item.prop === 'action'" #default="{row}">
            <el-button
              type="primary"
              @click="showClick(row)"
            >{{$t('message.article.show')}}</el-button>
            <el-button
              type="danger"
              @click="removeClick(row)"
            >{{$t('message.article.remove')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, next, pager, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { articleList, delArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { tableRef, initSortable } from './sort'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const articleListData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)
const getArticleData = async () => {
  const result = await articleList({
    page: page.value,
    size: size.value
  })

  articleListData.value = result.list
  total.value = result.total
}
getArticleData()
watchSwitchLang(getArticleData)
onActivated(getArticleData)

const i18n = useI18n()
const removeClick = async (row) => {
  ElMessageBox.confirm(
    i18n.t('message.article.dialogTitle1') +
    row.title +
    i18n.t('message.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await delArticle(row._id)
    ElMessage.success(i18n.t('message.article.removeSuccess'))
    getArticleData()
  })
}

const router = useRouter()
const showClick = (row) => {
  router.push(`/article/${row._id}`)
}

const handleSizeChange = currentSize => {
  size.value = currentSize
  getArticleData()
}
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getArticleData()
}

onMounted(() => {
  initSortable(articleListData, getArticleData)
})
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
