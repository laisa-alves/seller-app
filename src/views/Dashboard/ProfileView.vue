<script setup lang="ts">
import PageTitle from '@/components/Dashboard/PageTitle.vue'
// import StoresForm from '@/components/Dashboard//Forms/StoresForm.vue'
import CardComponent from '@/components/Dashboard/Card/CardComponent.vue'
import StoresTable from '@/components/Dashboard/Tables/StoresTable.vue'
import { ref } from 'vue'

const pageTitle = ref('Perfil')
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <PageTitle :pageTitle="pageTitle" />

    <CardComponent>
      <div class="mb-6 flex flex-wrap gap-5 border-b border-blue-gray-50 sm:gap-10">
        <h2
          class="text-deep-orange-600 py-3 text-sm font-medium hover:text-deep-orange-400 md:text-base"
        >
          Lojas cadastradas
        </h2>
      </div>

      <div class="flex flex-col">
        <StoresTable></StoresTable>
      </div>
      <!-- <StoresForm></StoresForm> -->
    </CardComponent>
  </div>
</template>
