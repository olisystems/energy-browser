import Vue from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import VTooltip from 'v-tooltip'
import VueRouter from 'vue-router'
import routes from './routes';

import './assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook, faTwitter, faGithub, faLinkedin)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(SmartTable)
Vue.use(VTooltip)
Vue.use(VueRouter)


import 'v-tooltip/dist/v-tooltip.css'

const router = new VueRouter({ mode: 'history', routes });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
