<template>
  <div class="">
    <el-card>
      <el-table
        :data="roleListData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          :label="$t('message.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('message.role.name')"
          prop="title"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('message.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column
          :label="$t('message.role.action')"
          width="200"
          #default="{row}"
        >
          <el-button
            type="primary"
            size="mini"
            @click="handlePermission(row)"
            v-permission="['distributePermission']"
          >
            {{ $t('message.role.assignPermissions')}}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <role-permission v-model="showRoleDialog" :roleId="selectId" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import RolePermission from './components/RolePermission'

const roleListData = ref([])
const getRoleList = async () => {
  roleListData.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

const showRoleDialog = ref(false)
const selectId = ref('')
const handlePermission = (row) => {
  showRoleDialog.value = true
  selectId.value = row.id
}

</script>

<style lang="scss" scoped></style>
