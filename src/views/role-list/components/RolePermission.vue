<!--
 * @Author: your name
 * @Date: 2021-12-10 09:13:28
 * @LastEditTime: 2021-12-10 09:13:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/role-list/components/RolePermission.vue
-->
<template>
  <el-dialog
    :title="$t('message.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="rolePermissionData"
      :props="defaultProps"
      node-key="id"
      check-strictly
      default-expand-all
      show-checkbox
    >

    </el-tree>
    <template #footer>
      <div>
        <el-button
          @click="closed"
        >
          {{$t('message.universal.cancel')}}
        </el-button>
        <el-button
          type="primary"
          @click="onConfirm"
        >
          {{$t('message.universal.confirm')}}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { currentRolePermission, permissionList, updateCurrentRolePermission } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    requried: true
  },
  roleId: {
    type: String,
    requried: true
  }
})

const treeRef = ref(null)
const emits = defineEmits(['update:modelValue', 'updateRole'])

/**
 * 所有权限
 */
const rolePermissionData = ref([])
const getRolePermissionList = async () => {
  rolePermissionData.value = await permissionList()
  console.log(rolePermissionData.value)
}
getRolePermissionList()
watchSwitchLang(getRolePermissionList)

/**
 * 当前角色权限
 */
const currentRolePermissionList = ref([])
const getCurrentRolesPermission = async () => {
  const checkedKeys = await currentRolePermission(props.roleId)
  currentRolePermissionList.value = treeRef.value.setCheckedKeys(checkedKeys)
}
watch(() => props.roleId, val => {
  if (val) {
    getCurrentRolesPermission()
  }
})

const closed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
const onConfirm = async () => {
  await updateCurrentRolePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('message.role.updateRoleSuccess'))
  emits('updateRole')
  closed()
}

</script>

<style lang="scss" scoped>

</style>
