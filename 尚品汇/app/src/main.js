import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'

// 引入mock数据
import '@/mock/mockServer'

// 引入swiper和样式
import 'swiper/css/swiper.css'

// 注册全局组件————三级联动组件
import TypeNav from '@/components/TypeNav'
import MyCarousel from '@/components/MyCarousel'
import MyPagination from '@/components/MyPagination'

Vue.component('TypeNav', TypeNav)
Vue.component('MyCarousel', MyCarousel)
Vue.component('MyPagination', MyPagination)

import { MessageBox, Message } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

// import { reqCategoryList } from '@/api'
// reqCategoryList()

// 统一引入接口api文件夹里面全部请求函数
import * as API from '@/api'

new Vue({
  render: h => h(App),
  router,
  store,  // 注册store，组件实例的身上会多一个$store属性
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
