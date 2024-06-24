// src/types/order.ts

export interface Order {
  id: number
  state: string
  created_at: Date
  updated_at: Date
  custumer: {
    id: number
    email: string
  }
  store: {
    id: number
    name: string
  }
  order_items: [
    {
      id: number
      amount: number
      unit_price: string
      total_price: string
      product: {
        id: number
        title: string
      }
    }
  ],
  total: string
}
