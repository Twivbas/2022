import Cookies from 'js-cookie'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'
import { getAdminInfoApi } from '../request/api'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  /* {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../views/homepage/homepage.vue')
  }, */
  /* {
    path: '/pms',
    name: 'pms',
    component: () => import('../views/homepage/homepage.vue'),
    children: [
      {
        path: '/product',
        name: 'product',
        component: () => import('../views/pms/product.vue')
      }
    ]
  } */
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const genRoutes = () => {
  // 动态生成路由规则并添加
  const menus = store.getters.getNewMenus
  for (let key in menus) {
    const newRoute: RouteRecordRaw = {
      path: '/' + menus[key].name,
      name: menus[key].name,
      component: () => import('../views/homepage/homepage.vue'),
      redirect: '/' + menus[key].name + '/' + menus[key].children[0].name,
      children: []
    }
    for (let i = 0; i < menus[key].children.length; i++) {
      newRoute.children?.push({
        path: menus[key].children[i].name,
        name: menus[key].children[i].name,
        component: () => import(`../views/${menus[key].name}/${menus[key].children[i].name}.vue`)
      })
    }
    // console.log(newRoute)
    router.addRoute(newRoute)
  }
  // 动态添加首页
  router.addRoute({
    path: '/',
    name: 'homepage',
    component: () => import('../views/homepage/homepage.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/index/index.vue')
      }
    ]
  })
}

// 前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (token && store.state.menus.length === 0) {
    console.log('menus为空')
    store.dispatch('getAdminInfo').then(res => {
      genRoutes()
      next(to.path)
    })
  } else if (token && store.state.menus.length !== 0 && from.path === '/login' && to.path === '/homepage') {
    // 首次登录跳转到index时，有token无路由权限index
    genRoutes()
    next('/index')
  } else if (!token && to.path !== '/login') {
    next('/login')
  } else if (token && to.path === '/login') {
    next(from)
  } else {
    next()
  }
  
})

export default router
