import { Order } from '@/interfaces/orders/total-orders'
import api from '@/lib/axios'

type OrderStatus =
  | 'EmOrcamento'
  | 'PedidoPendenteSincronizacao'
  | 'PedidoSincronizado'
  | 'PedidoFaturado'
  | 'PedidoEmTransporte'
  | 'PedidoEntregue'
  | 'PedidoFinalizado'
  | 'PedidoCancelado'

interface GetShoppingCartParams {
  startDate: string
  finishDate: string
  orderStatus: OrderStatus
  withProductsAndPayments: boolean
  salesChannel?: string
}
export async function getShoppingCartOrder({
  finishDate,
  orderStatus,
  startDate,
  withProductsAndPayments,
  salesChannel,
}: GetShoppingCartParams) {
  const customerId = localStorage.getItem('customerId')

  const response = await api.get<Order[]>('/orders', {
    params: {
      customerId,
      finishDate,
      orderStatus,
      startDate,
      withProductsAndPayments,
      salesChannel,
    },
  })

  localStorage.setItem('orderId', response.data[0].id)

  return response.data
}
