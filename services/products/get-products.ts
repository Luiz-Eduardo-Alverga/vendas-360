import { Product } from '@/interfaces/products'
import api from '@/lib/axios'

interface GetProductsParams {
  categoryId?: string
  find?: string
}

export async function getProducts({ categoryId, find }: GetProductsParams) {
  const response = await api.get<Product[]>('/products', {
    params: {
      categoryId,
      find,
    },
  })

  return response.data
}
