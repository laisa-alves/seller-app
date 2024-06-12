<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useOrderStore } from '@/stores/ordersStore.js'
import { useShopStore } from '@/stores/shopStore'
import {
  format,
  parseISO,
  formatDistanceToNowStrict,
  type FormatDistanceToNowStrictOptions
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

function formatDistanceToNowStrict<DateType extends Date>(
  date: string | number | DateType,
  options?: FormatDistanceToNowStrictOptions
): string

// Access stores
const orderStores = useOrderStore()
orderStores.fetchOrdersFromAPI()

const shopStore = useShopStore()
const mainShopId = parseInt(shopStore.mainShopId)
console.log(mainShopId)

// Create ordersList
let ordersList = ref([])
watchEffect(() => {
  if (!orderStores.isLoading) {
    ordersList.value = orderStores.orders.filter((mainShopOrders) => mainShopOrders['store']['id'] === mainShopId)
  }
})

const selectedOrder = ref(null)
const orderStatus = ref([
  {
    name: 'Pendente',
    state_code: 'payment_accepted',
    message: 'Confirme o pedido',
    count: '1'
  },
  {
    name: 'Em preparo',
    state_code: 'accepted',
    message: 'Prepare o pedido',
    count: '2'
  },
  {
    name: 'Entregador a caminho',
    state_code: 'ready',
    message: 'Deixe tudo pronto para o entregador',
    count: '3'
  },
  {
    name: 'Em entrega',
    state_code: 'dispatched',
    message: 'Pedido enviado',
    count: '2'
  },
  {
    name: 'Concluído',
    state_code: 'delivered',
    message: 'Pedido concluído',
    count: '1'
  },
  {
    name: 'Cancelado',
    state_code: 'canceled',
    message: 'Pedido cancelado',
    count: '1'
  }
])


const filteredOrders = (statusCode) => {
  return ordersList.value.filter((order) => order.state === statusCode)
}

const getReadableOrderStatus = (order) => {
  const matchingStatus = orderStatus.value.find(
    (statusEntry) => statusEntry.state_code === order.state
  )
  return matchingStatus ? matchingStatus.name : 'Desconhecido'
}

const selectOrder = (order) => {
  selectedOrder.value = order
}

function formatOrderDate(dateString: string) {
  const date = parseISO(dateString)
  return format(date, 'HH:mm - dd/MM/yy ', { locale: ptBR })
}
</script>

<template>
  <div>
    {{ ordersList }}
  </div>

  <div class="flex flex-col h-screen md:flex-row w-full gap-2 drop-shadow-sm">
    <!-- Orders list -->
    <div
      class="w-full bg-white rounded-md md:w-1/3 shadow-sm overflow-y-auto scroll-smooth overflow-x-hidden"
    >
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
            v-for="order in filteredOrders(status.state_code)"
            :key="order.id"
            class="p-3 hover:bg-gray-50 hover:border-l-4 focus:border-l-4 border-deep-orange-600 shadow-sm text-sm cursor-pointer"
            @click="selectOrder(order)"
          >
            <div class="flex gap-3">
              <p class="text-gray-500">#{{ order.id }}</p>
              <p class="font-bold truncate">{{ order.custumer['email'] }}</p>
            </div>
            <p>{{ status.message }}</p>
          </div>
        </template>
      </div>
    </div>

    <!-- Orders info -->
    <div class="w-full bg-white rounded-md md:w-2/3 shadow-sm overflow-y-auto scroll-smoot">
      <div v-if="selectedOrder" class="flex-col p-4">
        <h2 class="text-xl">{{ selectedOrder.custumer['email'] }}</h2>
        <div class="flex gap-2 text-gray-500">
          <p>Pedido #{{ selectedOrder.id }}</p>
          -
          <p>
            Feito às <span class="font-bold">{{ formatOrderDate(selectedOrder.created_at) }}</span>
          </p>
        </div>

        <div class="mt-8 p-3 bg-gray-100 rounded-md shadow-sm">
          <p class="text-sm uppercase pb-1">Status do pedido</p>
          <p class="font-bold pb-1">{{ getReadableOrderStatus(selectedOrder) }}</p>
          <p class="text-xs">
            Há {{ formatDistanceToNowStrict(selectedOrder.created_at, { locale: ptBR }) }}
          </p>
        </div>

        <!-- Order items -->
        <div class="mt-8 p-3 bg-gray-100 rounded-md shadow-sm">
          <p class="text-sm uppercase pb-1">Itens do pedido</p>

          <table class="w-full text-base">
            <thead>
              <tr>
                <th scope="col" class="py-2 text-left">Qtd.</th>
                <th scope="col" class="py-2 text-left">Produto</th>
                <th scope="col" class="py-2 text-right">Valor unitário</th>
                <th scope="col" class="py-2 text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in selectedOrder.order_items"
                :key="item.id"
                class="border-y border-gray-400 hover:bg-gray-200"
              >
                <td class="py-2 text-left">{{ item['amount'] }}</td>
                <td class="py-2 text-left">{{ item['product']['title'] }}</td>
                <td class="py-2 text-right">{{ $formatCurrency(item['unit_price']) }}</td>
                <td class="py-2 text-right">{{ $formatCurrency(item['total_price']) }}</td>
              </tr>
            </tbody>

            <tfoot>
              <tr class="font-bold">
                <td colspan="3" class="py-3">Total do pedido</td>
                <td class="text-right py-3">{{ $formatCurrency(selectedOrder['total']) }}</td>
              </tr>
            </tfoot>
          </table>
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
</template>
