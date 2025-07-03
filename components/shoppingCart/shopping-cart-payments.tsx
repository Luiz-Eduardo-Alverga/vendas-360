'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ShoppingCartFooter } from './shopping-cart-footer'
import { useQuery } from '@tanstack/react-query'
import { getPaymentsTerm } from '@/services/payments/get-payments-terms'
import { PaymentCondition } from '@/interfaces/paymentsTerm/payment-term'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'

interface CheckoutConfirmationContentProps {
  totalAmount: number
  onGoBack?: () => void
  onConfirm?: () => void
}

export function ShoppingCartPayments({
  totalAmount,
  onConfirm,
  onGoBack,
}: CheckoutConfirmationContentProps) {
  const [selectedPaymentTerm, setSelectedPaymentTerm] =
    useState<PaymentCondition | null>(null)

  const [observations, setObservations] = useState('')

  const { data: paymentsTerm } = useQuery({
    queryKey: ['paymentTerms'],
    queryFn: getPaymentsTerm,
  })

  return (
    <div className="flex flex-col h-full">
      {/* Conteúdo scrollável */}
      <div className="flex-1 overflow-y-auto space-y-6 p-4">
        {/* Condição de Pagamento */}
        <div className="space-y-3 ">
          <Label className="text-sm font-medium text-gray-900">
            Condição de pagamento
          </Label>
          <Select
            value={selectedPaymentTerm?.description}
            onValueChange={(value) => {
              const term =
                paymentsTerm?.find((term) => term.description === value) || null
              setSelectedPaymentTerm(term)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a condição de pagamento" />
            </SelectTrigger>
            <SelectContent>
              {paymentsTerm?.map((paymentTerm) => (
                <SelectItem
                  key={paymentTerm.id}
                  value={paymentTerm.description}
                >
                  {paymentTerm.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            Simulação de pagamento
          </Label>
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
                {selectedPaymentTerm?.installments.map((installment, index) => {
                  const dueDate = new Date()
                  dueDate.setDate(dueDate.getDate() + installment.days)

                  return (
                    <tr key={installment.id} className="border-t">
                      <td className="px-4 py-2">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-4 py-2">
                        {selectedPaymentTerm.description}
                      </td>
                      <td className="px-4 py-2">
                        {dueDate.toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrencyBRL(
                          totalAmount / selectedPaymentTerm.installments.length,
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Observações */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-900">
            Observações
          </Label>
          <Textarea
            placeholder="Ex: Combinar data da entrega, ou funcionamento de seg. a sex."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="min-h-[80px] resize-none"
          />
        </div>
      </div>

      <ShoppingCartFooter
        totalAmount={totalAmount}
        isDisabled={!selectedPaymentTerm}
        isInPaymentSheet
        onGoBack={onGoBack}
        onConfirm={onConfirm}
      />
    </div>
  )
}
