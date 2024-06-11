<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },
  active_text: {
    type: String,
    default: '',
    required: true
  },
  inactive_text: {
    type: String,
    default: '',
    required: true
  }
})

</script>

<template>
  <div class="flex justify-center">
    <p
      class="inline-flex text-center rounded-full bg-opacity-10 py-1 px-3"
      :class="{
        'bg-amber-500 text-amber-900': !isActive,
        'bg-green-500 text-green-900': isActive
      }"
    >
      {{ isActive ? active_text : inactive_text }}
    </p>
  </div>
</template>
