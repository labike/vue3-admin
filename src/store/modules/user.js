/*
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 11:46:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/store/modules/user.js
 */
import { login, getUserMenu } from '@/api/sys'
// import md5 from 'md5'
import { setItem, getItem, removeAll } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp, parseUserInfo } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userinfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        // 如果密码需要加密使用md5(password)
        login({ username, password: password }).then(data => {
          this.commit('user/setToken', data.access_token)
          const info = parseUserInfo(data.access_token)
          this.commit('user/setUserInfo', info)
          setTimeStamp()
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    async getUserMenu(context) {
      const res = await getUserMenu()
      // this.commit('user/setUserMenu', res)
      return res
    },
    logout() {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAll()
      router.push('/login')
    }
  }
}
