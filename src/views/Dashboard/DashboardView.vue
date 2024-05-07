<script setup lang="ts">
import PageTitle from '@/components/Dashboard/PageTitle.vue'
import { ref } from 'vue'

const pageTitle = ref('Início')
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <PageTitle :pageTitle="pageTitle" />
  </div>
</template>
