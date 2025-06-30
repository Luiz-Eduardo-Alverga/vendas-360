import api from "@/lib/axios";

interface GetPaymentTermParams {
    paymentTermId: string
}

export interface Installment {
    id: string
    days: number
    active: boolean
  }
  
  export interface PaymentCondition {
    id: string
    description: string
    minimumOrderValue: number
    active: boolean
    paymentMethodId: string
    installments: Installment[]
}

export async function getPaymentTerm ({paymentTermId}: GetPaymentTermParams) {
    const response = await api.get<PaymentCondition>(`/paymentTerm/${paymentTermId}`)

    return response.data
}