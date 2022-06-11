import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

const getters = {
  token: state => state.user.token,
  hashUserInfo: state => {
    return JSON.stringify(state.user.userinfo) !== '{}'
  },
  userinfo: state => state.user.userinfo,
  cssVar: state => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  sideBarOpened: state => state.app.sideBarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
}

export default getters
