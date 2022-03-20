// 对axios进行二次封装
import axios from 'axios'

// 引入进度条和进度条样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// console.log(nprogress)
// start:进度条开始  done:进度条结束

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const mockRequests = axios.create({
  // 基础路径，发请求时路径中会出现api
  baseURL:'/mock',
  // 请求超时的时间5s
  timeout:5000,
})

// 请求拦截器：在请求发出去之前做一些事情
mockRequests.interceptors.request.use(config => {
  nprogress.start()
  // config:配置对象，对象里面有一个属性headers请求头很重要
  return config
})

// 响应拦截器
mockRequests.interceptors.response.use(res => {
  nprogress.done()
  return res.data
}, err => {
  // return Promise.reject(new Error('fail'))
  return Promise.reject(new Error(err))
})

export default mockRequests