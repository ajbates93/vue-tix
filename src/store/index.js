import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    usersForm: {},
    disabledDates: {
      to: new Date()
    }
  },
  mutations: {
    setUsersForm(state, val) {
      state.usersForm = val
    }
  },
  actions: {
    async confirm({commit}, usersForm) {
      commit("setUsersForm", usersForm)

      if (usersForm) {
        router.push("/confirm")
      }
    }
  },
  modules: {
  }
})

export default store