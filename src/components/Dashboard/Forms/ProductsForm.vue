<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CardComponent from '../Card/CardComponent.vue'
import { FormKit } from '@formkit/vue'
</script>

<template>
  <CardComponent>
    <!-- Return link -->
    <RouterLink :to="{ name: 'menu' }">
      <div class="flex gap-1 items-center text-deep-orange-600 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        voltar
      </div>
    </RouterLink>

    <!-- Product section -->
    <div class="flex flex-col">
      <!-- Product Title -->
      <h2 class="text-xl mb-8">Nome do produto</h2>

      <div>
        <FormKit type="form" name="updateProduct" :actions="false">
          <FormKit type="text" name="name" label="Nome do produto" validation="required|length:3" />

          <FormKit
            type="number"
            name="price"
            min="0"
            id="price"
            label="Preço do produto"
            placeholder="0,00"
          >
            <template #prefix>
              <p class="mr-2">R$</p>
            </template>
          </FormKit>

          <FormKit
            type="select"
            name="category"
            label="Categoria do produto"
            :options="['Italiana', 'Hamburger', 'Pizza', 'Japonesa']"
            placeholder="Selecione uma categoria"
            select-icon="down"
          />

          <FormKit
            type="textarea"
            name="description"
            label="Descrição"
            :help="`${shopDescription ? shopDescription.length : 0} / 200 caracteres`"
            validation="length:0,200"
            validation-visibility="live"
          />

          <div class="mt-8 flex gap-3 flex-col">
            <p class="block text-neutral-700 text-sm font-bold dark:text-neutral-300">
              Foto do produto
            </p>
            <div class="size-52 bg-white rounded-lg overflow-hidden">
              <img
                src="@/assets/images/generic_product.png"
                alt=""
                class="w-full h-full object-cover object-center"
              />
            </div>

            <FormKit
              type="file"
              name="image"
              accept="image/*"
              file-remove-icon="close"
              prefix-icon="upload"
              prefix-icon-class="text-[#ff9800]"
              inner-class="bg-gray-50 border-[#ff9800]"
            />
          </div>

          
            <div class="inline-flex gap-3 mt-8">
              <FormKit type="submit" label="Enviar" outer-class="flex justify-end" />
              <FormKit type="button" label="Cancelar" outer-class="flex justify-end"></FormKit>
            </div>
          
        </FormKit>
      </div>
    </div>
  </CardComponent>
</template>
