<script setup lang="ts">
import PageTitle from '@/components/Dashboard/PageTitle.vue'
import { ref, watch } from 'vue'
import ProductsTable from '@/components/Dashboard/Tables/ProductsTable.vue'
import { useRoute } from 'vue-router'
import productFromView from '@/views/Dashboard/productFormView.vue'

const pageTitle = ref('Cardápio')

const route = useRoute()

const getRouteComponent = (path: string | string[]) =>
  path.includes('edit') || path.includes('new') ? productFromView : ProductsTable

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

    <component :is="currentRoute" :key="route.path"></component>
  </div>
</template>
