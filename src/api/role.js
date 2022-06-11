import request from '@/utils/request'
import api from './index'

export const roleList = () => {
  return request({
    url: api.RoleList
  })
}
