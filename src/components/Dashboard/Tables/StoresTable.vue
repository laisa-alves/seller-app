<script setup lang="ts">
import ImageCard from '@/components/Dashboard/Card/ImageCard.vue'
import { ref } from 'vue'
import img from '@/assets/images/generic_logo.png'

const status = ref('Ativo')

const src = ref(img)

const stores = ref([
  { name: 'Loja 1', status: 'Ativo', mainStore: false },
  { name: 'Loja 2', status: 'Ativo', mainStore: false },
  { name: 'Loja 3', status: 'Ativo', mainStore: false },
  { name: 'Loja 4', status: 'Suspenso', mainStore: true }
])

const toggleMain = (selectedStore) => {
  const previousMainStore = stores.value.find(store => store.mainStore)
  if (previousMainStore) {
    previousMainStore.mainStore = false
  }
  selectedStore.mainStore = true
}

</script>

<template>
  <div class="relative overflow-x-auto shadow-sm sm:rouded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-700">
      <!-- Table header -->
      <thead class="text-sm text-gray-800 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-6 py-3">Logo</th>
          <th scope="col" class="px-6 py-3">Nome</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Loja principal</th>
          <th scope="col" class="px-6 py-3">Ações</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <tr v-for="(item, index) in stores" :key="index" class="bg-white border-b hover:bg-gray-100">
          <!-- Logo -->
          <td class="px-6 py-4">
            <ImageCard :src="src"></ImageCard>
          </td>
          <!-- Name -->
          <td class="px-6 py-4">{{ item.name }}</td>
          <!-- Status -->
          <td class="px-6 py-4">
            <p
              class="inline-flex rounded-full bg-opacity-10 py-1 px-3"
              :class="{
                'bg-amber-500 text-amber-900': item.status === 'Suspenso',
                'bg-green-500 text-green-900': item.status === 'Ativo'
              }"
            >
              {{ item.status }}
            </p>
          </td>
          <!-- Main store -->
          <td class="px-6 py-4">
            <!-- Toggle -->
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" @click="toggleMain" class="sr-only peer" :checked="item.mainStore" />
              <div
                class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-deep-orange-400"
              ></div>
            </label>
          </td>
          <!-- Actions -->
          <td class="px-6 py-4">
            <div class="flex gap-3">
              <!-- Edit icon -->
              <router-link class="hover:text-deep-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </router-link>
              <!-- Exclude icon -->
              <router-link class="hover:text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
