import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import img from '@/assets/images/generic_logo.png'

const base_url = `${import.meta.env.VITE_API}`
const token = localStorage.getItem('token') || sessionStorage.getItem('token')

export const useShopStore = defineStore('shopStore', {
  state: () => ({
    shops: [],
    isLoading: false,
    mainShopId: localStorage.getItem('mainShopId') || null
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
      return state.shops.find((shop) => shop.id === parseInt(state.mainShopId, 10))
    }
  },
  actions: {
    // Set main shop
    setMainShopId(shopId) {
      this.mainShopId = shopId
      localStorage.setItem('mainShopId', shopId)
      location.reload()
    },

    // Get all shops from user
    async fetchShopsFromAPI() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')

      try {
        this.isLoading = true

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

        const response = await $api.stores.get('', headers)
        this.shops = response

        if (response.length > 0 && !this.mainShopId) {
          this.mainShopId = response[0].id
          localStorage.setItem('mainShopId', this.mainShopId)
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },

    // Create new shop
    async createShop(shop) {
      try {
        this.isLoading = true

        const formData = new FormData()
        formData.append('store[name]', shop.name)
        formData.append('store[category]', shop.category)
        formData.append('store[description]', shop.description)
        formData.append('store[active]', shop.active)

        if (shop.image) {
          formData.append('store[image]', shop.image)
        }

        const headers = {
          Authorization: `Bearer ${token}`
        }
        const response = await $api.stores.post(formData, headers)
        this.shops.push(response)
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    // Edit shop
    async updateShop(shop) {
      try {
        this.isLoading = true

        const formData = new FormData()
        formData.append('store[name]', shop.name)
        formData.append('store[category]', shop.category)
        formData.append('store[description]', shop.description || '')
        formData.append('store[active]', shop.active)
      
        if (shop.image) {
          formData.append('store[image]', shop.image)
        }

        const headers = {
          Authorization: `Bearer ${token}`
        }

        const response = await $api.stores.put(shop.id, formData, headers)

        const index = this.shops.findIndex((s) => s.id === shop.id)
        if (index !== -1) {
          this.shops[index] = response
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    // Delete shop
    async deleteShop(id) {
      try {
        this.isLoading = true

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

        await $api.stores.delete(id, headers)

        const index = this.shops.findIndex((s) => s.id === id)
        if (index !== -1) {
          this.shops.splice(index, 1)
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    }
  }
})
