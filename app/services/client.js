import { create } from "apisauce";
import cache from '../utility/cache'
import authStorage from '../auth/storage'

const apiClient = create({
  baseURL: 'http://13.49.175.103/api/'
})

apiClient.addAsyncRequestTransform(async (req) => {
  const authToken = await authStorage.getToken()

  if (!authToken) return

  req.headers['x-auth-token'] = authToken.trim()
})

const get = apiClient.get
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig)

  if (response.ok) {
    cache.store(url, response.data)
    return response
  }

  const data = await cache.get(url)
  return data ? { ok: true, data } : response
}

export default apiClient