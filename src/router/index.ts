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
      component: () => import('@/views/FindView.vue')
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
    }
  ]
});

export default router;
