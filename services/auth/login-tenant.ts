import api from '@/lib/axios'
import { AxiosError } from 'axios'

interface LoginProps {
  username: string
  password: string
}

export async function login({ password, username }: LoginProps) {
  try {
    const response = await api.post('/login-tenant', {
      username,
      password,
    })

    const data = response.data

    // Verificando se o retorno é um array válido
    if (Array.isArray(data) && data.length > 0) {
      // Salvando o array completo no localStorage
      localStorage.setItem('userCompanies', JSON.stringify(data))
    } else {
      console.error('Formato inesperado de resposta da API:', data)
    }

    localStorage.setItem(
      'userCredentials',
      JSON.stringify({
        userName: username,
        password,
      }),
    )

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro desconhecido')
    }

    throw new Error('Ocorreu um erro inesperado.')
  }
}
