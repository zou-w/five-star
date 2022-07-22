import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import 'lib-flexible'
import './assets/fonts/iconfont.css'

// 导入NProgress 包对应的js和css
import NProgress from 'nprogress'

import axios from 'axios'
axios.defaults.baseURL = ''
// 在request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须返回config
  return config
})
// 在response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
