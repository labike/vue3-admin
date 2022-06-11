const step = i18n => {
  return [
    {
      element: '#guide-start',
      popver: {
        title: i18n.t('message.guide.guideTitle'),
        description: i18n.t('message.guide.guideDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18n.t('message.guide.hamburgerTitle'),
        description: i18n.t('message.guide.hamburgerDesc')
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: i18n.t('message.guide.breadcrumbTitle'),
        description: i18n.t('message.guide.breadcrumbDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18n.t('message.guide.searchTitle'),
        description: i18n.t('message.guide.searchDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18n.t('message.guide.fullTitle'),
        description: i18n.t('message.guide.fullDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: i18n.t('message.guide.themeTitle'),
        description: i18n.t('message.guide.themeDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18n.t('message.guide.langTitle'),
        description: i18n.t('message.guide.langDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: i18n.t('message.guide.tagTitle'),
        description: i18n.t('message.guide.tagDesc')
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18n.t('message.guide.sidebarTitle'),
        description: i18n.t('message.guide.sidebarDesc'),
        position: 'right-center'
      }
    }
  ]
}

export default step
