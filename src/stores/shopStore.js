import { defineStore } from 'pinia'
import { $api } from '@/services/api'

export const useShopStore = defineStore('shopStore', {
  state: () => ({
    shops: [],
    isLoading: false
  }),
  getters: {
    getShopsName(state) {
      return state.shops.map(shop => shop.name)
    }
  },
  actions: {
    async fetchShopsFromAPI() {
      try {
        this.isLoading = true

        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

        const response = await $api.stores.get('', headers)
        this.shops = response
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    }

    // Create new shop
    // Edit shop
    // Delete shop
  }
})
