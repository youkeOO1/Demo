import Vue from 'vue';
import FileSaver from 'file-saver';
import * as echarts from 'echarts';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import cookie from '@/util/cookie/cookie';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$FileSaver = FileSaver;
Vue.prototype.$echarts = echarts;
Vue.prototype.$cookie = cookie;
Vue.prototype.$Message = Message;
Vue.prototype.$port = '80';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
