import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: '武汉新型肺炎风险人员跟踪'
    }
  },
  {
    path: '/report/:type',
    name: '相关信息填写',
    component: () => import('./view/report')
  },
  {
    path: '/record/:id',
    name: '新型肺炎症状跟踪',
    component: () => import('./view/record')
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: '注册登录'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
