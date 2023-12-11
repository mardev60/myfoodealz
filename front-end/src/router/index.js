import { createRouter, createWebHistory } from 'vue-router';
import PromotionFeed from '../components/PromotionFeed.vue';
import PromotionForm from '../components/PromotionForm.vue';

const routes = [
  {
    path: '/',
    name: 'PromotionFeed',
    component: PromotionFeed,
  },
  {
    path: '/create',
    name: 'PromotionForm',
    component: PromotionForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;