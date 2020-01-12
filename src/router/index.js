import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main', isAuthenticated: true},
      component: () => import('@/pages/Home.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', isAuthenticated: true},
      component: () => import('@/pages/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main', isAuthenticated: true},
      component: () => import('@/pages/Record.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {layout: 'main', isAuthenticated: true},
      component: () => import('@/pages/Detail.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {layout: 'main', isAuthenticated: true},
      component: () => import('@/pages/History.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {layout: 'main', isAuthenticated: true},
      component: () => import('@/pages/Planning.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', isAuthenticated: true},
      component: () => import('@/pages/Categories.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('@/pages/Auth.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('@/pages/Register.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(r => r.meta.isAuthenticated);

  if (requireAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
})

export default router;

