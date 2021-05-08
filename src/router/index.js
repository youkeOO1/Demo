/* eslint-disable no-useless-return */
import Vue from 'vue';
import VueRouter from 'vue-router';
import cookie from '@/util/cookie/index';
import main from '@/views/main/main.vue';
import login from '@/views/login/login.vue';
import stuList from '@/views/stuList/stuList.vue';
import stuAdd from '@/views/stuAdd/stuAdd.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/main',
    redirect: '/main/stuList',
    // redirect: '/main/stuAdd',
    component: main,
    children: [
      {
        path: 'stuList',
        name: 'stuList',
        component: stuList,
      },
      {
        path: 'stuAdd',
        name: 'stuAdd',
        component: stuAdd,
      },
    ],
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/logon',
    component: () => import('@/views/logon/logon.vue'),
  },
  {
    path: '/notFound',
    component: () => import('../views/notFound/noFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'active',
});
/**
 * 导航守卫
 */
router.beforeEach((to, from, next) => {
  //  当进入根目录时跳转到登录页面
  if (to.path === '/' || to.path === '/index.html') {
    next('/login');
    return;
  }
  // 当跳转的路由不存在时显示404页面
  if (to.matched.length === 0) {
    next('/notFound');
    return;
  }
  // 判断cookie中是否存有账户的值
  // 当直接通过路径直接访问首页，当用户没登录跳转到登录页面
  if (to.matched[0].path === '/main') {
    const userName = cookie.getCookie('username');
    if (userName) {
      next();
    } else {
      next('/login');
    }
  }
  next();
});

export default router;
