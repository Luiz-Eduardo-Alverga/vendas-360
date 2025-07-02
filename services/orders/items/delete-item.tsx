import api from '@/lib/axios'

interface DeleteItemFromShoppingCart {
  orderItemId: string
}

export async function deleteItemFromShoppingCart({
  orderItemId,
}: DeleteItemFromShoppingCart) {
  const orderId = localStorage.getItem('orderId')

  const response = await api.delete(`/orders/${orderId}/items`, {
    params: {
      orderItemId,
    },
  })

  return response.data
}
