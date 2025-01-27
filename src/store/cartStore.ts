import { defineStore } from 'pinia';
import type { CartItem} from '@/types/CartItem.ts'
import { getCart } from '@/helpers/cartHelper.ts'

export const useCartStore = defineStore('cartStore', {
  // arrow function recommended for full type inference
  state: () => ({
    carts: [] as CartItem[],
  }),
  actions: {
    loadCarts(){
      this.carts = getCart()
    }
  }
})