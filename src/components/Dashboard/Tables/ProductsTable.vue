<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productsStore.js'
import { onMounted, computed, ref, watchEffect } from 'vue'
import statusBadge from '@/components/Dashboard/Tables/components/StatusBadge.vue'
import img from '@/assets/images/generic_product.png'

// Create product categories
const categories = [
  { id: 'APPETIZER', name: 'Entrada' },
  { id: 'MAIN_COURSE', name: 'Prato principal' },
  { id: 'SIDE_DISH', name: 'Acompanhamento' },
  { id: 'BEVERAGE', name: 'Bebida' },
  { id: 'DESSERT', name: 'Sobremesa' }
]

const categoryNameById = (categoryId) => {
  const category = categories.find((category) => category.id === categoryId)
  return category ? category.name : 'Categoria não encontrada'
}

// const filteredProducts = (categoryId) => {
//   return productsList.value.filter((product) => product.category === categoryId)
// }

const base_url = `${import.meta.env.VITE_API}`
const router = useRouter()
const productsStore = useProductStore()
productsStore.fetchProductsFromAPI()

// Create productList interface
interface ProductsList {
  id: number
  image_url: string
  title: string
  category: string
  price: number
  description: string
  active: boolean
}

let productsList = ref<ProductsList[]>([])

watchEffect(() => {
  if (!productsStore.isLoading) {
    productsList.value = productsStore.products
  }
})

function addNewProduct() {
  router.push({ name: 'productNew' })
}

const deleteProduct = async (id: number) => {
  if (confirm('Você tem certeza que deseja deletar este produto?')) {
    await productsStore.deleteProduct(id)
  }
}
</script>

<template>
  <div class="rounded-md border border-blue-gray-50 bg-white shadow-sm">
    <div class="mb-14 w-full">
      <!-- === Table actions header === -->
      <div class="bg-white relative shadow-md sm:rounded-t-lg overflow-hidden">
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <!-- Search bar -->
          <div class="w-full md:w-1/2">
            <form action="" class="flex items-center">
              <label for="simple-search" class="sr-only">Pesquisar</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  placeholder="Pesquisar"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-deep-orange-600 focus:border-deep-orange-600 block w-full pl-10 p-2"
                />
              </div>
            </form>
          </div>

          <!-- === Table header action buttons === -->
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <!-- Add product -->
            <button
              type="button"
              @click="addNewProduct"
              class="flex items-center justify-center text-white bg-deep-orange-600 hover:bg-deep-orange-800 font-medium rounded-lg text-sm px-4 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="size-5 mr-1"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

              Adicionar produto
            </button>

            <!-- Active and suspended filter -->
            <div
              class="inline-flex flex-col w-full rounded-md shadow-sm md:w-auto md:flex-row"
              role="group"
            >
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-t-lg md:rounded-tr-none md:rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-1 focus:ring-deep-orange-600 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white"
              >
                Ativos
              </button>
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-b-lg md:rounded-bl-none md:rounded-r-lg hover:bg-gray-100 focus:z-10 focus:ring-1 focus:ring-deep-orange-600 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white"
              >
                Suspensos
              </button>
            </div>

            <!-- Filter by category -->
            <button
              id="filterDropdownButton"
              data-dropdown-toggle="filterDropdown"
              class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-1 focus:ring-deep-orange-600 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>

              Filtro
              <svg
                class="-mr-1 ml-1.5 w-5 h-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>

            <!-- Category filter dropdown -->
            <div
              id="filterDropdown"
              class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
              <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                <li class="flex items-center">
                  <input
                    id="apple"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="apple"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >Apple (56)</label
                  >
                </li>
                <li class="flex items-center">
                  <input
                    id="fitbit"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="fitbit"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >Microsoft (16)</label
                  >
                </li>
                <li class="flex items-center">
                  <input
                    id="razor"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="razor"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >Razor (49)</label
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- === Table items header === -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-md text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" class="px-4 py-3">Produto</th>
              <th scope="col" class="px-4 py-3 text-center">Preço</th>
              <th scope="col" class="px-4 py-3 text-center">Categoria</th>
              <th scope="col" class="px-4 py-3 text-center">Situação</th>
              <th scope="col" class="px-4 py-3 text-center">Ações</th>
            </tr>
          </thead>

          <!-- Implementar subcategorias para organizar cardápio -->
          <!-- <tr
            v-for="category in categories"
            :key="category.id"
            class="text-md text-gray-700 bg-gray-50"
          >
            <th colspan="5" class="px-4 py-1">{{ category.name }}</th>
          </tr> -->

          <!-- Table body -->
          <tbody v-if="!productsStore.isLoading">
            <tr v-for="product in productsList" :key="product.id" class="border-b">
              <!-- Image and title -->
              <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="h-16 w-16 rounded-md">
                    <img
                      :src="product.image_url ? base_url + product.image_url : img"
                      class="w-full h-full object-cover object-center rounded-md"
                    />
                  </div>
                  {{ product.title }}
                </div>
              </th>

              <!-- Price -->
              <td class="px-4 py-3 text-center">{{ $formatCurrency(product.price) }}</td>

              <!-- Category -->
              <td class="px-4 py-3 text-center">{{ categoryNameById(product.category) }}</td>

              <!-- Active / inactive -->
              <td class="px-4 py-3">
                <statusBadge
                  :isActive="product.active"
                  active_text="Produto ativo"
                  inactive_text="Produto inativo"
                />
              </td>

              <!-- Actions -->
              <td class="px-4 py-3">
                <div class="flex gap-3 justify-center items-center">
                  <!-- Edit icon -->
                  <RouterLink
                    :to="{ name: 'productEdit', params: { id: product.id } }"
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
                  <button class="hover:text-red-600" @click="deleteProduct(product.id)">
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
        </table>
      </div>
    </div>
  </div>
</template>
