<script setup lang="ts">
import PageTitle from '@/components/Dashboard/PageTitle.vue'
import StoresForm from '@/components/Dashboard//Forms/StoresForm.vue'
import { ref } from 'vue'

const pageTitle = ref('Perfil')
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <PageTitle :pageTitle="pageTitle" />

    <div class="flex flex-col gap-6">
      <div class="rounded-md border border-blue-gray-50 bg-white shadow-sm">
        <div class="mb-14 w-full p-7">
          <div class="mb-6 flex flex-wrap gap-5 border-b border-blue-gray-50 sm:gap-10">
            <a
              href="#"
              aria-current="page"
              class="text-deep-orange-600 py-3 text-sm font-medium hover:text-deep-orange-400 md:text-base"
              >Informações da loja</a
            >
          </div>
          <StoresForm></StoresForm>
        </div>
      </div>

      <div class="rounded-md border border-blue-gray-50 bg-white shadow-sm">
        <div class="mb-14 w-full p-7">
          <div class="mb-6 flex flex-wrap gap-5 border-b border-blue-gray-50 sm:gap-10">
            <a
              href="#"
              aria-current="page"
              class="text-deep-orange-600 py-3 text-sm font-medium hover:text-deep-orange-400 md:text-base"
              >Endereço</a
            >
          </div>
          <div class="font-medium leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quod sit voluptatum
            assumenda provident exercitationem magnam, eum aperiam reprehenderit dicta, eaque ipsum
            aspernatur dignissimos quos facilis amet culpa? A, odit.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
