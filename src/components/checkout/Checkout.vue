<template>
  <Toaster />
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-6">Checkout</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First name</label>
                <Field name="firstName" type="text" :class="{'border-red-500': errors.firstName}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs" placeholder="John" />
                <ErrorMessage name="firstName" class="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label for="lastName" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Last name</label>
                <Field name="lastName" type="text" :class="{'border-red-500': errors.lastName}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs" placeholder="Doe" />
                <ErrorMessage name="lastName" class="text-red-500 text-sm mt-1" />
              </div>
            </div>
            <div>
              <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
              <Field name="email" type="email" :class="{'border-red-500': errors.email}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs" placeholder="john.doe@example.com" />
              <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label for="address" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Address</label>
              <Field name="address" type="text" :class="{'border-red-500': errors.address}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs" placeholder="123 Main St" />
              <ErrorMessage name="address" class="text-red-500 text-sm mt-1" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="city" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">City</label>
                <Field name="city" type="text" :class="{'border-red-500': errors.city}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs" placeholder="New York" />
                <ErrorMessage name="city" class="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label for="country" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Country</label>
                <Field name="country" type="text" :class="{'border-red-500': errors.country}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs" placeholder="United States" />
                <ErrorMessage name="country" class="text-red-500 text-sm mt-1" />
              </div>
            </div>
            <div>
              <label for="postalCode" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Postal Code</label>
              <Field name="postalCode" type="text" :class="{'border-red-500': errors.postalCode}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs" placeholder="10001" />
              <ErrorMessage name="postalCode" class="text-red-500 text-sm mt-1" />
            </div>
            <div class="border-t border-gray-200 pt-4">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">Payment Method</label>
              <div class="space-y-2">
                <label class="inline-flex items-center">
                  <Field name="paymentMethod" type="radio" value="credit" class="form-radio" />
                  <span class="ml-2">Credit Card</span>
                </label>
                <label class="inline-flex items-center">
                  <Field name="paymentMethod" type="radio" value="paypal" class="form-radio" />
                  <span class="ml-2">PayPal</span>
                </label>
              </div>
              <ErrorMessage name="paymentMethod" class="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" :disabled="isSubmitting" class="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Loader2Icon v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              {{ isSubmitting ? 'Processing' : 'Place Order' }}
            </button>
          </div>
        </Form>
      </div>
      <div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
          <ul class="space-y-4">
            <li v-for="(item, index) in orderItems" :key="index" class="flex justify-between">
              <div>
                <p class="font-medium">{{ item.title }}</p>
                <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
              </div>
              <p>${{ (item.price * item.quantity).toFixed(2) }}</p>
            </li>
          </ul>
          <div class="border-t border-gray-200 mt-4 pt-4">
            <div class="flex justify-between">
              <p>Subtotal</p>
              <p>${{ subtotal.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between mt-2">
              <p>Shipping</p>
              <p>${{ shipping.toFixed(2) }}</p>
            </div>
            <div class="flex justify-between mt-2">
              <p>Tax</p>
              <p>${{ tax.toFixed(2) }}</p>
            </div>
          </div>
          <div class="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>${{ total.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { Loader2Icon } from 'lucide-vue-next';
import { useCartStore } from '@/store/cartStore.ts'
import type { CartItem } from '@/types/CartItem.ts'
import { useTelegramStore } from '@/store/telegramStore.ts'
import axios from 'axios';
import { useToast } from '@/components/ui/toast/use-toast'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { clearCart } from '@/helpers/cartHelper.ts'
import { useRouter } from 'vue-router'


const router = useRouter()
const toast = useToast()
const store = useCartStore();
const telegramStore = useTelegramStore()
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  address: yup.string().required('Address is required').min(5, 'Address must be at least 5 characters'),
  city: yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  country: yup.string().required('Country is required').min(2, 'Country must be at least 2 characters'),
  postalCode: yup.string().required('Postal code is required').min(5, 'Postal code must be at least 5 characters'),
  paymentMethod: yup.string().required('Please select a payment method').oneOf(['credit', 'paypal'], 'Invalid payment method'),
});

const isSubmitting = ref(false);

const onSubmit = (values: never) => {
  isSubmitting.value = true;
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    let text = "Contact Summary \n";
    text += "=======================\n"
    for(const i in values) {
      text += i + ":  " + values[i] + "\n";
    }
    text += "=======================\n\n"
    text += "Order Summary\n";
    text += "=======================\n";
    for(const order in orderItems.value){
      const currentOrder = orderItems.value[order];
      text += currentOrder.title + '\n';
      text += "Qty: " + currentOrder.quantity + '\n';
      text += "Subtotal: " + currentOrder.quantity * currentOrder.price + '\n';
      text += '\n\n';
    }
    text += "Thank For Purchase!\n";
    let url = `https://api.telegram.org/bot${telegramStore.botToken}/sendMessage?chat_id=${telegramStore.chartId}&text=${encodeURIComponent(text)}`
    axios.get(url)
      .then((response) => {
        toast.toast({
          description: "Thank For Purchase!",
          title: `Purchase Successful`,
          duration: 3000,
        })
        clearCart();
        store.loadCarts();
        setTimeout(() => {
          router.push({name: 'home'});
        }, 1000);
      })
      .catch(function (error) {
        toast.toast({
          description: error.response.data.description ?? "Please check you bot config",
          variant: 'destructive',
          duration: 1000,
        })
      });
    // Here you would typically handle the checkout process
    // For example, sending the data to your backend, processing payment, etc.
  }, 2000);
};

store.loadCarts();
const orderItems = ref(store.carts);

const subtotal = computed(() => orderItems.value.reduce((acc:number, item: CartItem) => acc + item.price * item.quantity, 0));
const shipping = 10;
const tax = computed(() => subtotal.value * 0.1); // Assuming 10% tax
const total = computed(() => subtotal.value + shipping + tax.value);
</script>