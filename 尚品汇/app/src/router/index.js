// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'
import store from '@/store'

// 先把VueRouter原型对象的push保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 重写push replace

VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, (err) => {console.log(err)})
  }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, err => console.log(err))
  }
}

const router = new VueRouter({
  routes,
  // 滚动条初始位置
  scrollBehavior() {
    return { y: 0 }
  }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // next()放行函数  next(path)放行到指定路由
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  // 用户登录了才会有token
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/')
      console.log(111)
    } else {
      // 已登录，若有用户名
      if (name) {
        next()
        console.log(222)
      } else {
        // 没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          await store.dispatch('getUserInfo')
          next()
          console.log(333)
        } catch(err) {
          // token失效了获取不到用户信息，需要重新登录，清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录，不能去交易相关、支付相关、个人中心页面，需要先登录
    const toPath = to.path
    console.log(toPath)
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
      next('/login')
    } else {
      // 去其它页面（home, search）
      next()
    }
  }
})

export default router