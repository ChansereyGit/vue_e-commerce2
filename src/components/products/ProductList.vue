<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
    <h1 class="text-3xl font-bold mb-6">Our Products</h1>
    <div v-if="isLoading" class="flex items-center min-h-[350px] justify-center inset-0 bg-white bg-opacity-90 z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading products...</p>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <RouterLink :to="{ name: 'product-detail', params: { id: product.id } }">
          <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ product.title }}</h2>
            <p class="text-gray-600 mb-4 truncate">{{ product.description }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router'

const isLoading = ref(true);
const products = ref([]);
fetchProducts();
async function fetchProducts() {
  const base_url = "https://fakestoreapi.com/products";
  try{
    const response = await axios.get(base_url);
    products.value = response.data;
  }catch(error){
    console.log(error)
  }finally{
    isLoading.value = false;
  }
}
</script>