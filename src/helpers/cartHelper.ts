import type {CartItem} from '@/types/CartItem'

// Helper to get the cart from localStorage
export function getCart(): CartItem[] {
  const cartString = localStorage.getItem("cart");
  return cartString && cartString !== '{}' ? JSON.parse(cartString) : [];
}

// Helper to add an item to the cart
export function addCart(product: CartItem) {
  const cart = getCart(); // Retrieve the current cart
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    // Update quantity if the product already exists in the cart
    existingItem.quantity += product.quantity || 1;
  } else {
    // Add the new product
    cart.push({ ...product, quantity: product.quantity || 1 });
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function setCarts(carts: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(carts));
}

// Helper to clear the cart
export function clearCart() {
  localStorage.removeItem("cart"); // Remove the cart from localStorage
}
