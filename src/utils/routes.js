import path from 'path'

const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * @param {*} routes
 * 过滤掉嵌套路由中的路由出现在外层路由中
 */
export const filterRoutes = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

export const generateMenu = (routes, basePath = '') => {
  const result = []
  routes.forEach(item => {
    if (isNull(item.children) && isNull(item.meta)) return
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenu(item.children))
      return
    }
    const routePath = path.resolve(basePath, item.path)
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    if (!isNull(item.children)) {
      route.children.push(...generateMenu(item.children, route.path))
    }
  })
  return result
}
