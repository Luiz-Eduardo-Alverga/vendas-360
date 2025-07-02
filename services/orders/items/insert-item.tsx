import api from '@/lib/axios'

export interface InsertItemInShoppingCartBody {
  fullPrice: number
  price: number
  productId: string
  productName: string
  quantity: number
  unitOfMeasure: string
  productExternalCode: string
  productGtin: string
  discount: number
  priceTableId?: string
}

export async function insertItemInShoppingCart({
  discount,
  fullPrice,
  price,
  productExternalCode,
  productGtin,
  productId,
  productName,
  quantity,
  unitOfMeasure,
  priceTableId,
}: InsertItemInShoppingCartBody) {
  const orderId = localStorage.getItem('orderId')

  const response = await api.post(`/orders/${orderId}/items`, {
    discount,
    fullPrice,
    price,
    productExternalCode,
    productGtin,
    productId,
    productName,
    quantity,
    unitOfMeasure,
    priceTableId,
  })

  return response.data
}
