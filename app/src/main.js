import Vue from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import VTooltip from 'v-tooltip'
import VueRouter from 'vue-router'
import routes from './routes';
// import Web3Plugin from './plugins/vue-web3-plugin'

import './assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook, faTwitter, faGithub)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(SmartTable)
Vue.use(VTooltip)
Vue.use(VueRouter)
// Vue.use(Web3Plugin, { url: "ws://80.158.47.134:7546" })

import 'v-tooltip/dist/v-tooltip.css'

const router = new VueRouter({ mode: 'history', routes });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
