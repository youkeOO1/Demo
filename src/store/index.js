import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 是否为教师登录
    isTeacher: false,
  },
  mutations: {
    setIsTeacher(state, type) {
      state.isTeacher = Boolean(type);
    },
  },
  actions: {
  },
  modules: {
  },
});
