const state = () => ({
  hot: {},
  label: {},
  link:{}
})

const mutations = {
  setHot(state, val) {
    state.hot = val
  },
  setLabel(state, val) {
    state.label = val
  },
  setLink(state, val) {
    state.link = val
  }
}

const actions = {
  setHot: ({commit}, hot) => {
    commit('setHot', hot)
  },
  setLabel: ({commit}, label) => {
    commit('setLabel', label)
  },
  setLink: ({commit}, link) => {
    commit('setLink', link)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
