import { Auth } from '../auth'
const auth = new Auth()

class BaseApiService {
  baseUrl = import.meta.env.VITE_API
  resource

  constructor(resource: string) {
    if (!resource) throw new Error('Resource is not provided')
    this.resource = resource
  }

  getUrl(id = '') {
    return `${this.baseUrl}${this.resource}/${id}`
  }

  handleErrors(err: Error): void {
    console.error({ message: 'Errors are handled here', err })
    throw err
  }

  async request(method: string, id = '', data: undefined | object, headers = {}): Promise<any> {
    try {
      const response = await fetch(this.getUrl(id), {
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
    // if (response.status === 204) {
    //   location.reload()
    // }
  }
}

class ModelApiService extends BaseApiService {
  constructor(resource: string) {
    super(resource)
  }

  async get(id = '', headers: object): Promise<any> {
    return this.request('GET', id, undefined, headers)
  }
  async post(data: object, headers: object): Promise<any> {
    return this.request('POST', '', data, headers)
  }
  async put(id: string, data: object, headers: object): Promise<any> {
    return this.request('PUT', id, data, headers)
  }
  async delete(id: string, headers: object): Promise<void> {
    return this.request('DELETE', id, undefined, headers)
  }
}

class StoresApiService extends ModelApiService {
  constructor() {
    super('stores')
  }
}

export const $api = {
  stores: new StoresApiService()
}
