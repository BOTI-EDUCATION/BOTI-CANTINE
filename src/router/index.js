import Login from '@/views/login/login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from "@/stores/login";
import Home from '../views/shop.vue';
import Transactions  from '@/views/transactions.vue';
let base = document.querySelector('meta[name="base_nav"]').content||'/';

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/transactions',
      name: 'trans',
      component: Transactions,
      meta: { requiresAuth: true },
    },
    
  ],
})


router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !useLoginStore().token) {
    return {
      path: '/login',
    }
  }else if(to.meta.requiresAuth === false && useLoginStore().token){
    return {
      path: '/',
    }
  }
});


export default router
