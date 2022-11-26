import router from 'vue-router';
import Vuex from 'vuex'





export const state = () => ({
  dataController: 'cpmpany'
})

// console.log(router)
export const mutations = {
  SET_DataController (state, value) {
    state.dataController = value
  },

}

