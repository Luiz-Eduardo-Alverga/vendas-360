import { Highlight } from '@/interfaces/highlights'
import api from '@/lib/axios'

export async function getHighlights() {
  const companyId = localStorage.getItem('companyId')

  const response = await api.get<Highlight[]>('/highlights', {
    params: {
      companyId,
    },
  })

  return response.data
}
