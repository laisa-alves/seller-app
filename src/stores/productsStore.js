import { $api } from '@/services/api'
import { defineStore } from 'pinia'
import { useShopStore } from '@/stores/shopStore.js'

const token = localStorage.getItem('token') || sessionStorage.getItem('token')

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    isLoading: false
  }),
  actions: {
    // Get all products from api
    async fetchProductsFromAPI() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')

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
    },

    // Create new product
    async createProduct(product) {
      const shopStore = useShopStore()
      const mainShopId = shopStore.mainShopId
      try {
        this.isLoading = true

        const formData = new FormData()
        formData.append('product[title]', product.title)
        formData.append('product[price]', product.price)
        formData.append('product[category]', product.category)
        formData.append('product[description]', product.description)
        formData.append('product[active]', product.active)

        if (product.image) {
          formData.append('product[image]', product.image)
        }

        const headers = {
          Authorization: `Bearer ${token}`
        }

        const response = await $api.products.postProduct(mainShopId, formData, headers)
        this.products.push(response)
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    // Edit product
    async updateProduct(product) {
      const shopStore = useShopStore()
      const mainShopId = shopStore.mainShopId
      try {
        this.isLoading = true

        const formData = new FormData()
        formData.append('product[title]', product.title)
        formData.append('product[price]', product.price)
        formData.append('product[category]', product.category)
        formData.append('product[description]', product.description || '')
        formData.append('product[active]', product.active)

        if (product.image) {
          formData.append('product[image]', product.image)
        }

        const headers = {
          Authorization: `Bearer ${token}`
        }

        const response = await $api.products.putProduct(mainShopId, product.id, formData, headers)

        const index = this.products.findIndex((p) => p.id === product.id)
        if (index !== -1) {
          this.products[index] = response
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    // Delete product
    async deleteProduct(id) {
      const shopStore = useShopStore()
      const mainShopId = shopStore.mainShopId
      try {
        this.isLoading = true

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

        await $api.products.deleteProduct(mainShopId, id, headers)

        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products.splice(index, 1)
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    }
  }
})
