import api from '@/lib/axios'

export interface IACategory {
  id: string
  description: string
  active: boolean
  subcategories: IACategory[]
}

export async function getCategories() {
  const response = await api.get<IACategory[]>('/categories')

  return response.data
}
