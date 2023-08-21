import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/find',
      name: 'find',
      // async function has to be implemented becasue without it the data were not rendered
      // after refreshing the page. If the page /find was accessed from another page, for example
      // /home then no problem. But after refreshing there was no data rendered.
      // The code below solves the problem
      component: async () => {
        const userStore = useUserStore();
        await userStore.FETCH_USERS();
        return import('@/views/FindView.vue');
      }
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/BlogView.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('@/views/FormView.vue')
    },
    {
      path: '/form/2',
      name: 'form2',
      component: () => import('@/views/FormPersonalView.vue')
    },
    {
      path: `/find/:id`,
      name: 'user',
      component: () => import('@/views/SpecificUser.vue')
    }
  ]
});

export default router;
