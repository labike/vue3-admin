import { createArticle, changeArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const t = i18n.global.t

export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('message.article.createSuccess'))
  return res
}

export const editArticle = async (data) => {
  const res = await changeArticle(data)
  ElMessage.success(t('message.article.editorSuccess'))
  return res
}
