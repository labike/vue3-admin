import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
import UserManageRouter from './modules/UserManage'
import RoleListRouter from './modules/RoleList'
import PermissionListRouter from './modules/PermissionList'
import ArticleRouter from './modules/Article'
import ArticleCreaterRouter from './modules/ArticleCreate'
import store from '@/store'

/**
 * 私有路由
 */
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter
]

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/401')
      }
    ]
  }
]

/**
 * 重置路由表
 */
export function resetRouter() {
  if (
    store.getters.userinfo &&
    store.getters.userinfo.permission &&
    store.getters.userinfo.permission.menus
  ) {
    const menus = store.getters.userinfo.permission.menus
    menus.forEach(menu => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
