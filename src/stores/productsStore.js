import { $api } from '@/services/api'
import { defineStore } from 'pinia'
import { useShopStore } from '@/stores/shopStore.js'

// const base_url = `${import.meta.env.VITE_API}`
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    isLoading: false
  }),
  actions: {
    // Get products from api
    async fetchProductsFromAPI() {
      const shopStore = useShopStore()
      const mainShopId = shopStore.mainShopId

      if (!mainShopId) {
        console.error('Main shop is not set')
        return
      }

      try {
        this.isLoading = true

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

        const response = await $api.products.getAllProducts(mainShopId, headers)
        this.products = response.result.products
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    }
  }
})
