<template>
  <div class="">
    <el-card>
      <el-table
        :data="permissionListData"
        style="width: 100%"
        border
        :row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hashChildren: 'hashChildren'}"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('message.permission.name')"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('message.permission.mark')"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('message.permission.desc')"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const permissionListData = ref([])
const getPermissionList = async () => {
  permissionListData.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
