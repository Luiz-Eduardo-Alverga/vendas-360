import api from '@/lib/axios'

export interface CompanyBanner {
  id: string
  imagePath: string
  active: boolean
}

export interface CompanyDetails {
  id: string
  name: string
  about: string | null
  email: string | null
  phone: string | null
  instagram: string | null
  facebook: string | null
  website: string | null
  logoPath: string
  active: boolean
  banner: CompanyBanner[]
}

export async function getTenant() {
  try {
    const response = await api.get<CompanyDetails>('/tenant')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar dados do tenant:', error)
    throw error // Re-lança o erro para permitir tratamento onde a função for chamada
  }
}
