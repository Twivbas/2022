import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'

// home模块的小仓库
const state = {
  categoryList:[],
  bannerList:[],
  floorList:[],
}
const actions = {
  async categoryList(context) {
    const result = await reqCategoryList()
    // console.log(result)
    if (result.code === 200) {
      context.commit('CATEGORYLIST',  result.data)
    }
  },
  async getBannerList(context) {
    const result = await reqGetBannerList()
    if (result.code === 200) {
      context.commit('GETBANNERLIST', result.data)
    }
  },
  async getFloorList(context) {
    const result = await reqFloorList()
    if (result.code === 200) {
      context.commit('GETFLOORLIST', result.data)
    }
  }
}
const mutations = {
  CATEGORYLIST(state, val) {
    state.categoryList = val
  },
  GETBANNERLIST(state, val) {
    state.bannerList = val
  },
  GETFLOORLIST(state, val) {
    state.floorList = val
  }
}
const getters = {}

export default {
  // namespaced:true,
  state,
  mutations,
  actions,
  getters,
}