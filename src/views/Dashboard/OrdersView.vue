<script setup lang="ts">
import PageTitle from '@/components/Dashboard/PageTitle.vue'
import { ref } from 'vue'

const pageTitle = ref('Pedidos')

const selectedOrder = ref(null)

const orderStatus = ref([
  {
    name: 'Pendente',
    message: 'Confirme o pedido',
    count: '1'
  },
  {
    name: 'Entregador a caminho',
    message: 'Prepare o pedido',
    count: '3'
  },
  {
    name: 'Em entrega',
    message: 'Pedido enviado',
    count: '2'
  },
  {
    name: 'Concluído',
    message: 'Pedido concluído',
    count: '1'
  }
])

const orders = ref([
  { id: 1, name: 'Dani Danius', status: 'Pendente', message: 'Confirme o pedido' },
  { id: 2, name: 'Mel da Silva', status: 'Entregador a caminho', message: 'Prepare o pedido' },
  { id: 3, name: 'João Pereira', status: 'Em entrega', message: 'Pedido enviado' },
  { id: 4, name: 'Marcelo Alves', status: 'Pendente', message: 'Confirme o pedido' },
  { id: 5, name: 'Dan Don', status: 'Concluído', message: 'Pedido concluído' }
])

const filteredOrders = (statusName) => {
  return orders.value.filter((order) => order.status === statusName)
}

const selectOrder = (order) => {
  selectedOrder.value = order
  console.log(order)
}
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <PageTitle :pageTitle="pageTitle" />

    <div class="flex flex-col h-screen md:flex-row w-full gap-2 bg-pink-50 drop-shadow-sm">
      <!-- Orders list -->
      <div class="w-full bg-white rounded-md md:w-1/3 shadow-sm overflow-y-auto scroll-smooth">
        <div class="flex flex-col">
          <!-- Orders panel -->
          <template v-for="status in orderStatus" :key="status.name">
            <!-- Status category -->
            <div
              v-if="status.count > 0"
              class="bg-gray-200 font-medium px-3 py-1 flex justify-between shadow-sm"
            >
              <p>{{ status.name }}</p>
              <p>{{ status.count }}</p>
            </div>

            <!-- Cards for each order -->
            <div
              v-for="order in filteredOrders(status.name)"
              :key="order.id"
              class="p-3 hover:bg-gray-50 hover:border-l-4 focus:border-l-4 border-deep-orange-600 shadow-sm text-sm cursor-pointer"
              @click="selectOrder(order)"
            >
              <div class="flex gap-3">
                <p class="font-bold">{{ order.name }}</p>
                <p class="text-gray-500">#{{ order.id }}</p>
              </div>
              <p>{{ status.message }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- Orders info -->
      <div class="w-full bg-white rounded-md md:w-2/3 shadow-sm overflow-y-auto scroll-smoot">
        <div v-if="selectedOrder" class="flex-col p-4">
          <h2 class="text-xl">{{ selectedOrder.name }}</h2>
          <div class="flex gap-2 text-gray-500">
            <p>Pedido #{{ selectedOrder.id }}</p>
            -
            <p>Feito às <span class="font-bold">00:00</span></p>
          </div>

          <div class="mt-8 p-3 bg-blue-50 rounded-md shadow-sm">
            <p class="text-xs pb-1">Status do pedido</p>
            <p class="font-bold pb-1">{{ selectedOrder.status }}</p>
            <p class="text-xs">Há 10 minutos.</p>
          </div>

          <div class="mt-8 p-3 bg-orange-100 rounded-md shadow-sm">
            <div class="p-2 border-b border-gray-100">
              <div class="flex justify-between">
                <div class="flex gap-3">
                  <p>1x</p>
                  <p class="font-medium">Abacate</p>
                </div>
                <p>R$ 9,99</p>
              </div>
            </div>

            <div class="p-2 border-b border-gray-100">
              <div class="flex justify-between">
                <div class="flex gap-3">
                  <p>1x</p>
                  <p class="font-medium">Banana</p>
                </div>
                <p>R$ 9,99</p>
              </div>
            </div>

            <!-- Total -->
            <div class="p-2">
              <div class="flex justify-between">
                <div class="flex gap-3">
                  <span
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#424242"
                    >
                      <path
                        d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"
                      /></svg
                  ></span>
                  <p class="font-bold">Valor total do pedido</p>
                </div>
                <p>R$ 9,99</p>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="mt-8 flex justify-end gap-3">
            <button class="bg-green-50 rounded-md px-4 py-2">Cancelar</button>
            <button class="bg-green-50 rounded-md px-4 py-2">Aceitar</button>
          </div>
        </div>
        <div v-else>
          <p>Selecione um pedido para ver os detalhes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 
<div
      class="flex flex-col h-screen md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-4"
    >
      <div class="no-scrollbar w-full bg-white rounded-md shadow-md md:w-1/3">
        <div class="flex-col">
          <div class="bg-gray-200 font-medium px-3 py-1 flex justify-between shadow-sm">
            <p>Pendente</p>
            <p>2</p>
          </div>

          <div
            class="p-3 flex-col border-l-4 border-red-400 rounded-l-md hover:bg-gray-50 cursor-pointer shadow-sm"
          >
            <div class="flex w-full gap-2 text-sm mb-2">
              <p class="font-bold">Nome</p>
              <p class="text-gray-500">#123</p>
            </div>

            <div class="text-sm font-bold">
              <p>Confirme o pedido</p>
            </div>
          </div>
          <div
            class="p-3 flex-col border-l-4 border-red-400 rounded-l-md hover:bg-gray-50 cursor-pointer shadow-sm"
          >
            <div class="flex w-full gap-2 text-sm mb-2">
              <p class="font-bold">Nome</p>
              <p class="text-gray-500">#123</p>
            </div>

            <div class="text-sm font-bold">
              <p>Confirme o pedido</p>
            </div>
          </div>

          <div class="bg-gray-200 font-medium px-3 py-1 flex justify-between shadow-sm">
            <p>Em produção</p>
            <p>1</p>
          </div>
          <div class="bg-gray-200 font-medium px-3 py-1 flex justify-between shadow-sm">
            <p>Entregador a caminho</p>
            <p>4</p>
          </div>
        </div>
      </div>

      <div class="w-full h-full overflow-y-hidden md:w-2/3 bg-red-50">oi</div>
    </div> -->
