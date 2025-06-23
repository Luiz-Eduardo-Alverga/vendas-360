import api from '@/lib/axios'
import Cookies from 'js-cookie'

export async function refreshToken() {
  const refreshToken = Cookies.get('refreshToken')

  if (!refreshToken) {
    throw new Error('Refresh token não encontrado')
  }

  try {
    const response = await api.post('/refresh-token', {
      refreshToken,
    })

    const { token, refreshToken: newRefreshToken } = response.data

    // Atualizar os cookies com os novos tokens
    Cookies.set('accessToken', token, { expires: 1, path: '/' })
    Cookies.set('refreshToken', newRefreshToken, { expires: 7, path: '/' })

    return token
  } catch (error) {
    console.error('Erro ao tentar fazer refresh token:', error)
    throw error
  }
}
