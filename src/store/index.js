import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    usersForm: {},
    disabledDates: {
      to: new Date()
    },
    drawer: false,
  },
  mutations: {
    setUsersForm(state, val) {
      state.usersForm = val
    },
    setDrawer(state, val) {
      state.drawer = val
    },
  },
  actions: {
    async confirm({commit}, usersForm) {
      commit("setUsersForm", usersForm)

      if (usersForm) {
        router.push("/confirm")
      }
    },
    async toggleDrawer({commit}, show) {
      commit("setDrawer", show)
    }
  },
  modules: {
  }
})

export default store