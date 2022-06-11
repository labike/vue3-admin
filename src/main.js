import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import i18n from './i18n'
import installIcons from '@/icons'
import router from './router'
import store from './store'
import './permission'
import installFilter from '@/filter'
import installDirective from '@/directive'

import './styles/index.scss'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(i18n).use(store).use(router).mount('#app')
