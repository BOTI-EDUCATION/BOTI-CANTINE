import Login from '@/views/login/login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from "@/stores/login";
import Home from '../views/shop.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
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
    
  ],
})


router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !useLoginStore().token) {
    return {
      path: '/login',
    }
  }
});


export default router
