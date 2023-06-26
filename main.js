
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import TmTabBar from './components/tm-tab-bar/tm-tab-bar.vue'
import TmListItem from './components/tm-list-item/tm-list-item.vue'


Vue.component('tm-tab-bar', TmTabBar)
Vue.component('tm-list-item', TmListItem)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$baseUrl = "http://home.koolss.com:9090"
  // app.config.globalProperties.$baseUrl = "http://192.168.50.40:8080"
  app.config.globalProperties.$appId = "wx63e671fedd368bc5"
  return {
    app
  }
}
// #endif
