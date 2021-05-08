/* eslint-disable no-useless-return */
import Vue from 'vue';
import cookie from '@/util/cookie/cookie';
import VueRouter from 'vue-router';
import main from '@/views/main/main.vue';
import collect from '../views/data-collect/collect.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/main',
    component: main,
    redirect: '/main/collect',
    children: [
      {
        path: 'collect',
        name: 'collect',
        component: collect,
      },
      {
        path: 'analyse',
        name: 'analyse',
        component: () => import('@/views/data-analyse/analyse.vue'),
        children: [
          {
            path: 'taskLink',
            name: 'taskLink',
            components: {
              task: () => import('@/views/sort/task-link/task-link.vue'),
            },
          },
          {
            path: 'taskAnalyse',
            name: 'taskAnalyse',
            components: {
              task: () => import('@/views/sort/task-analyse/task-analyse.vue'),
            },
          },
          {
            path: 'taskPractice',
            name: 'taskPractice',
            components: {
              task: () => import('@/views/sort/task-practice/task-practice.vue'),
            },
          },
          {
            path: 'taskTesting',
            name: 'taskTesting',
            components: {
              task: () => import('@/views/sort/task-testing/task-testing.vue'),
            },
          },

          {
            path: 'filterTaskLink',
            name: 'filterTaskLink',
            components: {
              task: () => import('@/views/filter/task-link/task-link.vue'),
            },
          },
          {
            path: 'filterTaskAnalyse',
            name: 'filterTaskAnalyse',
            components: {
              task: () => import('@/views/filter/task-analyse/task-analyse.vue'),
            },
          },
          {
            path: 'filterTaskPractice',
            name: 'filterTaskPractice',
            components: {
              task: () => import('@/views/filter/task-practice/task-practice.vue'),
            },
          },
          {
            path: 'filterTaskTesting',
            name: 'filterTaskTesting',
            components: {
              task: () => import('@/views/filter/task-testing/task-testing.vue'),
            },
          },
        ],
      },
      {
        path: 'dispose',
        name: 'dispose',
        component: () => import('@/views/data-dispose/dispose.vue'),
      },
      {
        path: 'select',
        name: 'select',
        component: () => import('@/views/data-select/select.vue'),
      },
      {
        path: 'visualization',
        name: 'visualization',
        component: () => import('@/views/data-visualization/visualization.vue'),
      },
    ],
  },
  {
    path: '/notFound',
    component: () => import('@/views/notFound/notFound.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
  },

];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'active',
});
router.beforeEach((to, from, next) => {
  /**
   * 当用于未登录显示登陆页面
   */
  if (to.path === '/' || to.path === '/index.html') {
    next('/login');
    return;
  }
  /**
   * 当页面不存在显示404页面
   */
  if (to.matched.length === 0) {
    next('/notFound');
    return;
  }
  /**
   * 判断cookie中的用于是学生还是老师
   */
  if (to.matched[0].path === '/main') {
    const user = cookie.getCookie('user');
    if (user) {
      next();
    } else {
      next('/login');
    }
  }
  next();
});

export default router;
