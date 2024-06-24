<script setup lang="ts">
import PageTitle from '@/components/Dashboard/PageTitle.vue'
import CardComponent from '@/components/Dashboard/Card/CardComponent.vue'
import StoresTable from '@/components/Dashboard/Tables/StoresTable.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ShopFormView from './shopFormView.vue'

const route = useRoute()
const pageTitle = ref('Minhas lojas')

const getRouteComponent = (path: string | string[]) =>
  path.includes('edit') || path.includes('new') ? ShopFormView : StoresTable

let currentRoute = getRouteComponent(route.path)

watch(
  () => route.path,
  (newPath) => {
    currentRoute = getRouteComponent(newPath)
  }
)
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

      <component :is="currentRoute" :key="route.path"></component>
    </CardComponent>
  </div>
</template>
