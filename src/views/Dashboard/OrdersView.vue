<script setup lang="ts">
import PageTitle from '@/components/Dashboard/PageTitle.vue'
import { ref } from 'vue'
import OrdersComponent from '@/components/Dashboard/Orders/OrdersComponent.vue'

const pageTitle = ref('Pedidos')

</script>

<template>
  <div class="mx-auto max-w-7xl">
    <PageTitle :pageTitle="pageTitle" />

    <OrdersComponent />
  </div>
</template>