import request from '@/utils/request'
import api from './index'

export const articleList = (params) => {
  return request({
    url: api.ArticleList,
    params
  })
}

export const dropArticle = (params) => {
  return request({
    url: api.DropArticle,
    method: 'POST',
    data: params
  })
}

export const delArticle = (params) => {
  return request({
    url: api.DelArticle + `/${params}`
  })
}

export const detailArticle = (params) => {
  return request({
    url: api.DetailArticle + `/${params}`
  })
}

export const createArticle = (params) => {
  return request({
    url: api.CreateArticle,
    method: 'POST',
    data: params
  })
}

export const changeArticle = (params) => {
  return request({
    url: api.EditArticle,
    method: 'POST',
    data: params
  })
}
