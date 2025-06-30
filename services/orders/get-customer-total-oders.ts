import { Order } from '@/interfaces/orders/total-orders'
import api from '@/lib/axios'

export async function getCustomerTotalOrders() {
  const customerId = localStorage.getItem('customerId')

  const response = await api.get<Order[]>('/orders/customer', {
    params: {
      customerId,
      startDate: '2000-04-12T04:53:57.844Z',
      finishDate: '2050-08-12T04:53:57.844Z',
    },
  })

  return response.data
}
