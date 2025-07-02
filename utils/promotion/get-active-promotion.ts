// utils/products/promotion.ts

import { Product } from '@/interfaces/products'

export function getActivePromotion(product: Product) {
  const now = new Date()

  return (
    product.promotions &&
    product.promotions.find((promo) => {
      const start = new Date(promo.startDate)
      const end = new Date(promo.endDate)

      return promo.active && promo.discount > 0 && now >= start && now <= end
    })
  )
}

export function calculateDiscountedPrice(
  originalPrice: number,
  discount: number,
) {
  return originalPrice - originalPrice * (discount / 100)
}

export function getProductPricing(product: Product) {
  const promotion = getActivePromotion(product)

  if (promotion) {
    const discountedPrice = calculateDiscountedPrice(
      product.priceDefault,
      promotion.discount,
    )

    return {
      hasPromotion: true,
      promotion,
      discountedPrice,
      originalPrice: product.priceDefault,
    }
  }

  return {
    hasPromotion: false,
    promotion: null,
    discountedPrice: product.priceDefault,
    originalPrice: product.priceDefault,
  }
}
