import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'

// Vue.config.productionTip = false


//声明Layout为全局组件，谁要用谁用
Vue.component('Layout', Layout)
Vue.component('Nav', Nav)
Vue.component('Icon', Icon)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
