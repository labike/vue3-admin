import i18n from '@/i18n'

const t = i18n.global.t

export default () => [
  {
    label: t('message.article.ranking'),
    prop: 'ranking'
  },
  {
    label: t('message.article.title'),
    prop: 'title'
  },
  {
    label: t('message.article.author'),
    prop: 'author'
  },
  {
    label: t('message.article.publicDate'),
    prop: 'publicDate'
  },
  {
    label: t('message.article.desc'),
    prop: 'desc'
  },
  {
    label: t('message.article.action'),
    prop: 'action'
  }
]
