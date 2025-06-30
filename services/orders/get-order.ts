import { Order } from '@/interfaces/orders/total-orders'
import api from '@/lib/axios'

interface GetOrderParams {
  orderId: string
}

export async function getOrder({ orderId }: GetOrderParams) {
  const response = await api.get<Order>(`/orders/${orderId}`)

  return response.data
}
