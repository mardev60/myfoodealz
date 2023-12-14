import { createRouter, createWebHistory } from 'vue-router';
import LoginUser from '../components/LoginUser.vue';
import PromotionFeed from '../components/PromotionFeed.vue';
import PromotionForm from '../components/PromotionForm.vue';

const routes = [
  {
    path: '/',
    name: 'LoginUser',
    component: LoginUser,
  },
  {
    path: '/feed',
    name: 'PromotionFeed',
    component: PromotionFeed,
  },
  {
    path: '/create',
    name: 'PromotionForm',
    component: PromotionForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/create/:id?',
    name: 'PromotionForm',
    component: PromotionForm,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;