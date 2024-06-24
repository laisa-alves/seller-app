<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps(['item', 'index'])

</script>

<template>
  <li>
    <RouterLink
      :to="item.route"
      class="group relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-deep-orange-400 pr-6"
    >
      <span v-html="item.icon" class="inline-flex justify-center items-center ml-4"></span>
      <span class="ml-2 text-sm tracking-wide truncate">{{ item.label }}</span>
    </RouterLink>
  </li>
</template>
