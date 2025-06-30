import { getPaymentTerm } from '@/services/orders/payment/get-payment-term'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { useQuery } from '@tanstack/react-query'
import { format, addDays } from 'date-fns'

interface OrderDetailsPaymentsProps {
  id: string
  totalAmount: number
  orderDate: string
}

export function OrderDetailsPayments({
  id,
  totalAmount,
  orderDate,
}: OrderDetailsPaymentsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['paymentTerm', id],
    queryFn: () => getPaymentTerm({ paymentTermId: id }),
  })

  if (isLoading) return <span>Carregando...</span>
  if (error || !data || !data.installments?.length)
    return <span>Erro ao carregar parcelas</span>

  const installmentsValue = totalAmount / data.installments.length
  const baseDate = new Date(orderDate)

  return (
    <div>
      <div className="overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Parcela
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Método
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Vencimento
              </th>
              <th className="px-4 py-2 text-right font-medium text-gray-600">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {data.installments.map((installment, i) => {
              const dueDate = addDays(baseDate, installment.days)
              return (
                <tr key={installment.id} className="border-t">
                  <td className="px-4 py-2">
                    {(i + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="px-4 py-2">{data.description}</td>
                  <td className="px-4 py-2">{format(dueDate, 'dd/MM/yyyy')}</td>
                  <td className="px-4 py-2 text-right">
                    {formatCurrencyBRL(installmentsValue)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
