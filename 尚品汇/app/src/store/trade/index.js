import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  userAddress:[],
  orderInfo:{},
}
const mutations = {
  GETUSERADDRESS(state, val) {
    state.userAddress = val
  },
  GETORDERINFO(state, val) {
    state.orderInfo = val
  }
}
const actions = {
  async getUserAddress(context) {
    const result = await reqAddressInfo()
    if (result.code === 200) {
      context.commit('GETUSERADDRESS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('getUserAddress fail'))
    }
  },
  async getOrderInfo(context) {
    const result = await reqOrderInfo()
    if (result.code === 200) {
      context.commit('GETORDERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('getOrderInfo fail'))
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