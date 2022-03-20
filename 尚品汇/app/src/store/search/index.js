// search模块的小仓库
import { reqGetSearchInfo } from '@/api'

const state = {
  searchList: {},
}
const actions = {
  async getSearchInfo(context, val={}) {
    let result = await reqGetSearchInfo(val)
    if (result.code === 200) {
      context.commit('GETSEARCHINFO', result.data)
    }
  }
}
const mutations = {
  GETSEARCHINFO(state, data) {
    state.searchList = data
  }
}
// 可以将state中的数据处理一下，方便组件获取数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}