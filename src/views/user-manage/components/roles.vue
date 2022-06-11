<template>
  <el-dialog
    :title="$t('message.role.dialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group
      v-model="currentRoleList"
    >
      <el-checkbox
        v-for="item in roleListData"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
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
import { roleList } from '@/api/role'
import { currentRoles, updateRoles } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    requried: true
  },
  userId: {
    type: String,
    requried: true
  }
})

const emits = defineEmits(['update:modelValue', 'updateRole'])

const roleListData = ref([])
const getRoleList = async () => {
  roleListData.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

const currentRoleList = ref([])
const getCurrentRoles = async () => {
  const result = await currentRoles(props.userId)
  currentRoleList.value = result.role.map(item => item.title)
}
watch(() => props.userId, val => {
  if (val) {
    getCurrentRoles()
  }
})

const closed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
const onConfirm = async () => {
  const roles = currentRoleList.value.map(title => {
    return roleListData.value.find(role => role.title === title)
  })

  await updateRoles(props.userId, roles)
  ElMessage.success(i18n.t('message.role.updateRoleSuccess'))
  emits('updateRole')
  closed()
}

</script>

<style lang="scss" scoped>

</style>
