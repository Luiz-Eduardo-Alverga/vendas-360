import { Product } from '@/interfaces/products'
import api from '@/lib/axios'

interface GetProductsParams {
  categoryId?: string
  find?: string
  promotionsId?: string
  highlightsId?: string
  tags?: string
  priceMin?: number
  priceMax?: number
  orderBy?: string
}

export async function getProducts({
  categoryId,
  find,
  highlightsId,
  promotionsId,
  tags,
  priceMax,
  priceMin,
  orderBy,
}: GetProductsParams) {
  const response = await api.get<Product[]>('/products', {
    params: {
      categoryId,
      find,
      highlightsId,
      promotionsId,
      tags,
      priceMax,
      priceMin,
      orderBy,
    },
  })

  return response.data
}
