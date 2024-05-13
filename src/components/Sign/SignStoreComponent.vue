<script setup lang="ts">
import { ref } from 'vue'
import img from '@/assets/images/generic_logo.png'
import { previewImg } from '@/mixins/previewImageMixin.ts'

const step = ref(0)
const imageSrc = ref(img)
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

const nextStep = () => {
  step.value++
}

const prevStep = () => {
  step.value--
}

const handleChange = (event: Event) => {
  previewImg(event, imageSrc)
}

// submit form
async function submitForm(values) {
  console.log(values.image[0].file)
  const formData = new FormData()
  formData.append('store[name]', values.name)
  // formData.append('store[category]', values.category)
  formData.append('store[image]', values.image[0].file)


  try {
    const response = await fetch(import.meta.env.VITE_API + 'stores', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
  } catch (error) {
    console.error('Erro ao enviar a requisição: ', error)
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <!-- === Store submit header === -->
    <div class="mx-auto w-full max-w-sm">
      <img src="@/assets/images/deliverme.svg" alt="Deliver me" class="mx-auto h-4 w-auto" />

      <div class="flex flex-col mt-10">
        <h3 class="text-center text-sm mb-2">{{ step + 1 }} / 2</h3>
        <h2 class="text-center text-2xl font-medium leading-9">Cadastre a sua loja</h2>
        <h3 class="text-center text-md font-light">
          Faça as configurações iniciais, você pode editar depois
        </h3>
      </div>
    </div>
    <!-- === Store submit header ends === -->

    <!-- === Form === -->
    <div class="mt-8 mx-auto w-full max-w-sm">
      <FormKit type="form" #default="{ state: { valid } }" :actions="false" @submit="submitForm">
        <!-- First section -->
        <section v-show="step === 0">
          <FormKit type="text" name="name" label="* Nome da loja" validation="required|length:3" />

          <FormKit
            type="select"
            name="category"
            label="Categoria"
            :options="['Italiana', 'Hamburger', 'Pizza', 'Japonesa']"
            placeholder="Selecione uma categoria"
            select-icon="down"
            help="Esta é a informação que aparece ao lado da sua loja na listagem e classifica-a nas listas."
          />
        </section>

        <!-- Second section -->
        <section v-show="step === 1">
          <div class="flex justify-center mb-8">
            <div class="h-32 w-32 rounded-full bg-white overflow-hidden">
              <img :src="imageSrc" alt="Logo" class="w-full h-full object-cover object-center" />
            </div>
          </div>

          <FormKit
            type="file"
            name="image"
            accept="image/*"
            file-remove-icon="close"
            prefix-icon="upload"
            @change="handleChange($event, imageSrc)"
            label="Selecione sua logo"
            prefix-icon-class="text-[#ff9800]"
            inner-class="bg-gray-50 border-[#ff9800]"
          />
        </section>
        <!-- === Form ends === -->

        <!-- Buttons nav -->
        <div class="flex">
          <FormKit
            type="button"
            label="Voltar"
            v-show="step > 0"
            @click="prevStep"
            outer-class="flex justify-start"
          />

          <FormKit
            type="button"
            label="Próximo"
            v-show="step < 1"
            @click="nextStep"
            outer-class="flex justify-end"
          />
          <FormKit
            type="submit"
            label="Enviar"
            :disabled="!valid"
            v-show="step > 0"
            outer-class="flex justify-end"
          />
        </div>
      </FormKit>
    </div>
  </div>
</template>
