import Vue from 'vue';
import toast from './toast.vue';

const Toast = Vue.extend(toast);
const showToast = (msg, type) => {
  const vm = new Toast({
    el: document.createElement('div'),
    data() {
      return {
        msg,
        type,
      };
    },
  });
  document.body.appendChild(vm.$el);
  setTimeout(() => {
    vm.show = false;
  }, 1500);
  setTimeout(() => {
    vm.exist = false;
  }, 2000);
};
export default showToast;
