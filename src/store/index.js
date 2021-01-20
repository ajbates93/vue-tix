import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    usersForm: {},
    contactForm: {},
    disabledDates: {
      to: new Date()
    },
    drawer: false,
  },
  mutations: {
    setUsersForm(state, val) {
      state.usersForm = val
    },
    setContactForm(state, val) {
      state.contactForm = val
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
    },
    async confirmContact({commit}, contactForm) {
      commit("setContactForm", contactForm)
    },
  },
  modules: {
  }
})

export default store