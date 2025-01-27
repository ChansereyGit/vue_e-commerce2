<template>
  <nav class="border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center justify-between">
        <!-- Left side - Profile and Name -->
        <RouterLink to="/">
          <div class="flex items-center cursor-pointer">
            <div class="relative h-10 w-10 grid place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mr-2 h-6 w-6"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path></svg>
            </div>
            <div class="text-center">
              <span class="text-xl font-semibold">Vue E-commerce</span>
            </div>
          </div>
        </RouterLink>

        <!-- Right side - Navigation -->
        <div class="flex items-center gap-4">
          <button class="text-base font-normal hover:bg-gray-100 px-4 py-2 rounded-md transition-colors cursor-pointer">
            Search
          </button>
          <RouterLink to="/setting">
          <button class="text-base font-normal hover:bg-gray-100 px-4 py-2 rounded-md transition-colors cursor-pointer">
            Setting
          </button>
          </RouterLink>
          <RouterLink to="/cart">
            <div class="flex items-center space-x-1 cursor-pointer">
              <ShoppingBag class="h-5 w-5" />
              <span>{{ cartItemCount }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ShoppingBag } from 'lucide-vue-next'
import { useCartStore } from '@/store/cartStore.ts'
import { computed, ref, watchEffect } from 'vue'
import type { CartItem } from '@/types/CartItem.ts'
// import { useCart } from '@/composables/useCart.ts'
// const { cartItemCount } = useCart();

const store = useCartStore();
store.loadCarts();
const carts = ref(store.carts);
watchEffect(() => {
  carts.value = store.carts;
});
const cartItemCount = computed(() => {
  return carts.value.reduce((total: number, item: CartItem) => total + item.quantity, 0);
});

</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>