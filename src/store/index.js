import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import acitons from './actions'
import gettert from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  acitons,
  gettert
})
