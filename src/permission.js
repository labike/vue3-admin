/*
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 13:48:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/permission.js
 */
import router from '@/router'
import store from '@/store'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果没有用户信息则去获取用户信息
      if (store.getters.hashUserInfo) {
        // 然后拿到该用户的权限
        // const { permission } = await store.dispatch('user/getUserMenu')
        // 筛选出需要添加的权限
        // const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)
        // 动态添加路由
        const menus = await store.dispatch('user/getUserMenu')
        const filterRoutes = await store.dispatch('permission/filterRoutes', menus)
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
