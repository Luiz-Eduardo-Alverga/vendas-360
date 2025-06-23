// lib/axios.js
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { refreshToken } from '@/services/auth/refresh-token'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

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

// Interceptor de Response: Tenta fazer refresh automático
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get('refreshToken')
    ) {
      originalRequest._retry = true

      try {
        const newToken = await refreshToken()

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        }

        return api(originalRequest)
      } catch (refreshError) {
        console.error('Erro no refresh token:', refreshError)

        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        window.location.href = '/login'

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
