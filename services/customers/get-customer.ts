import { Customer } from '@/interfaces/customers'
import api from '@/lib/axios'

export async function getCustomer() {
  const customerId = localStorage.getItem('customerId')

  const response = await api.get<Customer>(`customers/${customerId}`)

  return response.data
}
