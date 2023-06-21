
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import TmTabBar from './components/tm-tab-bar/tm-tab-bar.vue'


Vue.component('tm-tab-bar', TmTabBar)


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
  app.config.globalProperties.$appId = "wx63e671fedd368bc5"
  return {
    app
  }
}
// #endif
