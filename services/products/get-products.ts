import { Product } from '@/interfaces/products'
import api from '@/lib/axios'

interface GetProductsParams {
  categoryId: string
}

export async function getProducts({ categoryId }: GetProductsParams) {
  const response = await api.get<Product[]>('/products', {
    params: {
      categoryId,
    },
  })

  return response.data
}
