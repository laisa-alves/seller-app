<script setup lang="ts">
import { Form, type GenericObject } from 'vee-validate'
import * as Yup from 'yup'
import TextInput from '@/components/TextInput.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '@/auth'
import { CheckIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const fetchError = ref(true)
const invalidLogin = ref(true)
const remember = defineModel<boolean>('remember', { default: true })

function onSubmit(values: GenericObject) {
  let auth = new Auth(remember.value)

  auth
    .signIn(
      values.email || '',
      values.password || '',
      () => {
        router.push('/dashboard')
      },
      () => {
        console.log('Não foi dessa vez')
        invalidLogin.value = false
      }
    )
    .catch((error) => {
      console.log(error.message)
      fetchError.value = false
    })
}

const schema = Yup.object().shape({
  email: Yup.string().email('Por favor, insira um email válido').required('O email é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
})
</script>

<template>
  <!-- Erro de envio do form -->
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
    <label for="email" class="block w-full mb-1 text-md font-medium leading-6">Senha</label>
    <TextInput name="password" type="password" />

    <!-- Remember me -->
    <div class="flex gap-2 items-center mb-3">
      <input
        type="checkbox"
        v-model="remember"
        class="peer h-4 w-4 cursor-pointer appearance-none border border-gray-400 rounded bg-white relative shrink-0 checked:bg-deep-orange-400 checked:border-0"
      />
      <CheckIcon
        class="absolute pointer-events-none h-3 w-4 stroke-2 stroke-white hidden peer-checked:block"
      ></CheckIcon>

      <label for="checkbox" class="text-sm font-semibold">Lembre-se de mim</label>
    </div>

    <!-- Invalid email or password alert -->
    <div class="relative pt-4">
      <p v-show="!invalidLogin" class="absolute -top-1 font-medium text-sm text-red-700">
        Email ou senha incorretos! Confira os dados preenchidos.
      </p>

      <!-- Submit -->
      <button
        class="submit-btn flex w-full justify-center rounded-md bg-deep-orange-400 py-3 uppercase text-md font-semibold leading-6 text-white shadow-md hover:bg-deep-orange-500"
        type="submit"
      >
        Entrar
      </button>

      <div class="flex justify-center text-sm mt-4">
        <a href="#" class="font-semibold text-deep-orange-600 hover:text-deep-orange-300"
          >Esqueceu sua senha?</a
        >
      </div>
    </div>
  </Form>
  <div class="mt-6">
    <p class="text-center text-sm text-gray-500">
      Ainda não tem cadastro?
      <br />
      <!-- Ajustar link para não precisar ser hard coded -->
      <a
        href="/signup"
        class="font-semibold leading-6 text-deep-orange-600 hover:text-deep-orange-300"
        >Cadastre sua loja.</a
      >
    </p>
  </div>
</template>
