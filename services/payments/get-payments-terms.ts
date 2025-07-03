import { PaymentCondition } from '@/interfaces/paymentsTerm/payment-term'
import api from '@/lib/axios'

export async function getPaymentsTerm() {
  const response = await api.get<PaymentCondition[]>(`/paymentTerm`)

  return response.data
}
