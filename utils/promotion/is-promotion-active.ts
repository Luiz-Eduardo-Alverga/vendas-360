import { Promotion } from '@/interfaces/promotions'

export function isPromotionActive(promotion: Promotion): boolean {
  const today = new Date()
  const start = new Date(promotion.startDate)
  const end = new Date(promotion.endDate)
  return promotion.active && start <= today && end >= today
}
