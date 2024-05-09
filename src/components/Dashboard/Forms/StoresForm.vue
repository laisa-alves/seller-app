<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Form, type GenericObject } from 'vee-validate'
import TextInput from '@/components/TextInput.vue'
import * as Yup from 'yup'
import { FormKit } from '@formkit/vue'


const editable = ref(false)
const storeName = ref('')

const toggleEdit = () => {
  editable.value = !editable.value
  if (!editable.value) {
    resetForm()
  }
}

const resetForm = () => {
  // Resetar o estado do formulário
}

// Regras de validação
const schema = Yup.object().shape({
  title: Yup.string()
    .required('O nome da loja é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
})

const submitForm = async (formData: GenericObject) => {
  try {
    // Faça sua chamada API aqui para enviar os dados atualizados
    console.log('Dados enviados:', formData)
    // await axios.put('/api/restaurants/:id', formData);

    // Desativar o modo de edição após o envio bem-sucedido
    editable.value = false
  } catch (error) {
    console.error('Erro ao enviar dados:', error)
  }
}

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
  <div>
    <Form @submit.prevent="submitForm" :validation-schema="schema">
      <label for="name">Nome do Restaurante:</label>
      <TextInput name="title" type="text" :placeholder="storeName" />

      <input type="text" :disabled="!editable" v-model="storeName" v-validate="'required'" />

      <button v-if="editable" type="submit">Salvar</button>
      <button @click.prevent="toggleEdit" type="button">
        {{ editable ? 'Cancelar' : 'Editar' }}
      </button>
    </Form>
  </div>

  <div>
    <FormKit type="select" prefix-icon="email" label="teste aqui"></FormKit>
  </div>
</template>

<style>
.error {
  color: red;
}
</style>
