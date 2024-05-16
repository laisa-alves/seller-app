import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import img from '@/assets/images/generic_logo.png'

const base_url = `${import.meta.env.VITE_API}`

export const useShopStore = defineStore('shopStore', {
  state: () => ({
    shops: [],
    isLoading: false
  }),
  getters: {
    getShopName(state) {
      return state.shops.map((shop) => shop.name)
    },
    getShopImage(state) {
      return state.shops.map((shop) => (shop.image_url ? base_url + shop.image_url : img))
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
