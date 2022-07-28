import { createStore } from 'vuex'
import { getAdminInfoApi } from '../request/api'

interface MenuObj {
  parentId: number
  id: number
  children?: MenuObj[]
}

interface State {
  menus: MenuObj[]
}

interface NewMenus {
  [key: number]: MenuObj
}

const store = createStore<State>({
  state() {
    return {
      menus: []
    }
  },
  getters: {
    getNewMenus(state) {
      const newMenus: NewMenus = {}
      const menus = state.menus
      // for (let i = 0; i < menus.length; i++) {
      //   if (menus[i].parentId === 0) {
      //     // 一级菜单对象
      //     newMenus[menus[i].id] = {...menus[i]}
      //   }
      // }
      // for (let i = 0; i < menus.length; i++) {
      //   if (menus[i].parentId !== 0) {
      //     // 二级菜单
      //     let parentId = menus[i].parentId  // 对应的一级菜单的id
      //     newMenus[parentId].children = newMenus[parentId].children || []
      //     newMenus[parentId].children?.push(menus[i])
      //   } 
      // }
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].parentId === 0) {
          // 一级菜单对象
          newMenus[menus[i].id] = { ...menus[i], children: newMenus[menus[i].id]?.children || [] }
        } else {
          // 二级菜单
          let parentId = menus[i].parentId
          newMenus[parentId] = newMenus[parentId] || {}
          newMenus[parentId].children = newMenus[parentId].children || []
          newMenus[parentId].children?.push(menus[i])
        }
      }
      return newMenus
    }
  },
  mutations: {
    updateMenus(state, menus) {
      state.menus = menus
    }
  },
  actions: {
    getAdminInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getAdminInfoApi().then(res => {
          if (res.code === 200) {
            // const tempMenus: {
            //   parentId: number
            //   hidden: number
            // }[] = res.data.menus
            // tempMenus.forEach(item => {
            //   if (item.parentId === 21) {
            //     item.hidden = 1
            //   }
            // })
            commit('updateMenus', res.data.menus)
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    }
  },
  modules: {}
})

export default store