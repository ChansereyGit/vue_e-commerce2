// useCart.ts
import { ref, computed } from "vue";
import { getCart, addCart, clearCart, setCarts as _setCart } from "@/helpers/cartHelper.ts";
import type { CartItem } from '@/types/CartItem.ts'

const cart = ref<CartItem[]>(getCart()); // Initialize cart from localStorage

// Computed property for cart item count
const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

// Add a product to the cart and update localStorage
const addToCart = (product: CartItem) => {
  addCart(product); // Update localStorage
  cart.value = getCart(); // Update local cart state
};

const setCarts = (carts: CartItem[]) => {
  _setCart(carts);
}

// Clear the cart and localStorage
const clearCartItems = () => {
  clearCart();
  cart.value = []; // Clear local state as well
};

export function useCart() {
  return {
    cart,
    cartItemCount,
    addToCart,
    clearCartItems,
    setCarts
  };
}
