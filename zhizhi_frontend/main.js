
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import { formatTime } from '@/utils/filters.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    formatTime
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif