/*
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 11:33:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/api/sys.js
 */
import request from '@/utils/request'
import api from './index'
import qs from 'qs'

export const login = data => {
  return request({
    url: api.Login,
    method: 'POST',
    data: qs.stringify(data)
  })
}

export const getUserMenu = params => {
  return request({
    url: api.Menu,
    method: 'GET',
    params
  })
}
