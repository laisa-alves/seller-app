<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FormKit } from '@formkit/vue'

const editable = ref(false)
const storeName = ref('')
const description = defineModel<string>('description')


onMounted(async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (!token) {
    console.error('Token JWT não encontrado')
    return
  }

  try {
    const response = await fetch(import.meta.env.VITE_API + 'stores', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      console.error('Erro ao buscar dados:', response.statusText)
      return
    }

    const data = await response.json()
    storeName.value = data[0].name
    console.log('Dados recebidos:', data)
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
})
</script>

<template>
  <!-- Edição da Logo -->
  

  <!-- Edição das informações -->
  <div class="flex flex-col">
    <FormKit type="form">
      <FormKit
        type="text"
        label="Nome da loja"
        v-model="storeName"
        validation="required|length:3"
      />

      <FormKit
        type="textarea"
        name="description"
        label="Descrição"
        v-model="description"
        :help="`${description ? description.length : 0} / 200 caracteres`"
        validation="length:0,200"
        validation-visibility="live"
      />
    </FormKit>
  </div>
</template>
