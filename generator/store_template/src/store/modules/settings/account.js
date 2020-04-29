const state = {
  list: []
}

const mutations = {
  setAccountList(state, payload) {
    state.list = payload;
  }
}

const actions = {
  setAccountList({ commit }, payload) {
    commit('setAccountList', payload)
  }
};

export default {
  state,
  mutations,
  actions
};
