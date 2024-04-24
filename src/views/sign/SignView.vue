<script setup lang="ts">
import { useRoute } from 'vue-router'
import SigninPage from './pages/SigninPage.vue'
import SignupPage from './pages/SignupPage.vue'

const route = useRoute()

const currentRoute = route.path.includes('signin') ? SigninPage : SignupPage
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="@/assets/images/deliverme.svg" alt="Deliver me" class="mx-auto h-8 w-auto" />
      <h2
        class="mt-10 uppercase text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Portal do Parceiro
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <component :is="currentRoute"></component>
    </div>
  </div>
</template>
