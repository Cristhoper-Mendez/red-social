import Vue from 'vue'
import Vuex from 'vuex'

import decode from 'jwt-decode'
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    userDB: '',
    sidebarStats: {},
    sidebarPopular: [],
    sidebarComments: []
  },
  mutations: {
    getUser(state, payload){
      state.token = payload;
      if(payload === ''){
        state.userDB = ''
      } else {
        state.userDB = decode(payload);
      }
    },
    setStats(state, payload){
      state.sidebarStats = payload
    },
    setPopular(state, payload){
      state.sidebarPopular = payload
    },
    setComments(state, payload){
      state.sidebarComments = payload
    }
  },
  actions: {
    saveUser({commit}, payload){
      localStorage.setItem('token', payload);
      commit('getUser', payload);
    },
    logout({commit}){
      commit('getUser', '');
      localStorage.removeItem('token');
      router.push({name: 'Home'});
    },
    readToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('getUser', token)
      } else {
        commit('getUser', '')
      }
    },
    getStats({commit}, stats){
      commit('setStats', stats)
    },
    getPopular({commit}, payload){
      commit('setPopular', payload)
    },
    getComments({commit}, payload){
      commit('setComments', payload)
    }
  },
  modules: {
  },
  getters:{
    isActive: state => !!state.token
  }
})
