<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { FormKit } from '@formkit/vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shopStore'

const route = useRoute()
const router = useRouter()
const userShops = useShopStore()

const selectedShop = ref()
const selectedName = ref('')
const description = defineModel<string>('description')

const id = route.params.id ? parseInt(route.params.id as string, 10) : null

if (id) {
  watchEffect(() => {
    if (!userShops.isLoading) {
      const shop = userShops.shops.find((shop) => shop.id === id)

      if (shop) {
        selectedShop.value = shop
        selectedName.value = shop.name
      }
    }
  })
}

const handleSubmit = async (values) => {
  const updateShopValues = {
    id: selectedShop.value ? selectedShop.value.id : null,
    name: values.name
  }

  const createShopValues = {
    name: values.name
  }

  try {
    if (id) {
      await userShops.updateShop(updateShopValues)
    } else {
      await userShops.createShop(createShopValues)
    }
    router.push({ name: 'shops' })
  } catch (err) {
    console.error(err)
  }
}

</script>

<template>
  <!-- Edição da Logo -->

  <!-- Edição das informações -->
  <div class="flex flex-col">
    <FormKit type="form" name="updateStore" submit-label="Salvar" @submit="handleSubmit">
      <FormKit
        type="text"
        name="name"
        label="Nome da loja"
        v-model="selectedName"
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
        v-model="description"
        :help="`${description ? description.length : 0} / 200 caracteres`"
        validation="length:0,200"
        validation-visibility="live"
      />
    </FormKit>
  </div>
</template>
