import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import img from '@/assets/images/generic_logo.png'

const base_url = `${import.meta.env.VITE_API}`

export const useShopStore = defineStore('shopStore', {
  state: () => ({
    shops: [],
    isLoading: false,
    mainShopId: null
  }),
  getters: {
    getShopName(state) {
      return state.shops.map((shop) => shop.name)
    },
    getShopImage() {
      const mainShopImage = this.mainShop

      if (mainShopImage && mainShopImage.image_url) {
        return base_url + mainShopImage.image_url
      } else {
        return img
      }
    },
    mainShop(state) {
      return state.shops.find((shop) => shop.id === state.mainShopId)
    }
  },
  actions: {
    // Set main shop
    setMainShopId(shopId) {
      this.mainShopId = shopId
    },

    // Get all shops from user
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

        if (response.length > 0) {
          this.mainShopId = response[0].id
        }
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
