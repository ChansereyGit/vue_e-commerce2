<template>
  <Toaster />
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div
      v-if="isLoading"
      class="flex items-center min-h-[350px] justify-center inset-0 bg-white bg-opacity-90 z-50"
    >
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading products...</p>
      </div>
    </div>
    <div v-else-if="product" class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/2">
        <img :src="product.image" :alt="product.title" class="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div class="md:w-1/2">
        <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
        <p class="text-gray-600 mb-6">{{ product.description }}</p>
        <div class="flex items-center mb-6">
          <span class="text-3xl font-bold mr-4">${{ product.price.toFixed(2) }}</span>
        </div>
        <div class="mb-6">
          <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2"
            >Quantity</label
          >
          <input
            type="number"
            id="quantity"
            v-model="quantity"
            min="1"
            class="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          @click="addToCart"
          class="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
    <div v-else class="text-center text-2xl text-gray-600">Product not found</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import Toaster from '@/components/ui/toast/Toaster.vue'
import axios from 'axios'
import { useCartStore } from '@/store/cartStore.ts'
import { addCart } from '@/helpers/cartHelper.ts'
import type { CartItem } from '@/types/CartItem.ts'

const store = useCartStore()
const isLoading = ref(true)
const product = ref({
  id: '',
  title: '',
  description: '',
  image: '',
  price: 0,
})

const toast = useToast()
const route = useRoute()

const quantity = ref(1)

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id: number) {
  const base_url = 'https://fakestoreapi.com/products/' + id
  try {
    const response = await axios.get(base_url)
    product.value = response.data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const addToCart = () => {
  toast.toast({
    description: 'Product Added',
    duration: 1000
  })
  const data: CartItem = {
    ...product.value, quantity: quantity.value
  };
  addCart(data);
  store.loadCarts();
}
</script>
