import Vue from 'vue';
import Vuex from 'vuex';

import nav from './map/nav';
import base from './map/base';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    nav,
    base
  },
  mutations: {
    setState(state,{ module,key,value }) {
      setRespondValByKey(state[module],key,value)
    },
  },
});
