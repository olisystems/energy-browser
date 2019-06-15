import Vue from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import VueRouter from 'vue-router'
import routes from './routes';

import './assets/css/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook, faTwitter, faGithub)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(SmartTable)
Vue.use(VueRouter)
const router = new VueRouter({ routes });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
