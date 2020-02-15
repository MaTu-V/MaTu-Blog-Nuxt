import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import home from './home.js'
import {USER_TOKEN, COOKIES_JSON} from '../utils/constant'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    user,
    home
  },
  actions: {

    async nuxtServerInit({commit}, {req, app}) {
      const cookies = COOKIES_JSON(req.headers.cookie)
      app.$axios.setHeader(USER_TOKEN, cookies[USER_TOKEN])
      const {data: {code: userCode, msg: userMsg, data: userData}} = await app.$axios.post('/user/getUserInfo');
      const {data: {code: hotCode, msg: hotMsg, data: hotData}} = await app.$axios.get('/article/getHotArticle');
      const {data: {code: labelCode, msg: labelMsg, data: labelData}} = await app.$axios.get('/label/getLabel');
      const {data: {code: linkCode, msg: linkMsg, data: linkData}} = await app.$axios.get('/link/getLink');
      // 提交到vuex中
      commit('user/setUser', userCode === 200 ? userData : '');
      commit('home/setHot', hotCode === 200 ? hotData.data.rows : '');
      commit('home/setLabel', labelCode === 200 ? labelData : '');
      commit('home/setLink', linkCode === 200 ? linkData : '');
    }
  }
})

export default store
