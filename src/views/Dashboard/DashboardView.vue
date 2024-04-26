<script setup lang="ts">
import { RouterView } from 'vue-router'
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar.vue'
</script>

<template>
  <div
    class="min-h-screen ml-64 flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-100 text-gray-800"
  >
    <div>Essa é a View de dashboard</div>
  </div>
  <DashboardSidebar></DashboardSidebar>
</template>
