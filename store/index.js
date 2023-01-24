import router from 'vue-router';
import Vuex from 'vuex'



export const state = () => ({
  controllerInfo: {},
  controllerPrivacyPolicy:{},
  isAuthenticated:false
  
})


export const mutations = {
  setControllerInfo(state, value) {
    state.controllerInfo = Object.assign({}, value)
  },
  setControllerPrivacyPolicy(state, value) {
    state.controllerPrivacyPolicy = Object.assign({}, value)
  },
  setIsAuthenticated(state, value) {
    state.isAuthenticated = value
  }
}

