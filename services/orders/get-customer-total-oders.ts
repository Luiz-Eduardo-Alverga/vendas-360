import { Order } from '@/interfaces/orders/total-orders'
import api from '@/lib/axios'

interface DateRange {
  startDate?: string
  finishDate?: string
  withProductsAndPayments?: boolean
}

export async function getCustomerTotalOrders({
  startDate,
  finishDate,
  withProductsAndPayments = false,
}: DateRange = {}) {
  const customerId = localStorage.getItem('customerId')

  const response = await api.get<Order[]>('/orders/customer', {
    params: {
      customerId,
      startDate: startDate ?? '2000-04-12T04:53:57.844Z',
      finishDate: finishDate ?? '2050-08-12T04:53:57.844Z',
      withProductsAndPayments,
    },
  })

  return response.data
}
