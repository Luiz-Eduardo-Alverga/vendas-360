import api from '@/lib/axios'

export interface IATag {
  id: string
  name: string
  active: boolean
}

export async function getTags() {
  const response = await api.get<IATag[]>('/tags')

  return response.data
}
