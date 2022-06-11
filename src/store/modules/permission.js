/*
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 13:53:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/store/modules/permission.js
 */
import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // 初始时拥有的路由表
    routes: publicRoutes
  }),
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes({ commit }, menus) {
      const routes = []
      console.log('menus', menus)

      menus.forEach(key => {
        routes.push(...privateRoutes.filter(item => item.en_name === key))
      })

      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      commit('setRoutes', routes)
      console.log('routes', routes)

      return routes
    }
  }
}
