import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/profile/:userId',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('../views/CreateAccount.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
