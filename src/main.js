import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes';

import SmartTable from 'vuejs-smart-table'
Vue.use(SmartTable)
Vue.use(VueRouter)
const router = new VueRouter({ routes });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
