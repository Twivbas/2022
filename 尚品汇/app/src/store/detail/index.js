import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodInfo:{},
  uuid_token:getUUID(),  // 游客临时身份
}
const mutations = {
  GETGOODINFO(state, val) {
    state.goodInfo = val
  },
}
const actions = {
  async getGoodInfo(context, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      context.commit('GETGOODINFO', result.data)
    }
  },
  async addOrUpdateShopCart(context, {skuId, skuNum}) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject('fail')
    }
  }
}
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}