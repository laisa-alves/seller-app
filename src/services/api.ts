import { Auth } from '../auth'
const auth = new Auth()

class BaseApiService {
  baseUrl = import.meta.env.VITE_API
  resource

  constructor(resource: string) {
    if (!resource) throw new Error('Resource is not provided')
    this.resource = resource
  }

  getUrl(...segments: (string | number)[]) {
    return `${this.baseUrl}${this.resource}/${segments.join('/')}`
  }

  handleErrors(err: Error): void {
    console.error({ message: 'Errors are handled here', err })
    throw err
  }

  async request(
    method: string,
    segments: (string | number)[] = [],
    data: undefined | object = undefined,
    headers: object = {}
  ): Promise<any> {
    try {
      const response = await fetch(this.getUrl(...segments), {
        method,
        headers: {
          Accept: 'application/json',
          ...headers
        },
        body: data instanceof FormData ? data : JSON.stringify(data)
      })
      this.handleResponseStatus(response)
      return await response.json()
    } catch (err) {
      this.handleErrors(err as Error)
    }
  }

  handleResponseStatus(response: Response): void {
    if (response.status === 401) {
      auth.signOut()
      location.reload()
    }
  }
}

class ModelApiService extends BaseApiService {
  constructor(resource: string) {
    super(resource)
  }

  async get(id = '', headers: object): Promise<any> {
    return this.request('GET', [id], undefined, headers)
  }
  async post(data: object, headers: object): Promise<any> {
    return this.request('POST', [], data, headers)
  }
  async put(id: string, data: object, headers: object): Promise<any> {
    return this.request('PUT', [id], data, headers)
  }
  async delete(id: string, headers: object): Promise<void> {
    return this.request('DELETE', [id], undefined, headers)
  }
}

class StoresApiService extends ModelApiService {
  constructor() {
    super('stores')
  }
}

class OrdersApiService extends ModelApiService {
  constructor() {
    super('buyers/orders')
  }
}

// Nested routes
class ProductsApiService extends BaseApiService {
  constructor() {
    super('stores')
  }

  async getAllProducts(storeId: string, headers: object): Promise<any> {
    return this.request('GET', [storeId, 'products'], undefined, headers)
  }

  async getProduct(storeId: string, productId: string, headers: object): Promise<any> {
    return this.request('GET', [storeId, 'products', productId], undefined, headers)
  }

  async postProduct(storeId: string, data: object, headers: object): Promise<any> {
    return this.request('POST', [storeId, 'products'], data, headers)
  }

  async putProduct(
    storeId: string,
    productId: string,
    data: object,
    headers: object
  ): Promise<any> {
    return this.request('PUT', [storeId, 'products', productId], data, headers)
  }

  async deleteProduct(storeId: string, productId: string, headers: object): Promise<void> {
    return this.request('DELETE', [storeId, 'products', productId], undefined, headers)
  }
}

export const $api = {
  stores: new StoresApiService(),
  products: new ProductsApiService(),
  orders: new OrdersApiService()
}
