import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 10000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [data => Qs.stringify(data)]
})
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
