/*
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 11:39:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/utils/request.js
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      return Promise.reject(new Error('token失效'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['Accept-Language'] = store.getters.language
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { code, msg, data } = response.data
  if (code === 1) {
    return data
  } else {
    ElMessage.error(msg)
    return Promise.reject(new Error(msg))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 401) {
    store.dispatch('user/logout')
  }
  ElMessage.error(error.msg)
  return Promise.reject(new Error(error))
})

export default service
