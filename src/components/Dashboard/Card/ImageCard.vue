<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
    required: true
  },
  h: {
    type: String,
    default: 'h-14'
  },
  w: {
    type: String,
    default: 'w-14'
  }
})
</script>

<template>
  <div :class="`${h} ${w} rounded-full bg-white overflow-hidden`">
    <img :src="src" alt="Logo" class="w-full h-full object-cover object-center" />
  </div>
</template>
