import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './ajax/ajax';
import cookie from './util/cookie/index';
import Toast from './util/Toast/toast';

Vue.prototype.$api = api;
Vue.prototype.cookie = cookie;
Vue.prototype.$toast = Toast;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
