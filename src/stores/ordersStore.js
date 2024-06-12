import { $api } from '@/services/api'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [],
    isLoading: false
  }),
  actions: {
    async fetchOrdersFromAPI() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')

      try {
        this.isLoading = true

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

        const response = await $api.orders.get('', headers)
        this.orders = response.orders
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    }
  }
})