import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import dateFilter from './filters/date.filter'
import '@babel/polyfill'

Vue.config.productionTip = false
Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
