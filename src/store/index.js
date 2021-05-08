import Vue from 'vue';
import Vuex from 'vuex';
import ajax from '@/ajax/ajax';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    size: 1,
    totalPage: 1,
    nowPage: 1,
    modeShow: false,
    activeList: {},
  },
  mutations: {
    setStu(state, list) {
      state.list = list;
    },
    setTotalPage(state, page) {
      state.totalPage = page;
    },
    setNowPage(state, page) {
      state.nowPage = page;
    },
    setModeShow(state, result) {
      state.modeShow = Boolean(result);
    },
    setActiveList(state, list) {
      state.activeList = list;
    },
  },
  actions: {
    async getStu({ state, commit }, page) {
      const { data: { cont: count, findByPage: list } } = await ajax.getStu(page, state.size);
      commit('setStu', list);
      commit('setTotalPage', Math.ceil(count / state.size));
      commit('setNowPage', page);
    },

    async delStu({ state, dispatch }, sNo) {
      await ajax.delStu(sNo);
      let page = Math.ceil((state.page - 1) / state.size);
      if (state.nowPage > page) {
        page = state.nowPage - 1;
      } else {
        page = state.nowPage;
      }
      dispatch('getStu', page);
    },
    async searchStu({ state, commit }, searchObj) {
      // eslint-disable-next-line no-param-reassign
      searchObj.page = 1;
      // eslint-disable-next-line no-param-reassign
      searchObj.size = state.size;
      console.log(searchObj);
      const { data: { searchList: list, cont: count } } = await ajax.searchStu(searchObj);
      if (list.length > 0) {
        commit('setStu', list);
        commit('setTotalPage', count);
        commit('setNowPage', 1);
      }
    },
  },
  modules: {
  },
});
