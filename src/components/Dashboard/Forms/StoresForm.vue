<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { FormKit } from '@formkit/vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'
import ImageCard from '../Card/ImageCard.vue'
import defaultImg from '@/assets/images/generic_logo.png'
import { previewImg } from '@/mixins/previewImageMixin.ts'

const route = useRoute()
const router = useRouter()
const base_url = `${import.meta.env.VITE_API}`

// Call shopStores
const userShops = useShopStore()
const selectedShop = ref()

// Add data
const shopName = ref('')
const shopImg = ref()
const shopDescription = defineModel<string>('description')

const computedSrc = computed(() => {
  if (shopImg.value?.startsWith('data:image')) {
    return shopImg.value
  }
  return shopImg.value ? base_url + shopImg.value : defaultImg
})

// Check route params
const id = route.params.id ? parseInt(route.params.id as string, 10) : null
if (id) {
  watchEffect(() => {
    if (!userShops.isLoading) {
      const shop = userShops.shops.find((shop) => shop.id === id)

      if (shop) {
        selectedShop.value = shop
        shopName.value = shop.name
        shopImg.value = shop.image_url
      }
    }
  })
}

// Change img preview
const handleChange = (event: Event) => {
  previewImg(event, shopImg)
}

// Send request
const handleSubmit = async (values) => {
  try {
    if (selectedShop.value && selectedShop.value.id) {
      // Update shop
      const updateShopValues = {
        id: selectedShop.value.id,
        name: values.name,
        image: values.image && values.image[0] ? values.image[0].file : null
      }
      await userShops.updateShop(updateShopValues)
    } else {
      // Create new shop
      const createShopValues = {
        name: values.name,
        image: values.image && values.image[0] ? values.image[0].file : null
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
  <!-- Edição das informações -->
  <div class="flex flex-col">
    <!-- Edição da Logo -->
    <FormKit type="form" name="updateStore" submit-label="Salvar" @submit="handleSubmit">
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
        :options="['Italiana', 'Hamburger', 'Pizza', 'Japonesa']"
        placeholder="Selecione uma categoria"
        select-icon="down"
        help="Esta é a informação que aparece ao lado da sua loja na listagem e classifica-a nas listas."
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
    </FormKit>
  </div>
</template>
