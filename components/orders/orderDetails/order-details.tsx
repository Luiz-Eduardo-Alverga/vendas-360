import { Copy, Search } from 'lucide-react'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog'
import { Separator } from '../../ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getOrder } from '@/services/orders/get-order'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { OrderDetailsSkeleton } from './order-details-skeleton'
import { OrderDetailsPayments } from './order-details-paymets'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { OrderStatusBadge } from './order-status-badge'
import { useAuth } from '@/context/AuthContext'

interface DetailsOrderProps {
  orderId: string
  isOpen: boolean
}

export function OrderDetails({ orderId, isOpen }: DetailsOrderProps) {
  const { accessToken, isAuthLoading } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder({ orderId }),
    enabled: !!accessToken && !isAuthLoading && isOpen,
  })

  return (
    <DialogContent className="max-w-lg max-h-[90vh] min-h-[60vh] overflow-y-auto">
      {isLoading || !data ? (
        <OrderDetailsSkeleton />
      ) : (
        <>
          <DialogHeader>
            <div className="flex items-center justify-between pt-1">
              <div className="flex-1 flex items-center justify-between gap-3">
                <DialogTitle className="text-xl font-semibold">
                  Pedido #{data.orderNumber}
                </DialogTitle>
                <OrderStatusBadge status={data.orderStatus} />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {format(
                new Date(data.orderDate),
                "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                { locale: ptBR },
              )}
            </p>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            {/* Produtos */}
            <div className="space-y-3">
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between py-2"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <Image
                      src={
                        item.images.length === 0
                          ? normalizeImageUrl(
                              'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748081787471x308714204055397600/image_default.png',
                            )
                          : normalizeImageUrl(item.images[0].url)
                      }
                      alt={item.productName}
                      width={50}
                      height={50}
                    />

                    <div className="min-w-0">
                      <p className="font-medium text-sm leading-snug line-clamp-2 break-words">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-600">
                        Código: {item.productExternalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 whitespace-nowrap pl-2">
                    {item.discount > 0 && (
                      <Badge
                        variant="destructive"
                        className="text-xs py-0.5 px-1.5"
                      >
                        -{item.discount.toFixed(0)}%
                      </Badge>
                    )}
                    <p className="font-medium text-sm">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Resumo */}
            <div className="flex gap-4 justify-between">
              <div>
                <p className="text-sm font-medium">Itens</p>
                <p className="text-sm">{data.items.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Desconto</p>
                <p className="text-sm">
                  {formatCurrencyBRL(data.discountValue)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Total do Pedido</p>
                <p className="text-sm">{formatCurrencyBRL(data.finalAmount)}</p>
              </div>
            </div>

            {/* Condição de pagamento */}
            <div>
              <h3 className="font-medium mb-1">Condição de pagamento</h3>
              <p className="text-sm text-gray-600">
                {data.paymentTerm
                  ? data.paymentTerm.name
                  : 'Nenhum pagamento informado'}
              </p>
            </div>

            {data.paymentTerm && (
              <OrderDetailsPayments
                id={data.paymentTerm.id}
                totalAmount={data.totalAmount}
                orderDate={data.orderDate}
              />
            )}

            {/* Observações */}
            {data.observations && (
              <div>
                <h3 className="font-medium text-sm">Observações</h3>
                <p className="text-sm text-gray-600">{data.observations}</p>
              </div>
            )}

            {/* Chave de acesso */}
            {data.orderInvoice && (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-sm">Chave de acesso</h3>
                  <code className="flex-1 text-sm break-all">
                    {data.orderInvoice}
                  </code>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-gray-100 rounded-full"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-gray-100 rounded-full"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </DialogContent>
  )
}
