import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import userData from './modules/userData'
import category from './modules/category'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=RUB,USD,EUR`);
      return await res.json();
    }
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  modules: {
    auth,
    userData,
    category
  }
})
