/*
  状态管理，具体模块文件在src/store/modules下，每个模块一个文件

*/

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './store/index'

Vue.use(Vuex)

// 后台推送不稳定，先不做这么强的缓存
// TODO后期每个模块注册一个vuex，按需引入
const vuexLocal = new VuexPersistence({
  key: 'demo-vuex', // 会存放在localstorage的这个对象中
  strictMode: true,
  storage: window.localStorage, // 存入localStorage
  // storage: window.sessionStorage
})


export default new Vuex.Store({
  modules, // 具体模块引入
  plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== 'production',
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
  }
})
