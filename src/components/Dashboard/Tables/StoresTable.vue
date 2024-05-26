<script setup lang="ts">
import ImageCard from '@/components/Dashboard/Card/ImageCard.vue'
import { ref, watchEffect } from 'vue'
import img from '@/assets/images/generic_logo.png'
import { useShopStore } from '@/stores/shopStore'
import { FormKit } from '@formkit/vue'
import { useRouter } from 'vue-router'

const base_url = `${import.meta.env.VITE_API}`
const router = useRouter()
const userShops = useShopStore()

// Create shopList interface
interface ShopList {
  id: number,
  image_url: string,
  name: string,
  status: string
}

let shopsList = ref<ShopList[]>([])

watchEffect(() => {
  if (!userShops.isLoading) {
    shopsList.value = userShops.shops
  }
})

function toggleMain(shopId: number) {
  userShops.setMainShopId(shopId)
}

function addNewStore() {
  router.push({ name: 'storeNew' })
}

const deleteShop = async (id: number) => {
  if (confirm('Você tem certeza que deseja deletar esta loja?')) {
    await userShops.deleteShop(id)
  }
}

</script>

<template>
  <div class="relative overflow-x-auto shadow-sm sm:rouded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-700">
      <!-- Table header -->
      <thead class="text-sm text-gray-800 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-6 py-3 text-center">Logo</th>
          <th scope="col" class="px-6 py-3 text-center">Nome</th>
          <th scope="col" class="px-6 py-3 text-center">Status</th>
          <th scope="col" class="px-6 py-3 text-center">Loja principal</th>
          <th scope="col" class="px-6 py-3 text-center">Ações</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody v-if="!userShops.isLoading">
        <tr
          v-for="(item) in shopsList"
          :key="item.id"
          class="bg-white border-b hover:bg-gray-50"
        >
          <!-- Logo -->
          <td class="px-6 py-4">
            <div class="flex justify-center items-center">
              <ImageCard :src="item.image_url ? base_url + item.image_url : img"></ImageCard>
            </div>
          </td>

          <!-- Name -->
          <td class="px-6 py-4 text-center">{{ item.name }}</td>

          <!-- Status -->
          <td class="px-6 py-4 items-center">
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
            <label class="flex items-center justify-center cursor-pointer">
              <input
                type="checkbox"
                @click="toggleMain(item.id)"
                class="sr-only peer"
                :checked="item.id == userShops.mainShopId"
              />
              <div
                class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-deep-orange-400"
              ></div>
            </label>
          </td>
          <!-- Actions -->
          <td class="px-6 py-4">
            <div class="flex gap-3 justify-center items-center">
              <!-- Edit icon -->
              <RouterLink
                :to="{ name: 'storeEdit', params: { id: item.id } }"
                class="hover:text-deep-orange-500"
              >
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
              </RouterLink>
              <!-- Exclude icon -->
              <button class="hover:text-red-600" @click="deleteShop(item.id)">
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
              </button>
            </div>
          </td>
        </tr>
      </tbody>

      <!-- Skeleton loading -->
      <tbody v-else>
        <tr class="bg-white border-b hover:bg-gray-50 animate-pulse">
          <td class="px-6 py-4">
            <div class="h-14 w-14 bg-gray-300 rounded"></div>
          </td>
          <td class="px-6 py-4">
            <div
              class="inline-flex rounded-full bg-opacity-10 bg-gray-300 py-1 px-3 w-24 h-4"
            ></div>
          </td>
          <td class="px-6 py-4">
            <div
              class="inline-flex rounded-full bg-opacity-10 bg-gray-300 py-1 px-3 w-24 h-4"
            ></div>
          </td>
          <td class="px-6 py-4">
            <div class="w-9 h-5 bg-gray-300 rounded-full"></div>
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-3">
              <div class="w-5 h-5 bg-gray-300 rounded"></div>
              <div class="w-5 h-5 bg-gray-300 rounded"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-6 flex justify-end">
    <FormKit
      type="button"
      @click.prevent="addNewStore"
      label="Adicionar loja"
      prefix-icon="add"
      outer-class="grow-0"
    />
  </div>
</template>
