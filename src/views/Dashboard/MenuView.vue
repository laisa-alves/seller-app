<script setup lang="ts">
import PageTitle from '@/components/Dashboard/PageTitle.vue'
import CardComponent from '@/components/Dashboard/Card/CardComponent.vue'

import { ref } from 'vue'

const pageTitle = ref('Cardápio')
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <PageTitle :pageTitle="pageTitle" />

    <CardComponent>
      <p>Aqui vai ficar o cardápio</p>
    </CardComponent>
  </div>
</template>
