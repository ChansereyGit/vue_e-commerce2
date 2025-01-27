<template>
  <Toaster />
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>
    <div v-if="carts.length === 0" class="text-center py-12">
      <ShoppingCartIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h2 class="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
      <p class="mt-1 text-sm text-gray-500">Start shopping to add items to your cart!</p>
      <div class="mt-6">
        <button @click="goToProducts" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Continue Shopping
        </button>
      </div>
    </div>
    <div v-else>
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="item in carts" :key="item.id" class="py-6 flex">
          <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-center object-cover" />
          </div>
          <div class="ml-4 flex-1 flex flex-col">
            <div>
              <div class="flex justify-between text-base font-medium text-gray-900">
                <h3>{{ item.title }}</h3>
                <p class="ml-4">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
              <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
            </div>
            <div class="flex-1 flex items-end justify-between text-sm">
              <div class="flex items-center">
                <button @click="decreaseQuantity(item)" class="p-1 text-gray-400 hover:text-gray-500">
                  <MinusIcon class="h-5 w-5" />
                </button>
                <span class="mx-2 text-gray-700">{{ item.quantity }}</span>
                <button @click="increaseQuantity(item)" class="p-1 text-gray-400 hover:text-gray-500">
                  <PlusIcon class="h-5 w-5" />
                </button>
              </div>
              <div class="flex">
                <button @click="removeItem(item)" class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">Remove</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="border-t border-gray-200 py-6">
        <div class="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${{ subtotal.toFixed(2) }}</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div class="mt-6">
          <button @click="goToCheckout" class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Checkout
          </button>
        </div>
        <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
          <p>
            or
            <button @click="goToProducts" class="text-blue-600 font-medium hover:text-blue-500 cursor-pointer hover:text-blue-700">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { ShoppingCartIcon, PlusIcon, MinusIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useCartStore } from '@/store/cartStore.ts'
import type { CartItem } from '@/types/CartItem.ts'
import { setCarts } from '@/helpers/cartHelper.ts'

const route = useRouter()
const toast = useToast()

const store = useCartStore();
store.loadCarts();
const carts = ref(store.carts);
watchEffect(() => {
  carts.value = store.carts;
});
const subtotal = computed(() => {
  return carts.value.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
});

const increaseQuantity = (item: CartItem) => {
  item.quantity++;
  setCarts(carts.value);
}

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    item.quantity--;
    setCarts(carts.value);
  }
}

const removeItem = (itemToRemove: CartItem) => {
  const index = carts.value.findIndex(item => item.id === itemToRemove.id);
  if (index !== -1) {
    carts.value.splice(index, 1); // Removes the item at the found index
    setCarts(carts.value);
  }
};

const goToCheckout = () => {
  if(carts.value.length <= 0){
    toast.toast({
      description: 'Cart is empty',
      variant: 'destructive',
    })
    return;
  }
  route.push({name: 'checkout'});
}

const goToProducts = () => {
  route.push('/');
}
</script>