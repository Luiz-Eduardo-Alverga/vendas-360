import { Promotion } from '@/interfaces/promotions'
import api from '@/lib/axios'

export async function getPromotions() {
  const response = await api.get<Promotion[]>('/promotions')

  return response.data
}
