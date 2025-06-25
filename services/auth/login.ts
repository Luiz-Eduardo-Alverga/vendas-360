import api from '@/lib/axios'
import Cookies from 'js-cookie'

interface LoginProps {
  companyId: string
  tenantId: string
}

interface Credentials {
  userName: string
  password: string
}

function getStoredCredentials(): Credentials | null {
  const creds = localStorage.getItem('userCredentials')
  if (!creds) return null

  try {
    return JSON.parse(creds)
  } catch {
    console.error('Erro ao parsear as credenciais salvas.')
    return null
  }
}

export async function loginTenant({ companyId, tenantId }: LoginProps) {
  const credentials = getStoredCredentials()

  if (!credentials) {
    throw new Error(
      'Credenciais de usuário não encontradas. Faça login novamente.',
    )
  }

  const { userName, password } = credentials

  const response = await api.post('/login', {
    companyId,
    tenantId,
    userName,
    password,
  })

  const { token, refreshToken } = response.data
  const customerId = response.data.customers[0]

  if (token) {
    // Salvar token e refreshToken nos cookies (válidos por exemplo por 1 dia)
    Cookies.set('accessToken', token, { expires: 1, path: '/' })
    Cookies.set('refreshToken', refreshToken, { expires: 7, path: '/' })
    localStorage.setItem('customerId', customerId)
    localStorage.setItem('companyId', companyId)

    // Limpar credenciais após o login final
  }

  return response.data
}
