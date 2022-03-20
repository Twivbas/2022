import MyHome from '@/pages/MyHome'
import MySearch from '@/pages/MySearch'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DetailPage from '@/pages/DetailPage'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import TradePage from '@/pages/TradePage'
import PayPage from '@/pages/PayPage'
import PaySuccess from '@/pages/PaySuccess'
import CenterPage from '@/pages/CenterPage'
// 引入二级路由组件
import MyOrder from '@/pages/CenterPage/MyOrder'
import GroupOrder from '@/pages/CenterPage/GroupOrder'

export default [
  {
    path:'/home',
    component:MyHome,
    meta:{
      isShow:true,
    },
  },
  {
    name:'search',
    path:'/search/:keyword?',
    component:MySearch,
    meta:{
      isShow:true,
    },
    // props:true,
    // props:{a:1, b:2},
    props:route => {
      return {query1: route.query, params1: route.params, meta1: route.meta}
    }
  },
  {
    path:'/login',
    component:LoginPage,
    meta:{
      isShow:false,
    },
  },
  {
    path:'/register',
    component:RegisterPage,
    meta:{
      isShow:false,
    },
  },
  {
    path:'/detail/:skuid',
    component:DetailPage,
    meta:{
      isShow:true,
    },
  },
  // 重定向，在项目跑起来的时候，访问/，马上定向到首页
  {
    path:'/',
    redirect:'/home',
    component:MyHome,
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess,
    meta:{
      isShow:true,
    },
  },
  {
    path:'/shopcart',
    component:ShopCart,
    meta:{
      isShow:true,
    },
  },
  {
    path:'/trade',
    component:TradePage,
    meta:{
      isShow:true,
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next(false) // 回到from
      }
    }
  },
  {
    path:'/pay',
    component:PayPage,
    meta: {
      isShow:true
    },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    meta: {
      isShow:true,
    }
  },
  {
    path:'/center',
    component:CenterPage,
    meta: {
      isShow:true,
    },
    // 二级路由
    children:[
      {
        path:'myorder',
        component:MyOrder,
      },
      {
        path:'grouporder',
        component:GroupOrder,
      },
      {
        path:'/center',
        redirect:'/center/myorder',
        component:MyOrder,
      }
    ]
  },
]