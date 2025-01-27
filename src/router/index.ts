import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../views/ProductPage.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Cart from '@/views/Cart.vue'
import ChOut from '@/views/ChOut.vue'
import { useTelegramStore } from '@/store/telegramStore.ts'
import Setting from '@/views/Setting.vue'
import { useCartStore } from '@/store/cartStore.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductPage,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: ChOut,
      beforeEnter: (to, from, next) => {
        const store = useCartStore();
        if(store.carts.length == 0){
          next({name: 'home'})
        }
        next();
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useTelegramStore();
  authStore.loadTokenAndChartId()
  // If botToken and chartId are not set, show the modal
  if ((!authStore.botToken || !authStore.chartId) && to.name !== 'setting') {
    next({ name: 'setting' });
  } else {
    next(); // Allow the user to navigate if settings are provided
  }
});

export default router
