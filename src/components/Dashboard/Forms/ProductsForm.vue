<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import CardComponent from '../Card/CardComponent.vue'
import { FormKit } from '@formkit/vue'
import { ref, computed, watchEffect } from 'vue'
import { useProductStore } from '@/stores/productsStore'
import defaultImg from '@/assets/images/generic_product.png'
import { previewImg } from '@/mixins/previewImageMixin'

// Create product categories
const categories = [
  { id: 'APPETIZER', name: 'Entrada' },
  { id: 'MAIN_COURSE', name: 'Prato principal' },
  { id: 'SIDE_DISH', name: 'Acompanhamento' },
  { id: 'BEVERAGE', name: 'Bebida' },
  { id: 'DESSERT', name: 'Sobremesa' }
]

const formattedCategories = computed(() =>
  categories.map((category) => ({
    value: category.id,
    label: category.name
  }))
)

const route = useRoute()
const router = useRouter()
const base_url = `${import.meta.env.VITE_API}`

// Call productStores
const productStore = useProductStore()
const selectedProduct = ref()

// Add data
const productTitle = defineModel<string>('productTitle')
const productPrice = ref()
const productCategory = ref()
const productDescription = ref('')
const productActive = ref(true)
const productImg = ref()

// Handle image
const computedSrc = computed(() => {
  if (productImg.value?.startsWith('data:image')) {
    return productImg.value
  }
  return productImg.value ? base_url + productImg.value : defaultImg
})

const handleChange = (event: Event) => {
  previewImg(event, productImg)
}

// Create product interface
interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  active: boolean
  image_url: string
}

// Check route params
const id = route.params.id ? parseInt(route.params.id as string, 10) : null
if (id) {
  watchEffect(() => {
    if (!productStore.isLoading) {
      const product = productStore.products.find((product: Product) => product.id === id)

      if (product) {
        selectedProduct.value = product
        productTitle.value = product.title
        productPrice.value = product.price
        productCategory.value = product.category
        productDescription.value = product.description
        productActive.value = product.active
        productImg.value = product.image_url
      }
    }
  })
}

// Create values interface
interface Values {
  title: string
  image: { file: any }[]
  category: string
  description: string
  active: boolean
  price: number
}

// Send request
const handleSubmit = async (values: Values) => {
  console.log(values)
  try {
    if (selectedProduct.value && selectedProduct.value.id) {
      // Update product
      const updateProductValues = {
        id: selectedProduct.value.id,
        title: values.title,
        price: values.price,
        category: values.category,
        description: values.description,
        active: values.active,
        image: values.image && values.image[0] ? values.image[0].file : null
      }
      await productStore.updateProduct(updateProductValues)
    } else {
      // Create product
      const createProductValues = {
        title: values.title,
        price: values.price,
        category: values.category,
        description: values.description,
        active: values.active,
        image: values.image && values.image[0] ? values.image[0].file : null
      }
      await productStore.createProduct(createProductValues)
    }
    router.push({ name: 'menu' })
  } catch (error) {
    console.error(error)
  }
}
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
      <h2 class="text-xl mb-8">{{ productTitle || 'Nome do produto' }}</h2>

      <div>
        <FormKit
          type="form"
          id="productForm"
          name="updateProduct"
          @submit="handleSubmit"
          :actions="false"
        >
          <FormKit
            type="text"
            name="title"
            v-model="productTitle"
            label="Nome do produto"
            validation="required|length:3"
          />

          <FormKit
            type="text"
            name="price"
            id="price"
            v-model="productPrice"
            label="Preço do produto"
            placeholder="0,00"
            validation="required|contains_numeric"
          >
            <template #prefix>
              <p class="mr-2">R$</p>
            </template>
          </FormKit>

          <FormKit
            type="select"
            name="category"
            label="Categoria do produto"
            :options="formattedCategories"
            v-model="productCategory"
            placeholder="Selecione uma categoria"
            select-icon="down"
            validation="required"
          />

          <FormKit
            type="textarea"
            name="description"
            label="Descrição do produto"
            v-model="productDescription"
            :help="`${productDescription ? productDescription.length : 0} / 200 caracteres`"
            validation="length:0,200"
            validation-visibility="live"
          />

          <FormKit
            type="select"
            name="active"
            label="Status do produto"
            v-model="productActive"
            select-icon="down"
            :options="[
              { value: true, label: 'Ativo' },
              { value: false, label: 'Inativo' }
            ]"
            :help="`Esse produto está ${productActive ? 'ativo e aparecerá no cardápio.' : 'inativo e não aparecerá no cardápio.'}`"
          />

          <div class="mt-8 flex gap-3 flex-col">
            <p class="block text-neutral-700 text-sm font-bold dark:text-neutral-300">
              Foto do produto
            </p>
            <div class="size-52 bg-white rounded-lg overflow-hidden">
              <img
                :src="computedSrc"
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
              @change="handleChange"
              label="Selecione a foto do produto"
              prefix-icon-class="text-[#ff9800]"
              inner-class="bg-gray-50 border-[#ff9800]"
            />
          </div>

          <div class="inline-flex gap-3 mt-8">
            <FormKit type="submit" label="Enviar" outer-class="flex justify-end" />
            <FormKit
              type="button"
              label="Cancelar"
              outer-class="flex justify-end"
              @click="$formkit.reset('productForm')"
            ></FormKit>
          </div>
        </FormKit>
      </div>
    </div>
  </CardComponent>
</template>
