import router from 'vue-router';
import Vuex from 'vuex'



export const state = () => ({
  dataController: {},
  isAuthenticated:false
  
})


export const mutations = {
  setDataController(state, value) {
    state.dataController = Object.assign({}, value)
  },
  setIsAuthenticated(state, value) {
    state.isAuthenticated = value
  }
}

