import { AxiosInstance, AxiosError } from 'axios'

export function setupInterceptor(api: AxiosInstance, logout: () => void) {
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log('erro 401')
        logout()
        window.location.href = '/' // ou useRouter().replace() se estiver num componente
      }
      return Promise.reject(error)
    },
  )
}
