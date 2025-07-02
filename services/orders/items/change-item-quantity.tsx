import api from '@/lib/axios'

interface ChangeItemQuantityFromShoppingCart {
  orderItemId: string
  quantity: number
}

export async function changeItemQuantityFromShoppingCart({
  orderItemId,
  quantity,
}: ChangeItemQuantityFromShoppingCart) {
  const orderId = localStorage.getItem('orderId')

  const response = await api.patch(
    `/orders/${orderId}/items`,
    {},
    {
      params: {
        orderItemId,
        quantity,
      },
    },
  )

  return response.data
}
