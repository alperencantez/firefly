import { createRouter, createWebHistory } from 'vue-router';
import MainVue from '../pages/Main.vue';
import SignUpVue from '../pages/SignUp.vue';
import LoginVue from '../pages/Login.vue';
import TimelineVue from '../pages/Timeline.vue';
import Search from '../pages/Search.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainVue,
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SignUpVue,
      beforeEnter: (to, from, next) => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          next();
        } else {
          fetch('http://localhost:5000/timeline', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }).then((res) => (res.status == 403 ? next() : next('/timeline')));
        }
      },
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginVue,
      beforeEnter: (to, from, next) => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          next();
        } else {
          fetch('http://localhost:5000/timeline', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }).then((res) => (res.status == 403 ? next() : next('/timeline')));
        }
      },
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: TimelineVue,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
  ],
});

export default router;
