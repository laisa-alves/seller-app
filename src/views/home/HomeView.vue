<script setup lang="ts">
import TheHeading from '@/components/TheHeading.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- Navbar -->
  <header class="bg-white fixed top-0 left-0 right-0 z-10 drop-shadow-sm">
    <TheHeading />
  </header>

  <!-- Conteúdo das páginas -->
  <div class="relative top-[88px] bg-white">
    <RouterView />
  </div>

  <!-- Footer -->
</template>
