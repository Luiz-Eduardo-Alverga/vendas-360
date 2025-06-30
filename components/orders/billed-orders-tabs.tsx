'use client'

import { Order } from '@/interfaces/orders/total-orders'
import { Download, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { TabsContent } from '../ui/tabs'
import { OpenDetailsOrder } from './open-details-order'
import { OrdersEmptyState } from './empty-state-orders'

interface Props {
  orders: Order[]
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function BilledOrderTabs({ orders }: Props) {
  return (
    <TabsContent value="faturados">
      {orders.length === 0 ? (
        <OrdersEmptyState
          title="Nenhum pedido faturado"
          description="Você não possui pedidos faturados no período selecionado."
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Itens
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Faturamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chave de acesso da NF-e
                </th>
                <th className="px-6 py-3 sr-only text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.items.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.finalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderInvoice
                      ? formatDate(order.orderInvoice)
                      : '---'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 text-right py-4 whitespace-nowrap text-sm text-gray-900">
                    <OpenDetailsOrder orderId={order.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </TabsContent>
  )
}
