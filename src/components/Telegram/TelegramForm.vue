<template>
  <div class="max-w-md mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6">Telegram Bot Configuration</h2>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="space-y-4">
        <div>
          <label for="botToken" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Bot Token</label>
          <Field
            name="botToken"
            type="text"
            id="botToken"
            v-model="botToken"
            :class="{'border-red-500': errors.botToken}"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs"
            placeholder="Enter your Telegram bot token"
          />
          <ErrorMessage name="botToken" class="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <label for="chatId" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Chat ID</label>
          <Field
            name="chatId"
            type="text"
            id="chatId"
            :class="{'border-red-500': errors.chatId}"
            v-model="chartId"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-xs"
            placeholder="Enter your Telegram chat ID"
          />
          <ErrorMessage name="chatId" class="text-red-500 text-sm mt-1" />
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <span v-if="isSubmitting" class="flex items-center justify-center">
            <Loader2Icon class="animate-spin -ml-1 mr-3 h-5 w-5" />
            Saving...
          </span>
          <span v-else>Save Configuration</span>
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { Loader2Icon } from 'lucide-vue-next';
import { useTelegramStore } from '@/store/telegramStore.ts';
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTelegramStore()

const botToken = ref(store.botToken)
const chartId = ref(store.chartId)

const schema = yup.object().shape({
  botToken: yup
    .string()
    .required('Bot token is required'),
  chatId: yup
    .string()
    .required('Chat ID is required')
});

const isSubmitting = ref(false);

const onSubmit = (values) => {
  isSubmitting.value = true;
  // Simulate API call
  setTimeout(() => {
    console.log('Submitted values:', values);
    store.setBotToken(values.botToken);
    store.setChartId(values.chatId);
    router.push({name: 'home'});
    isSubmitting.value = false;
    // Here you would typically send the data to your backend
    // and handle the response (success/error)
  }, 1500);
};
</script>