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
