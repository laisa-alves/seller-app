<script setup lang="ts">
const props = defineProps(['pageTitle'])
</script>


<template>
  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h1 class="text-2xl font-semibold text-black">
      {{ props.pageTitle }}
    </h1>
  </div>
</template>

