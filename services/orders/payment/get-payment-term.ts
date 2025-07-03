import { PaymentCondition } from '@/interfaces/paymentsTerm/payment-term'
import api from '@/lib/axios'

interface GetPaymentTermParams {
  paymentTermId: string
}

export async function getPaymentTerm({ paymentTermId }: GetPaymentTermParams) {
  const response = await api.get<PaymentCondition>(
    `/paymentTerm/${paymentTermId}`,
  )

  return response.data
}
