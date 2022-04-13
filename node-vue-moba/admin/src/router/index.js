import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
// import CategoryEdit from '@/views/CategoryEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
    children: [
      {
        path: '/categories/create',
        component: () => import ('@/views/CategoryEdit')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
