import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const points = store.getters.userinfo.permission.points

  if (value && value instanceof Array) {
    const hasPermission = points.some(point => {
      return value.includes(point)
    })

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('')
  }
}

export default {
  /**
   * 在绑定元素的伏组件被挂在之后调用
   */
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  /**
   * 在包含组件的vndoe及子组件vnode更新后调用
   */
  update(el, binding) {
    checkPermission(el, binding)
  }
}
