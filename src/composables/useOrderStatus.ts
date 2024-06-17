import { ref, watchEffect } from 'vue'
import { useOrderStore } from '@/stores/ordersStore.js'
import { useShopStore } from '@/stores/shopStore'
import type { Order } from '@/types/order'

export function useOrderStatus() {
  const orderStores = useOrderStore()  
  const shopStore = useShopStore()
  const mainShopId = parseInt(shopStore.mainShopId)

  const ordersList = ref<Order[]>([])

  const ordersStatus = ref([
    {
      name: 'Pendente',
      state_code: 'payment_accepted',
      message: 'Confirme o pedido',
      count: 0
    },
    {
      name: 'Em preparo',
      state_code: 'accepted',
      message: 'Prepare o pedido',
      count: 0
    },
    {
      name: 'Entregador a caminho',
      state_code: 'ready',
      message: 'Deixe tudo pronto para o entregador',
      count: 0
    },
    {
      name: 'Em entrega',
      state_code: 'dispatched',
      message: 'Pedido enviado',
      count: 0
    },
    {
      name: 'Concluído',
      state_code: 'delivered',
      message: 'Pedido concluído',
      count: 0
    },
    {
      name: 'Cancelado',
      state_code: 'canceled',
      message: 'Pedido cancelado',
      count: 0
    }
  ])

  const fetchOrders = async () => {
    await orderStores.fetchOrdersFromAPI()
  }

  watchEffect(() => {
    if (!orderStores.isLoading) {
      ordersList.value = orderStores.orders.filter(
        (mainShopOrders: Order) => mainShopOrders['store']['id'] === mainShopId
      )
    }

    ordersStatus.value.forEach(status => {
      status.count = 0
    })

    ordersList.value.forEach(order => {
      const findStatus = ordersStatus.value.find(
        status => status.state_code === order.state
      )
      if (findStatus) {
        findStatus.count += 1
      }
    })
  })

  type StatusCode =
    | 'payment_accepted'
    | 'accepted'
    | 'ready'
    | 'dispatched'
    | 'delivered'
    | 'canceled'

  const filteredOrders = (statusCode: StatusCode) => {
    return ordersList.value.filter((order) => order.state === statusCode)
  }

  const getReadableOrderStatus = (order: Order) => {
    const matchingStatus = ordersStatus.value.find(
      (statusEntry) => statusEntry.state_code === order.state
    )
    return matchingStatus ? matchingStatus.name : 'Desconhecido'
  }

  return {
    ordersList,
    ordersStatus,
    filteredOrders,
    getReadableOrderStatus,
    fetchOrders
  }
}
