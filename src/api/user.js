import request from '@/utils/request'
import api from './index'

export const feature = () => {
  return request({
    url: api.Feature
  })
}

export const chapter = () => {
  return request({
    url: api.Chapter
  })
}

export const getUserManager = (params) => {
  return request({
    url: api.UserManagerList,
    params
  })
}

export const batchFiles = (params) => {
  return request({
    url: api.BatchFile,
    method: 'POST',
    data: params
  })
}

export const delManage = (params) => {
  return request({
    url: api.DelManage + `/${params}`
  })
}

export const allManage = (params) => {
  return request({
    url: api.AllManage
  })
}

export const detailManage = (params) => {
  return request({
    url: api.DetailManage + `/${params}`
  })
}

export const currentRoles = (params) => {
  return request({
    url: api.CurrentRoles + `/${params}`
  })
}

export const updateRoles = (id, roles) => {
  return request({
    url: api.UpdateRoles + `/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
