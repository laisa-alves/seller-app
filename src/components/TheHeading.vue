<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
</script>

<template>
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="nav bar">
    <!-- Logo -->
    <div class="flex lg:flex-1">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">Deliver me</span>
        <img class="h-4 w-auto" src="@/assets/images/deliverme.svg" alt="Deliver me logo" />
      </a>
    </div>

    <!-- Mobile nav button -->
    <div class="flex lg:hidden">
      <button
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
        @click="mobileMenuOpen = true"
      >
        <span class="sr-only">Abre menu principal</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    <!-- Nav menu -->
    <div class="hidden lg:flex lg:gap-x-12">
      <RouterLink :to="{ name: 'about' }" class="text-sm font-semibold leading-6">Sobre</RouterLink>
      <RouterLink :to="{ name: 'support' }" class="text-sm font-semibold leading-6"
        >Suporte</RouterLink
      >
      <RouterLink :to="{ name: 'blog' }" class="text-sm font-semibold leading-6">Blog</RouterLink>
    </div>

    <!-- Signin and Signup -->
    <div class="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
      <RouterLink
        :to="{ name: 'signin' }"
        class="inline-flex items-center justify-center h-10 px-4 font-semibold text-sm tracking-wide text-deep-orange-600 transition duration-200 rounded-md shadow-sm ring-1 ring-deep-orange-600 hover:bg-deep-orange-50"
        >Entrar</RouterLink
      >
      <RouterLink
        :to="{ name: 'signup' }"
        class="inline-flex items-center justify-center h-10 px-4 font-semibold text-sm tracking-wide text-white transition duration-200 rounded-md shadow-sm bg-deep-orange-400 hover:bg-deep-orange-600"
        >Cadastrar</RouterLink
      >
    </div>
  </nav>

  <!-- Sidebar mobile nav -->
  <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
    <div class="fixed inset-0 z-10" />
    <DialogPanel
      class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
    >
      <!-- Close icon -->
      <div class="flex items-center justify-end">
        <button type="button" class="-m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false">
          <span class="sr-only">Fechar menu</span>
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <!-- Mobile nav menu -->
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <RouterLink
              :to="{ name: 'about' }"
              class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
              >Sobre</RouterLink
            >
            <RouterLink
              :to="{ name: 'support' }"
              class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
              >Suporte</RouterLink
            >
            <RouterLink
              :to="{ name: 'blog' }"
              class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
              >Blog</RouterLink
            >
          </div>

          <!-- Mobile signin and signup -->
          <div class="py-6">
            <RouterLink
              :to="{ name: 'signin' }"
              class="-mx-3 mb-2 block text-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-deep-orange-400 hover:bg-deep-orange-50"
              >Entrar</RouterLink
            >
            <RouterLink
              :to="{ name: 'signup' }"
              class="-mx-3 block text-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white bg-deep-orange-400 hover:bg-deep-orange-600"
              >Cadastrar</RouterLink
            >
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>
