const state = {
  menu: [],
  // 头像下拉菜单
  drops: [
    { name: 'personal-page', title: '个人信息'},
    { name: 'change-password', title: '修改密码'},
    { name: 'logout', title: '退出登录'}],
  user: {},
  login: false,
  unReadNotificationCount: 0 // 未读通知（我的流程）
}

const mutations = {
  setMenu (state, payload) {
    state.menu = payload
  },
  login (state, payload) {
    state.login = true
    state.user = payload
  },
  logout (state, payload) {
    state.login = false
  },
  addUnreadNotificationCount (state, payload) {
    state.unReadNotificationCount += payload
  },
  setUnreadNotificationCount (state, payload) {
    state.unReadNotificationCount = payload
  },
  reloadPower(state, payload) {
    state.user.system_functions = payload.system_functions
  }
}

const actions = {
  SETMENU ({ commit }, payload) {
    commit('setMenu', payload)
  },
  LOGIN ({ commit }, payload) {
    commit('login', payload)
  },
  LOGOUT ({ commit }, payload) {
    commit('logout', payload)
  },
  ADDUNREADNOTIFICATIONCOUNT ({ commit }, payload) {
    commit('addUnreadNotificationCount', payload)
  },
  SETUNREADNOTIFICATIONCOUNT ({ commit }, payload) {
    commit('setUnreadNotificationCount', payload)
  },
  RELOADPOWER({ commit }, payload) {
    commit('reloadPower', payload)
  }
}

export default {
  state,
  mutations,
  actions
};
