import { Highlight } from '@/interfaces/highlights'

export function isHighlightActive(highlight: Highlight): boolean {
  const today = new Date()
  const start = new Date(highlight.startDate)
  const end = new Date(highlight.endDate)
  return highlight.active && start <= today && end >= today
}
