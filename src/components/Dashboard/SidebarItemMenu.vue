<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { HomeIcon } from '@heroicons/vue/24/outline'


const props = defineProps(['item', 'index'])
const currentPage = useRoute().name
const router = useRouter()

const handleItemClick = () => {
  const pageName = currentPage === props.item.label ? '' : props.item.route
  router.push(pageName)
}
</script>

<template>
  <li>
    <RouterLink
      @click.prevent="handleItemClick"
      :to="item.route"
      class="group relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
    >
      <span v-html="item.icon" class="inline-flex justify-center items-center ml-4"></span>
      <span class="ml-2 text-sm tracking-wide truncate">{{ item.label }}</span>
    </RouterLink>
  </li>
</template>
