<script setup lang="ts">
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar.vue'
import DashboardHeader from '@/components/Dashboard/DashboardHeader.vue'
import { RouterView } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const userShops = useShopStore()
userShops.fetchShopsFromAPI()

</script>

<template>
  <!-- === Page Wrapper Start === -->
  <div class="flex h-screen overflow-hidden">
    <!-- === Sidebar Start === -->
    <DashboardSidebar />
    <!-- === Sidebar End === -->

    <!-- === Content Area Start === -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- === Header Start === -->
      <DashboardHeader />
      <!-- === Header End === -->

      <!-- === Main Content Start === -->
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <RouterView />
        </div>
      </main>
      <!-- === Main Content End === -->
    </div>
    <!-- === Content Area End === -->
  </div>
  <!-- === Page Wrapper End === -->
</template>
