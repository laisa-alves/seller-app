<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  format,
  parseISO,
  formatDistanceToNowStrict,
  type FormatDistanceToNowStrictOptions
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useOrderStatus } from '@/composables/useOrderStatus'
import type { Order } from '@/types/order'

type StatusCode =
  | 'payment_accepted'
  | 'accepted'
  | 'ready'
  | 'dispatched'
  | 'delivered'
  | 'canceled'

// eslint-disable-next-line no-redeclare
function formatDistanceToNowStrict<DateType extends Date>(
  date: string | number | DateType,
  options?: FormatDistanceToNowStrictOptions
): string

const { ordersStatus, filteredOrders, getReadableOrderStatus, fetchOrders, fetchEventSource } =
  useOrderStatus()

const selectedOrder = ref<Order>()

const selectOrder = (order: Order) => {
  selectedOrder.value = order
}

function formatOrderDate(dateString: string) {
  const date = parseISO(dateString)
  return format(date, 'HH:mm - dd/MM/yy ', { locale: ptBR })
}

// Dynamic buttom and events to api
const statusActions: { [key: string]: { text: string; endpoint: string } } = {
  payment_accepted: { text: 'Aceitar pedido', endpoint: '/accept' },
  accepted: { text: 'Pedido pronto', endpoint: '/ready' },
  ready: { text: 'Pedido com entregador', endpoint: '/dispatch' },
  canceled: { text: 'Cancelar pedido', endpoint: '/cancel' }
}

const handleOrderAction = async (orderId: number, actionType?: string) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (!selectedOrder.value) return
  const action = actionType ? statusActions[actionType] : statusActions[selectedOrder.value.state]
  if (!action) {
    console.error('Ação não definida para o status do pedido.')
    return
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API}/buyers/orders/${orderId}/${action.endpoint}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(action)
      }
    )

    if (!response.ok) {
      throw new Error('Resposta não ok')
    }

    const data = await response.json()
    console.log('Resposta:', data)
  } catch (error) {
    console.error('Erro ao fazer solicitação', error)
  } finally {
    location.reload()
  }
}

onMounted(fetchOrders)
</script>

<template>
  <div class="flex flex-col h-screen md:flex-row w-full gap-2 drop-shadow-sm">
    <!-- Orders list -->
    <div
      class="w-full bg-white rounded-md md:w-1/3 shadow-sm overflow-y-auto scroll-smooth overflow-x-hidden"
    >
      <div class="flex flex-col">
        <!-- Orders panel -->
        <template v-for="status in ordersStatus" :key="status.name">
          <!-- Status category -->
          <div class="bg-gray-200 font-medium px-3 py-1 flex justify-between shadow-sm">
            <p>{{ status.name }}</p>
            <p>{{ status.count }}</p>
          </div>

          <!-- Cards for each order -->
          <div
            v-for="order in filteredOrders(status.state_code as StatusCode)"
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
            Feito às
            <span class="font-bold">{{
              formatOrderDate(selectedOrder.created_at.toString())
            }}</span>
          </p>
        </div>

        <div class="mt-8 p-3 bg-gray-100 rounded-md shadow-sm">
          <p class="text-sm uppercase pb-1">Status do pedido</p>
          <p class="font-bold pb-1">{{ getReadableOrderStatus(selectedOrder) }}</p>
          <p class="text-xs">
            Há
            {{ formatDistanceToNowStrict(selectedOrder.created_at.toString(), { locale: ptBR }) }}
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
          <button
            v-if="['payment_accepted', 'accepted'].includes(selectedOrder.state)"
            @click="handleOrderAction(selectedOrder.id, 'canceled')"
            class="border rounded-md px-4 py-2 transition duration-200 hover:border-deep-orange-400 hover:text-deep-orange-400"
          >
            {{ statusActions['canceled']?.text }}
          </button>
          <button
            v-if="['payment_accepted', 'accepted', 'ready'].includes(selectedOrder.state)"
            @click="handleOrderAction(selectedOrder.id)"
            class="bg-deep-orange-400 text-white rounded-md px-4 py-2 hover:bg-deep-orange-600 transition duration-200"
          >
            {{ statusActions[selectedOrder.state]?.text || 'Ação indisponível' }}
          </button>
        </div>
      </div>
      <div v-else class="p-4">
        <p>Selecione um pedido para ver os detalhes...</p>
      </div>
    </div>
  </div>
</template>
