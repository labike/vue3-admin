<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="importExcel" v-permission="['importUser']">
          {{$t('message.excel.importExcel')}}
        </el-button>
        <el-button type="success" @click="exportExcel">
          {{$t('message.excel.exportExcel')}}
        </el-button>
      </div>
    </el-card>

    <el-card>
      <el-table
        :data="managerListData"
        border
        style="width: 100%"
      >
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="username" :label="$t('message.excel.name')"></el-table-column>
        <el-table-column prop="mobile" :label="$t('message.excel.mobile')"></el-table-column>
        <el-table-column align="center" :label="$t('message.excel.avatar')">
          <template v-slot="{row}">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('message.excel.role')">
          <template #default="{row}">
            <div v-if="row.role && row.role.length">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">
                {{item.title}}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('message.excel.defaultRole')}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('message.excel.openTime')">
          <template #default="{row}">
            {{$filters.dateFilter(row.openTime) || row.openTime}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('message.excel.action')" fixed="right" width="300">
          <template #default="{row}">
            <el-button @click="lookDetail(row)" type="primary" size="mini">{{$t('message.excel.show')}}</el-button>
            <el-button v-permission="['distributeRole']" @click="onShowRoles(row)" type="info" size="mini">{{$t('message.excel.showRole')}}</el-button>
            <el-button v-permission="['removeRole']" @click="removeManage(row)" type="danger" size="mini">{{$t('message.excel.remove')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 10, 20]"
        layout="total, size, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <export-file v-model="exportFileVisible"></export-file>
    <!-- <detail v-mdoel="showDetail" :userId="detailUserId"></detail> -->
    <roles-dialog
      v-model="rolesVisible"
      :userId="selectUserId"
      @updateRole="managerList"
    ></roles-dialog>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { getUserManager, delManage } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportFile from './components/exportFile.vue'
// import Detail from './components/detail.vue'
import RolesDialog from './components/roles.vue'

const managerListData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
const exportFileVisible = ref(false)
const showDetail = ref(false)
const rolesVisible = ref(false)

const managerList = async () => {
  const result = await getUserManager({
    page: page.value,
    size: size.value
  })
  managerListData.value = result.list
  total.value = result.total
}

const detailUserId = ref('')
const lookDetail = row => {
  showDetail.value = true
  detailUserId.value = row._id
}

const handleSizeChange = currentSize => {
  size.value = currentSize
  managerList()
}

const handleCurrentChange = currentPage => {
  page.value = currentPage
  managerList()
}
managerList()
watchSwitchLang(managerList)
onActivated(managerList)

const router = useRouter()
const importExcel = () => {
  router.push('/user/import')
}

const i18n = useI18n()
const removeManage = row => {
  ElMessageBox.confirm(
    i18n.t('message.excel.dialogTitle1') + row.username + i18n.t('message.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await delManage(row._id)
    ElMessage.success(i18n.t('message.excel.removeSuccess'))
    managerList()
  })
}

/**
 * 导出
 */
const exportExcel = () => {
  exportFileVisible.value = true
}

const selectUserId = ref('')
const onShowRoles = row => {
  rolesVisible.value = true
  selectUserId.value = row._id
}

watch(rolesVisible, val => {
  if (!val) selectUserId.value = ''
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
