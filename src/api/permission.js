import request from '@/utils/request'
import api from './index'

export const permissionList = () => {
  return request({
    url: api.PermissionList
  })
}

export const currentRolePermission = (params) => {
  return request({
    url: api.CurrentRolePermissionList + `/${params}`
  })
}

export const updateCurrentRolePermission = data => {
  return request({
    url: api.UpdateCurrentRolePermission,
    method: 'POST',
    data
  })
}
