import api from '@/lib/axios'

interface GetCategorieParams {
  categoryId: string
}

interface GetCategorieResponse {
  id: string
  description: string
  active: boolean
  subcategories: []
}

export async function getCategorie({ categoryId }: GetCategorieParams) {
  const response = await api.get<GetCategorieResponse>(
    `/categories/${categoryId}`,
  )

  return response.data
}
