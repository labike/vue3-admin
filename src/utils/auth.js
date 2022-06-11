/*
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 10:28:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/utils/auth.js
 */
import { getItem, setItem } from '@/utils/storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'

export function getTimeStamp() {
  return getItem(TIME_STAMP, Date.now())
}

export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

export function isCheckTimeout() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}

export function parseUserInfo(data) {
  const token = data.split('.')[1]
  const Base64 = require('js-base64').Base64
  const info = JSON.parse(Base64.decode(token))
  return JSON.parse(info.sub)
}
