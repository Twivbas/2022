// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'

const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  userInfo: {},
}
const mutations = {
  GETCODE(state, val) {
    state.code = val
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEARUSER(state) {
    state.token = ''
    state.userInfo = {}
    localStorage.removeItem('TOKEN')
  }
}
const actions = {
  async getCode(context, phone) {
    const result = await reqGetCode(phone)
    // 获取验证码这个接口，把验证码返回了。正常情况是后台把验证码发到用户手机上
    if (result.code === 200) {
      context.commit('GETCODE', result.data)
      console.log('code', result.data)
      return `ok`
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async userRegister(context, user) {
    const result = await reqUserRegister(user)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('register fail'))
    }
  },
  async userLogin(context, user) {
    const result = await reqUserLogin(user)
    // 服务器下发token，用户唯一标识符
    // 将来经常通过带token找服务器要用户信息进行展示
    if (result.code === 200) {
      const token =  result.data.token
      context.commit('USERLOGIN', token)
      // 持久存储token
      localStorage.setItem('TOKEN', token)
      return 'ok'
    } else {
      return Promise.reject(new Error('login fail'))
    }
  },
  async getUserInfo(context) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      context.commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('getUserInfo fail'))
    }
  },
  async userLogout(context) {
    const result = await reqLogout()
    // actions里不能操作state
    if (result.code === 200) {
      context.commit('CLEARUSER')
    } else {
      return Promise.reject(new Error('userLogout fail'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}