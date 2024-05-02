<script setup lang="ts">
import { Form, type GenericObject } from 'vee-validate'
import * as Yup from 'yup'
import TextInput from '@/components/TextInput.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '@/auth'

const router = useRouter()
const fetchError = ref(true)

function onSubmit(values: GenericObject) {
  // Login após criar cadastro é sessionStorage como padrão
  let auth = new Auth()

  auth
    .signUp(
      values.email || '',
      values.password || '',
      values.password_confirmation || '',
      () => {
        router.push('/dashboard')
      },
      () => {
        console.log('Não foi criado o novo cadastro')
      }
    )
    .catch((error) => {
      console.log(error.message)
    })
}

const schema = Yup.object().shape({
  email: Yup.string().email('Por favor, insira um email válido').required('O email é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  password_confirmation: Yup.string()
    .required('A confirmação de senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas não conferem')
})
</script>

<template>
  <!-- Form send error -->
  <div
    v-show="!fetchError"
    role="alert"
    class="mb-2 rounded-md border-s-4 border-red-500 bg-red-50 p-4"
  >
    <strong class="block font-medium text-red-800">Ops! Algo deu errado.</strong>
    <p class="mt-2 text-sm text-red-700">
      Por favor, verifique sua conexão com a internet e tente novamente mais tarde.
    </p>
  </div>

  <Form @submit="onSubmit" :validation-schema="schema">
    <!-- Email input -->
    <label for="email" class="block w-full mb-1 text-md font-medium leading-6">Email</label>
    <TextInput name="email" type="email" />

    <!-- Password input -->
    <label for="password" class="block w-full mb-1 text-md font-medium leading-6">Senha</label>
    <TextInput name="password" type="password" />

    <!-- Confirm password input -->
    <label for="password_confirmation" class="block w-full mb-1 text-md font-medium leading-6"
      >Confirmação de senha</label
    >
    <TextInput name="password_confirmation" type="password" />

    <!-- Invalid email or password alert -->
    <div class="relative pt-4">
      <!-- Submit -->
      <button
        class="submit-btn flex w-full justify-center rounded-md bg-deep-orange-400 py-3 uppercase text-md font-semibold leading-6 text-white shadow-md hover:bg-deep-orange-500"
        type="submit"
      >
        Cadastrar
      </button>
    </div>
  </Form>
  <div class="mt-6">
    <p class="text-center text-sm text-gray-500">
      Você já tem cadastro?
      <br />
      <!-- Ajustar link para não precisar ser hard coded -->
      <a
        href="/signin"
        class="font-semibold leading-6 text-deep-orange-600 hover:text-deep-orange-300"
        >Fazer login</a
      >
    </p>
  </div>
</template>
