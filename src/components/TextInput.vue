<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    required: true
  },
  successMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

// Referência reativa
const name = toRef(props, 'name')

// Comportamento da validação, a regra é definida no formulário
const { errorMessage, handleChange, meta } = useField(name, undefined, {
  initialValue: props.value
})

const validationListeners = {
  change: handleChange,
  input: (evt: Event) => handleChange(evt, !!errorMessage.value)
}
</script>

<template>
  <div
    class="TextInput mb-8 relative"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <input
      :name="name"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      v-on="validationListeners"
      :class="{ 'border-red-700 focus:border-red-700': !!errorMessage }"
    />

    <p
      class="help-message absolute text-sm -bottom-6"
      v-show="errorMessage || meta.valid"
      :class="{ 'text-red-700': !!errorMessage }"
    >
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>
