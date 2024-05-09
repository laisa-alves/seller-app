<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FormKit } from '@formkit/vue'

interface StoreData {
  id?: number
  name?: string
}

const storeData = ref<StoreData>({})
const storeName = ref('')
const description = defineModel<string>('description')
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

async function handleSubmit(values) {
  const body = {
    store: {
      name: values.name
    }
  }

  await fetch(import.meta.env.VITE_API + 'stores/' + storeData.value['id'], {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
}

onMounted(async () => {
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
    storeData.value = data[0]
    storeName.value = data[0].name
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
})
</script>

<template>
  <!-- Edição da Logo -->

  <!-- Edição das informações -->
  <div class="flex flex-col">
    <FormKit type="form" name="updateStore" submit-label="Salvar" @submit="handleSubmit">
      <FormKit
        type="text"
        name="name"
        label="Nome da loja"
        v-model="storeName"
        validation="required|length:3"
      />

      <FormKit
        type="select"
        name="category"
        label="Categoria"
        :options="['Italiana', 'Hamburger', 'Pizza', 'Japonesa']"
        placeholder="Selecione uma categoria"
        select-icon="down"
        help="Esta é a informação que aparece ao lado da sua loja na listagem e classifica-a nas listas."
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
