// lib/axios.js
// import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { callLogout } from '@/utils/authHelper'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
// import { refreshToken } from '@/services/auth/refresh-token'

// interface CustomAxiosRequestConfig extends AxiosRequestConfig {
//   _retry?: boolean
// }

const api = axios.create({
  baseURL: 'https://dev-api.vendas360.cloud', // Coloque a URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
})

// Exemplo de Interceptor (para auth tokens, por exemplo)
api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken')

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      callLogout()
    }

    return Promise.reject(error)
  },
)

export default api
