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

if (document.documentElement.clientWidth > 500) {
  window.alert('请使用手机打开本页面，以保证浏览效果')
  const img = document.createElement('img')
  img.src = "./qrcode.png"
  document.body.appendChild(img)
  img.style.position = 'fixed'
  img.style.left = '50%'
  img.style.top = '50%'
  img.style.transform = 'translate(-50% , -50%)'
  img.style.boxShadow = '0 0 18px #c4c4c4'
}