import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'

Vue.config.productionTip = false


Vue.component('Layout', Layout) //声明Layout为全局组件，谁要用谁用
Vue.component('Nav', Nav) //声明Nav为全局组件，谁要用谁用


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
