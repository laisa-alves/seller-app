<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { FormKit } from '@formkit/vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'
import ImageCard from '../Card/ImageCard.vue'
import defaultImg from '@/assets/images/generic_logo.png'
import { previewImg } from '@/mixins/previewImageMixin'

// Create categories for stores
const categories = [
  { id: 'BURGER', name: 'Hambúrguer' },
  { id: 'PIZZA', name: 'Pizza' },
  { id: 'JAPANESE', name: 'Japonesa' },
  { id: 'DESSERTS', name: 'Sobremesa' },
  { id: 'VEGETARIAN', name: 'Vegetariana' },
  { id: 'BAKERY', name: 'Padaria' },
  { id: 'PASTA', name: 'Massa' },
  { id: 'BRAZILIAN', name: 'Brasileira' },
  { id: 'HEALTHY', name: 'Saudável' },
  { id: 'FAST_FOOD', name: 'Fast food' },
  { id: 'VARIETY_FOOD', name: 'Variada' }
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

// Call shopStores
const userShops = useShopStore()
const selectedShop = ref()

// Add data
const shopName = ref('')
const shopImg = ref()
const shopDescription = ref('')
const shopCategory = ref()
const shopActive = ref(true)

const computedSrc = computed(() => {
  if (shopImg.value?.startsWith('data:image')) {
    return shopImg.value
  }
  return shopImg.value ? base_url + shopImg.value : defaultImg
})

// Create shop interface
interface Shop {
  id: number
  name: string
  image_url: string,
  description: string,
  category: string,
  active: boolean
}

// Check route params
const id = route.params.id ? parseInt(route.params.id as string, 10) : null
if (id) {
  watchEffect(() => {
    if (!userShops.isLoading) {
      const shop = userShops.shops.find((shop: Shop) => shop.id === id)

      if (shop) {
        selectedShop.value = shop
        shopName.value = shop.name
        shopImg.value = shop.image_url
        shopDescription.value = shop.description
        shopCategory.value = shop.category
        shopActive.value = shop.active
      }
    }
  })
}

// Change img preview
const handleChange = (event: Event) => {
  previewImg(event, shopImg)
}

// Create values interface
interface Values {
  name: string
  image: { file: any }[]
  category: string
  description: string
  active: boolean
}

// Send request
const handleSubmit = async (values: Values) => {
  try {
    if (selectedShop.value && selectedShop.value.id) {
      // Update shop
      const updateShopValues = {
        id: selectedShop.value.id,
        name: values.name,
        image: values.image && values.image[0] ? values.image[0].file : null,
        category: values.category,
        description: values.description,
        active: values.active
      }
      await userShops.updateShop(updateShopValues)
    } else {
      // Create new shop
      const createShopValues = {
        name: values.name,
        image: values.image && values.image[0] ? values.image[0].file : null,
        category: values.category,
        description: values.description,
        active: values.active
      }
      await userShops.createShop(createShopValues)
    }
    router.push({ name: 'shops' })
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <!-- Return link -->
  <RouterLink :to="{ name: 'shops' }">
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

  <!-- Edição das informações -->
  <div class="flex flex-col">
    <!-- Edição da Logo -->
    <FormKit
      type="form"
      id="shopForm"
      name="updateStore"
      @submit="handleSubmit"
      :actions="false"
    >
      <div class="gap-4 mb-6 sm:flex max-w-[24rem]">
        <div>
          <ImageCard :src="computedSrc" h="h-24" w="w-24"></ImageCard>
        </div>

        <FormKit
          type="file"
          name="image"
          accept="image/*"
          file-remove-icon="close"
          prefix-icon="upload"
          @change="handleChange"
          label="Selecione sua logo"
          prefix-icon-class="text-[#ff9800]"
          inner-class="bg-gray-50 border-[#ff9800]"
        />
      </div>

      <FormKit
        type="text"
        name="name"
        label="Nome da loja"
        v-model="shopName"
        validation="required|length:3"
      />

      <FormKit
        type="select"
        name="category"
        label="Categoria"
        :options="formattedCategories"
        v-model="shopCategory"
        placeholder="Selecione uma categoria"
        select-icon="down"
        help="Esta é a informação que aparece ao lado da sua loja na listagem e classifica-a nas listas."
        validation="required"
      />

      <FormKit
        type="textarea"
        name="description"
        label="Descrição"
        v-model="shopDescription"
        :help="`${shopDescription ? shopDescription.length : 0} / 200 caracteres`"
        validation="length:0,200"
        validation-visibility="live"
      />

      <FormKit
        type="select"
        name="active"
        label="Status da loja"
        v-model="shopActive"
        select-icon="down"
        :options="[
          { value: true, label: 'Ativa' },
          { value: false, label: 'Inativa' }
        ]"
        :help="`Sua loja está ${shopActive ? 'ativa e aparecerá na listagem de lojas.' : 'inativa e não aparecerá na lista de lojas.'}`"
      />

      <div class="inline-flex gap-3 mt-8">
        <FormKit type="submit" label="Enviar" outer-class="flex justify-end" />
        <FormKit
          type="button"
          label="Cancelar"
          outer-class="flex justify-end"
          @click="$formkit.reset('shopForm')"
        ></FormKit>
      </div>
    </FormKit>
  </div>
</template>
