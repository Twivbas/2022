import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'

const state = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(state, val) {
    state.cartList = val
  },
}
const actions = {
  async getCartList(context) {
    const result = await reqCartList()
    if (result.code === 200) {
      context.commit('GETCARTLIST', result.data)
    }
  },
  async deleteCartListBySkuId(context, skuId) {
    const result = await reqDeleteCartById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async updateCheckedByid(context, {skuId, isChecked}) {
    const result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}