/*
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 11:35:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/api/index.js
 */
const api = {
  Login: '/login',
  Menu: '/menu', // 登录获取菜单
  Feature: '/user/feature',
  Chapter: '/user/chapter',
  UserManagerList: '/user-manage/list',
  BatchFile: '/user-manage/batch/import',
  DelManage: '/user-manage/detele',
  AllManage: '/user-manage/all-list',
  DetailManage: '/user-manage/detail',
  RoleList: '/role/list',
  PermissionList: '/permission/list',
  CurrentRoles: '/user-manage/role',
  UpdateRoles: '/user-manage/update-role',
  CurrentRolePermissionList: '/role/permission',
  UpdateCurrentRolePermission: '/role/distribute-permission',
  ArticleList: '/article/list',
  DropArticle: '/article/sort',
  DelArticle: '/article/delete',
  DetailArticle: '/article',
  CreateArticle: '/article/create',
  EditArticle: '/article/edit'
}

export default api
